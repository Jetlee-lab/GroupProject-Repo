# myproject/urls.py
from django.contrib import admin
from django.urls import path, include  # Import the 'include' function

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin URL
    path('', include('task_app.urls')),  # Include URLs from task_app
]

