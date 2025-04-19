from django.http import QueryDict


def parse_query(q):
    query_dict = q.lists() if isinstance(q, QueryDict) else q.copy()
    
    return {
        k: set( x for x in v if x )
        for k, v in query_dict
    }

