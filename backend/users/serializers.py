from rest_framework import serializers
from django.contrib.auth import get_user_model
from users.models import UserAddress

User = get_user_model()

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        exclude = ['user']  # user подтянется автоматически при создании

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'avatar_url']
        read_only_fields = ['email']