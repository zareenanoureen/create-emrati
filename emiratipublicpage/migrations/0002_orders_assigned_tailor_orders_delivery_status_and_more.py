# Generated by Django 5.0.7 on 2024-08-20 21:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emiratipublicpage', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='assigned_tailor',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='orders',
            name='delivery_status',
            field=models.CharField(choices=[('In Transit', 'In Transit'), ('Shipped', 'Shipped'), ('Delivered', 'Delivered')], default='In Transit', max_length=50),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='password',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='orders',
            name='status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Processing', 'Processing'), ('Dispatched', 'Dispatched'), ('In Transit', 'In Transit'), ('Delivered', 'Delivered'), ('Canceled', 'Canceled')], default='Pending', max_length=50),
        ),
    ]
