from uuid import uuid4
from rest_framework import serializers
from ..models import User, Role

from ..models import ReferenceToken


class ReferenceTokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReferenceToken
        # fields = ["token", "email", "role", "active"]
        exclude = ["id"] #, "active", "is_used"]
        read_only_field = ["id", "token",  "is_used", "active"]

    def create(self, validated_data):
        """
        Create a new ReferenceToken instance.
        """
        print({'validated_data':validated_data})
        # email = validated_data.get("email")
        # role = validated_data.get("role")

        # Generate a unique token
        validated_data["token"] = uuid4()
        # validated_data["active"] = True

        # Create a new ReferenceToken instance
        refrence_token = ReferenceToken.objects.create(**validated_data)
        return refrence_token

    def validate_role(self, value):
        if not value or not isinstance(value, Role):
            raise serializers.ValidationError({"message": "Invalid role."})
        return value
    
    def validate_email(self, value):
        if not value or ReferenceToken.objects.filter(email=value).exists() or User.objects.filter(email=value).exists():
            raise serializers.ValidationError({"message": "Invalid email or email already used"})
        return value
    
