
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AISearchSection from './components/AISearchSection';
import ProductGrid from './components/ProductGrid';
import LeadForm from './components/LeadForm';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contact-digitalize') {
        setCurrentView('digitalization-form');
      } else {
        setCurrentView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'landing') {
      window.history.pushState({}, '', window.location.pathname);
    } else {
      window.location.hash = 'contact-digitalize';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {currentView === 'landing' ? (
        <>
          <Navbar onNavigate={navigate} />
          <main className="animate-in fade-in duration-1000">
            <Hero onAction={navigate} />
            <ProductGrid />
            <div id="search">
              <AISearchSection />
            </div>
            
            <footer className="bg-slate-900 py-24 mt-20">
              <div className="max-w-[1400px] mx-auto px-6 text-center">
                <span className="text-xl font-extrabold tracking-tighter text-white uppercase block mb-4">ROPA EASY</span>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em]">© 2024 Tech & Fashion Era</p>
              </div>
            </footer>
          </main>
        </>
      ) : (
        <div className="animate-in slide-in-from-right-full duration-500">
          <LeadForm onBack={() => navigate('landing')} />
        </div>
      )}
    </div>
  );
};

export default App;
