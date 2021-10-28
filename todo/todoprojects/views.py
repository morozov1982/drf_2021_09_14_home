from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import DjangoModelPermissions

from todoprojects.models import Project, ToDo
from todoprojects.serializers import ToDoSerializer, ProjectSerializer
from todoprojects.filters import ProjectFilter


# class ProjectLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 10


# class ToDoLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 20


class ProjectViewSet(ModelViewSet):
    # permission_classes = [DjangoModelPermissions]
    serializer_class = ProjectSerializer
    # pagination_class = ProjectLimitOffsetPagination
    # filterset_fields = ['title']  # решил до кучи добавить и его
    filterset_class = ProjectFilter

    def get_queryset(self):
        if 'tc' in self.request.query_params:
            return Project.objects.filter(
                title__icontains=self.request.query_params['tc']
            )  # с кириллицей регистрозависимо
        return Project.objects.all()


class ToDoViewSet(ModelViewSet):
    # permission_classes = [DjangoModelPermissions]
    serializer_class = ToDoSerializer
    # pagination_class = ToDoLimitOffsetPagination
    # filterset_fields = ['project']  # решил до кучи добавить и его

    def get_queryset(self):
        if 'proj' in self.request.query_params:
            return ToDo.objects.filter(
                project__title__icontains=self.request.query_params['proj']
            )  # с кириллицей регистрозависимо
        return ToDo.objects.all()

    def destroy(self, request, pk):
        todo_item = get_object_or_404(ToDo, pk=pk)
        serializer = ToDoSerializer(todo_item)
        todo_item.is_active = False
        todo_item.is_closed = True
        todo_item.save()
        return Response(serializer.data)
