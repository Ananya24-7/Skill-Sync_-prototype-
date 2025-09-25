
import React from 'react';
import { LinkedInIcon, GitHubIcon } from './icons/Icons';

const CommunityCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
    buttonClass: string;
    url: string;
}> = ({ icon, title, description, buttonText, buttonClass, url }) => (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center flex flex-col items-center">
        <div className="mb-4">{icon}</div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400 flex-grow">{description}</p>
        <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${buttonClass} transition-transform transform hover:scale-105`}
        >
            {buttonText}
        </a>
    </div>
)

const Community: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200">Community Hub</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Connect with peers, find mentors, and grow your network on professional platforms.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <CommunityCard 
            icon={<LinkedInIcon className="h-12 w-12 text-blue-600" />}
            title="Connect on LinkedIn"
            description="Network with other SkillSync users, follow industry leaders, and join professional groups to stay ahead of the curve."
            buttonText="Find us on LinkedIn"
            buttonClass="bg-blue-600 hover:bg-blue-700"
            url="https://www.linkedin.com/"
        />
        <CommunityCard 
            icon={<GitHubIcon className="h-12 w-12 text-gray-800 dark:text-gray-200" />}
            title="Explore on GitHub"
            description="Collaborate on open-source projects, showcase your portfolio, and learn from a global community of developers."
            buttonText="Explore on GitHub"
            buttonClass="bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600"
            url="https://github.com/"
        />
      </div>
    </div>
  );
};

export default Community;
