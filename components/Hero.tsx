
import React from 'react';
import { ViewState } from '../types';

interface HeroProps {
  onAction: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onAction }) => {
  return (
    <div className="relative pt-20">
      <div className="flex flex-col lg:flex-row min-h-[90vh]">
        
        {/* LADO IZQUIERDO: VISIÓN IA */}
        <div className="flex-1 flex flex-col justify-center p-8 lg:p-24 bg-white border-r border-slate-100 relative group overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-8">
              <span className="w-8 h-[1px] bg-orange-500"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">System V.02</span>
            </div>
            <h1 className="text-7xl lg:text-[10rem] font-display text-slate-900 leading-[0.8] mb-12 tracking-tighter">
              IA <br/><span className="italic">Styling.</span>
            </h1>
            <p className="max-w-xs text-[11px] text-slate-400 uppercase tracking-widest leading-loose mb-16">
              El buscador que no solo encuentra, sino que entiende la arquitectura de tu estilo. Sin filtros, solo intuición pura.
            </p>
            <a href="#search" className="inline-flex items-center group/btn">
              <span className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-slate-900 pb-1 group-hover/btn:border-orange-500 transition-colors">Explorar Visión</span>
              <svg className="w-5 h-5 ml-4 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-[10s]">
             <span className="text-[20rem] font-black uppercase tracking-tighter">TECH</span>
          </div>
        </div>

        {/* LADO DERECHO: DIGITALIZACIÓN B2B */}
        <div className="flex-1 flex flex-col justify-center p-8 lg:p-24 bg-slate-900 text-white relative">
           <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop" 
                className="w-full h-full object-cover mix-blend-overlay"
                alt="Background texture"
              />
           </div>
           
           <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <span className="w-8 h-[1px] bg-white"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Servicio B2B</span>
              </div>
              <h2 className="text-6xl lg:text-[7rem] font-display italic leading-[0.85] mb-12">
                Motor de <br/>Catálogo.
              </h2>
              <p className="max-w-xs text-[11px] text-white/40 uppercase tracking-widest leading-loose mb-16">
                Transformamos tu inventario físico en activos 3D de alta fidelidad. Un llamado a forjar tu propio camino digital.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => onAction('digitalization-form')}
                  className="px-10 py-6 bg-white text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-orange-500 hover:text-white transition-all duration-500"
                >
                  Digitalizar Ahora
                </button>
                <button 
                  onClick={() => onAction('image-editor')}
                  className="px-10 py-6 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-slate-900 transition-all duration-500"
                >
                  Nano Editor IA
                </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
