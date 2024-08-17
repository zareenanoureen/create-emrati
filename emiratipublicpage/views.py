from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from .models import CustomUser
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from shopify_integration.utils import error_response
from django.db import DatabaseError
from django.contrib.auth.decorators import login_required
from emiratipublicpage.forms import *
from emiratipublicpage.models import *


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        print("Form submitted")
        try:
            email = request.POST.get('email')
            firstname = request.POST.get('firstname')
            lastname = request.POST.get('lastname')
            country = request.POST.get('country')
            phone_number = request.POST.get('phone_number')
            address = request.POST.get('address')
            password = request.POST.get('password')
            confirm_password = request.POST.get('confirm_password')

            print("Data received:", email, firstname, lastname, country, phone_number)
            if password != confirm_password:
                return JsonResponse({'error': 'Passwords do not match'}, status=400)

            if CustomUser.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists'}, status=400)

            user = CustomUser.objects.create_user(
                email=email,
                firstname=firstname,
                lastname=lastname,
                country=country,
                phone_number=phone_number,
                password=password, 
                address=address,
                is_active=True                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            )
            print("User created successfully")

            # Redirect to the login page
            return redirect(reverse('login'))
        except DatabaseError as e:
            print(f"Database error occurred: {e}")
            return JsonResponse({'error': f'Database error: {e}'}, status=500)
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            return JsonResponse({'error': f'An unexpected error occurred: {e}'}, status=500)
    print("Rendering signup page")
    return render(request, 'login_and_register/signup.html')

@csrf_exempt
def signin(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        if email is None or password is None:
            return JsonResponse({'error': 'Email and password REQUIRED!'}, status=400)

        try:
            user = CustomUser.objects.get(email=email)
            print(f"Retrieved user: {user}")
            print(f"User password (hashed): {user.password}")

            # Check the provided password against the stored hashed password
            if check_password(password, user.password):
                if user.is_active:
                    login(request, user)
                    return redirect(reverse('install_app'))
                else:
                    return JsonResponse({'error': 'Account is not activated yet!'}, status=401)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)

        except CustomUser.DoesNotExist:
            
            return JsonResponse({'error': 'User does not exist'}, status=401)
    
    return render(request, 'login_and_register/login.html')


def signout(request):
    logout(request)
    return redirect('login')  


@login_required
def update_preferences(request):
    if request.method == 'POST':
        form = PreferenceForm(request.POST, instance=request.user.preference)
        if form.is_valid():
            form.save()
            return redirect('dashboard')  # Redirect to the dashboard or another appropriate page
    else:
        form = PreferenceForm(instance=request.user.preference)
    return render(request, 'preferences.html', {'form': form})


@login_required
def reorder(request, order_id):
    previous_order = Orders.objects.get(id=order_id, user=request.user)
    
    # Create a new order based on the previous one
    new_order = Orders.objects.create(
        user=request.user,
        items_json=previous_order.items_json,
        surname=previous_order.surname,
        first_name=previous_order.first_name,
        company_name=previous_order.company_name,
        street=previous_order.street,
        municipalities=previous_order.municipalities,
        post_code=previous_order.post_code,
        state=previous_order.state,
        email=previous_order.email,
        phone_number=previous_order.phone_number
    )
    
    return redirect('order_summary', order_id=new_order.id)
