from rest_framework.viewsets import ModelViewSet

from todoprojects.models import Project, ToDo
from todoprojects.serializers import ToDoSerializer, ProjectSerializer

class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class ToDoViewSet(ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()