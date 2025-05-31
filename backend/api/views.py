from django.shortcuts import render

# Create your views here.
# backend/api/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json, re

# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from llm.regex_from_prompt import extract_regex_from_text
from llm.regex_from_prompt import parse_instruction
from regex_platform.utils.response import success, error
from .models import UploadedFile  # 👈 添加导入

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





@csrf_exempt
def modify_table(request):
    if request.method != 'POST':
        return error("Only POST allowed", code=405)

    try:
        body = json.loads(request.body)
        table = body.get("table_data")
        instruction = body.get("instruction")
        file_name = body.get("file_name")  # ✅ 新增：获取文件名

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

        # ✅ 保存上传记录到数据库（可选字段 file_name）
        if file_name:
            UploadedFile.objects.create(
                file_name=file_name,
                status="processed"
            )

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
