from django.urls import path
from . import views

urlpatterns = [
  path('', views.meal_page, name='meal_page'),
  path('update/', views.update_meal, name='update_meal'),
  path('reset/', views.delete_meal_status, name='reset_meal'),
  path('history/', views.meal_history, name='meal_history'),
  path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
]
