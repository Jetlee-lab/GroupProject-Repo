from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ReferenceToken

@receiver(post_save, sender=ReferenceToken)
def handle_reference_token_save(sender, instance, created, **kwargs):
    if created:
        print(f"New ReferenceToken created: {instance.token}")