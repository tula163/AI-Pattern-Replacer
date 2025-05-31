# Register your models here.
# api/admin.py
from django.contrib import admin


from .models import UploadRecord
from .models import RegexCallHistory
from .models import ModifiedFileRecord

@admin.register(UploadRecord)
class UploadRecordAdmin(admin.ModelAdmin):
    list_display = ('file_name', 'uploaded_at', 'status', 'file_size')
    list_filter = ('status', 'uploaded_at')
    search_fields = ('file_name',)
    

@admin.register(RegexCallHistory)
class UploadRecordAdmin(admin.ModelAdmin):
    list_display = ('file_name', 'called_at', 'status', 'regex')
    

@admin.register(ModifiedFileRecord)
class UploadRecordAdmin(admin.ModelAdmin):
    list_display = ('file_name', 'modified_at', 'status', 'replacement')