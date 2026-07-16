import { useNavigate } from "react-router-dom";

function DashboardCard({
  emoji,
  title,
  description,
  path,
}) {

  const navigate = useNavigate();

  return (
    <div className="dashboard-card">

      <div className="card-icon">
        {emoji}
      </div>

      <h2>{title}</h2>

      <p>{description}</p>

      <button onClick={() => navigate(path)}>
        Open
      </button>

    </div>
  );
}

export default DashboardCard;