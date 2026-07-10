import { useNavigate } from "react-router-dom";

function DashboardCard({ title, description, emoji, path }) {

  const navigate = useNavigate();

  return (
    <div className="dashboard-card">

      <h2>
        {emoji} {title}
      </h2>

      <p>{description}</p>

      <button onClick={() => navigate(path)}>
        Open
      </button>

    </div>
  );
}

export default DashboardCard;