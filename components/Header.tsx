import React from 'react';
import { Theme } from '../App';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

type Page = 'resizer' | 'about';

interface HeaderProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, navigate, theme, toggleTheme }) => {
  const NavLink: React.FC<{ page: Page; children: React.ReactNode }> = ({ page, children }) => {
    const isActive = currentPage === page;
    return (
      <button
        onClick={() => navigate(page)}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75 ${
          isActive
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        {children}
      </button>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <span className="text-blue-600 dark:text-blue-500">Img</span> Pro
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <nav className="flex items-center space-x-2 sm:space-x-4">
              <NavLink page="resizer">Resizer</NavLink>
              <NavLink page="about">About</NavLink>
            </nav>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <MoonIcon className="w-5 h-5" />
              ) : (
                <SunIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;