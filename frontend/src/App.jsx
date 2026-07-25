import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import SkillGap from "./pages/SkillGap";
import ResumeOptimize from "./pages/ResumeOptimizer"
import CareerRoadmap from "./pages/CareerRoadmap";
import InterviewPrep from "./pages/InterviewPrep";
import JobRecommendation from "./pages/JobRecommendation";
import ResumeScore from "./pages/ResumeScore";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />

      <Route path="/skill-gap" element={<SkillGap />} />

      <Route path="/resume-optimizer" element={<ResumeOptimizer />} />

      <Route path="/career-roadmap" element={<CareerRoadmap />} />

      <Route path="/interview-prep" element={<InterviewPrep />} />

      <Route path="/profile" element={<Profile />} />

      <Route
        path="/job-recommendation"
        element={<JobRecommendation />}
      />

      <Route path="/resume-score" element={<ResumeScore />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;