from django.http import JsonResponse

# Example view
def sample_view(request):
    data = {
        "message": "This is a sample view in aits/views.py"
    }
    return JsonResponse(data)
