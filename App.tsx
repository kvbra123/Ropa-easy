
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import AISearchSection from './components/AISearchSection';
import ImageEditor from './components/ImageEditor';
import LeadForm from './components/LeadForm';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

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
      case 'digitalization-form':
        return <LeadForm onBack={() => setCurrentView('landing')} />;
      case 'landing':
      default:
        return (
          <div className="animate-in">
            <Hero onAction={setCurrentView} />
            <ProductGrid />
            <AISearchSection />
            
            {/* CTA Final */}
            <section className="py-32 bg-slate-50 border-t border-slate-100">
              <div className="max-w-[1400px] mx-auto px-6 text-center">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-8 block">Studio 1:1 Ready</span>
                 <h2 className="text-5xl lg:text-7xl font-display italic text-slate-900 mb-12 tracking-tight">¿Listo para optimizar <br/>tus activos?</h2>
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
      <Navbar onNavigate={setCurrentView} />
      <div className="pt-20">
        {renderContent()}
      </div>
      
      <footer className="bg-white border-t border-slate-100 py-20">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <div className="flex flex-col leading-none mb-6">
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">ROPA EASY</span>
            <span className="text-[9px] font-bold tracking-[0.3em] text-slate-400 uppercase mt-2">Tecnología para Marcas de Moda</span>
          </div>
          <p className="text-[9px] text-slate-300 uppercase tracking-widest">
            &copy; 2024 Ropa Easy IA - Built for Shopify
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
