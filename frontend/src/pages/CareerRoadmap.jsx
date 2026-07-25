import { useState } from "react";
import axios from "axios";
import "../styles/CareerRoadmap.css";

function CareerRoadmap() {
  const [role, setRole] = useState("Python Full Stack Developer");
  const [roadmap, setRoadmap] = useState([]);

  const generateRoadmap = async () => {
    try {
      const response = await axios.post(
        "https://ai-career-digital-twin-7q8b.onrender.com/career-roadmap",
        {
           resume_text: resumeData.resume_text,
           target_role: role
        }
      );

      setRoadmap(response.data.roadmap);
    } catch (error) {
      console.log(error);
      alert("Failed to generate roadmap!");
    }
  };

  return (
    <div className="roadmap-container">

      <h1>🛣 Career Roadmap</h1>

      <p>
        Choose your target career and generate a personalized learning roadmap.
      </p>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option>Python Full Stack Developer</option>
        <option>Frontend Developer</option>
        <option>Backend Developer</option>
        <option>Data Scientist</option>
      </select>

      <button onClick={generateRoadmap}>
        Generate Roadmap
      </button>

      {roadmap.length > 0 && (
        <div className="roadmap-card">

          <h2>{role}</h2>

          {roadmap.map((step, index) => (
            <div key={index} className="roadmap-step">

              <div className="step-number">
                {index + 1}
              </div>

              <div className="step-text">
                {step}
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default CareerRoadmap;