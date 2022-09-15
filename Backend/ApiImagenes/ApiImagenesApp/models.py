from distutils.command.upload import upload
from tabnanny import verbose
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
import email
from pyexpat import model
from statistics import mode
from django.db import models

# Create your models here.
class Persona(models.Model):
    nombre = models.CharField(max_length=60, blank=False, null=False)
    identificacion = models.BigIntegerField(blank=False, null=False)
    email = models.EmailField(max_length=254, blank=False, null=False)
    telefono = models.BigIntegerField(blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)

    class Meta:
        verbose_name = ("Persona")
        verbose_name_plural = ("Personas")

    def __str__(self):
        return str(self.nombre)

class Marco(models.Model):
    def validate_image(fieldfile_obj):
        filesize = fieldfile_obj.file.size
        megabyte_limit = 5.0
        if filesize > megabyte_limit*430*430:
            raise ValidationError("Max resolution size is %s" % str("400x400"))


    nombre = models.CharField(max_length=60, blank=False, null=False)
    fecha = models.DateField(auto_now=True, blank=False, null=False)
    evento = models.CharField(max_length=60, blank=False, null=False)
    persona = models.ForeignKey('Persona', on_delete=models.SET_NULL, blank=False, null=True)
    imagen = models.ImageField(upload_to='./marcos', blank=False, null=False, validators=[validate_image])


    class Meta:
        verbose_name = ("Marco")
        verbose_name_plural = ("Marcos")

    def __str__(self):
        return str(self.nombre)


    