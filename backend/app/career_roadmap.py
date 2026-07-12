roadmaps = {
    "Python Full Stack Developer": [
        "Python",
        "OOP",
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "FastAPI",
        "SQL",
        "Git & GitHub",
        "Docker",
        "Build 3 Projects",
        "Internship",
        "Job Ready 🚀"
    ],

    "Frontend Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "Bootstrap",
        "React",
        "Redux",
        "REST APIs",
        "Git & GitHub",
        "Portfolio Website",
        "Internship",
        "Job Ready 🚀"
    ],

    "Backend Developer": [
        "Python",
        "OOP",
        "FastAPI",
        "Node.js",
        "SQL",
        "MongoDB",
        "REST APIs",
        "Docker",
        "AWS Basics",
        "Internship",
        "Job Ready 🚀"
    ],

    "Data Scientist": [
        "Python",
        "NumPy",
        "Pandas",
        "Matplotlib",
        "Statistics",
        "Machine Learning",
        "Deep Learning",
        "NLP",
        "Projects",
        "Internship",
        "Job Ready 🚀"
    ]
}


def get_roadmap(role):
    return roadmaps.get(role, [])