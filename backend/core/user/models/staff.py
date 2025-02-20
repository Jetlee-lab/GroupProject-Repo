from django.db import models
from collections import namedtuple

from .department import Department
from .user import User

class Staff(models.Model):
    """
    The staff table
    """
    user = models.OneToOneField(
        User,
        primary_key=True,
        related_name="%(class)s_details",
        on_delete=models.CASCADE,
    )
    departments = models.ManyToManyField(Department,
        related_name='staff'
    )


    def __str__(self):
        return "Staff Table"
