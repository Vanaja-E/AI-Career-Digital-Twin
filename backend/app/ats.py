def calculate_ats_score(data):

    score = 0
    suggestions = []

    # Name
    if data["name"] != "Not Found":
        score += 10
    else:
        suggestions.append("Add your full name.")

    # Email
    if data["email"] != "Not Found":
        score += 10
    else:
        suggestions.append("Add a valid email address.")

    # Phone
    if data["phone"] != "Not Found":
        score += 10
    else:
        suggestions.append("Add your phone number.")

    # Skills
    if len(data["skills"]) >= 5:
        score += 20
    elif len(data["skills"]) > 0:
        score += 10
        suggestions.append("Add more technical skills.")
    else:
        suggestions.append("Skills section is missing.")

    # Education
    if len(data["education"]) > 0:
        score += 15
    else:
        suggestions.append("Add your education details.")

    # Experience
    if len(data["experience"]) > 0:
        score += 15
    else:
        suggestions.append("Mention your work experience.")

    # Projects
    if len(data["projects"]) > 0:
        score += 10
    else:
        suggestions.append("Add at least one project.")

    # Certificates
    if len(data["certificates"]) > 0:
        score += 10
    else:
        suggestions.append("Include your certifications.")

    return score, suggestions