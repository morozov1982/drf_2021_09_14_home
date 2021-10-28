from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.permissions import AllowAny

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from graphene_django.views import GraphQLView

from users.views import TodoUserViewSet
from todoprojects.views import ProjectViewSet, ToDoViewSet

router = DefaultRouter()
router.register('users', TodoUserViewSet, basename='users')
router.register('projects', ProjectViewSet, basename='projects')
router.register('todo', ToDoViewSet, basename='todo')

schema_view = get_schema_view(
    openapi.Info(
        title='ToDo',
        default_version='v1',
        description='А вы думали тут будет подробное описание?',
    ),
    public=True,
    permission_classes=[AllowAny]
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('api/', include(router.urls)),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui()),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('graphql/', GraphQLView.as_view(graphiql=True)),
    path('', TemplateView.as_view(template_name='index.html')),
]
