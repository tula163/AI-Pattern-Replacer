from django.db import models
# from django.contrib.auth.models import User     // if user

class UploadRecord(models.Model):
    file_name = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('success', 'success'), ('failed', 'failed')])
    file_size = models.IntegerField(null=True, blank=True)

    # if users
    # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.file_name} ({self.status})"


class RegexCallHistory(models.Model):
    file_name = models.CharField(max_length=255)
    prompt = models.TextField() 
    regex = models.TextField()
    replacement = models.TextField()
    column_name = models.CharField(max_length=100)
    pattern_type = models.CharField(max_length=50)
    called_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[('success', 'success'), ('failed', 'failed')],
        default='success'
    )
    error_message = models.TextField(null=True, blank=True)


class ModifiedFileRecord(models.Model):
    file_name = models.CharField(max_length=255)
    modified_at = models.DateTimeField(auto_now_add=True)
    modified_data = models.JSONField() 
    regex = models.CharField(max_length=255)
    replacement = models.TextField()
    column_name = models.CharField(max_length=100)
    pattern_type = models.CharField(max_length=50, default='custom')
    prompt = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=[('success', 'success'), ('failed', 'failed')],
        default='success'
    )
