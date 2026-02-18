
import React from 'react';
import { ViewState } from '../types';

interface HeroProps {
  onAction: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onAction }) => {
  return (
    <div className="relative pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] border-b border-slate-100">
        
        {/* Sección Izquierda: Adelanto del Buscador */}
        <div className="flex flex-col justify-between p-8 lg:p-16 border-r border-slate-100 bg-slate-50/50 group">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Próximo Lanzamiento</span>
            <div className="px-3 py-1 border border-blue-200 bg-blue-50 text-blue-500 text-[10px] font-bold rounded-full uppercase tracking-widest">
              Muy Pronto
            </div>
          </div>
          
          <div className="my-12">
            <h2 className="text-6xl lg:text-8xl font-display italic text-slate-900 leading-[0.9] mb-6">
              El <br/>Buscador <br/>Inteligente.
            </h2>
            <p className="max-w-md text-sm text-slate-500 leading-relaxed uppercase tracking-tight">
              Diseñado para encontrar la prenda exacta que vive en tu imaginación. Sin filtros, solo intuición pura.
            </p>
          </div>

          <a href="#search" className="flex items-center group-hover:translate-x-4 transition-transform duration-500">
            <span className="text-xs font-black uppercase tracking-widest mr-4">Explorar Visión</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Sección Derecha: Servicio de Digitalización */}
        <div className="flex flex-col justify-between p-8 lg:p-16 bg-white relative overflow-hidden group">
          <div className="flex justify-between items-start z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Servicios 01</span>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Gratis</span>
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
            </div>
          </div>

          <div className="my-12 z-10">
            <h2 className="text-6xl lg:text-8xl font-display text-slate-900 leading-[0.9] mb-6">
              Motor de <br/>Catálogo <br/>Digital.
            </h2>
            <p className="max-w-md text-sm text-slate-500 leading-relaxed uppercase tracking-tight">
              Transformamos tu inventario físico en activos 3D de alta fidelidad. Un llamado a forjar tu propio camino digital.
            </p>
          </div>

          <button 
            onClick={() => onAction('digitalization-form')}
            className="w-full lg:w-max px-12 py-5 bg-slate-900 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-none hover:bg-orange-600 transition-colors z-10"
          >
            Digitaliza tu catálogo
          </button>

          {/* Background subtle logo mark */}
          <div className="absolute -bottom-20 -right-20 opacity-[0.03] rotate-12 group-hover:scale-110 transition-transform duration-[3s] pointer-events-none">
             <svg className="w-[500px] h-[500px]" viewBox="0 0 100 100" fill="currentColor">
               <path d="M20 50 L80 50 M50 20 L50 80" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
