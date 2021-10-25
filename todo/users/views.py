from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.permissions import DjangoModelPermissions

from .models import TodoUser
from .serializers import TodoUserSerializer, TodoUserSerializerV2


class TodoUserViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    # permission_classes = [DjangoModelPermissions]
    # serializer_class = TodoUserSerializer
    queryset = TodoUser.objects.all()

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return TodoUserSerializerV2
        return TodoUserSerializer
