import { useState, useContext } from "react";
import axios from "axios";
import { ResumeContext } from "../context/ResumeContext";
import "../styles/ResumeAnalyzer.css";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);

  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume first.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      alert("Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        "https://ai-career-digital-twin-7q8b.onrender.com/upload-resume",
        formData,
        {
          params: {
            user_id: user.id,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Backend Response:", response.data);

      setResumeData(response.data);

      localStorage.setItem(
        "resumeData",
        JSON.stringify(response.data)
      );

      alert("Resume uploaded successfully ✅");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.detail || "Upload Failed!");
      } else {
        alert("Unable to connect to the server.");
      }
    }
  };

  return (
    <div className="resume-container">
      <div className="resume-header">
        <h1>📄 Resume Analyzer</h1>
        <p>Upload your resume and let AI analyze it.</p>
      </div>

      <div className="upload-card">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload}>
          Upload Resume
        </button>
      </div>

      {resumeData && (
        <>
          <div className="top-grid">

            <div className="status-card">
              <h2>✅ Resume Status</h2>

              <div className="status-list">
                <div>✔ Resume Uploaded Successfully</div>
                <div>✔ AI Parsing Completed</div>
                <div>✔ Skill Gap Ready</div>
                <div>✔ Career Roadmap Ready</div>
                <div>✔ Interview Ready</div>
                <div>✔ Job Recommendation Ready</div>
              </div>
            </div>

            <div className="score-card">
              <h2>⭐ ATS Resume Score</h2>

              <div className="score-circle">
                {resumeData.ats_score}
              </div>

              <h3>
                {resumeData.ats_score >= 90
                  ? "Excellent Resume 🚀"
                  : resumeData.ats_score >= 75
                  ? "Very Good Resume 👍"
                  : resumeData.ats_score >= 60
                  ? "Good Resume 🙂"
                  : "Needs Improvement 😕"}
              </h3>
            </div>

          </div>

          <div className="full-card">
            <h2>💡 AI Suggestions</h2>

            {resumeData.suggestions?.length > 0 ? (
              <ul>
                {resumeData.suggestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>Excellent Resume! No suggestions.</p>
            )}
          </div>

          <div className="full-card">
            <h2>💻 Skills Detected</h2>

            <div className="skills">
              {resumeData.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="skill"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Gemini AI Analysis */}

          {resumeData.ai_analysis && (
            <div className="full-card">
              <h2>🤖 AI Resume Analysis</h2>

              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "16px",
                  lineHeight: "1.8",
                  fontFamily: "inherit",
                }}
              >
                {resumeData.ai_analysis}
              </pre>
            </div>
          )}

          <details className="full-card">
            <summary>📄 View Extracted Resume</summary>

            <textarea
              readOnly
              value={resumeData.text}
            />
          </details>

        </>
      )}
    </div>
  );
}

export default ResumeAnalyzer;