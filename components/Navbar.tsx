
import React from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex flex-col leading-none cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            <span className="text-xl font-extrabold tracking-tighter text-slate-900 uppercase">ROPA EASY</span>
            <span className="text-[9px] font-bold tracking-[0.3em] text-slate-400 uppercase">Tech & Fashion</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#search" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">
              IA Vision
            </a>
            <button 
              onClick={() => onNavigate('digitalization-form')}
              className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-orange-500 transition-all shadow-lg"
            >
              Digitalizar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
