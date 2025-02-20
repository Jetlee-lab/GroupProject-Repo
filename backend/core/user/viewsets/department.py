from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.db.models import Subquery, OuterRef, F

from ..serializers import DepartmentSerializer, FacultySerializer
from ..models import Department, Faculty
from utils.io import IOMixin


class FacultyViewSet(IOMixin, viewsets.ModelViewSet):
    serializer_class = FacultySerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        #print(self.__dir__())
        return Faculty.objects.prefetch_related('departments') #.annotate(departments='departments')


class DepartmentViewSet(IOMixin, viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Department.objects.all()
