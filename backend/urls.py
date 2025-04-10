from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('aits/', include('aits.urls')),  # This connects to your app
]
