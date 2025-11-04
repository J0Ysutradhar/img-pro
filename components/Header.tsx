
import React from 'react';

type Page = 'resizer' | 'about';

interface HeaderProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, navigate }) => {
  const NavLink: React.FC<{ page: Page; children: React.ReactNode }> = ({ page, children }) => {
    const isActive = currentPage === page;
    return (
      <button
        onClick={() => navigate(page)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
          isActive
            ? 'bg-indigo-500 text-white shadow-lg'
            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}
      >
        {children}
      </button>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold tracking-tight text-white">
              <span className="text-indigo-400">Img</span> Pro
            </span>
          </div>
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <NavLink page="resizer">Resizer</NavLink>
            <NavLink page="about">About</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
