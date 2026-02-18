
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
    <div className="relative bg-white overflow-hidden">
      {/* Líneas decorativas sutiles */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0 80 Q 50 10 100 80" fill="none" stroke="currentColor" strokeWidth="0.2"/>
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-5xl">
          <h1 className="text-[12vw] lg:text-[10rem] font-display italic text-slate-900 leading-[0.85] mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            Moda <br /> Inteligente.
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <p className="max-w-sm text-xs lg:text-sm text-slate-400 uppercase tracking-[0.2em] leading-loose animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Nacidas en la carretera, creadas para la ciudad. <br />
              Piezas técnicas sin concesiones que definen la nueva era digital.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <button 
                onClick={() => onAction('digitalization-form')}
                className="px-10 py-5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-orange-500 transition-all shadow-xl"
              >
                Digitalizar Catálogo
              </button>
              
              <button 
                onClick={scrollToSearch}
                className="group flex items-center space-x-4 px-10 py-5 border border-slate-100 hover:border-slate-900 transition-all"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Explorar Visión</span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
