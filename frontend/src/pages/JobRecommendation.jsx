import { useContext, useState } from "react";
import axios from "axios";
import "../styles/JobRecommendation.css";
import { ResumeContext } from "../context/ResumeContext";

function JobRecommendation() {
  const { resumeData } = useContext(ResumeContext);

  const [job, setJob] = useState(null);
  const [role, setRole] = useState("Python Full Stack Developer");
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!resumeData) {
      alert("Please upload your resume first.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://ai-career-digital-twin-7q8b.onrender.com/job-recommendation",
        {
          resume_text: resumeData.resume_text,
          target_role: role,
        }
      );

      setJob(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-container">
      <h1>💼 Job Recommendations</h1>

      <p>AI-powered job recommendations based on your uploaded resume.</p>

      {resumeData && resumeData.skills && (
        <>
          <h3>Your Skills</h3>

          <div className="skills-box">
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
      >
        <option>Python Full Stack Developer</option>
        <option>Backend Developer</option>
        <option>Frontend Developer</option>
        <option>Data Scientist</option>
      </select>

      <button
        className="recommend-btn"
        onClick={getRecommendations}
        disabled={loading}
      >
        {loading ? "Generating Recommendations..." : "Get Recommendations"}
      </button>

      {job && (
        <div className="job-card">
          <h2>⭐ Match Score</h2>
          <p>{job.match_score}%</p>

          <h2>💼 Recommended Roles</h2>
          <ul>
            {job.recommended_roles.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2>💪 Strengths</h2>
          <ul>
            {job.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2>📚 Missing Skills</h2>
          <ul>
            {job.missing_skills.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2>💰 Salary Range</h2>
          <p>{job.salary_range}</p>

          <h2>🛠 Recommended Projects</h2>
          <ul>
            {job.recommended_projects.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2>💡 Career Advice</h2>
          <ul>
            {job.career_advice.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default JobRecommendation;