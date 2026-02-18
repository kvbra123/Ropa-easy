
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AISearchSection from './components/AISearchSection';
import ProductGrid from './components/ProductGrid';
import LeadForm from './components/LeadForm';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  // Asegurar que al cargar la página se vea el inicio
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#contact-digitalize') {
      setCurrentView('digitalization-form');
    }
  }, []);

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Actualizar la URL de forma limpia
    if (view === 'landing') {
      window.history.pushState({}, '', '/');
    } else {
      window.history.pushState({}, '', '#contact-digitalize');
    }
  };

  return (
    <div className="min-h-screen selection:bg-orange-100 selection:text-orange-900 bg-white">
      <Navbar onNavigate={navigate} />
      
      {currentView === 'landing' ? (
        <main className="animate-in fade-in duration-700">
          {/* Todas estas secciones DEBEN renderizarse para ser visibles */}
          <Hero onAction={navigate} />
          
          <div id="shop-preview">
            <ProductGrid />
          </div>
          
          <AISearchSection />
          
          <footer className="bg-slate-900 py-32">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
                <div>
                  <h2 className="text-4xl font-extrabold tracking-tighter text-white uppercase mb-8">ROPA EASY</h2>
                  <p className="text-xs leading-loose text-slate-400 uppercase tracking-[0.2em] max-w-sm">
                    La convergencia de la estética técnica y la funcionalidad urbana. Creamos herramientas de estilo para la mujer contemporánea.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Explorar</h4>
                    <ul className="space-y-4">
                      {['Colección', 'Digitalización', 'Buscador IA'].map(l => (
                        <li key={l}><a href="#" className="text-xs font-bold text-slate-300 uppercase tracking-widest hover:text-white transition-colors">{l}</a></li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Conectar</h4>
                    <ul className="space-y-4">
                      {['Instagram', 'LinkedIn', 'Contacto'].map(l => (
                        <li key={l}><a href="#" className="text-xs font-bold text-slate-300 uppercase tracking-widest hover:text-white transition-colors">{l}</a></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest space-y-4 md:space-y-0">
                <p>&copy; 2024 Ropa Easy. Built for the future of retail.</p>
                <div className="flex space-x-8 italic">
                  <span>Privacy Policy</span>
                  <span>Terms of Service</span>
                </div>
              </div>
            </div>
          </footer>
        </main>
      ) : (
        <div className="animate-in slide-in-from-right-full duration-700 ease-out">
          <LeadForm onBack={() => navigate('landing')} />
        </div>
      )}
    </div>
  );
};

export default App;
