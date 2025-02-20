from rest_framework import pagination
from rest_framework.response import Response
from urllib.parse import urlparse, parse_qs
from django.http import QueryDict

from utils.common import META_ATTR

class LimitOffsetPagination(pagination.LimitOffsetPagination):
    def get_paginated_response(self, data):
        next_link = self.get_next_link()
        prev_link = self.get_previous_link()

        next_params = {k: int(v) for k, v in QueryDict( urlparse(next_link).query ).items()}
        prev_params = {k: int(v) for k, v in QueryDict( urlparse(prev_link).query ).items()}

        response = Response(data)
        setattr(response, META_ATTR, {
            'pagination': {
                'count': self.count,
                'next': next_params | {'link': next_link},
                'prev': prev_params | {'link': prev_link},
            }
        })

        return response
