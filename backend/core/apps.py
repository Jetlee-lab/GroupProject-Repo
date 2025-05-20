from django.apps import AppConfig

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        """
        This method is called when the app is ready.
        You can use it to import signals or perform app-specific initialization.
        """
        import core.signals  # Import signals to connect them