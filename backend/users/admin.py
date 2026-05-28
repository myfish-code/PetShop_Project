from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, UserAddress

# 1. Создаем Inline-класс для адресов
class UserAddressInline(admin.TabularInline):
    model = UserAddress
    extra = 0  # Сколько пустых форм показывать по умолчанию (0 — не показывать лишние)
    fields = ('recipient_name', 'phone', 'city', 'street', 'house', 'is_default')
    # Это позволяет редактировать адреса прямо из карточки юзера

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # Добавляем Inline в список
    inlines = [UserAddressInline]

    list_display = ['email', 'first_name', 'last_name', 'is_verified', 'is_staff']
    search_fields = ['email', 'first_name', 'last_name']
    list_filter = ['is_verified', 'is_staff', 'is_active']
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Статус верификации', {'fields': ('is_verified',)}),
        ('Личные данные', {'fields': ('first_name', 'last_name')}),
        ('Права доступа', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password'),
        }),
    )

# 2. Регистрируем отдельно модель адресов, чтобы была возможность видеть их общим списком
@admin.register(UserAddress)
class UserAddressAdmin(admin.ModelAdmin):
    list_display = ['user', 'recipient_name', 'city', 'street', 'is_default']
    list_filter = ['city', 'is_default']
    search_fields = ['recipient_name', 'phone', 'city']