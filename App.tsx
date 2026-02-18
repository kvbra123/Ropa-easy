
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import AISearchSection from './components/AISearchSection';
import ImageEditor from './components/ImageEditor';
import LeadForm from './components/LeadForm';
import { ViewState } from './types';

interface ShopifyGlobal {
  shop?: string;
  storefrontAccessToken?: string;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  
  // Inicializar estado basado en el entorno Shopify
  const [isShopify] = useState(() => {
    const shopifyData = (window as unknown as { Shopify?: ShopifyGlobal }).Shopify;
    return !!shopifyData || window.location.hostname.includes('myshopify.com');
  });

  const [shopName] = useState(() => {
    const shopifyData = (window as unknown as { Shopify?: ShopifyGlobal }).Shopify;
    if (shopifyData?.shop) {
      return shopifyData.shop.split('.')[0].toUpperCase();
    }
    return 'Shopify Store';
  });

  useEffect(() => {
    // Verificación estricta de entorno Shopify en producción
    if (!isShopify && process.env.NODE_ENV === 'production') {
      console.error('CRITICAL: Ropa Easy IA requires a valid Shopify environment.');
    }

    const handleNav = (e: CustomEvent<ViewState>) => {
      if (e.detail) setCurrentView(e.detail);
    };
    window.addEventListener('shopify:ia:nav', handleNav as EventListener);
    return () => window.removeEventListener('shopify:ia:nav', handleNav as EventListener);
  }, [isShopify]);

  const renderContent = () => {
    // Bloqueo estricto fuera de Shopify
    if (!isShopify && process.env.NODE_ENV === 'production') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-12 text-center">
          <div className="max-w-md border border-white/10 p-12 bg-black/20 backdrop-blur-xl">
            <div className="w-16 h-16 bg-orange-500 mx-auto mb-8 flex items-center justify-center rounded-full">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-6">Acceso Denegado</h1>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] leading-loose mb-8">
              Este software está licenciado exclusivamente para ecosistemas Shopify. 
              Detectamos un entorno no autorizado.
            </p>
            <a href="https://shopify.com" className="text-[10px] font-bold text-orange-500 uppercase tracking-widest border-b border-orange-500 pb-1">
              Obtener Licencia Shopify
            </a>
          </div>
        </div>
      );
    }

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
            
            {/* CTA Final - Shopify Contextual */}
            <section className="py-32 bg-slate-50 border-t border-slate-100">
              <div className="max-w-[1400px] mx-auto px-6 text-center">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-8 block">Integración {shopName}</span>
                 <h2 className="text-5xl lg:text-7xl font-display italic text-slate-900 mb-12 tracking-tight">Potencia tu tienda <br/>con activos 3D.</h2>
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
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">ROPA EASY x {shopName}</span>
            <span className="text-[9px] font-bold tracking-[0.3em] text-slate-400 uppercase mt-2">Tecnología IA Certificada para Shopify</span>
          </div>
          <p className="text-[9px] text-slate-300 uppercase tracking-widest">
            &copy; 2024 Ropa Easy IA - Licencia Activa para {shopName}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
