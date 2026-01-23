from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class createUserFomr(UserCreationForm):
  border_numer = forms.CharField(required=True,
                                  max_length=3,
                                  help_text='Enter your border number'
                                );
  reg_number = forms.CharField(required=True,help_text="Enter your registration number");
  room_number = forms.CharField(required=True,help_text="Enter your room number");
  phn_number = forms.CharField(required=True,help_text="Enter your phone number");

  class Meta:
    model=User
    fields = UserCreationForm.Meta.fields + ("")
    fields=['username','emial',]
