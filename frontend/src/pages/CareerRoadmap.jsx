import { useContext, useState } from "react";
import axios from "axios";
import { ResumeContext } from "../context/ResumeContext";
import "../styles/CareerRoadmap.css";

function CareerRoadmap() {
  const { resumeData } = useContext(ResumeContext);

  const [role, setRole] = useState("Python Full Stack Developer");
  const [roadmap, setRoadmap] = useState(null);

  const generateRoadmap = async () => {
    if (!resumeData) {
      alert("Please upload your resume first.");
      return;
    }

    try {
      const response = await axios.post(
        "https://ai-career-digital-twin-7q8b.onrender.com/career-roadmap",
        {
          resume_text: resumeData.resume_text,
          target_role: role,
        }
      );

      setRoadmap(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate roadmap!");
    }
  };

  return (
    <div className="roadmap-container">
      <h1>🛣 Career Roadmap</h1>

      <p>
        Choose your target career and generate a personalized AI roadmap.
      </p>

      <h3>Select Target Role</h3>

      <select
        className="role-select"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option>Python Full Stack Developer</option>
        <option>Frontend Developer</option>
        <option>Backend Developer</option>
        <option>Data Scientist</option>
        <option>Machine Learning Engineer</option>
      </select>

      <button className="roadmap-btn" onClick={generateRoadmap}>
        Generate Roadmap
      </button>

      {roadmap && (
        <>
          <div className="roadmap-card">
            <h2>🎯 Current Level</h2>
            <p>{roadmap.current_level}</p>
          </div>

          <div className="roadmap-card">
            <h2>📚 Skills to Learn</h2>
            <ul>
              {roadmap.skills_to_learn.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="roadmap-card">
            <h2>🛠 Recommended Projects</h2>
            <ul>
              {roadmap.projects.map((project, index) => (
                <li key={index}>{project}</li>
              ))}
            </ul>
          </div>

          <div className="roadmap-card">
            <h2>📜 Certifications</h2>
            <ul>
              {roadmap.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>

          <div className="roadmap-card">
            <h2>📅 Month 1</h2>
            <ul>
              {roadmap.monthly_plan.month_1.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="roadmap-card">
            <h2>📅 Month 2</h2>
            <ul>
              {roadmap.monthly_plan.month_2.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="roadmap-card">
            <h2>📅 Month 3</h2>
            <ul>
              {roadmap.monthly_plan.month_3.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="roadmap-card">
            <h2>💡 Career Tips</h2>
            <ul>
              {roadmap.career_tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default CareerRoadmap;