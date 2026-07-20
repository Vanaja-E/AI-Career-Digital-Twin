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

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload-resume",
        formData
      );

      setResumeData(response.data);

      alert("Resume uploaded successfully ✅");
    } catch (error) {
      console.log(error);
      alert("Upload Failed!");
    }
  };

  return (
    <div className="resume-container">

      <div className="resume-header">

        <h1>📄 Resume Analyzer</h1>

        <p>
          Upload your resume and let AI analyze it.
        </p>

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
                  : "Needs Improvement"}

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

              <p className="success">

                Excellent Resume! No suggestions.

              </p>

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

          <details className="full-card">

            <summary>

              📄 View Extracted Resume

            </summary>

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