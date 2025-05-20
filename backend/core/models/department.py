from django.db import models
from collections import namedtuple

class Faculty(models.Model):
    name = models.CharField(max_length=128, unique=True)
    description = models.CharField(max_length=256, blank=False, default='')
    # dean = models.ForeignKey('core.Staff',
    #     related_name='dean_of',
    #     on_delete=models.CASCADE,
    #     null=True,
    #     blank=True
    # )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.name

class Department(models.Model):
    name = models.CharField(max_length=128, unique=True)
    description = models.CharField(max_length=256, blank=False, default='')
    # head = models.ForeignKey('core.Staff',
    #     related_name='head_of',
    #     on_delete=models.CASCADE,
    #     null=True,
    #     blank=True
    # )
    faculty = models.ForeignKey(Faculty,
        related_name='departments',
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return "%s" % self.name
