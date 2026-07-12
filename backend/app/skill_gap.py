# Skills required for different job roles

JOB_SKILLS = {

    "Python Full Stack Developer": [
        "Python",
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "SQL",
        "Git"
    ],

    "Data Scientist": [
        "Python",
        "Pandas",
        "NumPy",
        "Machine Learning",
        "Deep Learning",
        "SQL",
        "TensorFlow"
    ],

    "Frontend Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Git"
    ],

    "Backend Developer": [
        "Python",
        "FastAPI",
        "SQL",
        "Git",
        "Docker"
    ]
}


def analyze_skill_gap(resume_skills, target_role):

    required_skills = JOB_SKILLS.get(target_role, [])

    matched_skills = []

    missing_skills = []

    for skill in required_skills:

        if skill in resume_skills:
            matched_skills.append(skill)

        else:
            missing_skills.append(skill)

    return {

        "target_role": target_role,

        "matched_skills": matched_skills,

        "missing_skills": missing_skills

    }