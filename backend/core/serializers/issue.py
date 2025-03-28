from ..models import Issue, Role
from rest_framework import serializers

from ..models import Issue, IssueLog, Attachment

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'
        read_only_fields = ["id", 'updated_at', 'created_at']
        # extra_fields = {'rank':{'write_only':True}}
    
    def create(self, validated_data):
        attachments = validated_data.pop('attachments', None)
        categories = validated_data.pop('categories', None)

        issue = Issue.objects.create(**validated_data)

        if categories is not None:
            issue.categories.set(categories)
        
        if attachments is not None:
            if not isinstance(attachments, list):
                attachments = [attachments]

            objs = []
            for attachment in attachmets:
                objs.append(
                    Attachment.objects.create(issue=issue, **attachment)
                )
            # issue.attachments.add(*objs)
            issue.attachments.set(objs)
        return issue

    def update(self, instance, validated_data):

        log_kwargs = {
            k: tuple(getattr(instance, k).values()) if k == 'attachments' else getattr(instance, k)
            for k in ['assignee', 'status', 'priority', 'attachments', 'categories', 'escalation_level']
        } 

        if (categories := validated_data.pop('categories', None)) is not None:
            instance.categories.set(categories)

        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()

        actor = self.context['request'].user
        categories = log_kwargs.pop('categories').all()
        issue_log = IssueLog.objects.create(issue=instance, actor=actor, **log_kwargs)
        issue_log.categories.set(categories)
        issue_log.save()

        return instance

    def validate_owner(self, value):
        if value and not value.roles.filter(name=Role.ROLE_STUDENT).exists():
            raise serializers.validationError(
                "Only students can create issues"
            )
        return value

    def validate_assignee(self, value):
        if value and not value.roles.filter(name=Role.ROLE_LECTURER).exists():
            raise serializers.validationError(
                "Only lecturers can be assigned to issues"
            )
        return value


class IssueLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = IssueLog
        fields = '__all__'
        read_only_fields = [
            'issue', 'actor', 'assignee', 'status', 'escalation_level',
            'priority', 'categories', 'attachment', 'created_at'
        ]


class AttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attachment
        fields = '__all__'
        read_only_fields = ['issue', 'name', 'size', 'type']
