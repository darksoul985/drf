from django.core.management.base import BaseCommand, CommandError
from todousers.models import TodoUser


class Command(BaseCommand):
    help = 'автоматическое создания суперпользователя и нескольких тестовых пользователей'

    def handle(self, *args, **options):
        fake_users = [
            {'username': 'писатель', 'first_name': 'Александр', 'last_name': 'Пушкин', 'email': 'p@local.gb'},
            {'username': 'герой', 'first_name': 'Родион', 'last_name': 'Раскольников', 'email': 'r@local.gb'},
            {'username': 'другой', 'first_name': 'Сэм', 'last_name': 'Серьезный', 'email': 'sam@local.gb'},
        ]

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