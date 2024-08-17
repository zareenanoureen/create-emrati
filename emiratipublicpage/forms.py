from django import forms
from .models import Products

class PreferenceForm(forms.ModelForm):
    class Meta:
        model = Products
        fields = ['category']
