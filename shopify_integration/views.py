from django.shortcuts import render
from django.shortcuts import render, redirect
from django.conf import settings
import shopify
from django.urls import reverse
import urllib.parse
from . import shopify_settings
from django.http import JsonResponse
from .models import CustomUser
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from .utils import error_response
from django.db import DatabaseError


@csrf_exempt
def signup(request):
    print(request.method)
    if request.method == 'POST':
        try:
            email = request.POST.get('email')
            username = request.POST.get('username')
            phone_number = request.POST.get('phone_number')
            password = request.POST.get('password')
            confirm_password = request.POST.get('confirm_password')
            print(email, username)
            if password != confirm_password:
                return error_response('Passwords do not match')

            if CustomUser.objects.filter(email=email).exists():
                return error_response('Email already exists')

            user = CustomUser.objects.create_user(email=email, username=username, phone_number=phone_number, password=password, is_active=True)
            print(f"User created: {user.email}")
            return render(request, 'shopify_integration/auth-login.html')
        except DatabaseError as e:
            return JsonResponse({'error': f'Database error: {e}'}, status=500)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {e}'}, status=500)
    return render(request, 'shopify_integration/auth-register.html')


@csrf_exempt
def signin(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        print(f"Attempting to sign in with email: {email}")
        if email is None or password is None:
            return error_response('Email and password REQUIRED!')
        user = authenticate(username=email, password=password)
        print(f"Authenticated user: {user}")
        if user is not None:
            try:
                user = CustomUser.objects.get(email=email)
                print(f"Is user active? {user.is_active}")  # Debugging: Check if the user's account is active
            except CustomUser.DoesNotExist:
                return JsonResponse({'error': 'User does not exist'}, status=401)
            if user.is_active:
                login(request, user)
                print(request.user)
             
                return redirect(reverse('install-app'))
            else:
                return JsonResponse({'error': 'Account is not activated yet!'}, status=401)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    return render(request, 'shopify_integration/auth-login.html')


def signout(request):
    logout(request)
    return redirect('signin')


def install_app(request): 
    shop = request.GET.get('shop')
    if shop:
        redirect_uri = shopify_settings.SHOPIFY_REDIRECT_URI
        scope = shopify_settings.SHOPIFY_SCOPE
        # Ensure scope is a comma-separated string without leading/trailing spaces
        scope = ','.join([s.strip() for s in scope.split(',')])

        install_url = f"https://{shop}/admin/oauth/authorize?client_id={shopify_settings.SHOPIFY_API_KEY}&scope={scope}&redirect_uri={redirect_uri}"
        return redirect(install_url)
    return render(request, 'shopify_integration/install.html')


def callback(request):
    print(f"request type: {type(request)}")
    print(f"request.GET type: {type(request.GET)}")

    shop = request.GET.get('shop')
    code = request.GET.get('code')

    print(f"shop: {shop}, code: {code}")

    if shop and code:
        try:
            shopify.Session.setup(api_key=shopify_settings.SHOPIFY_API_KEY, secret=shopify_settings.SHOPIFY_API_SECRET)
            session = shopify.Session(shop, '2024-07')
            print(f"session type: {type(session)}")
            access_token = session.request_token(code)
            request.session['shopify_access_token'] = access_token
        except Exception as e:
            print(f"Error during request_token: {e}")
            return redirect('home')
    return render(request, 'shopify_integration/error.html', {'message': 'Shop or code parameter missing'})

def home(request):
    return render(request, 'shopify_integration/home.html')
