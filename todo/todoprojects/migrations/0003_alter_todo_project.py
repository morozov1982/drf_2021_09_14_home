# Generated by Django 3.2.7 on 2021-10-25 11:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todoprojects', '0002_todo_is_closed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todoprojects.project', verbose_name='Проект'),
        ),
    ]
