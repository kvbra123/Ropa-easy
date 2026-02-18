
import React, { useState, useEffect } from 'react';
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
    window.location.hash = view === 'landing' ? '' : 'contact-digitalize';
  };

  if (currentView === 'digitalization-form') {
    return <LeadForm onBack={() => navigate('landing')} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="animate-in fade-in duration-1000">
        {/* HERO SECTION - El corazón de la marca */}
        <Hero onAction={navigate} />
        
        {/* PRODUCT GRID - La prueba del catálogo */}
        <ProductGrid />
        
        {/* AI SEARCH - El motor inteligente que no aparecía */}
        <div id="search">
          <AISearchSection />
        </div>

        {/* Espaciado final estético */}
        <div className="h-32 bg-white"></div>
      </main>
    </div>
  );
};

export default App;
