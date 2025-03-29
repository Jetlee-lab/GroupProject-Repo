from django.contrib import admin
from .models import Topic, Issue, Entry, Comment

admin.site.register(Topic)
admin.site.register(Entry)

@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'created_at']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['user', 'issue', 'created_at']

