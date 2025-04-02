from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework import mixins
from rest_framework.decorators import action
from django.db.models import Count

from ..serializers import  RefrenceTokenSerializer
from ..models import RefrenceToken
from ..utils.io import IOMixin


class ReferenceTokenViewSet(
    IOMixin,
    mixins.CreateModelMixin,
    # mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = RefrenceTokenSerializer
    permission_classes = (IsAuthenticated, IsAdminUser)

    # error_message = "Error updating user"

    def create(self, request, *args, **kwargs):
        # email = request.data.get("email", None)
        # role = request.data.get("email", None)
        print("request.data", request.data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # print("serializer", serializer.data, "serializer.is_valid", serializer.is_valid(), "serializer.data", serializer.data)
        reference_token = serializer.save()
        print("reference_token", reference_token)

        return Response(serializer.data, status.HTTP_200_OK)

    def retrieve(self, request, *args, pk=None, **kwargs):
        print("pk", pk, "kwargs", kwargs, "args", args)
        refrence_token = RefrenceToken.objects.filter(
            # email=kwargs.get("email")
            pk=pk,
        ).first()

        if not refrence_token:
            raise NotFound("Reference token not found")

        serializer = self.get_serializer(refrence_token)
        return Response(serializer.data, status.HTTP_200_OK)
   
