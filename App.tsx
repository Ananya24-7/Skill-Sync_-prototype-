import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import GapAnalysis from './components/GapAnalysis';
import Roadmap from './components/Roadmap';
import Community from './components/Community';
import Calendar from './components/Calendar';
import AuthModal from './components/AuthModal';
import Chatbot from './components/Chatbot';
import { useTheme } from './hooks/useTheme';
import type { AnalysisResult } from './types';
import { Page } from './types';

const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();
  const [activePage, setActivePage] = useState<Page>(Page.GAP_ANALYSIS);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  const handleAnalysisComplete = useCallback((result: AnalysisResult) => {
    setAnalysisResult(result);
    setActivePage(Page.DASHBOARD);
  }, []);
  
  const handleNavigate = (page: Page) => {
    // Prevent navigation to data-dependent pages if no analysis has been run
    if (!analysisResult && (page === Page.DASHBOARD || page === Page.ROADMAP)) {
      setActivePage(Page.GAP_ANALYSIS);
    } else {
      setActivePage(page);
    }
  }

  const renderContent = () => {
    switch (activePage) {
      case Page.DASHBOARD:
        return <Dashboard analysisResult={analysisResult} />;
      case Page.GAP_ANALYSIS:
        return <GapAnalysis onAnalysisComplete={handleAnalysisComplete} />;
      case Page.ROADMAP:
        return <Roadmap analysisResult={analysisResult} />;
      case Page.CALENDAR:
        return <Calendar />;
      case Page.COMMUNITY:
        return <Community />;
      default:
        return <GapAnalysis onAnalysisComplete={handleAnalysisComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Header 
        activePage={activePage} 
        setActivePage={handleNavigate} 
        theme={theme}
        toggleTheme={toggleTheme}
        isAnalysisDone={!!analysisResult}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowAuthModal(true)}
        onLogoutClick={() => setIsLoggedIn(false)}
      />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p>&copy; {new Date().getFullYear()} SkillSync AI. All rights reserved.</p>
      </footer>
      
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onLogin={() => {
            setIsLoggedIn(true);
            setShowAuthModal(false);
          }}
        />
      )}

      <Chatbot />
    </div>
  );
};

export default App;