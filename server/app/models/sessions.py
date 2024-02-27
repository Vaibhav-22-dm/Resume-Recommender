from django.db import models
from .base import BaseModel
import uuid

class Session(BaseModel):
    session_id = models.UUIDField(default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    status = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)