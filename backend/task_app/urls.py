from django.urls import path
from . import views  # This allows us to use views defined in views.py

app_name = 'task_app'  # App name to avoid name conflicts with other apps

urlpatterns = [
    path('', views.home, name='home'),
    path('topics/', views.topics, name='topics'),
    path('entries/', views.entries, name='entries'),
]



