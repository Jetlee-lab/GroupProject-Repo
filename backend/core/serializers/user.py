from rest_framework import serializers
from ..models import User, Role, Staff, Student
from .common import DynamicFieldsModelSerializer


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name', 'description']
        read_only_field = ["id"]

class RoleListingField(serializers.RelatedField):
    def get_queryset(self, *args, **kwargs):
        return Role.objects.all()

    def to_representation(self, instance, *args, **kwargs):
        return {
            "id": instance.id,
            "name": instance.name,
        }

class UserSerializer(serializers.ModelSerializer):
    # roles = RoleListingField(many=True) #, read_only=True)
    roles = RoleSerializer(many=True)

    class Meta:
        model = User
        exclude = ['password']
        read_only_field = ["id"]


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'
        read_only_field = ["id"]
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if 'permissions' in data:
            data['permissions'] = [permission['name'] for permission in data['permissions']]
        # return {
        #     "id": data['id'],
        # }
        return data | {
            "display": Role.ROLE_CHOICES[data['name']],
        }

class StaffSerializer(DynamicFieldsModelSerializer, UserSerializer):
    class Meta(UserSerializer.Meta):
        model = Staff
        # exclude = ['password']
        # read_only_field = ["id"]

class StudentSerializer(DynamicFieldsModelSerializer, UserSerializer):
    class Meta(UserSerializer.Meta):
        model = Student
        # exclude = ['password']
        # read_only_field = ["id"]

