import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

print("Loaded API Key:", api_key[:10] + "..." if api_key else "Not Found")

client = genai.Client(
    api_key=api_key
)


def generate_response(prompt: str):
    try:
        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt,
        )

        if hasattr(response, "text") and response.text:
            return response.text

        return "No response generated."

    except Exception as e:
        return f"Gemini Error: {e}"