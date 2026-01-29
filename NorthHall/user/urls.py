from django.urls import path
from .views import UserAccount

urlpatterns = [
  path('login/',UserAccount.loginPage,name='login_page'),
  path('signup/',UserAccount.signupPage,name='signup_page'),
  path('verify/',UserAccount.login,name='verify_user'),
  path('recoverpass/',UserAccount.passRecover,name='pass_recover_page')
]
