from rest_framework import viewsets, status, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework.decorators import action
from django.db.models import Count
from django.core.mail import send_mail

from ..serializers import (
    UserSerializer,
    DepartmentSerializer,
    FacultySerializer,
    IssueSerializer
)
from ..models import User, Student, Staff, Faculty
from core.utils.io import IOMixin, paginate_response #format_response


class UsersViewSet(
    IOMixin,
    #viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    error_message = "Error updating user"

    # def retrieve(self, request, *args, **kwargs):
    #     pk = kwargs.get('pk')
    #     try:
    #         assert user.id == int(pk) or user.username == pk[1:], (
    #         )
    #     except AssertionError:
    #         ...
    #     if (pk := kwargs.get('pk')) and pk.startswith('@') and len(pk) > 1:
    #         username = pk[1:]
    #         self.lookup_field = 'username'
    #         self.kwargs[self.lookup_field] = username
    #     if not user.is_staff and ()

    #     return super().retrieve(request, *args, **self.kwargs)

    def update(self, request, *args, **kwargs):
        print('update():',{'args':args,'kwargs':kwargs,'request.data':request.data})
        partial = kwargs.pop("partial", True)
        instance = User.objects.get(id=request.data.get("userID"))
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, "_prefetched_objects_cache", None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        print('create():',{'args':args,'kwargs':kwargs,'request.data':request.data})
        user_id = request.data.get("userID")

        if not user_id:
            raise ValidationError({'message': 'User not found'})

        if self.request.user.pk != int(user_id) and not self.request.user.is_superuser:
            raise ValidationError({'message': 'Error updating user'})

        self.update(request)

        #return Response(format_response({}), status.HTTP_200_OK)
        return Response({}, status.HTTP_200_OK)
    
    @action(methods=["GET"], detail=False, url_path="students", url_name="students")
    def students(self, request, *args, **kwargs):
        students = User.objects.filter(student__isnull=False)
        return paginate_response(self, students, UserSerializer)

    @action(methods=["GET"], detail=False, url_path="staff", url_name="staff")
    def staff(self, request, *args, **kwargs):
        staff = User.objects.filter(staff__isnull=False)
        return paginate_response(self, staff, UserSerializer)

    @action(methods=["GET"], detail=True, url_path="issues", url_name="issues")
    def issues(self, request, *args, pk=None, **kwargs):
        try:
            issues = Student.objects.get(pk=pk).issues.all()
        except Student.DoesNotExist:
            raise NotFound({'details': 'Student details not found'})

        return paginate_response(self, issues, IssueSerializer)

    #@action(methods=['POST'], detail=True, permission_classes=[IsAdminOrIsSelf])
    @action(methods=["GET"], detail=True, url_path="departments", url_name="departments")
    def departments(self, request, *args, pk=None, **kwargs):
        """
        Get all users department
        """
        try:
            departments = Staff.objects.get(pk=pk).departments.all()
        except Staff.DoesNotExist:
            raise NotFound({'details': 'Staff details not found'})

        return paginate_response(self, departments, DepartmentSerializer)

    @action(methods=["GET"], detail=True, url_path="faculties", url_name="faculties")
    def faculties(self, request, *args, pk=None, **kwargs):
        try:
            departments = Staff.objects.get(pk=pk).departments.all()
            faculties = Faculty.objects.filter(departments__in=departments)
        except Staff.DoesNotExist:
            raise NotFound({'details': 'Staff details not found'})

        return paginate_response(self, faculties, FacultySerializer)

    @action(methods=["GET"], detail=False, url_path="email", url_name="email")
    def email(self, request, *args, pk=None, **kwargs):
        send_mail(
            'Subject here',
            'Here is the message.',
            'from@example.com',
            ['to@example.com']
        )
        return Response({'message': 'Email sent'})

    def get_queryset(self):
        return User.objects.all() #prefetch_related('student_details', )

    # def get_object(self):
    #     queryset = self.filter_queryset(self.queryset())
    #     filter_kwargs = {}
    #     for field in self.lookup_fields:
    #         if self.kwargs.get(field): # Ignore empty fields.
    #             filter[field] = self.kwargs[field]
    #     obj = get_object_or_404(queryset, **filter)  # Lookup the object
    #     self.check_object_permissions(self.request, obj)
    #     return obj

