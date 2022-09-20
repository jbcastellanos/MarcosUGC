from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from ApiImagenesApp import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'eventos', views.EventoViewSet)
router.register(r'registros', views.RegistroViewSet)
router.register(r'marcos', views.MarcoViewSet)
router.register(r'personas', views.PersonaViewSet)

baseUrl = "api/marcos/v1/"

urlpatterns = [
    path(baseUrl + '', include(router.urls)),
    path(baseUrl + 'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path(baseUrl + 'api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(baseUrl + 'api/token/refresh/', jwt_views.TokenRefreshView.as_view()),
    path(baseUrl + 'admin/', admin.site.urls),
]   + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
