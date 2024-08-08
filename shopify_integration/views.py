from django.shortcuts import render
from django.shortcuts import render, redirect
from django.conf import settings
import shopify
import urllib.parse
from . import shopify_settings

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
    shop = request.GET.get('shop')
    code = request.GET.get('code')
    if shop and code:
        shopify.Session.setup(api_key=shopify_settings.SHOPIFY_API_KEY, secret=shopify_settings.SHOPIFY_API_SECRET)
        session = shopify.Session(shop, '2024-07')
        access_token = session.request_token(code)
        request.session['shopify_access_token'] = access_token
        return redirect('home')
    return render(request, 'shopify_integration/error.html', {'message': 'Shop or code parameter missing'})

def home(request):
    return render(request, 'shopify_integration/home.html')
