import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <h2>Career AI</h2>

      <ul>

        <li>
          <NavLink to="/dashboard">
            🏠 Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/resume-analyzer">
            📄 Resume Analyzer
          </NavLink>
        </li>

        <li>
          <NavLink to="/resume-score">
            📊 Resume Score
          </NavLink>
        </li>

        <li>
          <NavLink to="/skill-gap">
            🎯 Skill Gap
          </NavLink>
        </li>

        <li>
          <NavLink to="/career-roadmap">
            🛣 Career Roadmap
          </NavLink>
        </li>

        <li>
          <NavLink to="/interview-prep">
            🎤 Interview Prep
          </NavLink>
        </li>

        <li>
          <NavLink to="/job-recommendation">
            💼 Job Recommendation
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile">
            👤 Profile
          </NavLink>
        </li>

      </ul>

    </aside>
  );
}

export default Sidebar;