from rest_framework import pagination
from rest_framework.response import Response
from urllib.parse import urlparse, parse_qs
from django.http import QueryDict

from core.utils.common import META_ATTR

class LimitOffsetPagination(pagination.LimitOffsetPagination):
    def get_paginated_response(self, data):
        next_link = self.get_next_link()
        prev_link = self.get_previous_link()

        def get_params(qd, link):
            if not link:
                return None
            params = [self.limit_query_param, self.offset_query_param]
            return {
                k: int(v)
                for k, v in qd.items() if k in params
            } | { 'link': link}

        response = Response(data)
        setattr(response, META_ATTR, {
            'pagination': {
                'count': self.count,
                'next': get_params(QueryDict( urlparse(next_link).query ), next_link),
                'prev': get_params(QueryDict( urlparse(prev_link).query ), prev_link),
            }
        })

        return response
