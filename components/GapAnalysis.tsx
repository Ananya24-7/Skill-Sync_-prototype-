import React, { useState, useCallback } from 'react';
import { analyzeSkillGap, parseResumeForSkills } from '../services/geminiService';
import type { AnalysisResult } from '../types';
import Spinner from './Spinner';
import { UploadIcon } from './icons/Icons';

interface GapAnalysisProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

const GapAnalysis: React.FC<GapAnalysisProps> = ({ onAnalysisComplete }) => {
  const [userSkills, setUserSkills] = useState('React, TypeScript, Node.js, Project Management, Agile, Figma');
  const [jobDescription, setJobDescription] = useState(`We are seeking a Senior Frontend Engineer with over 5 years of experience to join our dynamic team. The ideal candidate will be proficient in React, TypeScript, and modern JavaScript (ES6+). Experience with state management libraries like Redux or MobX is essential. You should have a strong understanding of GraphQL, RESTful APIs, and building scalable UI components. Familiarity with cloud platforms like AWS or Azure, CI/CD pipelines, and design tools such as Figma is a big plus. Strong communication skills and the ability to mentor junior developers are required.`);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      if (text) {
        try {
          setLoading(true);
          setLoadingMessage('Parsing resume...');
          setError(null);
          const skills = await parseResumeForSkills(text);
          setUserSkills(skills);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError("An unknown error occurred during parsing.");
        } finally {
            setLoading(false);
            setLoadingMessage('');
        }
      }
    };
    reader.onerror = () => {
        setError("Failed to read the file.");
        setLoading(false);
    }
    reader.readAsText(file);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === "text/plain" || file.type === "application/pdf" || file.type.includes("document"))) {
        handleFileRead(file);
    } else {
        setError("Please drop a valid text or document file.");
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);
  
    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);


  const handleAnalyze = async () => {
    if (!userSkills || !jobDescription) {
      setError('Please fill in both your skills and the job description.');
      return;
    }
    setError(null);
    setLoading(true);
    setLoadingMessage('Analyzing skill gap...');

    try {
      const result = await analyzeSkillGap(userSkills, jobDescription);
      onAnalysisComplete(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200">AI-Powered Skill Gap Analysis</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Upload your resume or enter your skills manually, then provide a job description to get your personalized growth plan.</p>
      </div>
      
      <div 
        className={`p-6 border-2 border-dashed rounded-lg text-center transition-colors duration-300 ${isDragOver ? 'border-primary bg-primary/10' : 'border-gray-300 dark:border-gray-600 hover:border-primary-light'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Upload Your Resume</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Drag and drop a file or click to select.</p>
        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".txt,.pdf,.doc,.docx" />
        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-light focus-within:ring-offset-2">
          <span>Browse files</span>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label htmlFor="user-skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Skills (auto-populated from resume or entered manually)
          </label>
          <textarea
            id="user-skills"
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={userSkills}
            onChange={(e) => setUserSkills(e.target.value)}
            placeholder="e.g., React, Python, Data Analysis..."
          />
        </div>
        <div>
          <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Job Description
          </label>
          <textarea
            id="job-description"
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
          />
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
        >
          {loading ? (
            <>
              <Spinner />
              {loadingMessage || 'Analyzing...'}
            </>
          ) : (
            'Analyze My Skills'
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

    </div>
  );
};

export default GapAnalysis;