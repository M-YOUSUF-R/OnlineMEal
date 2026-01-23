from django.urls import path
from . import views

urlpatterns = [
  path('',views.mealPage,name='meal_page'),
]
