// App.tsx
import React, { useState } from 'react';
import ResumeUploader from './ResumeUploader';
import ChatBot from './ChatBot';
// import './App.css';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<string | null>(null);

  return (
    <div className="app-container">
      <h1>Resume Chatbot</h1>
      {!resumeData ? (
        <ResumeUploader setResumeData={setResumeData} />
      ) : (
        <ChatBot resumeData={resumeData} />
      )}
    </div>
  );
};

export default App;
