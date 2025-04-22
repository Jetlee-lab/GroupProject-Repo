# api/urls.py

from django.urls import include, re_path
from .router import router  # Make sure this matches your file name

# API versioning (currently only v1)
versions = '|'.join(("v1",))

urlpatterns = [
    re_path(f"^(?P<version>({versions}))/", include((router.urls, "api"), namespace="api")),
]
