from django.contrib import admin
from .models import Persona, Marco, Registro, Evento

# Register your models here.
admin.site.register(Persona)
admin.site.register(Evento)
admin.site.register(Marco)
admin.site.register(Registro)