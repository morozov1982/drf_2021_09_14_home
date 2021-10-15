from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import HiddenField
from .models import TodoUser


class TodoUserSerializer(ModelSerializer):
    class Meta:
        model = TodoUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class TodoUserSerializerV2(ModelSerializer):
    class Meta:
        model = TodoUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff']
