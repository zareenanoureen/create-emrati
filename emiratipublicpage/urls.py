from django.urls import path
from . import views


urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.signin, name='login'),
    path('logout/', views.signout, name='logout'),
    path('preferences/', views.update_preferences, name='update_preferences'),
    path('reorder/<int:order_id>/', views.reorder, name='reorder'),
    
]
