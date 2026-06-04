from django.contrib import admin
from .models import Category, Product, Cart, CartItem, Order, OrderItem

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'slug']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'old_price', 'stock', 'is_available', 'created_at']
    list_filter = ['is_available', 'category', 'created_at']
    search_fields = ['name', 'description']
    list_editable = ['price', 'old_price', 'stock', 'is_available'] 
    prepopulated_fields = {'slug': ('name',)}



class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    raw_id_fields = ['product'] 

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'created_at', 'updated_at']
    search_fields = ['user__email', 'user__username']
    inlines = [CartItemInline]

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1 # Оставь 1, чтобы поле для нового товара было сразу доступно
    raw_id_fields = ['product']
    # УБРАЛИ readonly_fields, чтобы мы могли вводить данные
    # Если хочешь, чтобы цена подтягивалась сама, лучше сделать это логикой модели или save_formset

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'status', 'first_name', 'last_name', 'phone', 'total_cost', 'created_at']
    list_filter = ['status', 'created_at', 'updated_at']
    search_fields = ['id', 'first_name', 'last_name', 'phone', 'address', 'user__email']
    list_editable = ['status']  
    inlines = [OrderItemInline]
    readonly_fields = [ 'created_at', 'updated_at']

    # ЭТОТ МЕТОД ПОДТЯНЕТ ЦЕНУ ИЗ ТОВАРА АВТОМАТИЧЕСКИ
    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)
        for instance in instances:
            if not instance.price and instance.product:
                instance.price = instance.product.price
            instance.save()
        formset.save_m2m()