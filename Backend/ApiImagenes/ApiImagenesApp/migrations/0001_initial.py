# Generated by Django 4.1 on 2022-08-25 01:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Persona',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=60)),
                ('identificacion', models.BigIntegerField()),
                ('email', models.EmailField(max_length=254)),
                ('telefono', models.BigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Marco',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=60)),
                ('fecha', models.DateField(auto_now=True)),
                ('evento', models.CharField(max_length=60)),
                ('imagen', models.ImageField(upload_to='./marcos')),
                ('personaID', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='ApiImagenesApp.marco')),
            ],
        ),
    ]
