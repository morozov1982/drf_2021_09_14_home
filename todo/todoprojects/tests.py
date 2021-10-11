from random import randrange

from rest_framework import status
from rest_framework.test import APIClient, APITestCase, APIRequestFactory, force_authenticate

from users.models import TodoUser
from .models import ToDo
from .views import ProjectViewSet, ToDoViewSet

from mixer.backend.django import mixer


class TodoTestCase(APITestCase):
    def setUp(self):
        self.admin = TodoUser.objects.create_superuser('admin', 'admin@loc.com', '123')
        self.client.login(username='admin', password='123')
        self.factory = APIRequestFactory()

    def test_todo_factory(self):
        view = ToDoViewSet.as_view({'get': 'list'})
        request = self.factory.get('/api/todo/')
        res = view(request)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

        request = self.factory.get('/api/todo/')
        force_authenticate(request, self.admin)
        res = view(request)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_project_factory(self):
        view = ProjectViewSet.as_view({'get': 'list'})
        request = self.factory.get('/api/projects/')
        res = view(request)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

        request = self.factory.get('/api/projects/')
        force_authenticate(request, self.admin)
        res = view(request)
        self.assertEqual(res.status_code, status.HTTP_200_OK)


class TodoUserTestCase(APIClient):
    def setUp(self):
        self.user = TodoUser.objects.create(username='user1', first_name='user', last_name='1', email='user@one.com')
        self.client = APIClient()

    def test_get_users(self):
        response = self.client.get(f'/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_user(self):
        response = self.client.put(f'/api/users/{self.user.id}/',
                                   {'username': 'edited', 'email': 'edited@loc.com', 'password': '12345'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        TodoUser.objects.create_superuser('admin', 'admin@admin.com', '123')
        self.client.login(username='admin', password='123')
        response = self.client.put(f'/api/users/{self.user.id}/',
                                   {'username': 'newuser', 'first_name': 'new', 'last_name': 'user', 'email': 'new@user.com'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = TodoUser.objects.get(id=self.user.id)
        self.assertEqual(user.username, 'newuser')
        self.assertEqual(user.email, 'new@user.com')
        self.client.logout()
        res = self.client.get('/api/users/')
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)


class MixerTestCase(APITestCase):
    def setUp(self):
        self.num_projects = 50
        self.num_todos = 1000
        self.project_users = []
        self.todo_titles = []

    def test_todo_delete(self):
        for _ in range(self.num_todos):
            todo = mixer.blend(ToDo)
            self.todo_titles.append(todo.title)

        todo_to_close = ToDo.objects.get(id=randrange(self.num_todos))
        self.assertEqual(todo_to_close.is_active, True)
        self.assertEqual(todo_to_close.is_closed, False)

        todo_to_close.is_active = False
        todo_to_close.is_closed = True
        self.assertEqual(todo_to_close.is_active, False)
        self.assertEqual(todo_to_close.is_closed, True)
