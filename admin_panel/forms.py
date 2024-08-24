from django import forms
from emiratipublicpage.models import *
from admin_panel.models import *

class ProductForm(forms.ModelForm):
    class Meta:
        model = Products
        fields = ['category', 'price', 'product_name', 'desc', 'image', 'pub_date', 'size']

class CustomUserForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['email', 'firstname', 'lastname', 'country', 'phone_number', 'address']
        widgets = {
            'address': forms.Textarea(attrs={'rows': 3}),
        }

class TailorForm(forms.ModelForm):
    class Meta:
        model = Tailor
        fields = ['name', 'phone', 'email', 'status']