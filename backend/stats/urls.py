from .views import StatView

STATS = "|".join([
    "issues",
])

urlpatterns = [
    path(f"(?P<stat>({STATS})?)/", StatView.as_view()),
]
