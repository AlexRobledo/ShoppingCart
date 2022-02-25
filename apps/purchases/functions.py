from django.conf import settings

PROPERTY_PHOTOS = settings.MEDIA_ROOT.replace('..', '') + r"property-photos/"
MEDIA_URL = settings.MEDIA_ROOT.replace('..', '')