# from django.shortcuts import render
from django.contrib.auth.models import User, Group
from .models import Persona, Marco
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser
from ApiImagenesApp.serializers import UserSerializer, GroupSerializer, MarcoSerializer, PersonaSerializer

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
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]