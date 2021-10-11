from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from users.views import TodoUserViewSet
from todoprojects.views import ProjectViewSet, ToDoViewSet

router = DefaultRouter()
router.register('users', TodoUserViewSet, basename='users')
router.register('projects', ProjectViewSet, basename='projects')
router.register('todo', ToDoViewSet, basename='todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('api/', include(router.urls)),
]
