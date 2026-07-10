import { useState } from "react";
import axios from "axios";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload-resume",
        formData
      );

      setMessage(response.data.message);

    } catch (error) {
      setMessage("Upload Failed.");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>📄 Resume Analyzer</h1>

      <p>Upload your Resume (PDF or DOCX)</p>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Upload Resume
      </button>

      <br /><br />

      <h3>{message}</h3>
    </div>
  );
}

export default ResumeAnalyzer;