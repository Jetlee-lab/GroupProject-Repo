from django.shortcuts import render, get_object_or_404
from .models import Topic  # Import your Topic model

def home(request):
    """The home page for AIMS."""
    return render(request, 'task_app/home.html')  
    
def topics(request):
    """Page that lists all topics."""
    topics = Topic.objects.all()  # Fetch all topics from the database
    context = {'topics': topics}
    return render(request, 'task_app/topics.html', context)

def topic(request, topic_id):
    """Show a single topic and all its related entries."""
    topic = get_object_or_404(Topic, id=topic_id)  # Get the topic or return 404
    entries = topic.entry_set.order_by('-date_added')  # Get related entries
    context = {'topic': topic, 'entries': entries}
    return render(request, 'task_app/topic.html', context)

def entries(request):
    """Page that lists all entries from all topics."""
    all_entries = []
    topics = Topic.objects.all()
    for topic in topics:
        all_entries.extend(topic.entry_set.all())  # Collect all entries from topics
    
    context = {'entries': all_entries}
    return render(request, 'task_app/entries.html', context)

