from django.urls import path
from .views import *


urlpatterns = [
    path('', dashboard, name='dashboard'),
    path('customers/', customer_list_view, name='customer-list'),
    path('customers/<int:pk>/', customer_detail_view, name='customer-detail'),
    path('customers/<int:pk>/edit/', customer_edit_view, name='customer-edit'),
    path('update-customer-status/<int:pk>/', update_customer_status, name='update-customer-status'),
    path('customers/email/<int:pk>/', send_customer_email, name='send-customer-email'),
    path('orders/', order_list_view, name='order-list'),
    path('products/', product_list_view, name='product-list'),
    path('products/add/', product_add_view, name='product-add'),
    path('products/edit/<int:pk>/', product_edit_view, name='product-edit'),
    path('products/delete/<int:pk>/', product_delete_view, name='product-delete'),
    path('reports/', reports_view, name='reports'),
    path('customizations/', customization_list_view, name='customization-list'),
    path('customizations/add/', customization_add_view, name='customization-add'),
    path('customizations/edit/<int:pk>/', customization_edit_view, name='customization-edit'),
    path('customizations/delete/<int:pk>/', customization_delete_view, name='customization-delete'),
    # path('customers/chat/<int:room_name>/', chat_room, name='chat_room'),
    path('chat/<int:pk>/', chat_view, name='chat'),
    path('send-message/', send_message, name='send-message'),
    path('get-messages/<int:pk>/', get_messages, name='get-messages'),
    path('tailors/', tailor_list, name='tailor_list'),
     path('update-status/', update_status, name='update_status'),
    path('tailors/edit/<int:id>/', edit_tailor, name='edit_tailor'),
    path('tailors/add/', add_tailor, name='add_tailor'),
    path('tailors/delete/<int:tailor_id>/', delete_tailor, name='delete_tailor'),
    
]

