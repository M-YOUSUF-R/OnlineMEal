from django.shortcuts import render
from user.views import loginPage

# Create your views here.
@loginPage
def mealPage(req):
  return render(request=req,template_name='meal/meal.html');

def updateMeal(req):
  """for post request and database update"""
  pass
