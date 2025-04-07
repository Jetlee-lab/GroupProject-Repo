from django.db.models import Q
from django.http import QueryDict
from core.models.user import Role
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action, api_view
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data) #, many=True
        # print("testinhgf", data)

        serializer.is_valid(raise_exception=True)
        issue = serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    
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
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Issue.objects.all()
        return Issue.objects.filter(owner=user)

@api_view(['POST'])
def send_sms(request):
    from twilio.rest import Client

    data = request.data
    
    to = data.get('to', None)
    if to is None:
        raise ValidationError({'message': 'Recipient phone number is required'})

    account_sid = settings.TWILIO_ACCOUNT_SID
    auth_token = settings.TWILIO_AUTH_TOKEN

    client = Client(account_sid, auth_token)
    message = client.messages.create(
        from_=settings.TWILIO_PHONE_NUMBER,
        to=to,
        body='Hello there! This is a test message from the Django backend. to paul'
    )

    # print(message.sid)
    return Response({'message': f'SMS sent, (sid:{message.sid})'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def send_email(request):
    from django.core.mail import send_mail

    data = request.data

    to = data.get('to', None)
    if to is None:
        raise ValidationError({'message': 'Recipient email is required'})

    from_email=data.get('from', 'kato.keithpaul@students.mak.ac.ug')
    subject=data.get('subject', 'Subject here')
    message=data.get('message', 'Here is the message.')

    # print(request.data, from_email, subject, message)

    send_mail(
        subject=subject,
        message=message, 
        from_email=from_email,
        recipient_list=[to],
        fail_silently=False
    )
    return Response({'message': 'Email sent'}, status=status.HTTP_200_OK)
