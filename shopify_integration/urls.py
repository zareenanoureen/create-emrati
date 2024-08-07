from django.urls import path
from . import views

urlpatterns = [
    path('install/', views.install_app, name='install_app'),
    path('callback/', views.callback, name='callback'),
    path('', views.home, name='home'),
]