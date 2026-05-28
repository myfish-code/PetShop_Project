
from django.urls import path
from shop.views import ProductListAPIView, ProductDetailAPIView, CartAPIView, OrderManageAPIView

urlpatterns = [
    path('products/', ProductListAPIView.as_view(), name='product-list'),
    path('products/<slug:slug>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('cart/', CartAPIView.as_view(), name='cart'),
    path('orders/', OrderManageAPIView.as_view()),
    path('orders/<int:order_id>/', OrderManageAPIView.as_view()),
]
