
import React from 'react';
import type { AnalysisResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SkillTag from './SkillTag';

interface DashboardProps {
  analysisResult: AnalysisResult | null;
}

const Dashboard: React.FC<DashboardProps> = ({ analysisResult }) => {
  if (!analysisResult) {
    return (
      <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Welcome to Your Dashboard</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please complete a Gap Analysis first to see your personalized career dashboard.
        </p>
      </div>
    );
  }

  const { careerReadinessScore, matchedSkills, gapSkills, summary } = analysisResult;

  const scoreColor = careerReadinessScore >= 75 ? 'text-green-500' : careerReadinessScore >= 40 ? 'text-yellow-500' : 'text-red-500';

  const chartData = [
    { name: 'Matched Skills', count: matchedSkills.length, fill: '#4ade80' },
    { name: 'Skill Gaps', count: gapSkills.length, fill: '#f87171' },
    { name: 'Total Required', count: matchedSkills.length + gapSkills.length, fill: '#60a5fa' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200">Career Readiness Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">AI Summary</h3>
            <p className="text-gray-600 dark:text-gray-400">{summary}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Skill Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700"/>
                <XAxis dataKey="name" className="text-xs" />
                <YAxis allowDecimals={false} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                    borderColor: '#4b5563',
                    color: '#ffffff',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
              <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-2">Readiness Score</h3>
              <p className={`text-6xl font-bold ${scoreColor}`}>{careerReadinessScore}<span className="text-3xl">%</span></p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-500">Your Strengths ({matchedSkills.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.map(skill => (
                    <SkillTag key={skill.name} name={skill.name} type="match" />
                  ))}
                </div>
            </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-red-500">Areas for Improvement ({gapSkills.length})</h3>
          {gapSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {gapSkills.map(skill => (
                <SkillTag key={skill.name} name={skill.name} type="gap" />
              ))}
            </div>
          ) : (
            <p className="text-green-500 font-semibold">Congratulations! You have all the required skills for this role.</p>
          )}
        </div>
    </div>
  );
};

export default Dashboard;
