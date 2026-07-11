from fastapi import APIRouter, UploadFile, File
import os
import shutil
import fitz

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


@router.post("/upload-resume")
async def upload_resume(resume: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, resume.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    document = fitz.open(file_path)

    text = ""

    for page in document:
        text += page.get_text()

    document.close()

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

    ats_score, suggestions = calculate_ats_score(resume_data)

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
    }