from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.permissions import DjangoModelPermissions

from .models import TodoUser
from .serializers import TodoUserSerializer


class TodoUserViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    permission_classes = [DjangoModelPermissions]
    serializer_class = TodoUserSerializer
    queryset = TodoUser.objects.all()
