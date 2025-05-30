# from http import HTTPStatus
from rest_framework.views import exception_handler
from rest_framework.status import is_success
from rest_framework.response import Response
from rest_framework import viewsets

from .common import META_ATTR, EXEC_HANDLER_ATTR


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    # print(context)
    response = exception_handler(exc, context)
    # *ViewSet.finalize_response() guard
    if response is not None:
        setattr(response, EXEC_HANDLER_ATTR, True)

    #print(EXEC_HANDLER_ATTR+'=', type(response.data), '---', type(exc), '---', exc, '---', response.data)
    version = context['kwargs'].get('version', None)
    meta = {} if version is None else {'version': version}
    return format_response(response, meta=meta)


def format_response(response, meta={}, success=None):
    """
    @arg meta: Additional response metadata
    """
    if isinstance(response, str):
        response = {'message': body}
    elif response is not None:
        code = response.status_code
        success = is_success(code) # if success is None else success
        if success:
            key = 'data'
        else:
            key = 'error'
            if isinstance(response.data, (str, bytes)):
                response.data = {'message': response.data}


        # print(response.context_data)
        #response_meta = response.
        response.data = {
            'meta': {
                'code': code,
                #'message': HTTPStatus(response.status_code).phrase,
                'message': response.status_text,
            } | getattr(response, META_ATTR, {}) | meta,
            'success': success,
            key: response.data,
        }

    return response
        

class IOMixin(viewsets.GenericViewSet):
    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response, *args, **kwargs)
        # print('reqHEADERS:', request.headers)
        # print('reqPOST:', request.POST)

        if hasattr(response, EXEC_HANDLER_ATTR):
            return response

        meta = {'version': kwargs['version']}
        return format_response(response, meta=meta)


def paginate_response(viewset, queryset, serializer, many=True):
    page = viewset.paginate_queryset(queryset)

    if page is None:
        return Response(serializer(queryset, many=many).data)

    return viewset.get_paginated_response(serializer(page, many=many).data)

def send_email(*, subject, message, to, from_email=None, fail_silently=False):
    from django.core.mail import send_mail
    
    send_mail(
        subject=subject,
        message=message, 
        from_email=from_email,
        recipient_list=to,
        fail_silently=fail_silently,
    )
