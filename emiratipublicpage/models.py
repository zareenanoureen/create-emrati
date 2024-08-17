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
    password = models.CharField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=15)
    address = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=False)
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
    class color(models.TextChoices):
        BLACK = 'b', _('Black')
        WHITE = 'w', _('White')
        BLUE = 's', _('Blue')
    color = models.CharField(
        max_length=1,
        choices=color.choices,    
    )
    class fabric(models.TextChoices):
        COTTON = 'c', _('Cotton')
        SILK = 's', _('Silk')
        GEORGETTE = 'g', _('Georgette')
    fabric = models.CharField(
        max_length=1,
        choices=fabric.choices,    
    )
    class embroidery(models.TextChoices):
        YES = 'y', _('Yes')
        NO = 'n', _('No')
    color = models.CharField(
        max_length=1,
        choices=color.choices,    
    )

    class Meta:
        db_table = 'Customization'


class Orders(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    items_json = models.CharField(max_length=1000)
    surname = models.CharField(max_length=150)
    first_name = models.CharField(max_length=150)
    company_name = models.CharField(max_length=250)
    street = models.CharField(max_length=150)
    municipalities = models.CharField(max_length=150)
    post_code = models.CharField(max_length=150)
    state = models.CharField(max_length=150)
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=150)


    class Meta:
        db_table = 'Orders'
