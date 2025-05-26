# llm/regex_from_prompt.py
from .gpt_client import call_gpt

# def extract_regex_from_text(text: str) -> str:
#     prompt = f"Convert this to regex: {text}"
#     return call_gpt(prompt)

def extract_regex_from_text(prompt: str) -> str:
    instruction = f"Convert the following natural language instruction to a regex pattern:\nInstruction: {prompt}"
    regex = call_gpt(instruction)
    return regex
