
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AISearchSection from './components/AISearchSection';
import ProductGrid from './components/ProductGrid';
import LeadForm from './components/LeadForm';
import ImageEditor from './components/ImageEditor';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Escuchar eventos desde el Header de Shopify (Liquid) o la URL
  useEffect(() => {
    const handleGlobalNav = () => navigate('image-editor');
    window.addEventListener('navigate-to-editor', handleGlobalNav);

    // Revisar parámetros de URL (útil cuando venimos de otra página de la tienda)
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'image-editor') {
      navigate('image-editor');
      // Limpiar el parámetro de la URL discretamente
      window.history.replaceState({}, '', window.location.pathname);
    }

    return () => window.removeEventListener('navigate-to-editor', handleGlobalNav);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'digitalization-form':
        return (
          <div className="animate-in slide-in-from-right-10 duration-700">
            <LeadForm onBack={() => navigate('landing')} />
          </div>
        );
      case 'image-editor':
        return (
          <div className="animate-in fade-in zoom-in duration-500">
            <ImageEditor onBack={() => navigate('landing')} />
          </div>
        );
      case 'landing':
      default:
        return (
          <main className="animate-in fade-in duration-1000">
            <Hero onAction={navigate} />
            <ProductGrid />
            <AISearchSection />
            <footer className="bg-white border-t border-slate-100 py-20">
              <div className="max-w-[1400px] mx-auto px-6 text-center">
                <div className="mb-12">
                  <span className="text-4xl font-extrabold tracking-tighter text-slate-900 uppercase">ROPA EASY</span>
                  <p className="text-[10px] font-medium tracking-[0.5em] text-slate-400 uppercase mt-2">Tecnología de vanguardia para marcas sin concesiones.</p>
                </div>
                
                <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12 mb-16">
                  {['Instagram', 'LinkedIn', 'Soporte Técnico'].map((item) => (
                    <a key={item} href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors underline-offset-8 hover:underline">
                      {item}
                    </a>
                  ))}
                </div>
                
                <div className="max-w-2xl mx-auto border-t border-slate-100 pt-12">
                  <p className="text-[10px] leading-loose text-slate-300 uppercase tracking-[0.2em]">
                    Forjando el futuro de la moda digital.
                  </p>
                  <p className="text-[10px] text-slate-200 mt-8">
                    &copy; 2024 Ropa Easy.
                  </p>
                </div>
              </div>
            </footer>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen selection:bg-orange-100 selection:text-orange-900 bg-white">
      {/* El Navbar de React se muestra solo en vistas profundas como el editor para dar control de retroceso */}
      {currentView !== 'landing' && <Navbar onNavigate={navigate} />}
      {renderContent()}
    </div>
  );
};

export default App;
