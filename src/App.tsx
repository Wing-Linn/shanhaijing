import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Chapters from './views/Chapters';
import Creatures from './views/Creatures';
import Mountains from './views/Mountains';
import SearchView from './views/Search';
import type { ViewType } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery && currentView !== 'search') {
      setCurrentView('search');
    }
  }, [searchQuery, currentView]);

  return (
    <div className="min-h-screen bg-paper-100">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <main>
        {currentView === 'home' && <Home onNavigate={handleNavigate} />}
        {currentView === 'chapters' && <Chapters />}
        {currentView === 'creatures' && <Creatures />}
        {currentView === 'mountains' && <Mountains />}
        {currentView === 'search' && (
          <SearchView
            query={searchQuery}
            onQueryChange={handleSearchChange}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
