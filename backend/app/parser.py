import re

# ----------------------------
# Extract Name
# ----------------------------
def extract_name(text):
    lines = text.split("\n")

    for line in lines:
        line = line.strip()

        if len(line) > 3:
            return line

    return "Not Found"


# ----------------------------
# Extract Email
# ----------------------------
# def extract_email(text):

#     pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"

#     match = re.search(pattern, text)

#     if match:
#         return match.group()

#     return "Not Found"


def extract_email(text):

    # First try to find a valid email
    pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"

    match = re.search(pattern, text)

    if match:
        return match.group()

    # Second try: handle PDFs that remove the dot before com
    pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(?:com|in|org|edu)"

    match = re.search(pattern, text)

    if match:
        email = match.group()

        if email.endswith("com"):
            email = email[:-3] + ".com"

        elif email.endswith("in"):
            email = email[:-2] + ".in"

        elif email.endswith("org"):
            email = email[:-3] + ".org"

        elif email.endswith("edu"):
            email = email[:-3] + ".edu"

        return email

    return "Not Found"

# ----------------------------
# Extract Phone Number
# ----------------------------
def extract_phone(text):

    pattern = r"(\+91[- ]?)?[6-9]\d{9}"

    match = re.search(pattern, text)

    if match:
        return match.group()

    return "Not Found"


# ----------------------------
# Extract Skills
# ----------------------------
def extract_skills(text):

    skills_database = [

        "Python",
        "Java",
        "C",
        "C++",
        "JavaScript",
        "React",
        "HTML",
        "CSS",
        "SQL",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "Node.js",
        "Express",
        "FastAPI",
        "Django",
        "Flask",
        "Git",
        "GitHub",
        "Docker",
        "AWS",
        "Azure",
        "Linux",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "NLP",
        "Pandas",
        "NumPy",
        "OpenCV"

    ]

    found_skills = []

    resume = text.lower()

    for skill in skills_database:

        if skill.lower() in resume:
            found_skills.append(skill)

    return found_skills

# ----------------------------
# Extract Education
# ----------------------------
def extract_education(text):

    education_keywords = [
        "B.E",
        "B.Tech",
        "Bachelor",
        "BCA",
        "MCA",
        "M.Tech",
        "MBA",
        "PUC",
        "SSLC",
        "Degree"
    ]

    education = []

    lines = text.split("\n")

    for line in lines:
        for keyword in education_keywords:
            if keyword.lower() in line.lower():
                education.append(line.strip())

    return education


# ----------------------------
# Extract Experience
# ----------------------------
def extract_experience(text):

    experience = []

    lines = text.split("\n")

    capture = False

    for line in lines:

        if "WORK EXPERIENCE" in line.upper():
            capture = True
            continue

        if "EDUCATION" in line.upper():
            break

        if capture:
            if line.strip():
                experience.append(line.strip())

    return experience


# ----------------------------
# Extract Projects
# ----------------------------
def extract_projects(text):

    projects = []

    lines = text.split("\n")

    capture = False

    for line in lines:

        if "PROJECT" in line.upper():
            capture = True
            continue

        if "CERTIFICATE" in line.upper():
            break

        if capture:
            if line.strip():
                projects.append(line.strip())

    return projects


# ----------------------------
# Extract Certificates
# ----------------------------
def extract_certificates(text):

    certificates = []

    lines = text.split("\n")

    capture = False

    for line in lines:

        if "CERTIFICATE" in line.upper():
            capture = True
            continue

        if "DECLARATION" in line.upper():
            break

        if capture:
            if line.strip():
                certificates.append(line.strip())

    return certificates