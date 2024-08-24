from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, email, firstname, lastname, country, phone_number, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            firstname=firstname,
            lastname=lastname,
            country=country,
            phone_number=phone_number,
            **extra_fields
        )
        print('Creating user:', user.email)
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    address = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)  # Updated default to True
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'lastname', 'phone_number']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    class Meta:
        db_table = 'Customer'



# class Preference(models.Model):
#     user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
#     class category(models.TextChoices):
#         KIDS = 'k', _('For Kids')
#         INFANTS = 'i', _('For Infants')
#         ADULTS = 'a', _('For Adults')
#     category = models.CharField(
#         max_length=1,
#         choices=category.choices,    
#     )
    
#     class Meta:
#         db_table = 'Preference'
    

class Products(models.Model):
    
    class category(models.TextChoices):
        KIDS = 'k', _('For Kids')
        INFANTS = 'i', _('For Infants')
        ADULTS = 'a', _('For Adults')
    category = models.CharField(
        max_length=1,
        choices=category.choices,    
    )
    price = models.IntegerField()
    product_name = models.CharField(max_length=100)
    desc = models.CharField(max_length=500)
    image = models.ImageField(upload_to="shop/images", null=True)
    pub_date = models.DateField(null=True)
    order_count = models.IntegerField(default=0)
    size = models.CharField(max_length=500)
    is_delete = models.BooleanField(default=False)
    
    def __str__(self):
        # id = str(self.id)
        # return id + self.product_name
        return self.product_name + "-----" + str(self.order_count)
    
    def is_upperclass(self):
        return self.category in {
            self.category.DECOR,
            self.category.FOOD,
        }
    
    class Meta:
        db_table = 'Products'

class Customization(models.Model):
    product = models.OneToOneField(Products, on_delete=models.CASCADE)
    color = models.CharField(max_length=1, choices=[
        ('b', _('Black')),
        ('w', _('White')),
        ('s', _('Blue')),
    ])
    fabric = models.CharField(max_length=1, choices=[
        ('c', _('Cotton')),
        ('s', _('Silk')),
        ('g', _('Georgette')),
    ])
    embroidery = models.CharField(max_length=1, choices=[
        ('y', _('Yes')),
        ('n', _('No')),
    ])
    size = models.CharField(max_length=50)

    class Meta:
        db_table = 'Customization'

    def __str__(self):
        return f"{self.product.product_name} - {self.color}, {self.fabric}, {self.embroidery}, Size: {self.size}"



class Orders(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    items_json = models.CharField(max_length=1000)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    company_name = models.CharField(max_length=250, blank=True, null=True)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)
    status = models.CharField(max_length=50, choices=[
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Dispatched', 'Dispatched'),
        ('In Transit', 'In Transit'),
        ('Delivered', 'Delivered'),
        ('Canceled', 'Canceled'),
    ], default='Pending')
    tracking_number = models.CharField(max_length=50, blank=True, null=True)
    assigned_tailor = models.CharField(max_length=100, blank=True, null=True)
    delivery_status = models.CharField(max_length=50, choices=[
        ('In Transit', 'In Transit'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
    ], default='In Transit')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Orders'

    def __str__(self):
        return f"Order {self.id} - {self.status}"
