from django.db import models
from collections import namedtuple

from .user import User

class Student(models.Model):
    """
    The student table
    """
    user = models.OneToOneField(
        User,
        primary_key=True,
        related_name="%(class)s_details",
        on_delete=models.CASCADE,
    )
    student_no = models.CharField(max_length=32, blank=True)

    def __str__(self):
        return "Student Table"
