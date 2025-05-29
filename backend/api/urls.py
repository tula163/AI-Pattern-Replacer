# backend/api/urls.py
from django.urls import path
from . import views
from .views import RegexExtractionAPIView

from django.urls import path
from .views import modify_table



urlpatterns = [
    path("upload_chunk/", views.upload_chunk),
    path("merge_chunks/", views.merge_chunks),
    path("test_llm/", views.test_llm),
    path("extract-regex", RegexExtractionAPIView.as_view(), name="extract-regex"),
    path('modify-table', modify_table)

]

