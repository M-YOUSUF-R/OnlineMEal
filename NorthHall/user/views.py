from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.hashers import make_password, check_password
from .models import user_collection
from meal.models import UserSync
import datetime

# Create your views here.

def login_page(req):
    if req.method == 'POST':
        border_no = req.POST.get('border_no')
        reg_no = req.POST.get('reg_no')
        password = req.POST.get('password')
        
        if user_collection is not None:
            user = user_collection.find_one({'reg_no': reg_no, 'border_no': border_no})
            if user and check_password(password, user['password']):
                # Set session or JWT here
                req.session['user_id'] = str(user['_id'])
                req.session['border_no'] = border_no
                return redirect('meal_page')
            else:
                return HttpResponse("Invalid credentials")
        else:
            # Fallback for local testing if MongoDB is down
            # Check UserSync instead?
            try:
                user_sync = UserSync.objects.get(border_no=border_no, reg_no=reg_no)
                # We don't store passwords in UserSync in the current plan, 
                # but for full fulfillment we should have a way to auth.
                # If MongoDB is down, we are in trouble for auth.
                return HttpResponse("MongoDB Connection Failed. Cannot authenticate.")
            except UserSync.DoesNotExist:
                return HttpResponse("User not found")
                
    return render(req, template_name='user/login.html')

def signup_page(req):
    if req.method == 'POST':
        border_no = req.POST.get("border_no")
        reg_no = req.POST.get('reg_no')
        full_name = req.POST.get('user_name')
        room_no = req.POST.get('room_no')
        phone = req.POST.get('phone_no')
        password = req.POST.get('password')
        
        hashed_password = make_password(password)
        
        user_data = {
            'border_no': border_no,
            'reg_no': reg_no,
            'full_name': full_name,
            'room_no': room_no,
            'phone': phone,
            'password': hashed_password,
            'created_at': datetime.datetime.now(),
            'last_login': datetime.datetime.now()
        }
        
        mongo_id = None
        if user_collection is not None:
            result = user_collection.insert_one(user_data)
            mongo_id = str(result.inserted_id)
        else:
            # If MongoDB is down, use a dummy ID for UserSync
            mongo_id = f"dummy_{border_no}"
            
        # Sync to SQLite
        UserSync.objects.update_or_create(
            border_no=border_no,
            reg_no=reg_no,
            defaults={
                'mongo_id': mongo_id,
                'full_name': full_name,
                'room_no': room_no
            }
        )
        
        return redirect('login_page')
        
    return render(req, template_name='user/register.html')

def pass_recover(req):
    return render(req, template_name='user/recover.html')

def logout_view(req):
    req.session.flush()
    return redirect('home')
