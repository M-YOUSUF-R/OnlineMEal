from django.shortcuts import render

def home(req):
  return render(request=req,template_name="home/index.html");
