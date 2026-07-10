function DashboardCard({ title, description, emoji }) {
  return (
    <div className="dashboard-card">
      <h2>{emoji} {title}</h2>

      <p>{description}</p>

      <button>Open</button>
    </div>
  );
}

export default DashboardCard;