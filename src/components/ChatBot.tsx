// ChatBot.tsx
import React, { useState } from 'react';
import axios from 'axios';
// import './ChatBot.css';

interface ChatBotProps {
  resumeData: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ resumeData }) => {
  const [question, setQuestion] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const askQuestion = async () => {
    if (!question) return;
    setIsLoading(true);
    try {
      const res = await axios.post('https://resume-chatbot-backend.onrender.com/api/question', { question, resumeData });
      setResponse(res.data.answer);
    } catch (error) {
      console.error('Error fetching answer:', error);
      setResponse('Error fetching answer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot">
      <div className="question-input">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about the resume"
        />
        <button onClick={askQuestion} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Ask'}
        </button>
      </div>
      <div className="response">{response}</div>
    </div>
  );
};

export default ChatBot;
