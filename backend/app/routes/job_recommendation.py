from fastapi import APIRouter
from app.services.gemini_service import generate_response
import json

router = APIRouter()

@router.post("/job-recommendation")
async def job_recommendation(data: dict):

    resume_text = data.get("resume_text", "")
    target_role = data.get("target_role", "")

    prompt = f"""
You are an AI Career Coach.

Analyze the resume and recommend suitable jobs.

Resume:
{resume_text}

Target Role:
{target_role}

Return ONLY valid JSON.

{{
    "match_score": 0,
    "recommended_roles": [],
    "strengths": [],
    "missing_skills": [],
    "salary_range": "",
    "recommended_projects": [],
    "career_advice": []
}}
"""

    response = generate_response(prompt)

    return json.loads(response)