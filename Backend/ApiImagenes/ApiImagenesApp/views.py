# from django.shortcuts import render
import re
from django.contrib.auth.models import User, Group
from .models import Persona, Marco
from rest_framework import viewsets, permissions, filters
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from ApiImagenesApp.serializers import UserSerializer, GroupSerializer, MarcoSerializer, MarcoSerializerCreate, PersonaSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer
    permission_classes = [permissions.IsAuthenticated]


class MarcoViewSet(viewsets.ModelViewSet):
    queryset = Marco.objects.all()
    serializer_class = MarcoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['nombre', 'persona__id', 'persona__nombre', 'evento', 'fecha']
    search_fields = ['nombre', 'persona__id', 'persona__nombre', 'evento', 'fecha']
    ordering_fields = ['nombre', 'persona__id', 'persona__nombre', 'evento', 'fecha']
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        # request.data.persona = 1
        # print(request.data)
        return super().create(request)
    
    def perform_create(self, serializer):
        persona = Persona.objects.get(user=self.request.user)
        serializer.save(persona=persona)

    # def get_serializer_class(self):
    #     if self.action == 'create':
    #         return MarcoSerializerCreate
        
    #     return MarcoSerializer
