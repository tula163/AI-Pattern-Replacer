from django.shortcuts import render

# Create your views here.
# backend/api/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json, re

# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from llm.regex_from_prompt import extract_regex_from_text
from llm.regex_from_prompt import parse_instruction
from regex_platform.utils.response import success, error


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



@csrf_exempt
def modify_table(request):
    if request.method != 'POST':
        return error("Only POST allowed", code=405)

    try:
        body = json.loads(request.body)
        table = body.get("table_data")
        instruction = body.get("instruction")

        if not table or not instruction:
            return error("Missing table_data or instruction")

        header = table[0]
        rows = table[1:]

        result = parse_instruction(instruction, header)
        column_name = result["column"]
        regex = result["regex"]
        replacement = result["replacement"]
        pattern_type = result.get("pattern_type", "custom")

        if column_name not in header:
            return error(f"Column '{column_name}' not found in table header")

        col_idx = header.index(column_name)
        compiled = re.compile(regex)
        new_rows = []

        for row in rows:
            if len(row) > col_idx and isinstance(row[col_idx], str):
                row[col_idx] = compiled.sub(replacement, row[col_idx])
            new_rows.append(row)

        return success({
            "modified_data": [header] + new_rows,
            "regex": regex,
            "parsed": {
                "column": column_name,
                "replacement": replacement,
                "pattern_type": pattern_type,
            }
        })

    except Exception as e:
        return error(str(e), code=500)
