from django.conf import settings
from rest_framework import routers

from authentication.viewsets import (
    # AccountViewSet,
    LoginViewSet,
    LogoutViewSet,
    RegisterViewSet
)
from core.viewsets import (
    UsersViewSet,
    CourseViewSet,
    CourseUnitViewSet,
    DepartmentViewSet,
    FacultyViewSet,
    IssueViewSet,
    CategoriesViewSet,
    ReferenceTokenViewSet
)
from search.views import SearchView
from stats.views import StatsView

router = routers.SimpleRouter(trailing_slash=False)

if settings.DEBUG:
    router = routers.DefaultRouter(trailing_slash=False)
else:
    router = routers.SimpleRouter(trailing_slash=False)

# router.register(r"accounts", AccountViewSet, basename="accounts")
# router.register(r"login", LoginViewSet, basename="login")
# router.register(r"logout", LogoutViewSet, basename="logout")
# router.register(r"register", RegisterViewSet, basename="register")

router.register(r"users", UsersViewSet, basename="users")
router.register(r"issues", IssueViewSet, basename="issues")
router.register(r"departments", DepartmentViewSet, basename="departments")
router.register(r"faculties", FacultyViewSet, basename="faculties")
router.register(r"courses", CourseViewSet, basename="courses")
router.register(r"course-units", CourseUnitViewSet, basename="course-units")
router.register(r"reference-token", ReferenceTokenViewSet, basename="reference-token")
router.register(r"search", SearchView, basename="issue-search")
router.register(r"categories", CategoriesViewSet, basename="issue-categories")
router.register(r"stats/(?P<stat>(issues|courses|course-units)?)", StatsView, basename="stats")
