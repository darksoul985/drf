from django.core.management.base import BaseCommand
from projects.models import Project, Todo
from todousers.models import TodoUser
from django.conf import settings
import json
import os


class Command(BaseCommand):
    help = 'автоматическое создания суперпользователя и нескольких тестовых пользователей'

    @staticmethod
    def _load_data_from_file(file_name):
        try:
            with open(os.path.join(settings.BASE_DIR, 'todousers/management/commands/json', file_name), 'r') as file:
                return json.load(file)
        except:
            raise ValueError(f'Файл не найден {os.path.join(settings.BASE_DIR, "todousers/management/commands/json", file_name)}')

    def handle(self, *args, **options):
        fake_project = self._load_data_from_file('fakeproject.json')
        Todo.objects.all().delete()
        Project.objects.all().delete()

        for project in fake_project:
            _users = []
            for user in project['users']:
                _user = TodoUser.objects.filter(email__icontains=user).first()
                _users.append(_user.id)

            proj = Project.objects.create(
                name=project['name'],
                repo=project['repo'],
                # users=_users
            )
            proj.users.set(_users)

        fake_todo = self._load_data_from_file('faketodo.json')
        for todo in fake_todo:
            # print(todo.get('project'))
            _project = Project.objects.filter(name__icontains=todo.get('project')).first()
            _user = TodoUser.objects.filter(email__icontains=todo.get('user')).first()
            todo['project'] = _project
            todo['user'] = _user
            Todo.objects.create(**todo)
