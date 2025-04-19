from allauth.headless.adapter import DefaultHeadlessAdapter
from allauth.account.adapter import DefaultAccountAdapter
from allauth.core.exceptions import ImmediateHttpResponse
from django import forms
from django.http import JsonResponse
from django.core.exceptions import BadRequest
import json
import http
from .serializers import UserSerializer
from .models import ReferenceToken


class CustomHeadlessAdapter(DefaultHeadlessAdapter):
    def serialize_user(self, user):
        """
        Serialize the user object to a dictionary.
        """
        u = UserSerializer(user).data
        return super().serialize_user(user) | u
        
class CustomAccountAdapter(DefaultAccountAdapter):
    def new_user(self, request, *args, **kwargs):
        fields = request.POST.dict()
        if not fields:
            try:
                fields = json.loads(request.body)
            except json.JSONDecodeError:
                fields = {}
        # print("---CustomAA.new_user()", {'request': request, 'args': args, 'kwargs': kwargs, 'fields': fields}) 
        if (token := fields.get('token', None)) is None:
            raise interupt('Reference token is required', param='token', code='token_required')
        
        try:
            self.aits_token = ReferenceToken.objects.get(token=token, email=fields.get('email'))
        except:  # ReferenceToken.DoesNotExist:
            raise interupt('Reference token invalid', param='token', code='invalid_token')
        else:
            if self.aits_token.is_used:
                raise interupt('Reference token already used', param='token', code='token_used')
            elif not self.aits_token.active:
                raise interupt('Reference token is inactive', param='token', code='token_inactive')

        user = super().new_user(request)
        return user
    
    def save_user(self, request, user, form, commit=True):
        super().save_user(request, user, form, commit)
        
        # token = ReferenceToken.objects.get(token=token, email=user.email)       
        self.aits_token.is_used = True
        self.aits_token.active = False
        self.aits_token.save()

        user.roles.add(self.aits_token.role)
        user.save()


def interupt(message, *, code, param, status=http.HTTPStatus.BAD_REQUEST):
    return ImmediateHttpResponse(JsonResponse({
        "status": status,
        "errors": [
            {
                "param": param,
                "code": code,
                "message": message,
            }
        ]

    }, status=status))