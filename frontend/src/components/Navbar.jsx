import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>AI Career Digital Twin</h2>

      <div className="nav-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;