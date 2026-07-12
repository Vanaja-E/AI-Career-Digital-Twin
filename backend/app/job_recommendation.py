jobs = [
    {
        "title": "Python Full Stack Developer",
        "company": "Infosys",
        "location": "Bangalore",
        "salary": "₹6 - 10 LPA",
        "skills": [
            "Python",
            "FastAPI",
            "SQL",
            "Git",
            "HTML",
            "CSS",
            "JavaScript"
        ]
    },

    {
        "title": "Frontend Developer",
        "company": "TCS",
        "location": "Hyderabad",
        "salary": "₹5 - 8 LPA",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Git"
        ]
    },

    {
        "title": "Backend Developer",
        "company": "Accenture",
        "location": "Bangalore",
        "salary": "₹7 - 12 LPA",
        "skills": [
            "Python",
            "FastAPI",
            "SQL",
            "Docker",
            "AWS"
        ]
    },

    {
        "title": "Data Scientist",
        "company": "Wipro",
        "location": "Pune",
        "salary": "₹8 - 14 LPA",
        "skills": [
            "Python",
            "NumPy",
            "Pandas",
            "Machine Learning",
            "NLP"
        ]
    }
]


def recommend_jobs(user_skills):

    recommendations = []

    user_skills = [skill.lower() for skill in user_skills]

    for job in jobs:

        matched = []

        missing = []

        for skill in job["skills"]:

            if skill.lower() in user_skills:
                matched.append(skill)
            else:
                missing.append(skill)

        score = round(
            len(matched) /
            len(job["skills"]) * 100
        )

        recommendations.append({
            "title": job["title"],
            "company": job["company"],
            "location": job["location"],
            "salary": job["salary"],
            "match_score": score,
            "matched_skills": matched,
            "missing_skills": missing
        })

    recommendations.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return recommendations