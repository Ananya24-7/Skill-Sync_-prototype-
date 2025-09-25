
import React from 'react';

interface SkillTagProps {
  name: string;
  type: 'match' | 'gap' | 'neutral';
}

const SkillTag: React.FC<SkillTagProps> = ({ name, type }) => {
  const baseClasses = 'px-3 py-1 text-sm font-medium rounded-full inline-block';
  const typeClasses = {
    match: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    gap: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  };

  return <span className={`${baseClasses} ${typeClasses[type]}`}>{name}</span>;
};

export default SkillTag;
