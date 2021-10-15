import graphene
from graphene_django import DjangoObjectType

from todoprojects.models import Project, ToDo
from users.models import TodoUser


class TodoUserType(DjangoObjectType):
    class Meta:
        model = TodoUser
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(TodoUserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(ToDoType)

    user_by_id = graphene.Field(TodoUserType, id=graphene.Int(required=True))
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    todo_by_id = graphene.Field(ToDoType, id=graphene.Int(required=True))

    def resolve_all_users(self, info):
        return TodoUser.objects.all()

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_all_todos(self, info):
        return ToDo.objects.all()

    def resolve_user_by_id(self, info, id):
        try:
            return TodoUser.objects.get(pk=id)
        except TodoUser.DoesNotExist:
            return None

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(pk=id)
        except Project.DoesNotExist:
            return None

    def resolve_todo_by_id(self, info, id):
        try:
            return ToDo.objects.get(pk=id)
        except ToDo.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)
