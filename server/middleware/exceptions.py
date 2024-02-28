from rest_framework import status
from rest_framework.response import Response


def custom_exception_handler(exc, context):
    response = {}
    response['error'] = exc.detail if hasattr(exc, 'detail') else str(exc)
    response['code'] = exc.get_codes() if hasattr(exc, 'get_codes') else None
    return Response(response, status=status.HTTP_400_BAD_REQUEST)