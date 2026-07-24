import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_response(prompt: str):
    try:
        response = client.models.generate_content(
            model="gemini-flash-latest",   # No "models/" prefix
            contents=prompt,
        )

        return response.text

    except Exception as e:
        return f"Gemini Error: {str(e)}"