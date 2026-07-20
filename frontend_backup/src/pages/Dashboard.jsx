import { useContext } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import { ResumeContext } from "../context/ResumeContext";

import "../styles/Dashboard.css";

function Dashboard() {
  const { resumeData } = useContext(ResumeContext);

  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-content">

        <DashboardNavbar />

        <div className="welcome-section">

          <h1>
            Welcome {resumeData ? resumeData.name : "User"} 👋
          </h1>

          <p>
            Manage your career journey with AI-powered insights.
          </p>

        </div>

        {/* Summary Cards */}

        <div className="summary-grid">

          <div className="summary-card">

            <h3>⭐ ATS Score</h3>

            <h1>

              {resumeData ? `${resumeData.ats_score}/100` : "--"}

            </h1>

          </div>

          <div className="summary-card">

            <h3>💻 Skills</h3>

            <h1>

              {resumeData ? resumeData.skills.length : 0}

            </h1>

          </div>

          <div className="summary-card">

            <h3>📄 Resume</h3>

            <h1>

              {resumeData ? "Uploaded ✅" : "Not Uploaded"}

            </h1>

          </div>

          <div className="summary-card">

            <h3>🎤 Interview</h3>

            <h1>

              {resumeData ? "Ready" : "--"}

            </h1>

          </div>

        </div>

        {/* Features */}

        <div className="dashboard-grid">

          <DashboardCard
            emoji="📄"
            title="Resume Analyzer"
            description="Upload and analyze your resume using AI."
            path="/resume-analyzer"
          />

          <DashboardCard
            emoji="🎯"
            title="Skill Gap"
            description="Find missing skills."
            path="/skill-gap"
          />

          <DashboardCard
            emoji="🛣"
            title="Career Roadmap"
            description="Generate your roadmap."
            path="/career-roadmap"
          />

          <DashboardCard
            emoji="🎤"
            title="Interview Prep"
            description="Practice interview questions."
            path="/interview-prep"
          />

          <DashboardCard
            emoji="💼"
            title="Job Recommendation"
            description="Find suitable jobs."
            path="/job-recommendation"
          />

          <DashboardCard
            emoji="📊"
            title="Resume Score"
            description="Detailed ATS report."
            path="/resume-score"
          />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;