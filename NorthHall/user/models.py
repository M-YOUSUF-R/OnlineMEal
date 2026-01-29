from django.db import models
from .mongo_utils import db
# Create your models here.

user_collection = db['Users']
