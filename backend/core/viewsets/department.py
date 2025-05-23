from django.db import transaction
from django.http import QueryDict
from django.db.models import Subquery, OuterRef, F
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..serializers import DepartmentSerializer, FacultySerializer
from ..models import Department, Faculty
from core.utils.io import IOMixin, paginate_response


class FacultyViewSet(IOMixin, viewsets.ModelViewSet):
    serializer_class = FacultySerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=["get"], detail=True, url_path="departments", url_name="departments")
    def departments(self, request, *args, pk=None, **kwargs):
        try:
            departments = self.get_queryset().get(pk=pk).departments.all()
        except Faculty.DoesNotExist:
            raise ValidationError({'message': 'Faculty not found'})

        return paginate_response(self, departments, DepartmentSerializer)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        faculty = serializer.instance
        
        req_departments = request.data.getlist('departments') if isinstance(request.data, QueryDict) else request.data.get('departments', [])
        # departments = []
        for department in req_departments:
            if not isinstance(department, dict):
                raise ValidationError({"message": "Invalid department data"})
            # departments.append(Department.objects.create(faculty=faculty, **department))
            Department.objects.create(faculty=faculty, **department)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        # return faculty

    @transaction.atomic
    def perform_update(self, serializer):
        super().perform_update(serializer)

        req_departments = self.request.data.getlist('departments') if isinstance(self.request.data, QueryDict) else self.request.data.get('departments', [])
        if not isinstance(req_departments, list):
            raise ValidationError({"message": "Invalid department data"})
        
        faculty = serializer.instance
        for i, department in enumerate(req_departments):
            if not (is_dict := isinstance(department, dict)):
                raise ValidationError({"message": "Invalid department data"})
            elif not department.get("id"):
                Department.objects.create(faculty=faculty, **department)
                req_departments.pop(i)
        
        for department in req_departments:
            department_id = department.pop('id', None)
            if not department:
                continue
            Department.objects.filter(pk=department_id).update(**department)
        return faculty

    def get_queryset(self):
        return Faculty.objects.all() #prefetch_related('departments')


class DepartmentViewSet(IOMixin, viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=["get"], detail=True, url_path="courses", url_name="courses")
    def courses(self, request, *args, pk=None, **kwargs):
        try:
            department = self.get_queryset().get(pk=pk)
        except Department.DoesNotExist:
            raise ValidationError({'message': 'Department not found'})

        courses = department.courses.all()
        return paginate_response(self, courses, CourseSerializer)

    def get_queryset(self):
        return Department.objects.all()
