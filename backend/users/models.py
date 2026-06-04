from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    avatar_url = models.URLField(max_length=500, blank=True, null=True)
    
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  

    def __str__(self):
        return self.email

class UserAddress(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='addresses'
    )
    
    recipient_name = models.CharField(max_length=150, verbose_name="Имя получателя")
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    
    country = models.CharField(max_length=50, default="Россия") # Или используй выпадающий список
    city = models.CharField(max_length=100)
    street = models.CharField(max_length=255)
    house = models.CharField(max_length=20)
    apartment = models.CharField(max_length=20, blank=True, null=True, verbose_name="Квартира/Офис")
    
    zip_code = models.CharField(max_length=15)
    comment = models.TextField(blank=True, null=True, verbose_name="Комментарий для курьера")
    
    is_default = models.BooleanField(default=False, verbose_name="Адрес по умолчанию")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Адрес доставки"
        verbose_name_plural = "Адреса доставки"
        ordering = ['-is_default', '-created_at']

    def __str__(self):
        return f"{self.recipient_name}, {self.city}, {self.street} д.{self.house}"

    def save(self, *args, **kwargs):
        if self.is_default:
            UserAddress.objects.filter(user=self.user).update(is_default=False)
        super().save(*args, **kwargs)