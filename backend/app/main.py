from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Welcome to AI Career Digital Twin Backend 🚀"}


@app.get("/about")
def about():
    return {
        "project": "AI Career Digital Twin",
        "version": "1.0",
        "developer": "Vanaja"
    }