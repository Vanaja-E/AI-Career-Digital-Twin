from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

print("✅ MAIN.PY LOADED")

from app.database import engine
from app.models import Base

from app.routes.users import router as user_router
from app.routes.resume import router as resume_router
from app.routes.skill_gap import router as skill_gap_router
from app.routes.career_roadmap import router as career_router
from app.routes.job_recommendation import router as job_router
from app.routes.interview_prep import router as interview_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Career Digital Twin API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "ai-career-digital-twin-beqvbwrwf-vanaja.vercel.app",
    "https://ai-career-digital-twin-self.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(user_router)
app.include_router(resume_router)
app.include_router(skill_gap_router)
app.include_router(career_router)
app.include_router(job_router)
app.include_router(interview_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Career Digital Twin 🚀"
    }


@app.get("/test-db")
def test_db():
    return {
        "message": "Database Connected Successfully ✅"
    }