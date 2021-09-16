import os.path
import json

from django.core.management.base import BaseCommand

from users.models import TodoUser

JSON_PATH = os.path.join('users', 'fixtures', 'users.json')

def load_from_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)


class Command(BaseCommand):
    def handle(self, *args, **options):
        if not TodoUser.objects.all().count():
            users_to_add = load_from_json(JSON_PATH)

            for user in users_to_add:
                __fields = user.get('fields')
                if user.get('is_superuser'):
                    TodoUser.objects.create_superuser(**__fields)
                else:
                    TodoUser.objects.create_user(**__fields)
