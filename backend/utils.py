# utils.py

from django.core.mail import send_mail
from django.conf import settings

def send_email_notification(subject, message, recipient_list):
    """
    Sends an email notification.
    """
    try:
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,  # From email (configured in settings.py)
            recipient_list,  # List of recipient emails
            fail_silently=False
        )
        print("Email sent successfully.")
    except Exception as e:
        print(f"Error sending email: {e}")

