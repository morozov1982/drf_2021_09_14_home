# Generated by Django 3.2.7 on 2021-09-28 08:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoprojects', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='is_closed',
            field=models.BooleanField(default=False, verbose_name='Закрыто'),
        ),
    ]
