# backend/llm/regex_from_prompt.py
from .gpt_client import call_gpt

def generate_regex_from_description(prompt: str) -> str:
    prompt = (
        f"Please output only the regular expression pattern for matching the following requirement.\n"
        f"Requirement: {prompt}\n"
        f"Regex:"
    )
    return call_gpt(prompt)

