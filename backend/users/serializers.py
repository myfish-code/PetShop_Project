from rest_framework import serializers
from django.contrib.auth import get_user_model
from users.models import UserAddress
from django.core.validators import RegexValidator
User = get_user_model()

letter_validator = RegexValidator(r'^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]*$', 'Тільки літери дозволені')
phone_validator = RegexValidator(r'^[0-9]*$', 'Номер має містити тільки цифри')

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        exclude = ['user']  # user подтянется автоматически при создании

class UserProfileSerializer(serializers.ModelSerializer):

    first_name = serializers.CharField(validators=[letter_validator], required=False, allow_blank=True)
    last_name = serializers.CharField(validators=[letter_validator], required=False, allow_blank=True)
    phone = serializers.CharField(validators=[phone_validator], required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'avatar_url','phone']
        read_only_fields = ['email']