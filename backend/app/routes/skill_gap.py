from fastapi import APIRouter

from app.skill_gap import analyze_skill_gap

router = APIRouter()


@router.post("/skill-gap")
async def skill_gap(data: dict):

    resume_skills = data.get("skills", [])

    target_role = data.get("target_role", "")

    result = analyze_skill_gap(resume_skills, target_role)

    return result