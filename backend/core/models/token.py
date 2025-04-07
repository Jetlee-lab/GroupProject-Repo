from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    AbstractUser,
    #BaseUserManager,
    UserManager,
    Permission,
    Group,
)
from django.utils.translation import gettext_lazy as _  # Updated import
from django.db import models
from django.core.exceptions import ValidationError

from .user import Role

class ReferenceToken(models.Model):
    email = models.EmailField(_("email address"), db_index=True, unique=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    token = models.UUIDField(unique=True, editable=False)
    is_used = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    
