from allauth.headless.adapter import DefaultHeadlessAdapter
from .serializers import UserSerializer
# Register your models here.


class CustomHeadlessAdapter(DefaultHeadlessAdapter):
    def serialize_user(self, user):
        """
        Serialize the user object to a dictionary.
        """
        u = UserSerializer(user).data
        return super().serialize_user(user) | u
        

        # user['roles'] = user.get('roles', [])
        return u
