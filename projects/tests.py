from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer

from todousers.models import TodoUser
from .views import ProjectViewSet, TodoViewSet
from .models import Project, Todo


class ProjectTodoViewSetTest(TestCase):
    def setUp(self):
        self.project_url = '/api/projects/'
        self.todo_url = '/api/todo/'
        self.format = 'json'
        self.username = 'admin'
        self.email = 'admin@email.local'
        self.password = 'q1w2e3rty'
        self.admin = TodoUser.objects.create_superuser(username=self.username, email=self.email, password=self.password)

        self.project_dict = {
            'name': 'test_project',
            'repo': '/test/test/',
        }

        self.project = Project.objects.create(**self.project_dict)
        self.project.users.set([self.admin])
        self.todo_dict = {
            'project': self.project,
            'user': self.admin,
            'body': 'это просто тест',
        }
        self.todo = Todo.objects.create(**self.todo_dict)

    # def test_get_todo_list(self):
    #     client = APIClient()
    #     print(self.todo.id)
    #     print(f'{self.todo_url}{self.todo.id}/')
    #     response = client.get('api/todo/0/')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_project_detail(self):
        pass

    def test_project_list(self):
        pass

    def test_todo_detail(self):
        pass

    def tearDown(self):
        pass