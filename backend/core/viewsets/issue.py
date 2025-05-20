from django.db.models import Q
from django.http import QueryDict
from core.models.user import Role
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError

from ..serializers import IssueSerializer, IssueLogSerializer, AttachmentSerializer, CategorySerializer, StaffSerializer
from ..models.issue import Issue, IssueLog, Category
from ..utils.io import IOMixin, paginate_response


class CategoriesViewSet(IOMixin, viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    # permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Category.objects.all()

class IssueViewSet(
    IOMixin,
    viewsets.ModelViewSet,
    # viewsets.GenericViewSet,
    # mixins.CreateModelMixin,
    # mixins.UpdateModelMixin,
    # mixins.RetrieveModelMixin,
    # mixins.ListModelMixin,
):
    # permission_classes = (AllowAny,)
    serializer_class = IssueSerializer

    # def create(self, request, *args, **kwargs):
    #     return super().create(request,*args, **kwargs)
    #     serializer = self.get_serializer(data=request.data) #, many=True
    #     # print("testinhgf", data)

    #     serializer.is_valid(raise_exception=True)
    #     issue = serializer.save()

    #     return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['GET'])
    def assignees(self, request, *args, **kwargs):
        try:
            assigns = Issue.objects.get(pk=kwargs.get("pk")).assignee
        except Issue.DoesNotExist:
            raise ValidationError({'message': 'Issue not found'})

        assigns = StaffSerializer(assigns).data
        
        return Response(assigns, status=status.HTTP_200_OK)
        # return paginate_response(self, assigns, StaffSerializer, many=False)

    @action(detail=True, methods=['GET'])
    def attachments(self, request, pk=None, *args, **kwargs):
        try:
            attachments = Issue.objects.get(pk=pk).attachments.all()
        except Issue.DoesNotExist:
            raise ValidationError({'message': 'Issue not found'})

        return paginate_response(self, attachments, AttachmentSerializer)

    @action(detail=True, methods=['GET'])
    def logs(self, request, pk=None, *args, **kwargs):
        try:
            logs = Issue.objects.get(pk=pk).logs.all()
        except Issue.DoesNotExist:
            raise ValidationError({'message': 'Issue not found'})

        return paginate_response(self, logs, IssueLogSerializer)

    @action(detail=True, methods=['GET'])
    def categories(self, request, *args, pk=None, **kwargs):
        try:
            cats = Issue.objects.get(pk=pk).categories.all()
        except Issue.DoesNotExist:
            raise ValidationError({'message': 'Categories not found'})

        return paginate_response(self, cats, CategorySerializer)

    @action(detail=False, methods=['GET'])
    def meta(self, request, *args, pk=None, **kwargs):
        from django.db.models.functions import JSONObject
        from django.db.models import Case, When, Value
        from django.contrib.postgres.aggregates import ArrayAgg

        # priority_annotation = [
        #     When(priority=k, then=JSONObject(id=k, name=Value(v)))
        #     for k, v in Issue.PRIORITY_CHOICES.items()
        # ]
        # status_annotation = [
        #     When(priority=k, then=JSONObject(id=k, name=Value(v)))
        #     for k, v in Issue.STATUS_CHOICES.items()
        # ]
        # escalation_annotation = [
        #     When(priority=k, then=JSONObject(id=k, name=Value(v)))
        #     for k, v in Issue.ESCALATION_CHOICES.items()
        # ]
        categories = Category.objects.values()

        # metas = Issue.objects.aggregate(
        #     priorities=ArrayAgg(Case(*priority_annotation), distinct=True),
        #     statuses=ArrayAgg(Case(*status_annotation), distinct=True),
        #     escalation_levels=ArrayAgg(Case(*escalation_annotation), distinct=True),
        # ) | {
        #     'categories': categories,
        # }

        metas = {
            'categories': categories,
            'priorities': [ {'id': k, 'name': v} for k, v in Issue.PRIORITY_CHOICES.items() ],
            'statuses': [ {'id': k, 'name': v} for k, v in Issue.STATUS_CHOICES.items() ],
            'escalation_levels': [ {'id': k, 'name': v} for k, v in Issue.ESCALATION_CHOICES.items() ],
        }

        return Response(metas, status=status.HTTP_200_OK)
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            if Role.ROLE_REGISTRAR in user.roles.all():
                return Issue.objects.all()
            return Issue.objects.filter(
                Q(assignee=user) | Q(owner=user)
            )
        return Issue.objects.filter(owner=user)
