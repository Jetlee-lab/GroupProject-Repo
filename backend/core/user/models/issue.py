from django.db import models
# from collections import namedtuple

from .user import User

class Issue(models.Model):

    STATUS_PENDING = 0
    STATUS_CHOICES = CATEGORY = {
        STATUS_PENDING: 'Pending'
    }


    owner = models.OneToOneField(User,
        related_name='issue', on_delete=models.CASCADE
    )
    assignee = models.ForeignKey(User,
        related_name='assingned_issues', on_delete=models.CASCADE)
    category = models.CharField(max_length=100, blank=True, default='')
    description = models.CharField(max_length=256, blank=True, default='')
    status = models.PositiveIntegerField(
        choices=STATUS_CHOICES, default=STATUS_PENDING
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('created', )