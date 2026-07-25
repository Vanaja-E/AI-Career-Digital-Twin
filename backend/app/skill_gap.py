from app.services.gemini_service import generate_response
import json
import re


def generate_ai_skill_gap(resume_text, target_role):

    prompt = f"""
You are an expert AI Career Coach.

Analyze the following resume for the target role.

Resume:
{resume_text}

Target Role:
{target_role}

Return ONLY valid JSON.

Format:

{{
    "readiness_score":85,
    "strengths":[
        "...",
        "..."
    ],
    "missing_skills":[
        "...",
        "..."
    ],
    "learning_roadmap":[
        "...",
        "..."
    ],
    "recommended_projects":[
        "...",
        "..."
    ],
    "certifications":[
        "...",
        "..."
    ],
    "interview_questions":[
        "...",
        "..."
    ],
    "career_advice":"..."
}}

Do not write markdown.
Do not write explanations.
Return JSON only.
"""

    response = generate_response(prompt)

    try:
        cleaned = re.sub(r"```json|```", "", response).strip()
        return json.loads(cleaned)

    except Exception:

        return {
            "readiness_score": 0,
            "strengths": [],
            "missing_skills": [],
            "learning_roadmap": [],
            "recommended_projects": [],
            "certifications": [],
            "interview_questions": [],
            "career_advice": response
        }