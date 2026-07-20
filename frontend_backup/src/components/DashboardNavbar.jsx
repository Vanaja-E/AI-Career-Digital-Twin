import { useNavigate } from "react-router-dom";

function DashboardNavbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("resumeData");

    navigate("/login");

  };

  return (

    <header className="dashboard-navbar">

      <h2>🚀 AI Career Digital Twin</h2>

      <div className="user-section">

        <span>

          Welcome,
          <strong> {user?.name || "User"}</strong>
          👋

        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>

  );
}

export default DashboardNavbar;