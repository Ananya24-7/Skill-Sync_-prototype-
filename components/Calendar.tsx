import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';

// Mock data for learning events
const learningEvents: { [key: string]: { title: string; platform: string } } = {
  '2024-07-04': { title: 'Completed "React Basics"', platform: 'Coursera' },
  '2024-07-05': { title: 'Started "Advanced CSS"', platform: 'Udemy' },
  '2024-07-09': { title: 'Project Submission', platform: 'GitHub' },
  '2024-07-15': { title: 'Completed "Advanced CSS"', platform: 'Udemy' },
  '2024-07-22': { title: 'Live Q&A Session', platform: 'Bootcamp' },
};

// This is a simplified function to format date keys like 'YYYY-MM-DD'
const formatDateKey = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const numDays = endOfMonth.getDate();

    const calendarDays = [];
    // Add blank days for the start of the month
    for (let i = 0; i < startDay; i++) {
        calendarDays.push(<div key={`blank-${i}`} className="border rounded-md border-transparent"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= numDays; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dateKey = formatDateKey(date);
        const event = learningEvents[dateKey];
        const isToday = formatDateKey(new Date()) === dateKey;

        calendarDays.push(
            <div key={day} className={`border p-2 rounded-md transition-colors ${isToday ? 'bg-primary-light text-white' : 'bg-white dark:bg-gray-800'}`}>
                <div className={`font-bold ${isToday ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>{day}</div>
                {event && (
                     <div className="mt-1 text-xs">
                        <span className="bg-secondary dark:bg-secondary-dark text-white rounded-full px-2 py-0.5 block truncate" title={`${event.title} on ${event.platform}`}>{event.title}</span>
                    </div>
                )}
            </div>
        );
    }
    
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };


    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200">Learning Calendar</h1>
            <p className="text-gray-600 dark:text-gray-400">
                Track your learning streak and review completed courses and projects.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <h2 className="text-xl font-bold">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <ChevronRightIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600 dark:text-gray-400">
                    {daysOfWeek.map(day => <div key={day}>{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2 mt-2">
                    {calendarDays}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
