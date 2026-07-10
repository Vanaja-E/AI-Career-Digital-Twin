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
          />

          <DashboardCard
            emoji="🎯"
            title="Skill Gap Analysis"
            description="Find missing skills for your dream job."
          />

          <DashboardCard
            emoji="🛣"
            title="Career Roadmap"
            description="Generate a personalized career roadmap."
          />

          <DashboardCard
            emoji="🎤"
            title="Interview Preparation"
            description="Practice AI-generated interview questions."
          />

          <DashboardCard
            emoji="💼"
            title="Job Recommendations"
            description="Discover jobs based on your skills."
          />

          <DashboardCard
            emoji="📊"
            title="Resume Score"
            description="Check your ATS resume score."
          />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;