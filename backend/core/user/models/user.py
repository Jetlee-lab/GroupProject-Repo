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

from .department import Department  # Ensure this import is correct


class Role(models.Model):

    name = models.CharField(max_length=128)
    description = models.CharField(max_length=256, blank=True, default='')


#class User(AbstractBaseUser, PermissionsMixin):
#    username = models.CharField(db_index=True, max_length=255, unique=True)
#    email = models.EmailField(db_index=True, unique=True)
#    is_active = models.BooleanField(default=True)
#    is_staff = models.BooleanField(default=False)
#    date = models.DateTimeField(auto_now_add=True)
#
#    USERNAME_FIELD = "email"
#    REQUIRED_FIELDS = ["username"]
#
#    objects = UserManager()
#
#    def __str__(self):
#        return f"{self.email}"


class User(AbstractUser):
   USERNAME_FIELD = "email"
   REQUIRED_FIELDS = ["username"]

   email = models.EmailField(_("email address"), db_index=True, unique=True)
   roles = models.ManyToManyField(Role,
       blank=True,
       related_name="users",
       # verbose_name=_("roles"),
   )

   # groups = models.ManyToManyField(
   #       Group,
   #       blank=True,
   #       related_name="user_groups",
   #       # related_query_name="student",
   # )
   # user_permissions = models.ManyToManyField(
   #      Permission,
   #      verbose_name=_("user permissions"),
   #      blank=True,
   #      help_text=_("Specific permissions for this student."),
   #      related_name="user_permissions",
   #      # related_query_name="user",
   # )
   
   objects = UserManager()

   def __str__(self):
       return f"User: {self.email}"


class UserManager(UserManager):
    def create_user(self, username, email, password=None, **kwargs):
        """Create and return a `User` with an email, username and password."""
        if username is None:
            raise TypeError("Users must have a username.")
        if email is None:
            raise TypeError("Users must have an email.")

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError("Superusers must have a password.")
        if email is None:
            raise TypeError("Superusers must have an email.")
        if username is None:
            raise TypeError("Superusers must have an username.")

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user



# # students table
# class Student(User):
#     groups = models.ManyToManyField(
#         Group,
#         blank=True,
#         related_name="student_permissions",
#         # related_query_name="stusent",
#     )
#     user_permissions = models.ManyToManyField(
#         Permission,
#         verbose_name=_("student permissions"),
#         blank=True,
#         help_text=_("Specific permissions for this student."),
#         related_name="student_permissions",
#         # related_query_name="student",
#     )
#     pass
# 
# 
# # staff table
# class Staff(User):
#     department = models.ForeignKey(Department,
#         related_name='members', on_delete=models.CASCADE
#     )
#     groups = models.ManyToManyField(
#         Group,
#         blank=True,
#         related_name="staff_permissions",
#         # related_query_name="stusent",
#     )
#     user_permissions = models.ManyToManyField(
#         Permission,
#         verbose_name=_("Student permissions"),
#         blank=True,
#         help_text=_("Specific permissions for this staff."),
#         related_name="staff_permissions",
#         # related_query_name="staff",
#     )



# class U(AbstractUser):
#     USERNAME_FIELD = "email"
#     REQUIRED_FIELDS = ["username"]
#     
#     user_permissions = models.ManyToManyField(
#         Permission,
#         #verbose_name=_("s permissions"),
#         blank=True,
#         #related_name="s_set",
#         #related_query_name="s",
#     )
# 
#     groups = models.ManyToManyField(
#         Group,
#         verbose_name=_("%(app_label)s_%(class)ss"),
#         blank=True,
#         related_name="%(app_label)s_%(class)s_set",
#         related_query_name="%(app_label)s_%(class)ss",
#      )
# 
# 
# 
# 
#     class Meta:
#         abstract = True
# 
# class S(U):
#     #groups = models.ManyToManyField(
#     #    Group,
#     #    verbose_name=_("ss"),
#     #    blank=True,
#     #    related_name="s_set",
#     #    related_query_name="s",
#     #)
#     pass
# 
# class D(U):
#     pass
