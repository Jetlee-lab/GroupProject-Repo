# apps.py

from django.apps import AppConfig

class YourAppConfig(AppConfig):
    name = 'your_app'  # Replace with your actual app name

    def ready(self):
        # Import the signals module to connect the signals
        import your_app.signals  # Replace 'your_app' with your actual app name
