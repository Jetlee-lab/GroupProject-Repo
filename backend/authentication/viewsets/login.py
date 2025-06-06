from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import login

from ..serializers import LoginSerializer


class LoginViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        # print('\nCOOKIES:', request.COOKIES)

        serializer.is_valid(raise_exception=True)
        #login(request, user)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
