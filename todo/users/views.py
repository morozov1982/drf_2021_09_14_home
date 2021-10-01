from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin

from .models import TodoUser
from .serializers import TodoUserSerializer


class TodoUserViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    serializer_class = TodoUserSerializer
    queryset = TodoUser.objects.all()
