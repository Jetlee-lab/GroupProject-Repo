from django.db import models
from django.contrib.postgres.aggregates import ArrayAgg
from django.db.models import Count, Q, F, Subquery, OuterRef, Case, Value, When
from django.http import QueryDict
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from core.models import Role, Issue
from core.serializers import IssueSerializer
from core.utils.io import IOMixin, paginate_response
from core.utils.lib import parse_query
from .stats import IssueStat


class StatsView(IOMixin, generics.ListCreateAPIView):
    # serializer_class = IssueSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        return self.stat(request.query_params, kwargs.get('stat'))

    def create(self, request, *args, **kwargs):
        return self.stat(request.data, kwargs.get('stat'))

    def stat(self, q, stat):
        # role = self.request.user.roles.first()

        # if role.name == Role.ROLE_STUDENT:
        #     issues = Issue.objects.filter(owner=pk)
        # elif role.name == Role.ROLE_LECTURER:
        #     issues = Issue.objects.filter(assignee=pk)
        # else:
        #     issues = Issue.objects.all()


        kwargs = parse_query(q)

        stat_map = {
            'issues': IssueStat,
        }

        if stat:
            result = stat_map[stat]().stats(**kwargs)
        else:
            result = {
                k: v().stats(**kwargs)
                for k, v in stat_map.items()
            }

        return Response(result)
        
    def get_serializer_class(self):
        # if self.request.user.is_staff:
        #     return FullAccountSerializer
        # return BasicAccountSerializer
        return IssueSerializer

    # def filter_queryset(self, queryset):
    #     filter_backends = [CategoryFilter]

    #     if 'geo_route' in self.request.query_params:
    #         filter_backends = [GeoRouteFilter, CategoryFilter]
    #     elif 'geo_point' in self.request.query_params:
    #         filter_backends = [GeoPointFilter, CategoryFilter]

    #     for backend in list(filter_backends):
    #         queryset = backend().filter_queryset(self.request, queryset, view=self)

    #     return queryset

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Issue.objects.all()
        return Issue.objects.filter(owner=user)
