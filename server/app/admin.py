from django.contrib import admin
from .models.sessions import Session
from .models.resumes import Resume

# Register your models here.
admin.site.register(Session)
admin.site.register(Resume)