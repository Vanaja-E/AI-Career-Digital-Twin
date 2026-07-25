from fastapi import APIRouter
from app.skill_gap import generate_ai_skill_gap

router = APIRouter()


@router.post("/skill-gap")
async def skill_gap(data: dict):

    resume_text = data.get("resume_text", "")
    target_role = data.get("target_role", "")

    result = generate_ai_skill_gap(
        resume_text,
        target_role
    )

    return result