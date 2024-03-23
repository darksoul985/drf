from django.db import models
from todo.settings import BASE_DIR
from todousers.models import TodoUser


def project_directory_path(instance):
    return f'{BASE_DIR}/projects_dir/{instance.name}'


class Project(models.Model):
    name = models.CharField(max_length=128, verbose_name='Название проекта', unique=True)
    repo = models.CharField(default=f'{BASE_DIR}/project_storage/', blank=True, max_length=246)
    users = models.ManyToManyField(TodoUser, verbose_name='Участники проекта')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'
        ordering = ('name',)


class Todo(models.Model):
    project = models.ForeignKey(Project, verbose_name='Проект', on_delete=models.CASCADE, related_name='project')
    user = models.ForeignKey(TodoUser, verbose_name='Автор записи', on_delete=models.RESTRICT)
    body = models.TextField(verbose_name='Текст заметки')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    update = models.DateTimeField(auto_now=True, verbose_name='Обновлено')
    is_active = models.BooleanField(default=True, verbose_name='Активно')

    def __str__(self):
        return f'{self.user}'

    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'
        ordering = ('-created',)