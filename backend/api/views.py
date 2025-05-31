# Create your views here.
# backend/api/views.py
from django.shortcuts import render



from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from llm.regex_from_prompt import parse_instruction
from regex_platform.utils.response import success, error

from django.conf import settings
from django.utils import timezone

import json, re
import shutil
import os


# admin back-stage management
from .models import RegexCallHistory
from .models import ModifiedFileRecord
from .models import UploadRecord 


def home(request):
    return HttpResponse("Welcome to the Pattern Replacer Backend!")



@csrf_exempt
def upload_chunk(request):
    if request.method == 'POST':
        file_id = request.POST.get('file_id')
        chunk_index = request.POST.get('chunk_index')
        chunk_file = request.FILES.get('file')

        if not all([file_id, chunk_index, chunk_file]):
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        upload_dir = os.path.join(settings.MEDIA_ROOT, 'uploads', file_id)
        os.makedirs(upload_dir, exist_ok=True)

        chunk_path = os.path.join(upload_dir, f'chunk_{chunk_index}')
        with open(chunk_path, 'wb+') as destination:
            for chunk in chunk_file.chunks():
                destination.write(chunk)

        return JsonResponse({'message': 'Chunk uploaded successfully'})

    return JsonResponse({'error': 'Invalid request method'}, status=405)



@csrf_exempt
def merge_chunks(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST allowed'}, status=405)

    file_id = request.POST.get('file_id')
    total_chunks = request.POST.get('total_chunks')
    filename = request.POST.get('filename')

    if not all([file_id, total_chunks, filename]):
        UploadRecord.objects.create(
            file_name=filename or 'Unknown',
            uploaded_at=timezone.now(),
            file_size=0,
            status='failed',
            )
        return JsonResponse({'error': 'Missing parameters'}, status=400)

    try:
        total_chunks = int(total_chunks)
    except ValueError:
        return JsonResponse({'error': 'total_chunks must be int'}, status=400)


    upload_dir = os.path.join('media', 'uploads', file_id)
    target_path = os.path.join('media', filename)

    with open(target_path, 'wb') as target_file:
        for i in range(total_chunks):
        
            chunk_path = os.path.join(upload_dir, f"chunk_{i}")
            if not os.path.exists(chunk_path):
                return JsonResponse({'error': f'Missing chunk {i}'}, status=400)

            with open(chunk_path, 'rb') as source:
                target_file.write(source.read())


    

    shutil.rmtree(upload_dir)
    UploadRecord.objects.create(
    file_name=filename,
    uploaded_at=timezone.now(),
    file_size=os.path.getsize(target_path),
    status='success',
)

    return JsonResponse({'message': 'File merged successfully', 'path': target_path})



@csrf_exempt
def modify_table(request):
    if request.method != 'POST':
        return error("Only POST allowed", code=405)

    # Predefined, to avoid undefined variables in except
    instruction = ""
    file_name = ""
    
    try:
        body = json.loads(request.body)
        table = body.get("table_data")
        instruction = body.get("instruction", "")
        file_name = body.get("filename", "unknown")

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
            if len(row) > col_idx:
                value = str(row[col_idx])  # 强制转换为字符串
                row[col_idx] = compiled.sub(replacement, value)
            new_rows.append(row)


        # success record
        RegexCallHistory.objects.create(
            file_name=file_name,
            prompt=instruction,
            regex=regex,
            replacement=replacement,
            column_name=column_name,
            pattern_type=pattern_type,
            status='success',
        )
        
        ModifiedFileRecord.objects.create(
    file_name=file_name,
    modified_data=[header] + new_rows,
    regex=regex,
    replacement=replacement,
    column_name=column_name,
    pattern_type=pattern_type,
    prompt=instruction,
    status='success'
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
        # fail record
        RegexCallHistory.objects.create(
            file_name=file_name,
            prompt=instruction,
            regex='',
            replacement='',
            column_name='',
            pattern_type='',
            status='failed',
            error_message=str(e)
        )
        ModifiedFileRecord.objects.create(
    file_name=file_name,
    modified_data=[header] + new_rows,
    regex=regex,
    replacement=replacement,
    column_name=column_name,
    pattern_type=pattern_type,
    prompt=instruction,
    status='failed',
    error_message=str(e)
)
        return error(str(e), code=500)
