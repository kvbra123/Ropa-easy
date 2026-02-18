
import React from 'react';
import { ViewState } from '../types';

interface HeroProps {
  onAction: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onAction }) => {
  const scrollToSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    const searchSection = document.getElementById('search');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] border-b border-slate-100">
        
        {/* Sección Izquierda: Buscador Inteligente */}
        <div className="flex flex-col justify-between p-8 lg:p-20 border-r border-slate-100 bg-[#fbfbfb] group relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Innovación AI</span>
            <div className="px-4 py-1.5 border border-blue-100 bg-white text-blue-500 text-[9px] font-black rounded-full uppercase tracking-[0.2em] shadow-sm">
              Laboratorio Beta
            </div>
          </div>
          
          <div className="my-12 z-10">
            <h2 className="text-7xl lg:text-9xl font-display italic text-slate-900 leading-[0.8] mb-8">
              La <br/>Inteligencia <br/>del Estilo.
            </h2>
            <p className="max-w-md text-xs text-slate-500 leading-relaxed uppercase tracking-[0.1em]">
              Imagina buscar por sensaciones, no por etiquetas. Nuestra IA entiende el contexto, la caída de la tela y tu estado de ánimo.
            </p>
          </div>

          <button 
            onClick={scrollToSearch}
            className="flex items-center group-hover:translate-x-4 transition-transform duration-500 z-10"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] mr-4 text-slate-900">Explorar la Visión</span>
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </button>

          {/* Gráfico decorativo de IA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
             <svg width="600" height="600" viewBox="0 0 100 100" className="animate-[spin_60s_linear_infinite]">
               <circle cx="50" cy="50" r="45" stroke="currentColor" fill="none" strokeDasharray="1 4" />
             </svg>
          </div>
        </div>

        {/* Sección Derecha: Servicio de Digitalización */}
        <div className="flex flex-col justify-between p-8 lg:p-20 bg-white relative overflow-hidden group">
          <div className="flex justify-between items-start z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Ecosistema B2B</span>
            <div className="flex items-center space-x-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Free Partnership</span>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
            </div>
          </div>

          <div className="my-12 z-10">
            <h2 className="text-7xl lg:text-9xl font-display text-slate-900 leading-[0.8] mb-8">
              Tu <br/>Marca <br/>en 3D.
            </h2>
            <p className="max-w-md text-xs text-slate-500 leading-relaxed uppercase tracking-[0.1em]">
              Elimina las barreras de la distancia. Permite que tus clientes sientan la textura y el volumen de tus prendas desde cualquier lugar del mundo.
            </p>
          </div>

          <div className="z-10">
            <button 
              onClick={() => onAction('digitalization-form')}
              className="w-full lg:w-max px-16 py-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-orange-500 transition-all shadow-xl hover:-translate-y-1"
            >
              Digitaliza tu catálogo
            </button>
          </div>

          {/* Símbolo de Ropa Easy de fondo */}
          <div className="absolute bottom-0 right-0 p-12 opacity-[0.02] pointer-events-none transform translate-x-1/4 translate-y-1/4">
             <span className="text-[25rem] font-extrabold uppercase tracking-tighter">RE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
