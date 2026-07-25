from app.services.gemini_service import generate_response
import json
import re


def get_roadmap(resume_text, target_role):

    prompt = f"""
You are an expert career mentor.

Based on the candidate's resume and target role, generate a personalized career roadmap.

Resume:
{resume_text}

Target Role:
{target_role}

Return ONLY valid JSON.

Format:

{{
  "current_level": "...",
  "skills_to_learn": [
    "...",
    "..."
  ],
  "projects": [
    "...",
    "..."
  ],
  "certifications": [
    "...",
    "..."
  ],
  "monthly_plan": {{
    "month_1": [
      "...",
      "..."
    ],
    "month_2": [
      "...",
      "..."
    ],
    "month_3": [
      "...",
      "..."
    ]
  }},
  "career_tips": [
    "...",
    "..."
  ]
}}

Return JSON only.
"""

    response = generate_response(prompt)

    try:
        cleaned = re.sub(r"```json|```", "", response).strip()
        return json.loads(cleaned)
    except Exception:
        return {
            "current_level": "",
            "skills_to_learn": [],
            "projects": [],
            "certifications": [],
            "monthly_plan": {
                "month_1": [],
                "month_2": [],
                "month_3": []
            },
            "career_tips": []
        }