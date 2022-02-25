from django.shortcuts import render
from apps.purchases.models import *
from apps.purchases import functions
import os
# Create your views here.

def Shopping(request):
    data = {}
    data['properties'] = Property.objects.all()
    return render(request, 'purchases/shopping.html', data)