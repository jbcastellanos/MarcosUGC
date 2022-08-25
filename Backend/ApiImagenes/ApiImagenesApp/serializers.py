from dataclasses import field
from statistics import mode
from django.contrib.auth.models import User, Group
from .models import Persona, Marco
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name',]


class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        # fields = ['id', 'persona', 'personaID', 'nombre', 'evento', 'imagen']
        fields = '__all__'
        

class MarcoSerializer(serializers.ModelSerializer):

    # personaNombre = serializers.CharField(source='personaID.nombre', read_only=True)


    # persona_nombre = serializers.SerializerMethodField()
    # def get_persona_nombre(self, obj):
    #     return obj.personaID


    # class PersonaSerializer(serializers.ModelSerializer):
    #     class Meta:
    #         model = Persona
    #         fields = ['id', 'nombre']
    #         # fields = '__all__'

    persona = PersonaSerializer(many=False, read_only=True)
    persona.Meta.fields = ['nombre']
    
    fecha = serializers.DateField(read_only=True)

    class Meta:
        model = Marco
        fields = ['id', 'persona', 'nombre', 'fecha', 'evento', 'imagen']
        # fields = '__all__'

