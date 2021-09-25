from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import TodoUserViewSet
from todoprojects.views import ProjectViewSet, ToDoViewSet

router = DefaultRouter()
router.register('users', TodoUserViewSet)
router.register('projects', ProjectViewSet)
router.register('todo', ToDoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api-auth/', include('rest_framework.urls')),  # пока бессмысленно
    path('api/', include(router.urls)),
]
