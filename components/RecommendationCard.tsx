
import React from 'react';
import type { Recommendation } from '../types';
import { RecommendationType } from '../types';
import { BookOpenIcon, CertificateIcon, CodeBracketIcon, BriefcaseIcon } from './icons/Icons';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const getIconForType = (type: RecommendationType) => {
  switch (type) {
    case RecommendationType.COURSE:
      return <BookOpenIcon className="h-6 w-6 text-blue-500" />;
    case RecommendationType.CERTIFICATION:
      return <CertificateIcon className="h-6 w-6 text-yellow-500" />;
    case RecommendationType.PROJECT:
      return <CodeBracketIcon className="h-6 w-6 text-purple-500" />;
    case RecommendationType.INTERNSHIP:
      return <BriefcaseIcon className="h-6 w-6 text-green-500" />;
    default:
      return <BookOpenIcon className="h-6 w-6 text-gray-500" />;
  }
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const { type, title, description, platform, url } = recommendation;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 flex items-start space-x-4 transition-transform transform hover:scale-[1.02] hover:shadow-xl">
      <div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
        {getIconForType(type)}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-primary dark:text-primary-light">{type} &middot; {platform}</p>
        </div>
        <h3 className="text-lg font-bold mt-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{description}</p>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-primary-dark dark:text-primary-light hover:underline mt-2 inline-block"
          >
            Learn More &rarr;
          </a>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
