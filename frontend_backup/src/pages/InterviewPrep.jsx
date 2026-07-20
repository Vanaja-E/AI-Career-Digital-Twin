import { useContext, useState } from "react";
import axios from "axios";
import { ResumeContext } from "../context/ResumeContext";
import "../styles/InterviewPrep.css";

function InterviewPrep() {
  const { resumeData } = useContext(ResumeContext);

  const [questions, setQuestions] = useState({});

  const getQuestions = async () => {
    if (!resumeData) {
      alert("Please upload your resume first.");
      return;
    }

    try {
      const response = await axios.post(
        "https://ai-career-digital-twin-7q8b.onrender.com/interview-prep",
        {
          skills: resumeData.skills,
        }
      );

      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch interview questions.");
    }
  };

  return (
    <div className="interview-container">

      <h1>🎤 Interview Preparation</h1>

      <p>
        Practice interview questions based on your resume skills.
      </p>

      {resumeData && (
        <>
          <h3>Your Skills</h3>

          <div className="skill-list">
            {resumeData.skills.map((skill, index) => (
              <span key={index} className="skill-chip">
                {skill}
              </span>
            ))}
          </div>
        </>
      )}

      <button
        className="question-btn"
        onClick={getQuestions}
      >
        Generate Questions
      </button>

      {Object.keys(questions).length > 0 &&
        Object.entries(questions).map(([skill, questionList]) => (
          <div className="question-card" key={skill}>

            <h2>{skill}</h2>

            <ol>
              {questionList.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ol>

          </div>
        ))}

    </div>
  );
}

export default InterviewPrep;