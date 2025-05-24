from django.shortcuts import render

# Create your views here.
# backend/api/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from llm.regex_from_prompt import generate_regex_from_description

@csrf_exempt
def upload_chunk(request):
    return JsonResponse({"message": "Chunk received"})

@csrf_exempt
def merge_chunks(request):
    return JsonResponse({"message": "Chunks merged"})



def home(request):
    return HttpResponse("Welcome to the Pattern Replacer Backend!")



def test_llm(request):
    regex = generate_regex_from_description("email address")
    return JsonResponse({"regex": regex})



