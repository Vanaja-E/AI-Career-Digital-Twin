from fastapi import APIRouter
from app.interview_questions import get_questions

router = APIRouter()

@router.post("/interview-prep")
async def interview_prep(data: dict):
    user_skills = data.get("skills", [])
    result = get_questions(user_skills)
    return {"questions": result}