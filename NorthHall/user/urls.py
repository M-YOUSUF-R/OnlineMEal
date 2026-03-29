from django.urls import path
from . import views

urlpatterns = [
  path('login/', views.login_page, name='login_page'),
  path('signup/', views.signup_page, name='signup_page'),
  path('recoverpass/', views.pass_recover, name='pass_recover_page'),
  path('logout/', views.logout_view, name='logout'),
]
