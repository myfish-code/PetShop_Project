from rest_framework import serializers
from shop.models import Category, Product, Cart, CartItem, Order, OrderItem

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class ProductSerializer(serializers.ModelSerializer):

    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 
            'category', 
            'name', 
            'slug', 
            'description', 
            'price', 
            'old_price', 
            'stock', 
            'is_available', 
            'image'
        ]

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['product', 'quantity', 'total_price']

    def get_total_price(self, obj):
        return obj.quantity * obj.product.price

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    grand_total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'grand_total']

    def get_grand_total(self, obj):
        return sum(item.quantity * item.product.price for item in obj.items.all())
    

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'price', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    # Убираем read_only=True, если хотим иметь гибкость
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'status', 'total_cost', 'created_at', 
            'address', 'phone', 'items'
        ]

