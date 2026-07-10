import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";

import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-content">

        <DashboardNavbar />

        <div className="welcome-section">
          <h1>Welcome Back 👋</h1>
          <p>
            Manage your career, analyze your resume, and improve your skills.
          </p>
        </div>

        <div className="dashboard-grid">

          <DashboardCard
            emoji="📄"
            title="Resume Analyzer"
            description="Upload and analyze your resume using AI."
            path="/resume-analyzer"
          />

          <DashboardCard
            emoji="🎯"
            title="Skill Gap Analysis"
            description="Find missing skills for your dream job."
            path="/skill-gap"
          />

          <DashboardCard
            emoji="🛣"
            title="Career Roadmap"
            description="Generate a personalized career roadmap."
            path="/career-roadmap"
          />

          <DashboardCard
            emoji="🎤"
            title="Interview Preparation"
            description="Practice AI-generated interview questions."
            path="/interview-prep"
          />

          <DashboardCard
            emoji="💼"
            title="Job Recommendations"
            description="Discover jobs based on your skills."
            path="/job-recommendation"
          />

          <DashboardCard
            emoji="📊"
            title="Resume Score"
            description="Check your ATS resume score."
            path="/resume-score"
          />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;