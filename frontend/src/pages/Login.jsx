import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  if (email === "" || password === "") {
    setError("Please fill all the fields.");
    return;
  }

  if (!email.includes("@")) {
    setError("Please enter a valid email address.");
    return;
  }

  if (password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }

  try {
    const response = await axios.post(
      "https://ai-career-digital-twin-7q8b.onrender.com/login",
      {
        email: email,
        password: password,
      }
    );

    alert(response.data.message);

    localStorage.setItem(
      "user",
       JSON.stringify({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email
      })
    );

    setError("");
    setEmail("");
    setPassword("");

    navigate("/dashboard");

  } catch (err) {
    if (err.response) {
      setError(err.response.data.detail);
    } else {
      setError("Unable to connect to the server.");
    }
  }
};

  return (
    <div className="login-container">
      <Link to="/" className="back-home">
        ← Back to Home
      </Link>

      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Login to continue your AI Career Journey</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </label>

        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin}>Login</button>

        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;