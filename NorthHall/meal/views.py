from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from .models import UserSync, Meal
import datetime
from django.utils import timezone

# Create your views here.

def login_required_custom(view_func):
    def wrapper(req, *args, **kwargs):
        if 'user_id' not in req.session:
            return redirect('login_page')
        return view_func(req, *args, **kwargs)
    return wrapper

@login_required_custom
def meal_page(req):
    border_no = req.session.get('border_no')
    try:
        user_sync = UserSync.objects.get(border_no=border_no)
    except UserSync.DoesNotExist:
        return HttpResponse("User sync error. Please contact admin.")
    
    # Get date from query param or use today
    date_str = req.GET.get('date')
    if date_str:
        try:
            current_date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            current_date = timezone.now().date()
    else:
        current_date = timezone.now().date()
        
    # Get or create meal status for this date
    meal, created = Meal.objects.get_or_create(
        user=user_sync,
        date=current_date,
        defaults={'user_meal_status': False, 'guest_meal_status': False}
    )
    
    # Improved inheritance: If newly created, look for the most recent previous status
    if created:
        prev_meal = Meal.objects.filter(user=user_sync, date__lt=current_date).order_by('-date').first()
        if prev_meal:
            meal.user_meal_status = prev_meal.user_meal_status
            meal.guest_meal_status = prev_meal.guest_meal_status
            meal.save()

    context = {
        'meal': meal,
        'current_date': current_date,
        'prev_date': (current_date - datetime.timedelta(days=1)).strftime('%Y-%m-%d'),
        'next_date': (current_date + datetime.timedelta(days=1)).strftime('%Y-%m-%d'),
        'user_full_name': user_sync.full_name
    }
    return render(req, template_name='meal/meal.html', context=context)

@login_required_custom
def update_meal(req):
    if req.method == 'POST':
        border_no = req.session.get('border_no')
        user_sync = UserSync.objects.get(border_no=border_no)
        
        date_str = req.POST.get('date')
        user_status = req.POST.get('user_meal_status') == 'true'
        guest_status = req.POST.get('guest_meal_status') == 'true'
        
        if date_str:
            target_date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
        else:
            target_date = timezone.now().date()
            
        meal, created = Meal.objects.update_or_create(
            user=user_sync,
            date=target_date,
            defaults={
                'user_meal_status': user_status,
                'guest_meal_status': guest_status
            }
        )
        
        return JsonResponse({'status': 'success', 'user_meal': meal.user_meal_status, 'guest_meal': meal.guest_meal_status})
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)

@login_required_custom
def delete_meal_status(req):
    """Delete (Reset) meal status for a specific date (Delete in CRUD)"""
    if req.method == 'POST':
        border_no = req.session.get('border_no')
        user_sync = UserSync.objects.get(border_no=border_no)
        date_str = req.POST.get('date')
        
        if date_str:
            target_date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
            Meal.objects.filter(user=user_sync, date=target_date).delete()
            return JsonResponse({'status': 'success', 'message': 'Status reset to default'})
            
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@login_required_custom
def meal_history(req):
    """View meal history (Read in CRUD)"""
    border_no = req.session.get('border_no')
    user_sync = UserSync.objects.get(border_no=border_no)
    
    # Filter by month if provided
    month = req.GET.get('month')
    year = req.GET.get('year')
    
    meals = Meal.objects.filter(user=user_sync).order_by('-date')
    
    if month and year:
        meals = meals.filter(date__month=month, date__year=year)
        
    context = {
        'meals': meals,
        'user_full_name': user_sync.full_name
    }
    return render(req, 'meal/history.html', context)

def admin_dashboard(req):
    # For now, simple dashboard
    date_str = req.GET.get('date')
    if date_str:
        current_date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
    else:
        current_date = timezone.now().date()
        
    meals = Meal.objects.filter(date=current_date).select_related('user')
    
    context = {
        'meals': meals,
        'current_date': current_date
    }
    # We might need a new template for this
    return render(req, 'meal/admin_dashboard.html', context)
