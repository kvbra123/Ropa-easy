
import React, { useState, useEffect } from 'react';
import AISearchSection from './components/AISearchSection';
import ImageEditor from './components/ImageEditor';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  // Escuchar eventos de navegación desde el Header Liquid si es necesario
  useEffect(() => {
    const handleNav = (e: any) => {
      if (e.detail) setCurrentView(e.detail);
    };
    window.addEventListener('shopify:ia:nav', handleNav);
    return () => window.removeEventListener('shopify:ia:nav', handleNav);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'image-editor':
        return <ImageEditor onBack={() => setCurrentView('landing')} />;
      case 'landing':
      default:
        return (
          <div className="animate-in fade-in duration-1000">
            {/* El Hero nativo de Liquid se muestra arriba de este root en el theme.liquid */}
            <AISearchSection />
            
            {/* Acceso rápido al Studio IA desde el cuerpo de la página */}
            <section className="py-24 bg-white border-t border-slate-50">
              <div className="max-w-[1400px] mx-auto px-6 text-center">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8 block">Control de Activos</span>
                 <h2 className="text-4xl font-display italic text-slate-900 mb-12">¿Necesitas retocar una pieza?</h2>
                 <button 
                   onClick={() => setCurrentView('image-editor')}
                   className="px-16 py-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-orange-500 transition-all shadow-2xl"
                 >
                   Abrir Editor Studio 1:1
                 </button>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderContent()}
    </div>
  );
};

export default App;
