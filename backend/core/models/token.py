from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.core.exceptions import ValidationError

from .user import Role

class ReferenceToken(models.Model):
    email = models.EmailField(_("email address"), db_index=True, unique=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    token = models.UUIDField(unique=True, editable=False)
    is_used = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expiry_date = models.DateTimeField(null=True, blank=True)

    objects = models.Manager()  # Default manager
    active_objects = ReferenceTokenManager()  # Custom manager

    def save(self, *args, **kwargs):
        if self.expiry_date and self.expiry_date <= timezone.now():
            raise ValidationError("Expiry date must be in the future.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Token for {self.email} - Active: {self.active}"