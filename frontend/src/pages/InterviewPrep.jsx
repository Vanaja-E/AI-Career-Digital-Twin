import { useContext, useState } from "react";
import axios from "axios";
import { ResumeContext } from "../context/ResumeContext";
import "../styles/InterviewPrep.css";

function InterviewPrep() {
  const { resumeData } = useContext(ResumeContext);

  const [role, setRole] = useState("Backend Developer");
  const [questions, setQuestions] = useState(null);

  const getQuestions = async () => {
  if (!resumeData) {
    alert("Please upload your resume first.");
    return;
  }

  try {
    const response = await axios.post(
      "https://ai-career-digital-twin-7q8b.onrender.com/interview-prep",
      {
        resume_text: resumeData.resume_text,
        target_role: role,
      }
    );

    setQuestions(response.data);
  } catch (error) {
    console.error(error);
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

      <h3>Select Target Role</h3>

       <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="role-select"
      >
        <option>Backend Developer</option>
        <option>Frontend Developer</option>
        <option>Full Stack Developer</option>
        <option>Python Developer</option>
        <option>Data Scientist</option>
        <option>Machine Learning Engineer</option>
      </select>

      <button
        className="question-btn"
        onClick={getQuestions}
      >
        Generate Questions
      </button>

      {questions && (
  <>
    <div className="question-card">
      <h2>💻 Technical Questions</h2>
      <ol>
        {questions.technical_questions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ol>
    </div>

    <div className="question-card">
      <h2>🧠 Coding Questions</h2>
      <ol>
        {questions.coding_questions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ol>
    </div>

    <div className="question-card">
      <h2>👨‍💼 HR Questions</h2>
      <ol>
        {questions.hr_questions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ol>
    </div>

    <div className="question-card">
      <h2>⚡ Scenario Questions</h2>
      <ol>
        {questions.scenario_questions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ol>
    </div>

    <div className="question-card">
      <h2>💡 Interview Tips</h2>
      <ul>
        {questions.interview_tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  </>
)}

    </div>
  );
}

export default InterviewPrep;