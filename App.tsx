
import React, { useState } from 'react';
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

  const renderContent = () => {
    switch (currentView) {
      case 'digitalization-form':
        return (
          <div className="animate-in slide-in-from-bottom-10 duration-700">
            <LeadForm onBack={() => navigate('landing')} />
          </div>
        );
      case 'image-editor':
        return (
          <div className="animate-in fade-in zoom-in duration-700">
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
            
            {/* Shopify Ready Footer */}
            <footer className="bg-white border-t border-slate-100 py-32">
              <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
                  <div className="md:col-span-4">
                    <div className="flex flex-col leading-none mb-8">
                      <span className="text-3xl font-black tracking-tighter text-slate-900 uppercase">ROPA EASY</span>
                      <span className="text-[10px] font-bold tracking-[0.4em] text-slate-400 uppercase mt-2">IA & Fashion Architecture</span>
                    </div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-widest leading-loose max-w-xs">
                      Diseñando el futuro del retail digital mediante inteligencia artificial de última generación.
                    </p>
                  </div>
                  <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-12">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-8 underline decoration-orange-500 underline-offset-8">Tienda</h4>
                      <ul className="space-y-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <li><a href="#" className="hover:text-slate-900 transition-colors">Colecciones</a></li>
                        <li><a href="#" className="hover:text-slate-900 transition-colors">Digital Goods</a></li>
                        <li><a href="#" className="hover:text-slate-900 transition-colors">Lookbook</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-8 underline decoration-orange-500 underline-offset-8">Tech Hub</h4>
                      <ul className="space-y-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <li onClick={() => navigate('image-editor')} className="cursor-pointer hover:text-slate-900 transition-colors">Image Editor 1:1</li>
                        <li onClick={() => navigate('digitalization-form')} className="cursor-pointer hover:text-slate-900 transition-colors">Digitalización B2B</li>
                        <li><a href="#search" className="hover:text-slate-900 transition-colors">Styling IA</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-8 underline decoration-orange-500 underline-offset-8">Social</h4>
                      <ul className="space-y-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <li><a href="#" className="hover:text-slate-900 transition-colors">Instagram</a></li>
                        <li><a href="#" className="hover:text-slate-900 transition-colors">LinkedIn</a></li>
                        <li><a href="#" className="hover:text-slate-900 transition-colors">Soporte</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-32 pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
                  <span className="text-[9px] font-black text-slate-200 uppercase tracking-[0.5em]">&copy; 2024 Ropa Easy - Crafted for Shopify</span>
                  <div className="flex space-x-4 opacity-20 grayscale">
                    <div className="w-8 h-5 bg-slate-900 rounded-sm"></div>
                    <div className="w-8 h-5 bg-slate-900 rounded-sm"></div>
                    <div className="w-8 h-5 bg-slate-900 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen selection:bg-orange-100 selection:text-orange-900 bg-white">
      <Navbar onNavigate={navigate} />
      {renderContent()}
    </div>
  );
};

export default App;
