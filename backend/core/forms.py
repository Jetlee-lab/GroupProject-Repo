from django import forms
import json
from .models import ReferenceToken


class CustomSignupForm(forms.Form):
    def signup(self, request, user, *args, **kwargs):
        fields = request.POST.dict()
        if not fields:
            try:
                fields = json.loads(request.body)
            except json.JSONDecodeError:
                fields = {}
        
        if (token := fields.get('token', None)) is None:
            raise forms.ValidationError('Reference token is required')
        
        try:
            token_obj = ReferenceToken.objects.get(token=token, email=user.email)
        except ReferenceToken.DoesNotExist:
            raise forms.ValidationError('Invalid token')
        else:
            if token_obj.is_used:
                raise forms.ValidationError('Reference token has already been used')
            token_obj.is_used = True
            token_obj.active = False
            token_obj.save()

            # Assign the role to the user
            user.roles.add(token_obj.role)

    def clean_token(self):
        """
        Validates the token field.
        - Ensures the token exists in the database. 
        - Checks if the token has already been used.
        """
        token = self.cleaned_data.get('token')  # Get the token from the form input
        try:
            # Attempt to retrieve the ReferenceToken object from the database
            token_obj = ReferenceToken.objects.get(token=token)
        except ReferenceToken.DoesNotExist:
            # Raise a validation error if the token does not exist
            raise forms.ValidationError('Invalid token')
        
        # Check if the token has already been used
        if token_obj.is_used:
            raise forms.ValidationError('Reference token has already been used')
        
        # Return the valid token object for further processing
        return token_obj