import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import ImageResizer from './components/ImageResizer';
import About from './components/About';

type Page = 'resizer' | 'about';
export type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('resizer');
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'light'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Header currentPage={currentPage} navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
      <main className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {currentPage === 'resizer' && <ImageResizer />}
          {currentPage === 'about' && <About />}
        </div>
      </main>
    </div>
  );
};

export default App;