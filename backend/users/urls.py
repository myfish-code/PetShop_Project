from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from users.views import GoogleLoginView, UserDataAPIView, UserAddressAPIView

urlpatterns = [
    path('profile/', UserDataAPIView.as_view()),
    path('addresses/', UserAddressAPIView.as_view()),
    path('addresses/<int:id>/', UserAddressAPIView.as_view()),
    path('auth/google/', GoogleLoginView.as_view(), name='google_login'),
    path('token/refresh/', TokenRefreshView.as_view()),
]
