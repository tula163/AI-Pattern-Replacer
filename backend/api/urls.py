# backend/api/urls.py
from django.urls import path
from . import views


from django.urls import path
from .views import modify_table



urlpatterns = [
    path('modify-table', modify_table),
    path('upload_chunk/', views.upload_chunk),
    path('merge_chunks/', views.merge_chunks)

]

