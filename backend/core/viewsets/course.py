from django.db import transaction
from django.db.models import Subquery, OuterRef, F
from django.http import QueryDict
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from ..serializers import CourseSerializer, CourseUnitSerializer
from ..models import Course, CourseUnit
from core.utils.io import IOMixin, paginate_response


class CourseViewSet(IOMixin, viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = (IsAuthenticated,)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        course = serializer.instance
        
        # print("-------------------", {"sd":serializer.data, "svd":serializer.validated_data, "D":self.request.data})

        req_units = request.data.getlist('units') if isinstance(request.data, QueryDict) else request.data.get('units', [])
        units = []
        for unit in req_units:
            if not isinstance(unit, dict):
                raise ValidationError({"message": "Invalid unit data"})
            units.append(CourseUnit.objects.create(course=course, **unit))
            # serializer.validated_data['units'].append(unit)
        # course.units.set(units)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @transaction.atomic
    def perform_update(self, serializer):
        """
        Update the course and its units
        """        
        super().perform_update(serializer)

        req_units = self.request.data.getlist('units') if isinstance(self.request.data, QueryDict) else self.request.data.get('units', [])
        # print("-------------------", {"sd":serializer.data, "requn":req_units, "D":self.request.data})
        # print({"type":type(req_units), "u":req_units})
        if not isinstance(req_units, list):
            raise ValidationError({"message": "Invalid unit data"})
        
        course = serializer.instance
        # current_units = course.units.all().values()
        for i, unit in enumerate(req_units):
            if not (is_dict := isinstance(unit, dict)) or not unit.get('id'):
                if not is_dict or Course.objects.filter(name=unit["code"]).exists():
                    raise ValidationError({"message": "Invalid unit data"})
                CourseUnit.objects.create(course=course, **unit)
                req_units.pop(i)
        
        for unit in req_units:
            # unit['course'] = course
            unit_id = unit.pop('id')
            if not unit:
                continue
            CourseUnit.objects.filter(pk=unit_id).update(**unit)

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
