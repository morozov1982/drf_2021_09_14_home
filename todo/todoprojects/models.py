from django.db import models

from users.models import TodoUser


class Project(models.Model):
    title = models.CharField(max_length=64, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')
    repo_link = models.URLField(blank=True, verbose_name='Ссылка')
    users = models.ManyToManyField(TodoUser, verbose_name='Пользователи')

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    def __str__(self):
        return self.title


class ToDo(models.Model):
    title = models.CharField(max_length=64, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')
    project = models.OneToOneField(Project, on_delete=models.CASCADE, verbose_name='Проект')
    user = models.ForeignKey(TodoUser, on_delete=models.CASCADE, verbose_name='Создал')
    is_active = models.BooleanField(default=True, verbose_name='Статус')
    is_closed = models.BooleanField(default=False, verbose_name='Закрыто')

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    def __str__(self):
        return self.title


