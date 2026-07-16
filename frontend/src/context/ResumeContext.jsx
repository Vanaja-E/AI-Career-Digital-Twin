import { createContext, useState, useEffect } from "react";

export const ResumeContext = createContext();

export function ResumeProvider({ children }) {

  // Load resume from localStorage when app starts
  const [resumeData, setResumeData] = useState(() => {
    const savedResume = localStorage.getItem("resumeData");
    return savedResume ? JSON.parse(savedResume) : null;
  });

  // Save resume whenever it changes
  useEffect(() => {
    if (resumeData) {
      localStorage.setItem(
        "resumeData",
        JSON.stringify(resumeData)
      );
    }
  }, [resumeData]);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}