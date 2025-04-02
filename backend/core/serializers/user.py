from ..models import User, Role
from rest_framework import serializers

from ..models import User, Role, Staff, Student


class UserSerializer(serializers.ModelSerializer):
    #date_joined = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        exclude = ['password']
        read_only_field = ["id"]


class RoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Role
        fields = '__all__'
        read_only_field = ["id"]

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        exclude = ['password']
        read_only_field = ["id"]

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        exclude = ['password']
        read_only_field = ["id"]

