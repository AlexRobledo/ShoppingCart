from django.shortcuts import redirect
from django.http import JsonResponse
from apps.purchases import functions
from apps.purchases.models import *
import json

def Checkout(request):
    """ API que realiza el checkout del carrito de compras de un usuario. """
    response_data = {}  # En este diccionario almacenamos toda la respuesta que el servidor enviará
    if not request.user.is_authenticated:   # Si el usuario no está autenticado
        response_data['error'] = "No se ha iniciado sesión. Debe autenticarse para realizar una compra."
        return JsonResponse(response_data)
    if request.method == "POST":    # El método POST de nuestra API guarda una serie de transacciones
        try:
            properties = json.loads(request.POST.get('propertiesList')) # Deserializa el JSON en un objeto de python (Una lista)
            purchases = []  # Lista de transacciones a realizar
            for p in properties:
                purchase = functions.addPropertyBrickPurchase(request.user, p)  # La función devuelve un objeto transacción
                if purchase is None:    # Crea una excepción. Significa que algo ocurrió en la función anterior
                    raise Exception("La cantidad de ladrillos a comprar de la propiedad '" + p['name'] + "' no está disponible.")
                purchases.append(purchase)  # Si todo va bien hasta ahora, agrega la transacción a la lista

            for pur, prop in purchases: # Almacena en BD todas las transacciones que se hayan realizado con éxito
                pur.save()
                prop.save()
            response_data['success'] = "Tu compra se ha registrado con éxito."  # Respuesta de mensaje exitoso
        except Exception as ex: # En caso de algún error inesperado...
            response_data['error'] = "Ha ocurrido un error. Detalles: " + str(ex)
        return JsonResponse(response_data)  # Serializa en JSON la respuesta de la API
    elif request.method == "GET":   # El método GET sólo devuelve una lista con todas las propiedades de la base de datos
        try:
            response_data['properties'] = Property.objects.all()    # Obtiene todos las propiedades de la BD (ya serializadas)
            response_data['success'] = "Se ha devuelto una lista con las propiedades disponibles."
        except Exception as ex:
            response_data['error'] = "Ha ocurrido un error. Detalles " + str(ex)
        return JsonResponse(response_data)
        
    return redirect('../')