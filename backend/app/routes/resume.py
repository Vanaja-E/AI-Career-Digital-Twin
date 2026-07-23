from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import os
import shutil
import fitz

from app.database import SessionLocal
from app.models import Resume

from app.parser import (
    extract_name,
    extract_email,
    extract_phone,
    extract_skills,
    extract_education,
    extract_experience,
    extract_projects,
    extract_certificates,
)

from app.ats import calculate_ats_score

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# Database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/upload-resume")
async def upload_resume(
    user_id: int,
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # Save uploaded file
    file_path = os.path.join(UPLOAD_FOLDER, resume.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    # Read PDF
    document = fitz.open(file_path)

    text = ""
    for page in document:
        text += page.get_text()

    document.close()

    # Extract resume information
    name = extract_name(text)
    email = extract_email(text)
    phone = extract_phone(text)
    skills = extract_skills(text)
    education = extract_education(text)
    experience = extract_experience(text)
    projects = extract_projects(text)
    certificates = extract_certificates(text)

    resume_data = {
        "name": name,
        "email": email,
        "phone": phone,
        "skills": skills,
        "education": education,
        "experience": experience,
        "projects": projects,
        "certificates": certificates,
    }

    # Calculate ATS Score
    ats_score, suggestions = calculate_ats_score(resume_data)

    # Save to database
    resume_record = Resume(
        user_id=user_id,
        filename=resume.filename,
        resume_text=text,
        ats_score=ats_score,
        skills=", ".join(skills) if isinstance(skills, list) else str(skills),
        suggestions="\n".join(suggestions) if isinstance(suggestions, list) else str(suggestions),
        summary=""
    )

    db.add(resume_record)
    db.commit()
    db.refresh(resume_record)

    return {
        "filename": resume.filename,
        "message": "Resume uploaded successfully!",
        "name": name,
        "email": email,
        "phone": phone,
        "skills": skills,
        "education": education,
        "experience": experience,
        "projects": projects,
        "certificates": certificates,
        "ats_score": ats_score,
        "suggestions": suggestions,
        "text": text,
        "resume_id": resume_record.id,
        "user_id": user_id
    }