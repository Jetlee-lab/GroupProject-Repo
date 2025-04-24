# from allauth.account.forms import SignupForm
from django import forms
import json
from .models import ReferenceToken


class CustomSignupForm(forms.Form):
	def signup(self, request, user, *args, **kwargs):
		# print("---CustomForm.signup()", {'request': request, 'user': user, 'post': request.POST,'data': request.body, 
		# 'get': request.GET,
		# 'args': args, 'kwargs': kwargs
		# })
		
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
		except:
			# except ReferenceToken.DoesNotExist:
			raise forms.ValidationError('Invalid token')
		else:
			if token_obj.is_used:
				raise forms.ValidationError('Reference token has already been used')
			token_obj.is_used = True
			token_obj.active = False
			token_obj.save()

			user.roles.add(token_obj.role)

		
# class MyCustomSignupForm(SignupForm):
    # def save(self, request, *args, **kwargs):
    #     print({'request': request, 'args': args, 'kwargs': kwargs})
    #     raise "dcnsdds"

    #     # Ensure you call the parent class's save.
    #     # .save() returns a User object.
    #     user = super().save(request)
    #     # Add your own processing here.

    #     # You must return the original result.
    #     return user