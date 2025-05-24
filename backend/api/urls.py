# backend/api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("upload_chunk/", views.upload_chunk),
    path("merge_chunks/", views.merge_chunks),
    path("test_llm/", views.test_llm),

]
