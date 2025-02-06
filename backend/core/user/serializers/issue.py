from ..models import Issue
from rest_framework import serializers

from ..models import User

class IssueSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
        read_only_field = ["id"]
