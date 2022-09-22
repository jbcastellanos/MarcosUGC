# from django.shortcuts import render
import re
from django.contrib.auth.models import User, Group
from .models import Persona, Marco, Evento, Registro
from rest_framework import viewsets, permissions, filters
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from ApiImagenesApp.serializers import UserSerializer, GroupSerializer, MarcoSerializer, MarcoSerializerCreate, PersonaSerializer, EventoSerializer, RegistroSerializer, RegistroSerializerCreate
from ApiImagenesApp.pagination import StandardResultsSetPagination



# permission_classes
class IsCreateOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if (request.method in ["POST"]):
            return True
        try:
            if(request.user and request.user.is_authenticated()):
                return True
        except :
            pass
        return False 


class EventoViewSet(viewsets.ModelViewSet):
    queryset = Evento.objects.all().order_by('-id')
    serializer_class = EventoSerializer
    pagination_class = StandardResultsSetPagination
    ordering_fields = ['id','nombre']
    permission_classes = [permissions.IsAuthenticated]



class RegistroViewSet(viewsets.ModelViewSet):
    queryset = Registro.objects.all().order_by('-id')
    serializer_class = RegistroSerializerCreate
    pagination_class = StandardResultsSetPagination
    ordering_fields = ['id','nombre']
    permission_classes = [permissions.IsAuthenticated | IsCreateOnly]


    def get_serializer_class(self):
        if self.action == 'create':
            return RegistroSerializerCreate
        
        return RegistroSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    pagination_class= StandardResultsSetPagination
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    pagination_class= StandardResultsSetPagination
    permission_classes = [permissions.IsAuthenticated]


class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer
    pagination_class= StandardResultsSetPagination
    permission_classes = [permissions.IsAuthenticated]


class MarcoViewSet(viewsets.ModelViewSet):
    queryset = Marco.objects.all()
    # serializer_class = MarcoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['nombre', 'persona__id', 'persona__nombre', 'evento', 'fecha']
    search_fields = ['nombre', 'persona__id', 'persona__nombre', 'evento', 'fecha']
    ordering_fields = ['id','nombre', 'persona__id', 'persona__nombre', 'evento', 'fecha']
    parser_classes = (MultiPartParser, FormParser)
    pagination_class= StandardResultsSetPagination
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        # request.data.persona = 1
        # print(request.data)
        return super().create(request)
    
    def perform_create(self, serializer):
        persona = Persona.objects.get(user=self.request.user)
        serializer.save(persona=persona)

    def get_serializer_class(self):
        if self.action == 'create':
            return MarcoSerializerCreate
        
        return MarcoSerializer
