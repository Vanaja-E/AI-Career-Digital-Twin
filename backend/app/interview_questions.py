from app.services.gemini_service import generate_response
import json
import re


def get_questions(resume_text, target_role):

    prompt = f"""
You are an expert technical interviewer.

Generate interview questions for this candidate.

Resume:
{resume_text}

Target Role:
{target_role}

Return ONLY valid JSON.

Format:

{{
    "technical_questions":[
        "...",
        "...",
        "..."
    ],
    "coding_questions":[
        "...",
        "...",
        "..."
    ],
    "hr_questions":[
        "...",
        "...",
        "..."
    ],
    "scenario_questions":[
        "...",
        "...",
        "..."
    ],
    "interview_tips":[
        "...",
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
            "technical_questions": [],
            "coding_questions": [],
            "hr_questions": [],
            "scenario_questions": [],
            "interview_tips": []
        }