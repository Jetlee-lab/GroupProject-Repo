from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError

from ..serializers import IssueSerializer, IssueLogSerializer, AttachmentSerializer
from ..models.issue import Issue, IssueLog
from utils.io import IOMixin, paginate_response

class IssueViewSet(IOMixin, viewsets.ModelViewSet):
# class AccountViewSet(viewsets.ModelViewSet):
    # permission_classes = (AllowAny,)
    serializer_class = IssueSerializer

    # @action(detail=False, methods=['post'])
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['POST'])
    def assignees(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['GET'])
    def attachments(self, request, pk=None, *args, **kwargs):
        try:
            attachments = Issue.objects.get(pk=pk).attachments.all()
        except Issue.DoesNotExist:
            raise ValidationError({'message': 'Issue not found'})

        return paginate_response(self, attachments, AttachmentSerializer)

    @action(detail=True, methods=['GET'])
    def log(self, request, pk=None, *args, **kwargs):
        try:
            logs = Issue.objects.get(pk=pk).logs.all()
        except Issue.DoesNotExist:
            raise ValidationError({'message': 'Issue not found'})

        return paginate_response(self, logs, IssueLogSerializer)

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Issue.objects.all()
        return Issue.objects.filter(owner=user)
