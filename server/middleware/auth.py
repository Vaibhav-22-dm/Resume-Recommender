import jwt
from django.conf import settings
from app.models.sessions import Session
from rest_framework import exceptions
from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from rest_framework import authentication





class Authentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        raw_token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1] 
       
        if raw_token is None:
            return None
        payload = jwt.decode(raw_token, settings.SECRET_KEY, algorithms='HS256')

        try:
            session_id = payload.get('session_id')
            session = Session.objects.get(id=int(session_id))
        except Session.DoesNotExist:
            raise exceptions.AuthenticationFailed('Session does not exist')
        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Invalid token: {str(e)}')
        
        request.session_id = session_id
        user = AnonymousUser()
        user.is_active = True
        return (user, None)