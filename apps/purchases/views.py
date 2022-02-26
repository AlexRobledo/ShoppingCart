from django.shortcuts import render
from apps.purchases.models import *
from apps.purchases import functions
import os

# Create your views here.

def Shopping(request):
    """ Vista del carrito de compras con el catálogo de propiedades """
    data = {}   # Diccionario donde se encuentra toda la información para la construcción de la vista
    data['properties'] = Property.objects.all()     # Los objetos del modelo 'Propiedades' están listos para su serialización
    return render(request, 'purchases/shopping.html', data)