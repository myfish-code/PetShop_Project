from django.shortcuts import get_object_or_404
from django.db import transaction

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from shop.models import Product, Category, Cart, CartItem, Order, OrderItem
from shop.serializers import ProductSerializer, CategorySerializer, CartSerializer, OrderSerializer, OrderListSerializer

class ProductListAPIView(APIView):
    def get(self, request):
        products = Product.objects.filter(is_available=True)

        categories_param = request.query_params.get('categories')
        
        if categories_param:
            slug_list = categories_param.split(',')
            products = products.filter(category__slug__in=slug_list)

        min_price = request.query_params.get('min_price')
        if min_price and min_price.isdigit():
            products = products.filter(price__gte=min_price)

        products_serializer = ProductSerializer(products, many=True).data
        return Response({
            "categories": CategorySerializer(Category.objects.all(), many=True).data,
            "products": products_serializer
        }, status=status.HTTP_200_OK)


class ProductDetailAPIView(APIView):
    def get(self, request, slug):
        product = get_object_or_404(Product, slug=slug, is_available=True)
        
        product_serializer = ProductSerializer(product).data

        return Response({
            "product": product_serializer
        }, status=status.HTTP_200_OK)
    

class CartAPIView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        cart_serializer = CartSerializer(cart)

        return Response({
            "cart": cart_serializer
        }, status=status.HTTP_200_OK)

    def post(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        product = Product.objects.filter(id=product_id).first()
        if not product:
            return Response({
                "error": "Product not found."
            }, status=status.HTTP_400_BAD_REQUEST)
        
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity

        cart_item.save()
        
        return Response({"message": "Order added"}, status=status.HTTP_200_OK)

    def patch(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 0))

        item = CartItem.objects.filter(cart=cart, product_id=product_id).first()
        
        if not item:
            return Response({"error": "Product not found in cart."}, status=status.HTTP_404_NOT_FOUND)
        
        if quantity <= 0:
            item.delete()
            return Response({"message": "Product removed from cart."}, status=status.HTTP_200_OK)
        
        item.quantity = quantity
        item.save()
        return Response({"message": "Cart updated successfully."}, status=status.HTTP_200_OK)

    def delete(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        
        item = CartItem.objects.filter(cart=cart, product_id=product_id).first()
        
        if not item:
            return Response({"message": "Product removed from cart."}, status=status.HTTP_200_OK)
            
        item.delete()
        return Response({"message": "Product removed from cart."}, status=status.HTTP_200_OK)
    

class OrderManageAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id=None):
        if order_id:
            order = get_object_or_404(Order, pk=order_id, user=request.user)
            order_serializer = OrderSerializer(order).data

            return Response({
                "order": order_serializer
            }, status=status.HTTP_200_OK)
        
        orders = Order.objects.filter(user=request.user)
        orders_serializer = OrderListSerializer(orders, many=True).data

        return Response({
            "orders": orders_serializer
        }, status=status.HTTP_200_OK)

    def post(self, request):
        cart = Cart.objects.filter(user=request.user).prefetch_related('items__product').first()
        items = cart.items.all() if cart else []
        
        if not items:
            return Response({"error": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                order = Order.objects.create(
                    user=request.user,
                    first_name=request.data.get('first_name'),
                    last_name=request.data.get('last_name'),
                    phone=request.data.get('phone'),
                    address=request.data.get('address'),
                    status='new'
                )

                total = 0
                for item in items:
                    OrderItem.objects.create(
                        order=order,
                        product=item.product,
                        price=item.product.price, 
                        quantity=item.quantity
                    )
                    total += item.product.price * item.quantity

                order.total_cost = total
                order.save()

                items.delete()

                return Response({
                    "message": "Order created successfully.", 
                    "order_id": order.id
                }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": "Failed to create order."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, pk):
        order = get_object_or_404(Order, pk=pk, user=request.user)
        
        if order.status != 'new':
            return Response({"error": "Cannot cancel an order that is already processed."}, status=status.HTTP_400_BAD_REQUEST)
        
        order.status = 'canceled'
        order.save()
        return Response({"message": "Order canceled successfully."}, status=status.HTTP_200_OK)