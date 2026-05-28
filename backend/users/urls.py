from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
#from users.views import ...

urlpatterns = [
    
    path('token/refresh/', TokenRefreshView.as_view()),
]
