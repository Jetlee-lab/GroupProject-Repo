# api/router.py

from django.conf import settings
from rest_framework import routers

from authentication.viewsets import (
    AccountViewSet,
    LoginViewSet,
    LogoutViewSet,
    RegisterViewSet
)
from core.viewsets import (
    UsersViewSet,
    DepartmentViewSet,
    FacultyViewSet,
    IssueViewSet,
    CategoriesViewSet,
    ReferenceTokenViewSet
)
from search.views import SearchView
from stats.views import StatsView

# Use DefaultRouter in development for browsable API, otherwise use SimpleRouter
router = routers.DefaultRouter(trailing_slash=False) if settings.DEBUG else routers.SimpleRouter(trailing_slash=False)

# Register authentication-related viewsets
router.register(r"accounts", AccountViewSet, basename="accounts")
router.register(r"login", LoginViewSet, basename="login")
router.register(r"logout", LogoutViewSet, basename="logout")
router.register(r"register", RegisterViewSet, basename="register")

# Register other core viewsets
router.register(r"users", UsersViewSet, basename="users")
router.register(r"issues", IssueViewSet, basename="issues")
router.register(r"departments", DepartmentViewSet, basename="departments")
router.register(r"faculties", FacultyViewSet, basename="faculties")
router.register(r"reference-token", ReferenceTokenViewSet, basename="reference-token")
router.register(r"categories", CategoriesViewSet, basename="issue-categories")

# Register additional views
router.register(r"search", SearchView, basename="issue-search")
router.register(r"stats/(?P<stat>(issues)?)", StatsView, basename="stats")
