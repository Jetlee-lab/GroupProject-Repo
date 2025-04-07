from django.contrib.postgres.aggregates import ArrayAgg
from rest_framework import generics
from django.db.models import Value, Q, F, Count
from core.serializers import IssueSerializer
from core.models import Issue
from .serializers import IssueQuerySerializer

class IssueStat(): 
    fields = ['priority', 'status', 'escalation_level', 'assignee', 'owner', 'categories', 'attachments', 'logs']
    fields_keys = {
        'attachments': ('attachments__file', str),
        'priority': (None, lambda x: Issue.PRIORITY_CHOICES[x]),
        'escalation_level': (None, lambda x: Issue.ESCALATION_CHOICES[x]),
        'status': (None, lambda x: Issue.STATUS_CHOICES[x]),
    }

    def stats(self, **kwargs):
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

        kw = kwargs or dict(zip(self.fields, [set()] * len(self.fields)))

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
                'count': Count('id'),
                'issues': ArrayAgg('id'),
            }
            key, key_getter = self.fields_keys.get(k, (k, str))

            if key is None:
                key = k

            query = Issue.objects.filter(**filter_kw).values(key).annotate(**annotations)
            
            result[key] = {
                key_getter(q[key]): {
                    a: q[a]
                    for a in annotations
                }
                for q in query
            }

        return result

