from django.shortcuts import render

# Create your views here.
def mealPage(req):
  return render(request=req,template_name='meal/meal.html');

def updateMeal(req):
  """for post request and database update"""
  pass
