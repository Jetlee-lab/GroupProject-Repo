from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError

from ..serializers import IssueSerializer
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
    def log(self, request, pk=None, *args, **kwargs):
        try:
            issues = Issue.objects.get(pk=pk).logs
        except Issue.DoesNotExist:
            raise ValidationError({'message': 'Issue not found'})

        return paginate_response(self, issues, IssueSerializer)

    def get_queryset(self):
        return Issue.objects.all()
