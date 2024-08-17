# Generated by Django 5.0.7 on 2024-08-17 12:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email address')),
                ('firstname', models.CharField(max_length=255)),
                ('lastname', models.CharField(max_length=255)),
                ('country', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255, unique=True)),
                ('phone_number', models.CharField(max_length=15)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('is_active', models.BooleanField(default=False)),
                ('is_admin', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'Customer',
            },
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(choices=[('k', 'For Kids'), ('i', 'For Infants'), ('a', 'For Adults')], max_length=1)),
                ('price', models.IntegerField()),
                ('product_name', models.CharField(max_length=100)),
                ('desc', models.CharField(max_length=500)),
                ('image', models.ImageField(null=True, upload_to='shop/images')),
                ('pub_date', models.DateField(null=True)),
                ('order_count', models.IntegerField(default=0)),
                ('size', models.CharField(max_length=500)),
                ('is_delete', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'Products',
            },
        ),
        migrations.CreateModel(
            name='Orders',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('items_json', models.CharField(max_length=1000)),
                ('surname', models.CharField(max_length=150)),
                ('first_name', models.CharField(max_length=150)),
                ('company_name', models.CharField(max_length=250)),
                ('street', models.CharField(max_length=150)),
                ('municipalities', models.CharField(max_length=150)),
                ('post_code', models.CharField(max_length=150)),
                ('state', models.CharField(max_length=150)),
                ('email', models.EmailField(max_length=100)),
                ('phone_number', models.CharField(max_length=150)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='emiratipublicpage.customuser')),
            ],
            options={
                'db_table': 'Orders',
            },
        ),
        migrations.CreateModel(
            name='Customization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fabric', models.CharField(choices=[('c', 'Cotton'), ('s', 'Silk'), ('g', 'Georgette')], max_length=1)),
                ('color', models.CharField(choices=[('b', 'Black'), ('w', 'White'), ('s', 'Blue')], max_length=1)),
                ('product', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='emiratipublicpage.products')),
            ],
            options={
                'db_table': 'Customization',
            },
        ),
    ]
