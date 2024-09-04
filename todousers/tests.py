import json
from django.test import TestCase
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from .views import TodoUsersViewSet
from .models import TodoUser
from rest_framework.authtoken.models import Token


class TestTodoUserViewSet(TestCase):
    def setUp(self) -> None:
        """
        Первоначальные настройки
        """
        self.url = '/api/users/'
        self.format = 'json'
        self.user_dict = {
            'username': 'userTest',
            'password': '123'
        }
        self.username = 'admin'
        self.email = 'admin@email.local'
        self.password = 'q1w2e3rty'
        self.admin = TodoUser.objects.create_superuser(username=self.username, email=self.email, password=self.password)
        self.user = TodoUser.objects.create_user(**self.user_dict)
        self.factory = APIRequestFactory()

    def test_get_user_list(self):
        """
        Тест получения списка пользователей
        """
        # factory = APIRequestFactory()
        request = self.factory.get(self.url)
        view = TodoUsersViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user_guest(self):
        """
        Тест создание пользователя не авторизованным пользователем
        """
        factory = APIRequestFactory()
        request = factory.post(self.url, self.user_dict, format=self.format)
        view = TodoUsersViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # TODO Здесь надо доделать тест в связи с аутенитфикацией по JWT
    def test_get_token_jwt(self):
        """Тест создания и получения jwt токена"""
        # self.jwt_auth(self.admin)
        url_get_token = '/api/token/'
        response = self.client.post(url_get_token, {"username": self.username, "password": self.password}, format=self.format)
        token = response.data['access']
        self.assertIsNot(token, None)

    def test_valid_login_jwt_token(self):
        """Тест аутентификации"""
        url_authenticated = '/api-token-auth/'
        response = self.client.post(url_authenticated, self.user_dict)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_user_detail(self):
        """Получение информации о user"""
        client = APIClient()
        response = client.get(f'{self.url}{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_user_update_quest(self):
        """Изменение информации о user неавторизованным пользователем"""
        client = APIClient()
        response = client.put(f'{self.url}{self.user.id}/', {'username': 'fake'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_api_user_update_admin(self):
        """Изменение информации о user админом"""
        client = APIClient()
        client.force_authenticate(self.admin)
        response = client.put(f'{self.url}{self.user.id}/', {'username': 'fake'}, format=self.format)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, 'fake')
        client.logout()


    # def test_api_admin_create(self):
        """Создание пользователя админом"""
        # token = Token.object.get(user__username=self.username)
        # client = APIClient()
        # client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        # client = APIClient()
        # auth_token = client.post('/api/token/',
        #                          {"username": self.username, "password": self.password},
        #                          format=self.format)
        # token = auth_token.data['access']
        # client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        # fake_user = TodoUser.objects.create_user(username='fakeUser', password='fakeUser', email='fake@localhost')
        # response = client.put(f'{self.url}', **fake_user)
        # self.assertEqual(response.status_code, status.HTTP_200_OK)


    def tearDown(self) -> None:
        pass

        # testuser_dict = {
        #     'username': 'testuser',
        #     'password': 'testpassword'
        # }
        # api_client = APIClient()
        # api_client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        # request = api_client.post(self.url, testuser_dict, format=self.format)
        # force_authenticate(request, user=self.username, token=token)
        # view = TodoUsersViewSet.as_view({'post': 'create'})
        # response = view(request)
        # self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # auth_token = client.post('/api/token/', {"username": self.username, "password": self.password}, format=self.format)
    # token = auth_token.data['access']
    # client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

