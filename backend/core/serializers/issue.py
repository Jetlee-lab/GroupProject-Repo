from django.db import transaction
from django.core.serializers.json import DjangoJSONEncoder
from django.utils import timezone
import json
from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from .common import DynamicFieldsModelSerializer
from ..models import Issue, IssueLog, Category, Attachment, Issue, Role
from ..utils.io import send_email

# from django.core.serializers import serialize

# class CategoriesListingField(serializers.RelatedField):
#     # def get_queryset(self, *args, **kwargs):
#     #     return Category.objects.all()

#     def to_representation(self, instance, *args, **kwargs):
#         return {
#             "id": instance.id,
#             "name": instance.name,
#         }
class AttachmentSerializer(DynamicFieldsModelSerializer):

    class Meta:
        model = Attachment
        fields = '__all__'
        # exclude = ['id']
        read_only_fields = ['issue', 'name', 'size', 'type']


class IssueSerializer(serializers.ModelSerializer):
    # categories = CategoriesListingField(many=True) #, read_only=True)
    attachments = AttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = Issue
        fields = '__all__'
        read_only_fields = ["id", 'reference_no', 'updated_at', 'created_at']
        # extra_fields = {'rank':{'write_only':True}}
    
    @transaction.atomic
    def create(self, validated_data):
        print("---------------------creating issue---------------------", {"vd": validated_data})
        print({"validated_data":validated_data, "context":self.context})
        categories = validated_data.pop('categories', None)

        issue = Issue.objects.create(**validated_data)

        if categories is not None:
            issue.categories.set(categories)
        
        for attachment in self.context['request'].FILES.getlist('attachments'):
            Attachment.objects.create(
                issue=issue,
                file=attachment,
                name=attachment.name,
                size=attachment.size,
                type=attachment.content_type,
            )

        return issue

    def update(self, instance, validated_data):
        print("---------------------updating issue---------------------\n", {"vd": validated_data},"\n\n", {"instance": instance.__dict__})
        log_kwargs = {
            k: json.loads(DjangoJSONEncoder().encode([*getattr(instance, k).values()]))
            if k == 'attachments' else getattr(instance, k)
            for k in ['assignee', 'status', 'priority', 'attachments', 'categories', 'escalation_level']
        }

        if (categories := validated_data.pop('categories', None)) is not None:
            instance.categories.set(categories)

        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.updated_at = timezone.now()
        instance.save()

        actor = self.context['request'].user
        categories = log_kwargs.pop('categories').all()
        print({"log_kwargs": log_kwargs})
        issue_log = IssueLog.objects.create(issue=instance, actor=actor, **log_kwargs)
        issue_log.categories.set(categories)
        issue_log.save()
        
        req_status = validated_data.get("status")
        req_escalation_level = validated_data.get("escalation_level")
        msg = ""

        if req_status and req_status != log_kwargs.get("status"):
            msg += f"Status is now {Issue.STATUS_CHOICES[req_status]}"

        if req_escalation_level and req_escalation_level != log_kwargs.get("escalation_level"):
            msg += f"{" and is e" if msg else "E"}scalated to {Issue.ESCALATION_CHOICES[req_escalation_level]}"

        if msg:
            send_email(
                subject="Issue Update Notification",
                message=f"Hello {instance.owner.username or "there!"}, " \
                    f"We wanted to inform you that there has been an update to your issue: \"{instance.title}\". " \
                    f"{msg}.\nIssue reference: {instance.reference_no}.",
                to=[actor.email],
            )
        return instance

    def validate_owner(self, value):
        # if value and not value.roles.filter(name__in=[Role.ROLE_STUDENT, Role.ROLE_REGISTRAR]).exists():
        if value and not value.roles.filter(name__in=[Role.ROLE_STUDENT, Role.ROLE_REGISTRAR]).exists():
            raise serializers.ValidationError(
                "Only students or registrars can create issues"
            )
        return value

    def validate_assignee(self, value):
        if value and not value.roles.filter(name__in=[Role.ROLE_LECTURER, Role.ROLE_REGISTRAR]).exists():
            raise serializers.ValidationError(
                "Only lecturers or registrars can be assigned to issues"
            )
        return value

    def to_representation(self, instance, *args, **kwargs):
        data = super().to_representation(instance, *args, **kwargs)

        if priority := data.get("priority", None):
            data["priority"] = Issue.PRIORITY_CHOICES[priority]
        
        if status := data.get("status", None):
            data["status"] = Issue.STATUS_CHOICES[status]
        
        if escalation_level := data.get("escalation_level", None):
            data["escalation_level"] = Issue.ESCALATION_CHOICES[escalation_level]

        if categories := data.get("categories", None):
            data["categories"] = Category.objects.filter(id__in=categories).values("id", "name")
            # data["categories"] = list(map(lambda c: Category.objects.values(), categories))
        
        if data.get("owner", None):
            owner = instance.owner
            data['owner'] = {
                k: getattr(owner, k)
                for k in ['id', 'username', 'email']
            }

        if data.get("assignee", None):
            assignee = instance.assignee
            data['assignee'] = {
                k: getattr(assignee, k)
                for k in ['id', 'username', 'email']
            }

        return data


class IssueLogSerializer(DynamicFieldsModelSerializer):

    class Meta:
        model = IssueLog
        fields = '__all__'
        read_only_fields = [
            'issue', 'actor', 'assignee', 'status', 'escalation_level',
            'priority', 'categories', 'attachment', 'created_at'
        ]


class CategorySerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        # exclude = ["id"]
        read_only_fields = ["id"]
    
    # def to_representation(self, instance, *args, **kwargs):
    #     return instance.name

