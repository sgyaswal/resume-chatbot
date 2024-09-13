// ResumeUploader.tsx
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
// import './ResumeUploader.css';

interface ResumeUploaderProps {
  setResumeData: (data: string) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ setResumeData }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles:any) => {
      setFile(acceptedFiles[0]);
    },
  });

  const uploadResume = async () => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post('https://resume-chatbot-backend.onrender.com/api/upload', formData);
      setResumeData(response.data.resumeData);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="resume-uploader">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>{file ? file.name : 'Drag & drop your resume here, or click to select'}</p>
      </div>
      <button
        onClick={uploadResume}
        disabled={!file || isUploading}
        className="upload-button"
      >
        {isUploading ? 'Uploading...' : 'Upload Resume'}
      </button>
    </div>
  );
};

export default ResumeUploader;
