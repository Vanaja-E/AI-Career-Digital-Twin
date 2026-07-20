import { useContext, useState } from "react";
import axios from "axios";
import "../styles/JobRecommendation.css";
import { ResumeContext } from "../context/ResumeContext";

function JobRecommendation() {
  const { resumeData } = useContext(ResumeContext);
  const [jobs, setJobs] = useState([]);

  const getRecommendations = async () => {
    if (!resumeData) {
      alert("Please upload your resume first.");
      return;
    }

    try {
      const response = await axios.post(
        "https://ai-career-digital-twin-7q8b.onrender.com/job-recommendation",
        {
          skills: resumeData.skills,
        }
      );

      setJobs(response.data.recommendations);
    } catch (error) {
      console.log(error);
      alert("Unable to fetch job recommendations.");
    }
  };

  return (
    <div className="job-container">
      <h1>💼 Job Recommendations</h1>

      <p>
        Jobs recommended based on your uploaded resume.
      </p>

      {resumeData && (
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

      <button
        className="recommend-btn"
        onClick={getRecommendations}
      >
        Get Recommendations
      </button>

      {jobs.map((job, index) => (
        <div className="job-card" key={index}>

          <div className="job-header">
            <h2>{job.title}</h2>

            <span className="match-score">
              {job.match_score}% Match
            </span>
          </div>

          <p>
            <strong>🏢 Company:</strong> {job.company}
          </p>

          <p>
            <strong>📍 Location:</strong> {job.location}
          </p>

          <p>
            <strong>💰 Salary:</strong> {job.salary}
          </p>

          <h4>✅ Matching Skills</h4>

          <div className="skills-box">
            {job.matched_skills.map((skill, i) => (
              <span key={i} className="matched">
                {skill}
              </span>
            ))}
          </div>

          <h4>❌ Missing Skills</h4>

          <div className="skills-box">
            {job.missing_skills.map((skill, i) => (
              <span key={i} className="missing">
                {skill}
              </span>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}

export default JobRecommendation;