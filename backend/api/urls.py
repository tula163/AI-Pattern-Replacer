# backend/api/urls.py
from django.urls import path
from . import views


from django.urls import path
from .views import modify_table



urlpatterns = [
    path("upload_chunk/", views.upload_chunk),
    path("merge_chunks/", views.merge_chunks),
    path("test_llm/", views.test_llm),
    path('modify-table', modify_table)

]

