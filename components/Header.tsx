import React from 'react';
import { Page } from '../types';
import { SunIcon, MoonIcon, UserCircleIcon, LogoIcon, CalendarIcon, LogoutIcon } from './icons/Icons';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isAnalysisDone: boolean;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const NavItem: React.FC<{
  pageName: Page;
  activePage: Page;
  setActivePage: (page: Page) => void;
  children: React.ReactNode;
  disabled?: boolean;
}> = ({ pageName, activePage, setActivePage, children, disabled = false }) => (
  <button
    onClick={() => setActivePage(pageName)}
    disabled={disabled}
    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center space-x-2 ${
      activePage === pageName
        ? 'bg-primary-dark text-white'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
     aria-disabled={disabled}
  >
    {children}
  </button>
);

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage, theme, toggleTheme, isAnalysisDone, isLoggedIn, onLoginClick, onLogoutClick }) => {
  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 flex items-center space-x-2 text-primary-dark dark:text-primary-light cursor-pointer" onClick={() => setActivePage(Page.GAP_ANALYSIS)}>
              <LogoIcon className="h-8 w-8" />
              <span className="font-bold text-xl">SkillSync AI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-2">
              <NavItem pageName={Page.GAP_ANALYSIS} activePage={activePage} setActivePage={setActivePage}>
                <span>Gap Analysis</span>
              </NavItem>
              <NavItem pageName={Page.DASHBOARD} activePage={activePage} setActivePage={setActivePage} disabled={!isAnalysisDone}>
                <span>Dashboard</span>
              </NavItem>
              <NavItem pageName={Page.ROADMAP} activePage={activePage} setActivePage={setActivePage} disabled={!isAnalysisDone}>
                <span>Roadmap</span>
              </NavItem>
              <NavItem pageName={Page.CALENDAR} activePage={activePage} setActivePage={setActivePage}>
                 <CalendarIcon className="h-4 w-4" /> <span>Calendar</span>
              </NavItem>
              <NavItem pageName={Page.COMMUNITY} activePage={activePage} setActivePage={setActivePage}>
                <span>Community</span>
              </NavItem>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <MoonIcon className="h-6 w-6" />
              ) : (
                <SunIcon className="h-6 w-6" />
              )}
            </button>

            {isLoggedIn ? (
                 <button
                    onClick={onLogoutClick}
                    className="flex items-center space-x-2 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Logout"
                >
                    <span className="text-sm font-medium hidden sm:block">Logout</span>
                    <LogoutIcon className="h-6 w-6" />
                </button>
            ) : (
                <button
                    onClick={onLoginClick}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Login or Sign up"
                >
                    <UserCircleIcon className="h-8 w-8" />
                </button>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;