from django.db import models
from django.contrib.auth.models import AbstractUser
from apps.purchases import functions
import os

# Create your models here.

class User(AbstractUser):   # Hereda AbstractUser, que es el modelo de autenticación por defecto de Django
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

    def image_url(self):
        if os.path.isfile(functions.PROPERTY_PHOTOS + self.image):
            return r"property-photos/" + self.image
        else:
            return r"property-photos/none.jpg"
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
    
