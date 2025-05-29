# llm/regex_from_prompt.py
from .gpt_client import call_gpt
import json

# def extract_regex_from_text(text: str) -> str:
#     prompt = f"Convert this to regex: {text}"
#     return call_gpt(prompt)

def extract_regex_from_text(prompt: str) -> str:
    instruction = f"Convert the following natural language instruction to a regex pattern:\nInstruction: {prompt}"
    regex = call_gpt(instruction)
    return regex





def parse_instruction(instruction: str, headers: list[str]) -> dict:
    # 构造 prompt（根据指令 + 表头）
    prompt = f"""
You are a regex assistant. The user has a table with the following columns: {headers}.
Instruction: "{instruction}"

Your task:
1. Identify the target column name from the instruction.
2. Identify the type of pattern (e.g., email, phone, date, keyword).
3. Generate the proper regular expression pattern for the pattern type:
    - For email, return: \\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{{2,7}}\\b
    - For phone, return: \\b\\d{{10}}\\b
    - For keyword match like "milk", just return "milk"

Return the result strictly as JSON in this format:
{{
  "column": "Email",
  "pattern_type": "email",
  "regex": "...",
  "replacement": "REDACTED"
}}

DO NOT return explanation, markdown, or any text. Only raw JSON.
"""



    response = call_gpt(prompt)
    try:
        return json.loads(response)
    except json.JSONDecodeError:
        raise ValueError("❌ Failed to parse GPT response:\n" + response)
