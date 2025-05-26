from django.shortcuts import render

# Create your views here.
# backend/api/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse


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


# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from llm.regex_from_prompt import extract_regex_from_text

class RegexExtractionAPIView(APIView):
    def post(self, request):
        prompt = request.data.get("text")
        if not prompt:
            return Response({"error": "Missing 'text' in request."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            regex = extract_regex_from_text(prompt)
            return Response({"regex": regex})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

