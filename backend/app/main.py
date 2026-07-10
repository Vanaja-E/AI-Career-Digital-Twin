from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.models import Base
from app.routes.users import router as user_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Career Digital Twin API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)


@app.get("/")
def home():
    return {"message": "Welcome to AI Career Digital Twin 🚀"}


@app.get("/test-db")
def test_db():
    return {"message": "Database Connected Successfully ✅"}