from rest_framework.views import APIView
from rest_framework.response import Response

class ExampleView(APIView):
    """
    A simple view that returns a greeting message.
    """
    def get(self, request):
        """
        Responds with a 'Hello, world!' message.
        """
        return Response({"message": "Hello, world!"})
