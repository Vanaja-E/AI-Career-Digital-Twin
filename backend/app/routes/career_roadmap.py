from fastapi import APIRouter
from app.career_roadmap import get_roadmap

router = APIRouter()


@router.post("/career-roadmap")
async def career_roadmap(data: dict):

    resume_text = data.get("resume_text", "")
    target_role = data.get("target_role", "")

    return get_roadmap(
        resume_text,
        target_role
    )