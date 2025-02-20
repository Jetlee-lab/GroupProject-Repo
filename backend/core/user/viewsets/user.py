from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework import mixins
from rest_framework.decorators import action
from django.db.models import Count

from core.user.serializers import UserSerializer, DepartmentSerializer, FacultySerializer
from core.user.models import User, Student, Staff, Faculty
from utils.io import IOMixin, paginate_response #format_response


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
    
    @action(methods=["get"], detail=True, url_path="issues", url_name="issues")
    def issues(self, request, *args, pk=None, **kwargs):
        try:
            issues = Student.objects.get(user=pk).issues.all()
        except Student.DoesNotExist:
            raise ValidationError({'message': 'User issues not found'})

        return paginate_response(self, issues, IssueSerializer)

    #@action(methods=['post'], detail=True, permission_classes=[IsAdminOrIsSelf])
    @action(methods=["get"], detail=True, url_path="departments", url_name="departments")
    def departments(self, request, *args, pk=None, **kwargs):
        """
        Get all users department
        """
        try:
            departments = Staff.objects.get(user=pk).departments.all()
        except Staff.DoesNotExist:
            raise ValidationError({'message': 'User departments not found'})

        return paginate_response(self, departments, DepartmentSerializer)

    @action(methods=["get"], detail=True, url_path="faculties", url_name="faculties")
    def faculties(self, request, *args, pk=None, **kwargs):
        try:
            departments = Staff.objects.get(user=pk).departments.all()
            faculties = Faculty.objects.filter(departments__in=departments)
        except Staff.DoesNotExist:
            raise ValidationError({'message': 'User faculties not found'})

        return paginate_response(self, faculties, FacultySerializer)

    def get_queryset(self):
        return User.objects.all() #prefetch_related('student_details', )

    def _get_user(self, *args, **kwargs):
        try:
            return User.objects.get(*args, **kwargs)
        except User.DoesNotExist:
            return None
