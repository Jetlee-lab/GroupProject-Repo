from ..models import Issue
from rest_framework import serializers

from ..models import Issue, IssueLog, Attachment

class IssueSerializer(serializers.ModelSerializer):

    class Meta:
        model = Issue
        fields = '__all__'
        read_only_field = ["id"]
        extra_fields = {'rank':{'write_only':True}}

class IssueLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = IssueLog
        fields = '__all__'
        read_only_field = ["file"]

class AttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attachment
        fields = '__all__'
        read_only_field = ["id"]
