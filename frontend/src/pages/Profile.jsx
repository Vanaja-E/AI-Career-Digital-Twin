import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";
import "../styles/Profile.css";

function Profile() {
  const { resumeData } = useContext(ResumeContext);

  if (!resumeData) {
    return (
      <div className="profile-container">
        <div className="empty-profile">
          <h1>👤 My Profile</h1>
          <p>Please upload your resume first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">

      <h1 className="profile-title">👤 My Profile</h1>

      {/* Profile Header */}

      <div className="profile-card">

        <div className="profile-avatar">
          {resumeData.name.charAt(0)}
        </div>

        <div className="profile-info">

          <h2>{resumeData.name}</h2>

          <p>📧 {resumeData.email}</p>

          <p>📱 {resumeData.phone}</p>

          <span className="resume-badge">
            ✅ Resume Uploaded
          </span>

        </div>

      </div>

      {/* Education + Experience */}

      <div className="profile-grid">

        <div className="info-card">

          <h2>🎓 Education</h2>

          <ul>

            {resumeData.education.length > 0 ? (

              resumeData.education.map((item, index) => (

                <li key={index}>{item}</li>

              ))

            ) : (

              <li>No education found.</li>

            )}

          </ul>

        </div>

        <div className="info-card">

          <h2>💼 Experience</h2>

          <ul>

            {resumeData.experience.length > 0 ? (

              resumeData.experience.map((item, index) => (

                <li key={index}>{item}</li>

              ))

            ) : (

              <li>No experience found.</li>

            )}

          </ul>

        </div>

      </div>

      {/* Skills */}

      <div className="info-card">

        <h2>💻 Skills</h2>

        <div className="skills-container">

          {resumeData.skills.map((skill, index) => (

            <span
              key={index}
              className="skill-chip"
            >
              {skill}
            </span>

          ))}

        </div>

      </div>

      {/* Certificates */}

      <div className="info-card">

        <h2>📜 Certificates</h2>

        <ul>

          {resumeData.certificates.length > 0 ? (

            resumeData.certificates.map((item, index) => (

              <li key={index}>{item}</li>

            ))

          ) : (

            <li>No certificates found.</li>

          )}

        </ul>

      </div>

    </div>
  );
}

export default Profile;