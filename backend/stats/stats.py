# from django.contrib.postgres.aggregates import ArrayAgg
# from rest_framework import generics
# from django.db.models import Value, Q, F, Count, Window, Model
# from django.db.models.functions import JSONObject
# from django.db.models.manager import BaseManager
# from django.core.exceptions import FieldDoesNotExist
# from django.db.models.fields.related import ManyToOneRel, ManyToManyRel
# from core.serializers import (
#     IssueSerializer,
#     StudentSerializer,
#     StaffSerializer,
#     AttachmentSerializer,
#     CategorySerializer,
#     IssueLogSerializer,
# )
# from .serializers import IssueQuerySerializer
# from core.models import Issue, Staff, Student, Attachment, IssueLog


# class Stat():
#     name = None
#     fields = []
#     field_map = {}
#     meta_serializers = {}
#     multi_value_sep = ","
    
#     @staticmethod
#     def key_getter(x, p):
#         """
#         @param {x} :  Model object or other object
#         @param {p} :  whether {x} is a Model object
#         @returns :  The key to use for the stat entries
#         """
#         return x.pk if p else x

#     def stats(self, query, **kwargs):
#         # priority_subquery = Issue.objects.filter(priority=OuterRef('priority')) \
#         #     .values('priority').annotate(issues=ArrayAgg('id')).values('issues')
#         # ret = Issue.objects.values('priority') \
#         #     .annotate(
#         #         issues=Subquery(priority_subquery)
#         #     )

#         # result = None
#         # for k, v in kwargs.items():
#         #     filter_kw = { f'{k}__in': v } if v else {}
#         #     annotations = {
#         #         f'{k}_count': Count('id'),
#         #         f'{k}_issues': ArrayAgg('id'),
#         #         'type': Value(k),
#         #     }

#         #     query = Issue.objects.filter(**filter_kw).values(k).annotate(**annotations)
#         #     result = result.union(query) if result else query

#         # def can_prefetch(instance, field_name):
#         #     attr = getattr(instance, field_name, None)
#         #     print({'attr': attr})
#         #     return isinstance(attr, BaseManager)
        
#         def is_prefetchable(instance, field_name):
#             if not instance:
#                 return False
#             try:
#                 field = instance._meta.get_field(field_name)
#             except FieldDoesNotExist:
#                 return False
#             return field.is_relation and (
#                 field.one_to_many or
#                 field.many_to_many or
#                 isinstance(field, (ManyToOneRel, ManyToManyRel))
#             )

#         kw = {}
#         meta_fields = {}  # These come in as eg: assigneeMeta=username,date_joined

#         for k, v in (kwargs or dict(zip(self.fields, [set()] * len(self.fields)))).items():
#             # Also try spliting values with commas. eg: assignee=1,3,4&assigne=4
#             # Ofcourse, here v = set('1,3,4', '4')

#             # Separate fields from field meta to be annoted per field at response
#             field, _, end = k.lower().rpartition('meta')

#             vv = set()
#             for x in v:
#                 vv = vv.union(set(x.split(self.multi_value_sep)))

#             if end:
#                 kw[k] = vv
#             elif field in self.meta_serializers:
#                 meta_fields[field] = vv

#         # Build the query
#         q = None
#         field_info = {}
#         result = {}
#         for k, v in kw.items():
#             filter_kw = {}

#             if 'null' in v:
#                 v.discard('null')
#                 filter_kw[f'{k}__isnull'] = True
#             if v:
#                 filter_kw[f'{k}__in'] = v

#             key, key_getter = self.field_map.get(k, (None, self.key_getter))

#             if key is None:
#                 key = k
#             if key_getter is None:
#                 key_getter = self.key_getter

#             annotations = {
#                 f'stat': Value(k),
#                 f'{k}_count': Window(expression=Count('id'), partition_by=key),
#                 f'{k}_{self.name}': Window(expression=ArrayAgg('id'), partition_by=key),
#             } | ({
#                 key: Window(expression=ArrayAgg(key), partition_by=key),
#             } if key not in self.fields else {})

#             # if mv := meta.get(k, []):  # Add meta info if it was requested
#             #     annotations.update({
#             #         'meta': JSONObject(**{m: f'{k}__{m}' for m in mv})
#             #     })

#             meta_serializer, qs_getter = self.meta_serializers.get(k, (None, None))
#             if qs_getter is None:
#                 qs_getter = lambda x, _: x

#             # query = query.filter(**filter_kw).values(key).annotate(**annotations)
#             query_k = query.filter(**filter_kw).annotate(**annotations).prefetch_related(
#                 *(
#                     f'{k}__{m}'
#                     for m in meta_fields.get(k, []) if is_prefetchable(meta_serializer.Meta.model, m)
#                 )
#             )#.select_related('attachments__file',)

#             field_info[k] = {
#                 'key': key,
#                 'key_getter': key_getter,
#                 'meta': meta_fields.get(k),
#             }

#             print(len(query_k), is_prefetchable(query_k.model, 'attachments'),)
#             # result[key] = {
#             # result[k] = {
#             #     key_getter(q[key]): {
#             #         a: q[a]
#             #         for a in annotations
#             #     } | {
#             #         # "meta": meta_data
#             #     }
#             #     for q in query
#             # }

#             for qq in query_k:
#                 k = qq.stat
#                 stat = result.setdefault(k, {})
#                 instance = getattr(qq, field_info[k]['key'])
#                 stat_value_key = field_info[k]['key_getter'](instance, isinstance(instance, Model))

#                 stat[stat_value_key] = {
#                     a: getattr(qq, f'{k}_{a}')
#                     for a in ['count', self.name]
#                 }

#                 if m := field_info[k].get('meta'):
#                     stat[stat_value_key]['meta'] = meta_serializer(
#                         None if stat_value_key is None else qs_getter(getattr(qq, k), stat_value_key),
#                         many=False,
#                         fields=m
#                     ).data
            
#         # result = {}
#         # for qq in q:
#         #     k = qq.stat
#         #     stat = result.setdefault(k, {})

#         #     instance = getattr(qq, field_info[k]['key'])
#         #     stat_value_key = field_info[k]['key_getter'](instance) if instance else None

#         #     stat[stat_value_key] = {
#         #         a: getattr(qq, f'{k}_{a}')
#         #         for a in ['count', self.name]
#         #     }

#         #     if m := field_info[k].get('meta'):
#         #         serializer = self.meta_serializers[k]
#         #         data = serializer(getattr(qq, k), many=False, fields=m).data
#         #         stat[stat_value_key]['meta'] = data
#         # query.dd
#         return result


# class IssueStat(Stat):
#     name = 'issues'
#     fields = ['priority', 'status', 'escalation_level', 'assignee', 'owner', 'categories', 'attachments', 'logs']
#     # field_map = {
#     #     # key: (key, key-extractor)
#     #     'attachments': ('attachments__file', str),
#     #     'priority': (None, lambda x: Issue.PRIORITY_CHOICES[x]),
#     #     'escalation_level': (None, lambda x: Issue.ESCALATION_CHOICES[x]),
#     #     'status': (None, lambda x: Issue.STATUS_CHOICES[x]),
#     # }
#     field_map = {
#         # key: (key-field, key-getter), 
#         # 'attachments': ('attachments__file', lambda x, p: x.name if p else x),
#         'attachments': ('attachments__file', lambda x, p: x.name if p else x[0]),
#         'categories': ('categories__id', lambda x, p: x.pk if p else x[0]),
#         'priority': (None, lambda x, p: Issue.PRIORITY_CHOICES[x]),
#         'escalation_level': (None, lambda x, p: Issue.ESCALATION_CHOICES[x]),
#         'status': (None, lambda x, p: Issue.STATUS_CHOICES[x.pk if p else x]),
#         'logs': ('logs__id', lambda x, p: x.pk if p else x[0])
#     }
#     meta_serializers = {
#         # key: (serializer, queryset-gettter)
#         'attachments': (AttachmentSerializer, lambda x, k: x.get(file=k)),
#         'categories': (CategorySerializer, lambda x, k: x.get(pk=k)),
#         'owner': (StudentSerializer, None),
#         'assignee': (StaffSerializer, None),
#         'logs': (IssueLogSerializer, lambda x, k: x.get(pk=k)),
#     }



from django.contrib.postgres.aggregates import ArrayAgg
from rest_framework import generics
from django.db.models import Value, Q, F, Count
from django.db.models.functions import JSONObject
from django.core.exceptions import FieldDoesNotExist
from core.serializers import (
    IssueSerializer,
    # AttachmentSerializer,
    # CategorySerializer,
    # StudentSerializer,
    # StaffSerializer,
    # IssueLogSerializer,
)
from core.models import (
    Issue,
    Attachment,
    Category,
    Student,
    Staff,
    IssueLog,
)
from .serializers import IssueQuerySerializer

class IssueStat(): 
    fields = ['priority', 'status', 'escalation_level', 'assignee', 'owner', 'categories', 'attachments', 'logs']
    fields_keys = {
        'attachments': ('attachments__file', None),
        'priority': (None, lambda x: Issue.PRIORITY_CHOICES[x]),
        'escalation_level': (None, lambda x: Issue.ESCALATION_CHOICES[x]),
        'status': (None, lambda x: Issue.STATUS_CHOICES[x]),
    }
    meta_map = {
        # key: (serializer, queryset-gettter)
        'meta': Issue,
        'attachments': Attachment,
        'categories': Category,
        'owner': Student,
        'assignee': Staff,
        'logs': IssueLog,
    }
    multi_value_sep = ","

    @staticmethod
    def key_getter(x):
        return x

    def stats(self, query, **kwargs):
        # priority_subquery = Issue.objects.filter(priority=OuterRef('priority')) \
        #     .values('priority').annotate(issues=ArrayAgg('id')).values('issues')
        # ret = Issue.objects.values('priority') \
        #     .annotate(
        #         issues=Subquery(priority_subquery)
        #     )

        # result = None
        # for k, v in kwargs.items():
        #     filter_kw = { f'{k}__in': v } if v else {}
        #     annotations = {
        #         f'{k}_count': Count('id'),
        #         f'{k}_issues': ArrayAgg('id'),
        #         'type': Value(k),
        #     }

        #     query = Issue.objects.filter(**filter_kw).values(k).annotate(**annotations)
        #     result = result.union(query) if result else query

        def is_prefetchable(instance, field_name):
            if not instance:
                return False
            try:
                field = instance._meta.get_field(field_name)
            except FieldDoesNotExist:
                return False
            return field.is_relation and (
                field.one_to_many or
                field.many_to_many or
                isinstance(field, (ManyToOneRel, ManyToManyRel))
            )

        kw = {}
        meta_fields = {}  # These come in as eg: assigneeMeta=username,date_joined

        for k, v in (kwargs or dict(zip(self.fields, [set()] * len(self.fields)))).items():
            # Also try spliting values with commas. eg: assignee=1,3,4&assigne=4
            # Ofcourse, here v = set('1,3,4', '4')

            # Separate fields from field meta to be annoted per field at response
            field, _, end = k.lower().rpartition('meta')
            if k.lower() == "meta":
                field = "meta"
            print([field,_,end])

            vv = set()
            for x in v:
                vv = vv.union(set(x.split(self.multi_value_sep)))

            if end:
                kw[k] = vv
            # elif field in self.meta_serializers:
            elif field in self.meta_map:
                meta_fields[field.lower()] = vv

        # print({'kwargs':kwargs, 'kw':kw})

        result = {}
        for k, v in kw.items():
            filter_kw = {}
            if 'null' in v:
                v.discard('null')
                filter_kw[f'{k}__isnull'] = True
            if v:
                filter_kw[f'{k}__in'] = v

            annotations = {
                # f'{k}_count': Count('id'),
                'count': Count('id', distinct=True),
                'issues': ArrayAgg(
                    JSONObject(**{mv: mv for mv in meta_fields["meta"]}) if meta_fields.get("meta") else "id",
                    distinct=True
                ),
            }
            
            key, key_getter = self.fields_keys.get(k, (k, self.key_getter))

            if key is None:
                key = k
            if key_getter is None:
                key_getter = self.key_getter
            
            if mv := meta_fields.get(k, []):  # Add meta info if it was requested
                annotations.update({
                    'meta': JSONObject(**{
                        m: ArrayAgg(f'{k}__{m}', distinct=True, filter=Q(**{f'{k}__{m}__isnull':False})) if is_prefetchable(self.meta_map[k], m) else f'{k}__{m}'
                        for m in mv
                    })
                })

            query_k = query.filter(**filter_kw).values(key).annotate(**annotations)
            # print(len(query_k),)

            result[k] = {
                key_getter(q[key]): {
                    a: q[a]
                    for a in annotations
                }
                for q in query_k
            }
            # query.dd

        return result
