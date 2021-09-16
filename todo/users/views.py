from rest_framework.viewsets import ModelViewSet

from .models import TodoUser
from .serializers import TodoUserSerializer

class TodoUserViewSet(ModelViewSet):
    serializer_class = TodoUserSerializer
    queryset = TodoUser.objects.all()
