from django.db import models

# Create your models here.

class UploadedFile(models.Model):
    filename = models.CharField(max_length=100)
    upload_time = models.DateTimeField(auto_now_add=True)
    processed = models.BooleanField(default=False)

    def __str__(self):
        return self.filename
