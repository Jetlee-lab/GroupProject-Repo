# views.py

from django.shortcuts import render, get_object_or_404, redirect
from django.core.mail import send_mail
from django.conf import settings
from .models import Issue
from .utils import send_email_notification  # Assuming you have this utility function

def update_issue_status(request, issue_id):
    """
    Update the status of an issue and send an email notification to the assigned user.
    """
    # Get the issue object by its ID
    issue = get_object_or_404(Issue, id=issue_id)

    # Example: Update the status of the issue
    new_status = request.POST.get('status')  # Assuming 'status' is passed in the POST request
    issue.status = new_status
    issue.save()

    # Prepare the email notification details
    subject = f"Issue '{issue.title}' has been updated"
    message = f"The status of the issue '{issue.title}' has been changed to {issue.status}."
    recipient_list = [issue.assigned_to.email]  # Send email to the assigned user

    # Send the email notification
    send_email_notification(subject, message, recipient_list)

    # Redirect to an appropriate page after updating the issue
    return redirect('issue_detail', issue_id=issue.id)
