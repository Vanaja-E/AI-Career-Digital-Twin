import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";
import "../styles/ResumeScore.css";

function ResumeScore() {
  const { resumeData } = useContext(ResumeContext);

  if (!resumeData) {
    return (
      <div className="score-container">
        <div className="score-card">
          <h1>📊 Resume Score</h1>
          <p>Please upload your resume first.</p>
        </div>
      </div>
    );
  }

  const contactScore =
    resumeData.name !== "Not Found" &&
    resumeData.email !== "Not Found" &&
    resumeData.phone !== "Not Found"
      ? 20
      : 10;

  const skillScore = Math.min(resumeData.skills.length * 2, 20);

  const educationScore =
    resumeData.education.length > 0 ? 15 : 0;

  const experienceScore =
    resumeData.experience.length > 0 ? 20 : 0;

  const projectScore =
    resumeData.projects.length > 0 ? 15 : 0;

  const certificateScore =
    resumeData.certificates.length > 0 ? 10 : 0;

  return (
    <div className="score-container">

      <h1>📊 Resume Score Report</h1>

      <div className="overall-score">

        <div className="circle-score">
          {resumeData.ats_score}
        </div>

        <h2>
          {resumeData.ats_score >= 80
            ? "Excellent Resume 🚀"
            : resumeData.ats_score >= 60
            ? "Good Resume 👍"
            : "Needs Improvement"}
        </h2>

      </div>

      <div className="score-grid">

        <div className="score-box">
          <h3>📇 Contact Information</h3>
          <p>{contactScore}/20</p>
        </div>

        <div className="score-box">
          <h3>💻 Skills</h3>
          <p>{skillScore}/20</p>
        </div>

        <div className="score-box">
          <h3>🎓 Education</h3>
          <p>{educationScore}/15</p>
        </div>

        <div className="score-box">
          <h3>💼 Experience</h3>
          <p>{experienceScore}/20</p>
        </div>

        <div className="score-box">
          <h3>📂 Projects</h3>
          <p>{projectScore}/15</p>
        </div>

        <div className="score-box">
          <h3>📜 Certificates</h3>
          <p>{certificateScore}/10</p>
        </div>

      </div>

      <div className="suggestion-card">

        <h2>💡 ATS Suggestions</h2>

        {resumeData.suggestions.length > 0 ? (
          <ul>
            {resumeData.suggestions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>✅ Excellent Resume! No suggestions.</p>
        )}

      </div>

    </div>
  );
}

export default ResumeScore;