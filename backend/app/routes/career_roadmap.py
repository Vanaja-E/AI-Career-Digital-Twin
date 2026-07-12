from fastapi import APIRouter

from app.career_roadmap import get_roadmap

router = APIRouter()


@router.post("/career-roadmap")
async def career_roadmap(data: dict):

    target_role = data.get("target_role", "")

    roadmap = get_roadmap(target_role)

    return {
        "target_role": target_role,
        "roadmap": roadmap
    }