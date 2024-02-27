from django.urls import path
from .views import *

urlpatterns = [
    path('create-session/', create_session, name='create_session'),
    path('attach-files/', attach_files, name='attach_files'),
    path('generate-recommendations/', generate_recommendations, name='generate-recommendations'),
    path('get-recommendations/', get_recommendations, name='get-recommendations'),
]
