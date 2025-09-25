
import React, { useState } from 'react';
import type { AnalysisResult } from '../types';
import RecommendationCard from './RecommendationCard';
import { roadmaps, Roadmap as RoadmapType } from '../data/roadmaps';

interface RoadmapProps {
  analysisResult: AnalysisResult | null;
}

const RoadmapViewer: React.FC<{ roadmap: RoadmapType }> = ({ roadmap }) => {
    const getBadgeColor = (type: string) => {
        switch(type.toLowerCase()){
            case 'course': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'courses': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'book': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'ebook': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'article': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'paper': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
            case 'tutorial': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'challenges': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    }

    return (
        <div className="space-y-8">
            {roadmap.sections.map((section, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-primary dark:text-primary-light mb-4 border-b-2 border-primary-light pb-2">{index + 1}. {section.title}</h3>
                    <ul className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <span className="font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getBadgeColor(item.type)}`}>{item.type}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

const Roadmap: React.FC<RoadmapProps> = ({ analysisResult }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'ai' | 'frontend' | 'backend'>('personal');

  if (!analysisResult) {
    return (
      <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Your Learning Roadmap</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Complete a Gap Analysis to generate your personalized roadmap to success.
        </p>
      </div>
    );
  }

  const { recommendations, gapSkills } = analysisResult;
  
  const TabButton: React.FC<{tabId: typeof activeTab; children: React.ReactNode}> = ({ tabId, children }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        activeTab === tabId
          ? 'bg-primary text-white'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200">Learning Roadmap</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Follow your personalized plan or explore standard industry roadmaps to guide your learning journey.
      </p>

      <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            <TabButton tabId="personal">Personalized Roadmap</TabButton>
            <TabButton tabId="ai">AI & Data Science</TabButton>
            <TabButton tabId="frontend">Frontend</TabButton>
            <TabButton tabId="backend">Backend</TabButton>
          </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'personal' && (
            <div className="space-y-4">
                 <h2 className="text-2xl font-bold">Your AI-Powered Recommendations</h2>
                 <p className="text-gray-600 dark:text-gray-400">
                    To bridge your skill gaps in: <span className="font-semibold text-primary dark:text-primary-light">{gapSkills.map(s => s.name).join(', ')}</span>.
                </p>
                {recommendations.length > 0 ? (
                recommendations.map((rec, index) => (
                    <RecommendationCard key={index} recommendation={rec} />
                ))
                ) : (
                <p>No specific recommendations were generated. Try refining the job description.</p>
                )}
            </div>
        )}
        {activeTab === 'ai' && <RoadmapViewer roadmap={roadmaps.ai} />}
        {activeTab === 'frontend' && <RoadmapViewer roadmap={roadmaps.frontend} />}
        {activeTab === 'backend' && <RoadmapViewer roadmap={roadmaps.backend} />}
      </div>
    </div>
  );
};

export default Roadmap;
