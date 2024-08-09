from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('', signin, name='signin'),
    path('signout/', signout, name='logout'),
    path('install/', install_app, name='install_app'),
    path('callback/', callback, name='callback'),
    path('home/', home, name='home'),
]