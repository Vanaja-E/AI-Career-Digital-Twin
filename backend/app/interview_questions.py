questions = {
    "Python": [
        "What are Python decorators?",
        "Explain list vs tuple.",
        "What are generators?",
        "Explain exception handling.",
        "What is the difference between *args and **kwargs?"
    ],

    "JavaScript": [
        "Explain closures.",
        "What is hoisting?",
        "Difference between var, let and const.",
        "Explain promises.",
        "What is async/await?"
    ],

    "React": [
        "What are Hooks?",
        "Difference between state and props?",
        "What is Virtual DOM?",
        "Explain useEffect().",
        "What is Context API?"
    ],

    "SQL": [
        "Difference between DELETE, TRUNCATE and DROP?",
        "Explain JOIN types.",
        "What is normalization?",
        "Difference between WHERE and HAVING?",
        "Explain indexing."
    ],

    "AWS": [
        "What is EC2?",
        "Difference between S3 and EBS?",
        "Explain IAM.",
        "What is VPC?",
        "What is Auto Scaling?"
    ],

    "FastAPI": [
        "Why FastAPI is faster?",
        "Difference between GET and POST?",
        "Explain APIRouter.",
        "What is dependency injection?",
        "How does FastAPI perform validation?"
    ]
}


def get_questions(user_skills):

    result = {}

    for skill in user_skills:

        if skill in questions:
            result[skill] = questions[skill]

    return result