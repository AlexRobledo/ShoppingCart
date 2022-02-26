from django.conf import settings
from apps.purchases import models

PROPERTY_PHOTOS = settings.MEDIA_ROOT.replace('..', '') + r"property-photos/"
MEDIA_URL = settings.MEDIA_ROOT.replace('..', '')

def addPropertyBrickPurchase(user, prop):
    """ Función que agrega a la base de datos una compra de ladrillo. Recibe comprador y propiedad (como objeto de js) """
    propertyObject = models.Property.objects.get(id = prop['id'])   # Obtiene la propiedad de la BD a través de su id
    new_purchase = models.BrickPurchase()   # Crea un objeto para representar una transacción
    new_purchase.buyer = user
    new_purchase.property = propertyObject
    new_purchase.quantity = prop['quantity']
    new_purchase.total_price = prop['quantity'] * propertyObject.unit_price
    if propertyObject.available_bricks >= prop['quantity']: # Si la propiedad tiene la cantidad de ladrillos disponible suficiente para realizar la venta
        propertyObject.available_bricks -= prop['quantity']
        return new_purchase, propertyObject
    # Regresa nulo en caso de que no se haya realizado la transacción
    return None 