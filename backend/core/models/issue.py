from django.db import models
# from collections import namedtuple

from .user import User, Staff, Student


class Category(models.Model):
    name = models.CharField(unique=True, max_length=32)
    description = models.CharField(max_length=256, blank=False)


class Issue(models.Model):

    STATUS_OPEN = 1
    STATUS_REVIEW = 2
    STATUS_ESCALATED = 4
    STATUS_RESOLVED = 8
    STATUS_CLOSED = 16
    STATUS_CHOICES = {
        STATUS_OPEN: 'Open',
        STATUS_REVIEW: 'In Review',
        STATUS_ESCALATED: 'Escalated',
        STATUS_RESOLVED: 'Resolved',
        STATUS_CLOSED: 'Closed',
    }

    PRIOTITY_LOW = 1
    PRIOTITY_MODERATE = 2
    PRIOTITY_HIGH = 4
    PRIOTITY_CRITICAL = 8
    PRIORITY_CHOICES = {
        PRIOTITY_LOW: 'Low',
        PRIOTITY_MODERATE: 'Moderate',
        PRIOTITY_HIGH: 'High',
        PRIOTITY_CRITICAL: 'Critical',
    }

    ESCALATION_L0 = 1
    ESCALATION_L1 = 2
    ESCALATION_L2 = 4
    ESCALATION_CHOICES = {
        ESCALATION_L0: 'Level 0',
        ESCALATION_L1: 'Level 1',
        ESCALATION_L2: 'Level 2',
    }

    owner = models.ForeignKey(Student, related_name='issues', on_delete=models.CASCADE)
    assignee = models.ForeignKey(Staff,
        related_name='assingned_issues', null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=128, blank=False)
    description = models.CharField(max_length=256, null=True, blank=False, default='')
    categories = models.ManyToManyField(Category, blank=False)
    status = models.PositiveSmallIntegerField(
        choices=STATUS_CHOICES, default=STATUS_OPEN
    )
    priority = models.PositiveSmallIntegerField(
        choices=PRIORITY_CHOICES, default=PRIOTITY_LOW
    )
    escalation_level = models.PositiveSmallIntegerField(
        choices=ESCALATION_CHOICES, default=ESCALATION_L0
    )
    notes = models.TextField(max_length=4096, null=True, blank=False, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return "%s" % self.title

    class Meta:
        ordering = ('-created_at', )


class Attachment(models.Model):
    file = models.UUIDField(primary_key=True)
    issue = models.ForeignKey(Issue, related_name='attachments', on_delete=models.CASCADE) 
    name = models.CharField(max_length=256, blank=False)
    size = models.PositiveBigIntegerField()
    type = models.CharField(max_length=128, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def delete(self, *args, **kwargs):
        # TODO: Delete coresponding file
        super().delete(*args, **kwargs)


class IssueLog(models.Model):
    issue = models.ForeignKey(Issue, related_name='logs', null=True, on_delete=models.SET_NULL)
    assignee = models.ForeignKey(Staff,
        related_name='+', null=True, on_delete=models.CASCADE
    )
    actor = models.ForeignKey(User,
        related_name='+', on_delete=models.CASCADE
    )
    categories = models.ManyToManyField(Category, related_name='+', blank=False)
    status = models.PositiveSmallIntegerField(
        choices=Issue.STATUS_CHOICES, default=Issue.STATUS_OPEN
    )
    priority = models.PositiveSmallIntegerField(
        choices=Issue.PRIORITY_CHOICES, default=Issue.PRIOTITY_LOW
    )
    escalation_level = models.PositiveSmallIntegerField(
        choices=Issue.ESCALATION_CHOICES, default=Issue.ESCALATION_L0
    )
    attachment = models.UUIDField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
