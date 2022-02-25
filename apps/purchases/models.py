from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    class Meta():
        db_table = 'user'

class Property(models.Model):
    name = models.CharField(max_length = 100)
    description = models.TextField(max_length = 480)
    total_bricks = models.IntegerField(default = 100)
    available_bricks = models.IntegerField(default = 100)
    unit_price = models.FloatField(default = 0)
    owner = models.ForeignKey(User, on_delete = models.CASCADE, default = None)
    image = models.CharField(max_length = 100, blank = True, null = True, default = "none.jpg")
    class Meta():
        db_table = "property"

class BrickPurchase(models.Model):
    buyer = models.ForeignKey(User, on_delete = models.CASCADE, default = None)
    purchase_date = models.DateTimeField(auto_now = True)
    total_price = models.FloatField(default = 0)
    quantity = models.IntegerField(default = 0)
    property = models.ForeignKey(Property, on_delete = models.CASCADE, default = None)
    class Meta():
        db_table = 'brick_purchases'
    
