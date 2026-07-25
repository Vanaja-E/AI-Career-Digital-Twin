import { useState, useContext } from "react";
import axios from "axios";
import "../styles/ResumeOptimizer.css";
import { ResumeContext } from "../context/ResumeContext";

function ResumeOptimizer() {
  const { resumeData } = useContext(ResumeContext);

  const [role, setRole] = useState("Backend Developer");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const optimizeResume = async () => {
    if (!resumeData) {
      alert("Please upload your resume first.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://ai-career-digital-twin-7q8b.onrender.com/resume-optimizer",
        {
          resume_text: resumeData.resume_text,
          target_role: role,
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Resume Optimization Failed!");
    } finally {
      setLoading(false);
    }
  };

  const copyResume = () => {
    navigator.clipboard.writeText(result.optimized_resume);
    alert("Optimized Resume Copied!");
  };

  return (
    <div className="resume-optimizer-container">

      <h1>📝 AI Resume Optimizer</h1>

      <p>
        Optimize your resume using AI and make it ATS-friendly for your dream
        job.
      </p>

      {resumeData && (
        <>
          <h3>💻 Current Skills</h3>

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
          <option>Backend Developer</option>
          <option>Frontend Developer</option>
          <option>Python Full Stack Developer</option>
          <option>Data Scientist</option>
        </select>
      </div>

      <button onClick={optimizeResume}>
        {loading ? "Optimizing..." : "Optimize Resume"}
      </button>

      {result && (
        <div className="result-card">

          <h2>⭐ ATS Score</h2>

          <h1>{result.ats_score}%</h1>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${result.ats_score}%`,
              }}
            ></div>
          </div>

          <hr />

          <h2>📝 Professional Summary</h2>

          <div className="summary-box">
            <p>{result.professional_summary}</p>
          </div>

          <hr />

          <h2>💻 Optimized Skills</h2>

          <div className="skills-box">
            {result.optimized_skills.map((skill, index) => (
              <span key={index} className="green-skill">
                {skill}
              </span>
            ))}
          </div>

          <hr />

          <h2>🔍 Missing Keywords</h2>

          <div className="skills-box">
            {result.missing_keywords.map((keyword, index) => (
              <span key={index} className="red-skill">
                {keyword}
              </span>
            ))}
          </div>

          <hr />

                    <h2>🚀 Experience Improvements</h2>

          <ul className="recommendation-list">
            {result.experience_improvements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <hr />

          <h2>💡 Resume Tips</h2>

          <ul className="recommendation-list">
            {result.resume_tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>

          <hr />

          <h2>📄 Optimized Resume</h2>

          <div className="optimized-resume">
            <pre>{result.optimized_resume}</pre>
          </div>

          <button
            className="copy-btn"
            onClick={copyResume}
          >
            📋 Copy Optimized Resume
          </button>

          <div className="success-box">
            ✅ Resume Optimized Successfully
          </div>

        </div>
      )}

    </div>
  );
}

export default ResumeOptimizer;