import { useState, useContext } from "react";
import axios from "axios";
import "../styles/SkillGap.css";
import { ResumeContext } from "../context/ResumeContext";

function SkillGap() {
  const { resumeData } = useContext(ResumeContext);

  const [role, setRole] = useState("Python Full Stack Developer");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSkillGap = async () => {
    if (!resumeData) {
      alert("Please upload your resume first.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://ai-career-digital-twin-7q8b.onrender.com/skill-gap",
        {
          resume_text: resumeData.resume_text,
          target_role: role,
        }
      );
      console.log("API Response:", response.data);
      setResult(response.data);
      
    } catch (error) {
      console.error(error);
      alert("Skill Gap Analysis Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skill-gap-container">
      <h1>🎯 Skill Gap Analyzer</h1>

      <p>
        Select your target career and get an AI-powered analysis of your
        strengths, missing skills, roadmap, projects and interview preparation.
      </p>

      {resumeData && (
        <>
          <h3>💻 Skills Detected</h3>

          <div className="skills-box">
            {resumeData.skills.map((skill, index) => (
              <span key={index} className="green-skill">
                {skill}
              </span>
            ))}
          </div>
        </>
      )}

      <div className="selector">
        <label>Select Target Role</label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Python Full Stack Developer</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Data Scientist</option>
        </select>
      </div>

      <button onClick={analyzeSkillGap}>
        {loading ? "Analyzing..." : "Analyze Skill Gap"}
      </button>

      {result && (
        <div className="result-card">

          <h2>🎯 {role}</h2>

          <h3>
            Readiness Score : {result.readiness_score}%
          </h3>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${result.readiness_score}%`,
              }}
            ></div>
          </div>

          <p className="ready-text">
            {result.readiness_score >= 80
              ? "🟢 Excellent! You are almost job ready."
              : result.readiness_score >= 60
              ? "🟡 Good progress. Keep learning."
              : "🔴 Keep improving your skills."}
          </p>

          <hr />

          <h3>💪 Strengths</h3>

          <ul className="recommendation-list">
            {result.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <hr />

          <h3>❌ Missing Skills</h3>

          <div className="skills-box">
            {result.missing_skills.map((skill, index) => (
              <span key={index} className="red-skill">
                {skill}
              </span>
            ))}
          </div>

          <hr />

                    <h3>📚 Learning Roadmap</h3>

          <ul className="recommendation-list">
            {result.learning_roadmap.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <hr />

          <h3>🚀 Recommended Projects</h3>

          <ul className="recommendation-list">
            {result.recommended_projects.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <hr />

          <h3>📜 Recommended Certifications</h3>

          <ul className="recommendation-list">
            {result.certifications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <hr />

          <h3>🎤 Interview Questions</h3>

          <ul className="recommendation-list">
            {result.interview_questions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <hr />

          <h3>🤖 AI Career Advice</h3>

          <div className="ai-analysis">
            <pre>{result.career_advice}</pre>
          </div>

          <div className="success-box">
            ✅ Skill Gap Analysis Completed Successfully
          </div>

        </div>
      )}
    </div>
  );
}

export default SkillGap;