from app.services.gemini_service import generate_response
import json
import re


def optimize_resume(resume_text, target_role):

    prompt = f"""
You are an expert ATS Resume Optimizer.

Optimize the following resume for the target role.

Resume:
{resume_text}

Target Role:
{target_role}

Return ONLY valid JSON.

Format:

{{
  "ats_score": 90,
  "professional_summary": "...",
  "optimized_skills": [
    "...",
    "..."
  ],
  "missing_keywords": [
    "...",
    "..."
  ],
  "experience_improvements": [
    "...",
    "..."
  ],
  "resume_tips": [
    "...",
    "..."
  ],
  "optimized_resume": "..."
}}

Do not return markdown.
Return JSON only.
"""

    response = generate_response(prompt)

    try:
        cleaned = re.sub(r"```json|```", "", response).strip()
        return json.loads(cleaned)

    except Exception:
        return {
            "ats_score": 0,
            "professional_summary": "",
            "optimized_skills": [],
            "missing_keywords": [],
            "experience_improvements": [],
            "resume_tips": [],
            "optimized_resume": response
        }