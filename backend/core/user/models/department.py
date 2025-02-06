from django.db import models
from collections import namedtuple

class Faculty(models.Model):

    name = models.CharField(max_length=128)
    description = models.CharField(max_length=256, blank=True, default='')


class Department(models.Model):

    name = models.CharField(max_length=128)
    description = models.CharField(max_length=256, blank=True, default='')
    #faculty = models.ForeignKey(Faculty,
    #    related_name='departments', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)