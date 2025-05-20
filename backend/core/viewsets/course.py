from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from django.db.models import Subquery, OuterRef, F

from ..serializers import CourseSerializer, CourseUnitSerializer
from ..models import Course, CourseUnit
from core.utils.io import IOMixin, paginate_response


class CourseViewSet(IOMixin, viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=["get"], detail=True, url_path="units", url_name="units")
    def units(self, request, *args, pk=None, **kwargs):
        """
        List all units for a course
        """
        course = self.get_object()
        units = course.units.all()
        serializer = self.get_serializer(units, many=True)
        return Response(CourseUnitSerializer(units, many=True).data)

    def get_queryset(self):
        return Course.objects.all() #prefetch_related('departments')


class CourseUnitViewSet(IOMixin, viewsets.ModelViewSet):
    serializer_class = CourseUnitSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return CourseUnit.objects.all() #prefetch_related('departments')
