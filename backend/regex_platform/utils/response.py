from django.http import JsonResponse
from typing import Any, Optional


def base_response(
    code: int = 200,
    message: str = "Success",
    data: Optional[Any] = None,
    trace_id: Optional[str] = None,
    extra: Optional[dict] = None,
):
    """
    统一结构返回，支持扩展字段（trace_id, extra）
    """
    response = {
        "code": code,
        "message": message,
        "data": data,
    }
    if trace_id:
        response["trace_id"] = trace_id
    if extra:
        response.update(extra)

    return JsonResponse(response, status=code)


def success(data: Any = None, message: str = "Success", trace_id: Optional[str] = None):
    return base_response(200, message, data, trace_id)


def error(message: str = "Error", code: int = 400, data: Any = None, trace_id: Optional[str] = None):
    return base_response(code, message, data, trace_id)
