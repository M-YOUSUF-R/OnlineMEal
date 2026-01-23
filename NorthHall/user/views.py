from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm

# Create your views here.
class UserAccount:
  def login():
    pass
  def signup():
    pass
  def loginPage(req):
    return render(request=req,template_name='user/login.html');
  def signupPage(req):
    form = UserCreationForm()
    if req.method == 'POST':
      form = None
    return render(request=req,template_name='user/register.html');
  def passRecover(req):
    return render(request=req,template_name='user/recover.html')
