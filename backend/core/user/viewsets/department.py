from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..serializers import DepartmentSerializer
from ..models import Department


class DepartmentViewSet(viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Department.objects.all()