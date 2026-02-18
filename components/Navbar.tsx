
import React from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('landing')}
          >
            <div className="flex flex-col leading-none">
              <span className="text-xl font-extrabold tracking-tighter text-slate-900 uppercase group-hover:text-orange-500 transition-colors">ROPA EASY</span>
              <span className="text-[9px] font-bold tracking-[0.3em] text-slate-400 uppercase mt-1">Tech & Fashion IA</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 sm:space-x-10">
            <button 
              onClick={() => {
                onNavigate('landing');
                setTimeout(() => document.getElementById('search')?.scrollIntoView({behavior: 'smooth'}), 100);
              }}
              className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
            >
              Buscador IA
            </button>
            <button 
              onClick={() => onNavigate('image-editor')}
              className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:text-orange-600 transition-all border border-orange-500/20 px-4 py-2 rounded-full"
            >
              Studio 1:1
            </button>
            <button 
              onClick={() => onNavigate('digitalization-form')}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-orange-500 transition-all shadow-lg"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">Digitalizar</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
