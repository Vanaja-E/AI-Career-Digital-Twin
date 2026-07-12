import { useState, useContext } from "react";
import axios from "axios";
import "../styles/SkillGap.css";
import { ResumeContext } from "../context/ResumeContext";

function SkillGap() {
  const { resumeData } = useContext(ResumeContext);

  const [role, setRole] = useState("Python Full Stack Developer");
  const [result, setResult] = useState(null);

  const analyzeSkillGap = async () => {

    if (!resumeData) {
      alert("Please upload your resume first.");
      return;
    }

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/skill-gap",
        {
          skills: resumeData.skills,
          target_role: role,
        }
      );

      setResult(response.data);

    } catch (error) {

      console.log(error);
      alert("Skill Gap Analysis Failed!");

    }
  };

  const calculateMatchScore = () => {

    if (!result) return 0;

    const total =
      result.matched_skills.length +
      result.missing_skills.length;

    if (total === 0) return 0;

    return Math.round(
      (result.matched_skills.length / total) * 100
    );
  };

  return (
    <div className="skill-gap-container">

      <h1>🎯 Skill Gap Analysis</h1>

      <p>Select your target role.</p>

      {resumeData && (
        <>
          <h3>Detected Skills</h3>

          <div className="skills-box">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="green-skill"
              >
                {skill}
              </span>
            ))}
          </div>
        </>
      )}

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option>Python Full Stack Developer</option>
        <option>Frontend Developer</option>
        <option>Backend Developer</option>
        <option>Data Scientist</option>
      </select>

      <button onClick={analyzeSkillGap}>
        Analyze Skill Gap
      </button>

      {result && (
        <div className="result-card">

          <h2>{result.target_role}</h2>

          <h3 className="match-score">
            🎯 Match Score: {calculateMatchScore()}%
          </h3>

          <h3>✅ Skills You Have</h3>

          <div className="skills-box">
            {result.matched_skills.map((skill, index) => (
              <span
                key={index}
                className="green-skill"
              >
                {skill}
              </span>
            ))}
          </div>

          <h3>❌ Missing Skills</h3>

          <div className="skills-box">
            {result.missing_skills.map((skill, index) => (
              <span
                key={index}
                className="red-skill"
              >
                {skill}
              </span>
            ))}
          </div>

          <h3>📚 Recommended Skills to Learn</h3>

          <ul className="recommendation-list">
            {result.missing_skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

        </div>
      )}

    </div>
  );
}

export default SkillGap;