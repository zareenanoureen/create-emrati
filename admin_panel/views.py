from rest_framework import generics
from django.shortcuts import render, redirect, get_object_or_404
from emiratipublicpage.models import CustomUser, Products, Orders, Customization
from .serializers import CustomUserSerializer, ProductSerializer, OrderSerializer, CustomizationSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from .forms import *
from django.core.mail import send_mail
from django.conf import settings
from dotenv import load_dotenv
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
from django.db.models import Q
import os
from django.contrib import messages
load_dotenv()



# @login_required
def dashboard(request):
    return render(request, 'admin_panel/dashboard.html')



# @login_required
def customer_detail_view(request, pk):
    customer = get_object_or_404(CustomUser, pk=pk)
    orders = Orders.objects.filter(user=customer)
    return render(request, 'admin_panel/customer_detail.html', {
        'customer': customer,
        'orders': orders,
    })

# @login_required
def customer_list_view(request):
    search_query = request.GET.get('search', '')
    status_filter = request.GET.get('status', 'all')
    order_by = request.GET.get('order_by', 'firstname')  # Default ordering by firstname
    from_date = request.GET.get('from_date')
    to_date = request.GET.get('to_date')
    
    customers = CustomUser.objects.all()
    
    # Filter by search query
    if search_query:
        customers = customers.filter(
            Q(firstname__icontains=search_query) | 
            Q(lastname__icontains=search_query) | 
            Q(phone_number__icontains=search_query)
        )

    # Filter by status
    if status_filter == 'active':
        customers = customers.filter(is_active=True)
    elif status_filter == 'inactive':
        customers = customers.filter(is_active=False)

    # Filter by date range
    if from_date:
        customers = customers.filter(date_joined__gte=from_date)
    if to_date:
        customers = customers.filter(date_joined__lte=to_date)

    # Adjust ordering logic
    if order_by in ['firstname', 'lastname', 'email']:
        customers = customers.order_by(order_by)
    else:
        customers = customers.order_by('firstname')

    total_customers = customers.count()
    active_customers = customers.filter(is_active=True).count()
    inactive_customers = customers.filter(is_active=False).count()

    context = {
        'customers': customers,
        'total_customers': total_customers,
        'active_customers': active_customers,
        'inactive_customers': inactive_customers,
    }
    
    return render(request, 'admin_panel/customer_list.html', context)



# @login_required
def customer_edit_view(request, pk):
    customer = get_object_or_404(CustomUser, pk=pk)
    if request.method == 'POST':
        form = CustomUserForm(request.POST, instance=customer)
        if form.is_valid():
            form.save()
            return redirect('customer-detail', pk=pk)
    else:
        form = CustomUserForm(instance=customer)
    return render(request, 'admin_panel/customer_form.html', {
        'form': form,
        'form_title': 'Edit Customer',
        'form_button_text': 'Update Customer'
    })

@csrf_exempt
def update_customer_status(request, pk):
    if request.method == 'POST':
        customer = get_object_or_404(CustomUser, pk=pk)
        status = request.POST.get('status')
        if status in ['active', 'inactive']:
            customer.is_active = (status == 'active')
            customer.save()
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)

# @login_required
def send_customer_email(request, pk):
    customer = get_object_or_404(CustomUser, pk=pk)
    if request.method == 'POST':
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        if not subject or not message:
            messages.error(request, "Both subject and message are required.")
            return redirect('send-customer-email', pk=pk)
        try:
            send_mail(
                subject,
                message,
                os.getenv('DEFAULT_FROM_EMAIL'),  # Make sure this is set in your settings.py
                [customer.email],
                fail_silently=False,
            )
            messages.success(request, f"Email successfully sent to {customer.email}")
        except Exception as e:
            messages.error(request, f"Failed to send email: {str(e)}")
        
        return redirect('customer-detail', pk=pk)
    
    # If GET request or form validation fails, render the form again
    return render(request, 'admin_panel/customer_email_form.html', {'customer': customer})

@csrf_exempt
def send_message(request):
    if request.method == 'POST':
        sender_id = request.POST.get('sender_id')
        recipient_id = request.POST.get('recipient_id')
        message = request.POST.get('message')

        if sender_id and recipient_id and message:
            sender = get_object_or_404(CustomUser, id=sender_id)
            recipient = get_object_or_404(CustomUser, id=recipient_id)
            chat_message = ChatMessage.objects.create(sender=sender, recipient=recipient, message=message)
            return JsonResponse({'status': 'success', 'timestamp': chat_message.timestamp})
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid data'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

def get_messages(request, pk):
    if request.method == 'GET':
        user = get_object_or_404(CustomUser, pk=pk)
        messages = ChatMessage.objects.filter(recipient=user).order_by('-timestamp')
        messages_data = [
            {
                'sender': msg.sender.username,
                'message': msg.message,
                'timestamp': msg.timestamp.strftime('%Y-%m-%d %H:%M:%S')
            }
            for msg in messages
        ]
        return JsonResponse({'status': 'success', 'messages': messages_data})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

def chat_view(request, pk):
    user = get_object_or_404(CustomUser, pk=pk)
    return render(request, 'admin_panel/chat_room.html', {'recipient': user})

def order_list_view(request):
    orders = Orders.objects.all()
    
    total_orders = orders.count()
    pending_orders = orders.filter(status="Pending").count()
    delivered_orders = orders.filter(status="Delivered").count()

    # Add other filters as needed
    if request.GET.get('status'):
        orders = orders.filter(status=request.GET.get('status'))
    if request.GET.get('from_date'):
        orders = orders.filter(created_at__gte=request.GET.get('from_date'))
    if request.GET.get('to_date'):
        orders = orders.filter(created_at__lte=request.GET.get('to_date'))

    context = {
        'orders': orders,
        'total_orders': total_orders,
        'pending_orders': pending_orders,
        'delivered_orders': delivered_orders,
    }

    return render(request, 'admin_panel/order_list.html', context)


# @login_required
def tailor_list(request):
    query = request.GET.get('query', '')  
    status = request.GET.get('status', 'all')  
    from_date = request.GET.get('from_date', '')
    to_date = request.GET.get('to_date', '')

    print(f"Query: {query}, Status: {status}, From Date: {from_date}, To Date: {to_date}")

    tailors = Tailor.objects.all()

    if query:
        tailors = tailors.filter(
            Q(name__icontains=query) | 
            Q(phone__icontains=query)
        )
    
    if status != 'all':
        tailors = tailors.filter(status=status)

    if from_date:
        tailors = tailors.filter(created_at__gte=from_date)

    if to_date:
        tailors = tailors.filter(created_at__lte=to_date)

    print(tailors.query)  # Debug SQL query

    context = {
        'tailors': tailors,
        'total_tailors': tailors.count(),
        'active_tailors': tailors.filter(status='active').count(),
        'inactive_tailors': tailors.filter(status='inactive').count(),
    }

    return render(request, 'admin_panel/tailor_list.html', context)

# @login_required
# def update_tailor_status(request, id):
#     tailor = get_object_or_404(Tailor, id=id)
#     if request.method == "POST":
#         status = request.POST.get('status')
#         tailor.status = status
#         tailor.save()
#     return redirect('tailor_list')


# @login_required
def add_tailor(request):
    if request.method == 'POST':
        form = TailorForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('tailor_list')
    else:
        form = TailorForm()
    return render(request, 'admin_panel/add_tailor.html', {'form': form})


# @login_required
def edit_tailor(request, id):
    tailor = get_object_or_404(Tailor, id=id)
    
    if request.method == 'POST':
        form = TailorForm(request.POST, instance=tailor)
        if form.is_valid():
            form.save()
            return redirect('tailor_list')
    else:
        form = TailorForm(instance=tailor)
    
    return render(request, 'admin_panel/edit_tailor.html', {'form': form, 'tailor': tailor})



# @login_required
def delete_tailor(request, tailor_id):
    tailor = get_object_or_404(Tailor, id=tailor_id)
    
    if request.method == "POST":
        tailor.delete()
        messages.success(request, "Tailor deleted successfully.")
        return redirect('tailor_list')  # Redirect to the tailor list after deletion
    
    return render(request, 'admin_panel/confirm_delete_tailor.html', {'tailor': tailor})



@csrf_exempt
def update_status(request):
    if request.method == 'POST':
        import json
        data = json.loads(request.body)
        print('Received data:', data)  # Debug print
        status = data.get('status')
        id = data.get('id')

        try:
            tailor = Tailor.objects.get(id=id)
            tailor.status = status
            tailor.save()
            return JsonResponse({'success': True})
        except Tailor.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Tailor not found'})
    return JsonResponse({'success': False, 'error': 'Invalid request method'})


# @login_required
def product_list_view(request):
    products = Products.objects.all()
    return render(request, 'admin_panel/product_list.html', {'products': products})

def product_add_view(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('product-list')
    else:
        form = ProductForm()
    
    return render(request, 'admin_panel/product_form.html', {
        'form': form,
        'form_title': 'Add Product',
        'form_button_text': 'Add Product'
    })

def product_edit_view(request, pk):
    product = get_object_or_404(Products, pk=pk)
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            return redirect('product-list')
    else:
        form = ProductForm(instance=product)
    
    return render(request, 'admin_panel/product_form.html', {
        'form': form,
        'form_title': 'Edit Product',
        'form_button_text': 'Update Product'
    })

def product_delete_view(request, pk):
    product = get_object_or_404(Products, pk=pk)
    if request.method == 'POST':
        product.delete()
        return redirect('product-list')
    
    return render(request, 'admin_panel/product_confirm_delete.html', {
        'product': product
    })

# @login_required
def reports_view(request):
    total_customers = CustomUser.objects.count()
    active_customers = CustomUser.objects.filter(is_active=True).count()
    total_orders = Orders.objects.count()
    completed_orders = Orders.objects.filter(status='Delivered').count()
    total_products = Products.objects.count()
    top_selling_product = Products.objects.order_by('-order_count').first()

    context = {
        'total_customers': total_customers,
        'active_customers': active_customers,
        'total_orders': total_orders,
        'completed_orders': completed_orders,
        'total_products': total_products,
        'top_selling_product': top_selling_product,
    }
    return render(request, 'admin_panel/reports.html', context)

# @login_required
def customization_list_view(request):
    customizations = Customization.objects.all()
    return render(request, 'admin_panel/customization_list.html', {'customizations': customizations})

# @login_required
def customization_add_view(request):
    if request.method == 'POST':
        product = get_object_or_404(Products, id=request.POST['product'])
        color = request.POST['color']
        fabric = request.POST['fabric']
        embroidery = request.POST['embroidery']
        Customization.objects.create(product=product, color=color, fabric=fabric, embroidery=embroidery)
        return redirect('customization-list')
    products = Products.objects.all()
    return render(request, 'admin_panel/customization_form.html', {
        'products': products,
        'customization': {},
        'form_title': 'Add Customization',
        'form_button_text': 'Add Customization'
    })

# @login_required
def customization_edit_view(request, pk):
    customization = get_object_or_404(Customization, pk=pk)
    if request.method == 'POST':
        customization.product = get_object_or_404(Products, id=request.POST['product'])
        customization.color = request.POST['color']
        customization.fabric = request.POST['fabric']
        customization.embroidery = request.POST['embroidery']
        customization.save()
        return redirect('customization-list')
    products = Products.objects.all()
    return render(request, 'admin_panel/customization_form.html', {
        'products': products,
        'customization': customization,
        'form_title': 'Edit Customization',
        'form_button_text': 'Update Customization'
    })


# @login_required
def customization_delete_view(request, pk):
    customization = get_object_or_404(Customization, pk=pk)
    customization.delete()
    return redirect('customization-list')

