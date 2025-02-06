from rest_framework import routers

from core.auth.viewsets import (
    AccountViewSet,
    LoginViewSet,
    LogoutViewSet,
    RegisterViewSet
)
from core.user.viewsets import UsersViewSet, DepartmentViewSet, IssueViewSet

router = routers.SimpleRouter(trailing_slash=False)

# router.register(r"accounts", AccountViewSet, basename="accounts")
router.register(r"login", LoginViewSet, basename="login")
router.register(r"logout", LogoutViewSet, basename="logout")
router.register(r"register", RegisterViewSet, basename="register")


router.register(r"users", UsersViewSet, basename="users")
router.register(r"issues", IssueViewSet, basename="issues")
router.register(r"departments", DepartmentViewSet, basename="departments")

urlpatterns = [
    *router.urls,
]
