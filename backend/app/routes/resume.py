from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post("/upload-resume")
async def upload_resume(resume: UploadFile = File(...)):

    return {
        "filename": resume.filename,
        "message": "Resume uploaded successfully!"
    }