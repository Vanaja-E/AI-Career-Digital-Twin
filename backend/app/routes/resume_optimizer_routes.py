
from fastapi import APIRouter
from app.resume_optimizer import optimize_resume

router = APIRouter()


@router.post("/resume-optimizer")
async def resume_optimizer(data: dict):

    resume_text = data.get("resume_text", "")
    target_role = data.get("target_role", "")

    result = optimize_resume(
        resume_text,
        target_role
    )

    return result