from fastapi import APIRouter
from app.interview_questions import get_questions

router = APIRouter()


@router.post("/interview-prep")
async def interview_prep(data: dict):

    resume_text = data.get("resume_text", "")
    target_role = data.get("target_role", "")

    return get_questions(
        resume_text,
        target_role
    )