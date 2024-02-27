from django.db import models
from .base import BaseModel
from .sessions import Session

class Resume(BaseModel):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    file = models.FileField(upload_to='resumes/')
    details = models.TextField(blank=True, null=True)
    relevance_score = models.FloatField(default=0.0)

    def __str__(self):
        return "Session - " + str(self.session.id) + " - resume - " + str(self.id)