from django.contrib import admin

# Register your models here.
# api/admin.py
from .models import UploadedFile

admin.site.register(UploadedFile)

