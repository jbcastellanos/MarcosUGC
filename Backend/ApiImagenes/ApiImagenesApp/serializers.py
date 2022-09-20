from dataclasses import field
from re import T
from statistics import mode
from django.contrib.auth.models import User, Group
from django.core.files import File
from drf_extra_fields.fields import Base64ImageField
from .models import Persona, Marco, Evento, Registro
from rest_framework import serializers


class DynamicFieldSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name',]


class PersonaSerializer(DynamicFieldSerializer):

    class Meta:
        model = Persona
        # fields = ['id', 'persona', 'personaID', 'nombre', 'evento', 'imagen']
        fields = '__all__'




class EventoSerializer(DynamicFieldSerializer):
    class Meta:
        model = Evento
        fields = '__all__'





class RegistroSerializerCreate(DynamicFieldSerializer):
    class Meta:
        model = Registro
        fields = '__all__'



class MarcoSerializer(DynamicFieldSerializer):

    # personaNombre = serializers.CharField(source='personaID.nombre', read_only=True)


    # persona_nombre = serializers.SerializerMethodField()
    # def get_persona_nombre(self, obj):
    #     return obj.personaID


    # class PersonaSerializer(serializers.ModelSerializer):
    #     class Meta:
    #         model = Persona
    #         fields = ['id', 'nombre']
    #         # fields = '__all__'

    persona = PersonaSerializer(many=False, read_only=True, fields=["id", "nombre"])
    # persona.Meta.fields = ['nombre']

    evento = EventoSerializer(many=False, read_only=True, fields=["id", "nombre"])
    
    fecha = serializers.DateField(read_only=True)
    imagen = Base64ImageField(represent_in_base64=True)

    class Meta:
        model = Marco
        fields = ['id', 'persona', 'nombre', 'fecha', 'evento', 'imagen']
        # fields = '__all__'

    # def get_imagen2(self, obj):
    #     f = open(obj.imagen.path, 'rb')
    #     image = File(f)
    #     data = base64.b64encode(image.read())
    #     f.close()
    #     return data
    

class RegistroSerializer(DynamicFieldSerializer):

    marco = MarcoSerializer(many=False, read_only=True, fields=["id", "nombre", "evento", "fecha"])
    fecha = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Registro
        fields = '__all__'

class MarcoSerializerCreate(serializers.ModelSerializer):
    
    fecha = serializers.DateField(read_only=True)

    class Meta:
        model = Marco
        fields = ['id', 'persona', 'nombre', 'fecha', 'evento', 'imagen']
        # fields = '__all__'




