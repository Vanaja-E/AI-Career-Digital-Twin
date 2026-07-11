import { useState } from "react";
import axios from "axios";
import "../styles/ResumeAnalyzer.css";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [resumeData, setResumeData] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload-resume",
        formData
      );

      setResumeData(response.data);
    } catch (error) {
      alert("Upload Failed!");
      console.log(error);
    }
  };

  return (
    <div className="resume-container">
      <h1 className="resume-title">📄 Resume Analyzer</h1>

      <p className="resume-subtitle">
        Upload your resume and analyze it using AI.
      </p>

      <div className="upload-section">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="upload-btn" onClick={handleUpload}>
          Upload Resume
        </button>
      </div>

      {resumeData && (
        <>
          {/* ATS Score Card */}
          <div className="ats-card">
            <h2>⭐ ATS Resume Score</h2>

            <div className="ats-score">
              {resumeData.ats_score}/100
            </div>

            <h3>Suggestions</h3>

            <ul className="info-list">
              {resumeData.suggestions?.length > 0 ? (
                resumeData.suggestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>Excellent Resume! No suggestions.</li>
              )}
            </ul>
          </div>

          {/* Resume Details */}
          <div className="details-card">
            <h2>Resume Details</h2>

            <p className="detail-item">
              <strong>👤 Name:</strong> {resumeData.name}
            </p>

            <p className="detail-item">
              <strong>📧 Email:</strong> {resumeData.email}
            </p>

            <p className="detail-item">
              <strong>📱 Phone:</strong> {resumeData.phone}
            </p>

            {/* Skills */}
            <h3 className="section-title">💻 Skills</h3>

            <div className="skills-container">
              {resumeData.skills?.length > 0 ? (
                resumeData.skills.map((skill, index) => (
                  <span key={index} className="skill-badge">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="no-data">No skills found.</p>
              )}
            </div>

            {/* Education */}
            <h3 className="section-title">🎓 Education</h3>

            <ul className="info-list">
              {resumeData.education?.length > 0 ? (
                resumeData.education.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <p className="no-data">No education found.</p>
              )}
            </ul>

            {/* Experience */}
            <h3 className="section-title">💼 Experience</h3>

            <ul className="info-list">
              {resumeData.experience?.length > 0 ? (
                resumeData.experience.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <p className="no-data">No experience found.</p>
              )}
            </ul>

            {/* Projects */}
            <h3 className="section-title">📂 Projects</h3>

            <ul className="info-list">
              {resumeData.projects?.length > 0 ? (
                resumeData.projects.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <p className="no-data">No projects found.</p>
              )}
            </ul>

            {/* Certificates */}
            <h3 className="section-title">📜 Certificates</h3>

            <ul className="info-list">
              {resumeData.certificates?.length > 0 ? (
                resumeData.certificates.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <p className="no-data">No certificates found.</p>
              )}
            </ul>

            {/* Extracted Resume Text */}
            <h3 className="section-title">📄 Extracted Resume Text</h3>

            <textarea
              className="resume-text"
              value={resumeData.text}
              readOnly
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ResumeAnalyzer;