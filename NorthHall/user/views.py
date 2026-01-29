from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.hashers import make_password, check_password
from .models import user_collection

# Create your views here.
class UserAccount:
  def login(req):
    pass
  def signup(req):
    pass
  def loginPage(req):
    login_info = {}
    if req.method == 'POST':
      login_info['border_no'] = req.POST.get('border_no')
      login_info['reg_no'] = req.POST.get('reg_no')
      login_info['pass'] = req.POST.get('password')
      print(f'user :\n{login_info}')
      user = user_collection.find_one({'reg_no':login_info['reg_no'],'border_no':login_info['border_no']})
      if user and check_password(login_info['pass'],user['password']):
        return True
      else:
        return HttpResponse("No user or password is wrong")
    return render(request=req,template_name='user/login.html');
  def signupPage(req):
    form = UserCreationForm()
    user_cred = {}
    if req.method == 'POST':
      user_cred = {
        'border_no': req.POST.get("border_no"),
        'reg_no' : req.POST.get('reg_no'),
        'user_name' : req.POST.get('user_name'),
        'room_no' : req.POST.get('room_no'),
        'password' : make_password(req.POST.get('password'))
      }
      if user_cred:
        user_collection.insert_one(user_cred)
    # print(user_cred)
    return render(request=req,template_name='user/register.html');
  def passRecover(req):
    return render(request=req,template_name='user/recover.html')
