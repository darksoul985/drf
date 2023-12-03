from django.core.management.base import BaseCommand, CommandError
from todousers.models import TodoUser
from django.conf import settings
import json


class Command(BaseCommand):
    help = 'автоматическое создания суперпользователя и нескольких тестовых пользователей'

    @staticmethod
    def _load_data_from_file(file_name):
        try:
            with open(f'{settings.BASE_DIR}/todousers/management/commands/json/{file_name}.json', 'r') as file:
                return json.load(file)
            
        except:
            raise ValueError(f'Файл {file_name}.json не найден по адресу: {settings.BASE_DIR}/todousers/management/commands/json/')


    def handle(self, *args, **options):

        fake_users = self._load_data_from_file('faceusers')

        TodoUser.objects.all().delete()
        for i in fake_users:
            TodoUser.objects.create_user(
                username=i['username'],
                first_name=i['first_name'],
                last_name=i['last_name'],
                email=i['email'],
                password='qwerty1',
            )

        TodoUser.objects.create()

        TodoUser.objects.create_superuser(
            username='soul',
            first_name='serg',
            last_name='sh',
            email='sh@local.gb',
            password='qwerty1'
        )
