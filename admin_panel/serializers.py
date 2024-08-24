from rest_framework import serializers
from emiratipublicpage.models import CustomUser, Products, Orders, Customization

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    customizations = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Orders
        fields = '__all__'

class CustomizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customization
        fields = '__all__'
