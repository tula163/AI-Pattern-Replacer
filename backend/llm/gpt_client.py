from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"  # 确保是 OpenRouter 的地址
)

def call_gpt(prompt: str, model: str = "mistralai/mistral-7b-instruct") -> str:
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=256,
        )
        return response.choices[0].message.content
    except Exception as e:
        print("❌ OpenAI Error:", str(e))
        raise


