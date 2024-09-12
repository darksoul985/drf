from django.db import models
from django.contrib.auth.models import AbstractUser


class TodoUser(AbstractUser):
    email = models.EmailField(unique=True, blank=False)

    def __str__(self):
        return f'{self.username}'

    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'