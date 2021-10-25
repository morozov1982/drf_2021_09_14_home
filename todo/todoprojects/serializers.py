from rest_framework.serializers import ModelSerializer

from .models import Project, ToDo
from users.serializers import TodoUserSerializer


class ToDoSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = ['id', 'title', 'description', 'project', 'user', 'is_active', 'is_closed', 'created_at', 'updated_at']


class ProjectSerializer(ModelSerializer):
    # users = TodoUserSerializer(many=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'repo_link', 'users', 'created_at', 'updated_at']


class HiddenSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = []
