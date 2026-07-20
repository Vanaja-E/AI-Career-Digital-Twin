import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <h1>Your AI Career Companion</h1>

      <p>
        Analyze your resume, discover skill gaps, and get personalized career guidance.
      </p>

      <Link to="/signup">
        <button>Get Started</button>
      </Link>
    </section>
  );
}

export default Hero;