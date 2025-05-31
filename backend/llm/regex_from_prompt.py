# llm/regex_from_prompt.py
from .gpt_client import call_gpt
import json



def parse_instruction(instruction: str, headers: list[str]) -> dict:
    prompt = f"""
You are a professional regular expression generator.

A user provides the following instruction:

"{instruction}"

The table has the following columns: {headers}

Your job:
1. Detect which column this instruction is targeting.
2. Understand what kind of data to match (e.g., email, phone, keyword).
3. Generate a correct and robust regular expression for that pattern.
4. Suggest the replacement value.

Regex should include boundaries like \\b if necessary, to avoid partial matches.
⚠️ DO NOT explain anything. Just return JSON strictly in the following format:

{{
  "column": "Phone",
  "pattern_type": "phone",
  "regex": "<your generated regex here>",
  "replacement": "REDACTED"
}}

No Markdown, no extra text.
Only raw JSON that can be parsed by Python.
"""
    response = call_gpt(prompt)
    try:
        return json.loads(response)
    except json.JSONDecodeError:
        raise ValueError("!!!! Failed to parse GPT response:\n" + response)
