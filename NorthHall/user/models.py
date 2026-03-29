from django.db import models
from .mongo_utils import db
# Create your models here.

if db is not None:
    user_collection = db['Users']
else:
    user_collection = None
