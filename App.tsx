
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageResizer from './components/ImageResizer';
import About from './components/About';

type Page = 'resizer' | 'about';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('resizer');

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100">
      <Header currentPage={currentPage} navigate={navigate} />
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
