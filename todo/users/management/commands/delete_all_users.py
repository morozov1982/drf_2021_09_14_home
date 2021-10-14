from django.core.management.base import BaseCommand

from users.models import TodoUser


class Command(BaseCommand):
    def handle(self, *args, **options):
        TodoUser.objects.all().delete()
