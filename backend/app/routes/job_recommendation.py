from fastapi import APIRouter

from app.job_recommendation import recommend_jobs

router = APIRouter()


@router.post("/job-recommendation")
async def job_recommendation(data: dict):

    user_skills = data.get("skills", [])

    recommendations = recommend_jobs(user_skills)

    return {
        "recommendations": recommendations
    }