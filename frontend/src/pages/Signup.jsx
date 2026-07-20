import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

const handleSignup = async () => {
  if (
    name === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    setError("Please fill all the fields.");
    return;
  }

  if (!email.includes("@")) {
    setError("Please enter a valid email.");
    return;
  }

  if (password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  try {
    const response = await axios.post(
      "https://ai-career-digital-twin-7q8b.onrender.com/signup",
      {
        full_name: name,
        email: email,
        password: password,
      }
    );

    alert("Account Created Successfully!");

    console.log(response.data);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");

  } catch (err) {
    if (err.response) {
      setError(err.response.data.detail);
    } else {
      setError("Unable to connect to the server.");
    }
  }
};

  return (
    <div className="signup-container">
      <Link to="/" className="back-home">
        ← Back to Home
      </Link>

      <div className="signup-card">
        <h1>Create Account</h1>

        <p>Join AI Career Digital Twin today</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

        <button onClick={handleSignup}>
          Create Account
        </button>

        <p className="signup-link">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;