from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework import mixins
from rest_framework.decorators import action, api_view
from django.db.models import Count
from django.http import QueryDict
from ..serializers import (
    UserSerializer,
    RoleSerializer,
    DepartmentSerializer,
    FacultySerializer,
    IssueSerializer,
    StaffSerializer,
    StudentSerializer,
    CourseSerializer,
)
from ..models import User, Role, Student, Staff, Faculty, Issue
from ..utils.io import IOMixin, paginate_response, send_email #format_response


class UsersViewSet(
    IOMixin,
    # viewsets.GenericViewSet,
    # mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
):
    # def get_serializer():
    #     self.request.user.roles
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    # error_message = "Error updating user"

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

    # def update(self, request, *args, **kwargs):
    #     print('update():',{'args':args,'kwargs':kwargs,'request.data':request.data})
    #     partial = kwargs.pop("partial", True)
    #     instance = User.objects.get(id=request.data.get("userID"))
    #     serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)

    #     if getattr(instance, "_prefetched_objects_cache", None):
    #         instance._prefetched_objects_cache = {}

    #     return Response(serializer.data)

    # def create(self, request, *args, **kwargs):
    #     print('create():',{'args':args,'kwargs':kwargs,'request.data':request.data})
    #     user_id = request.data.get("userID")

    #     if not user_id:
    #         raise ValidationError({'message': 'User not found'})

    #     if self.request.user.pk != int(user_id) and not self.request.user.is_superuser:
    #         raise ValidationError({'message': 'Error updating user'})

    #     self.update(request)

    #     #return Response(format_response({}), status.HTTP_200_OK)
    #     return Response({}, status.HTTP_200_OK)
    @action(methods=["GET"], detail=False, url_path="roles", url_name="user-roles")
    def roles(self, request, *args, **kwargs):
        roles = Role.objects.all()
        return Response(RoleSerializer(roles, many=True).data, status=status.HTTP_200_OK)
        # roles = User.objects.filter(roles__isnull=False).values_list('roles__name', flat=True).distinct()
        # return paginate_response(self, roles)

    @action(methods=["GET"], detail=False, url_path="students", url_name="students")
    def students(self, request, *args, **kwargs):
        # students = User.objects.filter(student__isnull=False)
        # return paginate_response(self, students, UserSerializer)
        students = Student.objects.all()
        return paginate_response(self, students, StudentSerializer)

    @action(methods=["GET", "PUT"], detail=False, url_path="staff", url_name="staff")
    def staff(self, request, *args, **kwargs):
        # staff = User.objects.filter(staff__isnull=False)

        if request.method == "GET":
            staff = Staff.objects.all()
            return paginate_response(self, staff, StaffSerializer)
        else:
            if not (units := request.data.get('units')):
                raise ValidationError({'message': 'Courses Units are required'})
            elif not (lecturerId := request.data.get('lecturerId')):
                raise ValidationError({'message': 'lecturerId is required'})

            # print("-----pk", self.request.user.pk, Staff.objects.all())
            # return Response({})
            instance = Staff.objects.get(pk=lecturerId)
            serializer = StaffSerializer(instance, data=request.data, context={"units": units}, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=["GET"], detail=False, url_path="registrars", url_name="registrars")
    def registrars(self, request, *args, **kwargs):
        registrars = Staff.objects.filter(roles__name=Role.ROLE_REGISTRAR)
        return paginate_response(self, registrars, StaffSerializer)

    @action(methods=["GET"], detail=False, url_path="lecturers", url_name="lecturers")
    def lecturers(self, request, *args, **kwargs):
        lecturers = Staff.objects.filter(roles__name=Role.ROLE_LECTURER)
        return paginate_response(self, lecturers, StaffSerializer)

    @action(methods=["GET"], detail=False, url_path="administrators", url_name="administrators")
    def admins(self, request, *args, **kwargs):
        admins = User.objects.filter(roles__name=Role.ROLE_ADMINISTRATOR, is_staff=True)
        return paginate_response(self, admins, UserSerializer)

    @action(methods=["GET"], detail=True, url_path="issues", url_name="issues")
    def issues(self, request, *args, pk=None, **kwargs):
        roles = self.request.user.roles.all()
        # print({"role": role})
        try:
            if Role.ROLE_LECTURER in roles:
                issues = Staff.objects.get(pk=pk).assigned_issues.all()
            elif Role.ROLE_STUDENT in roles:
                issues = Student.objects.get(pk=pk).issues.all()
            else:  # Role.ROLE_REGISTRAR in roles:
                issues = Issue.objects.all()
        except (Student.DoesNotExist, Staff.DoesNotExist):
            raise NotFound({'details': 'Issues not found'})

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

    @action(methods=["GET", "PUT", "POST"], detail=True, url_path="courses", url_name="courses")
    def courses(self, request, *args, pk=None, **kwargs):
        try:
            student = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise NotFound({'details': 'Not a student. Course details not found'})
        else:
            if request.method == "GET":
                courses = student.courses.all()
                return paginate_response(self, courses, CourseSerializer)

            course_data = request.data.getlist('courses') if isinstance(request.data, QueryDict) else request.data.get('courses', [])
            # return Response({'coursesResp': course_data})
            if not course_data:
                raise ValidationError({'message': 'Courses list is required'})

            if request.method == "PUT":
                student.courses.add(*course_data)
            elif request.method == "POST":
                student.courses.set(course_data)
            
            student.save()
            courses = student.courses.all()
        return Response(CourseSerializer(courses, many=True).data, status=status.HTTP_200_OK)

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
    data = request.data

    to = data.get('to', None)
    if to is None:
        raise ValidationError({'message': 'Recipient email is required'})

    from_email=data.get('from', None)
    subject=data.get('subject', 'Subject here')
    message=data.get('message', 'Here is the message.')

    # print(request.data, from_email, subject, message)

    send_email(
        subject=subject,
        message=message,
        to=[to],
        from_email=from_email,
    )

    return Response({'message': 'Email sent'}, status=status.HTTP_200_OK)