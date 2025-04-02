from uuid import uuid4
from rest_framework import serializers
from ..models import User, Role

from ..models import RefrenceToken


class RefrenceTokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = RefrenceToken
        # fields = ["token", "email", "role", "active"]
        exclude = ["id"] #, "active", "is_used"]
        read_only_field = ["id", "token",  "is_used", "active"]

    def create(self, validated_data):
        """
        Create a new RefrenceToken instance.
        """
        # email = validated_data.get("email")
        # role = validated_data.get("role")

        # Generate a unique token
        validated_data["token"] = uuid4()
        # validated_data["active"] = True

        # Create a new RefrenceToken instance
        refrence_token = RefrenceToken.objects.create(**validated_data)
        return refrence_token

    def validate_role(self, value):
        if not value or not isinstance(value, Role):
            raise serializers.ValidationError({"message": "Invalid role."})
        return value
    
    def validate_email(self, value):
        if not value or RefrenceToken.objects.filter(email=value).exists() or User.objects.filter(email=value).exists():
            raise serializers.ValidationError({"message": "Invalid email or email already used"})
        return value
    