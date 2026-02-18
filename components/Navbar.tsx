
import React from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center cursor-pointer space-x-2"
            onClick={() => onNavigate('landing')}
          >
            <div className="flex flex-col leading-none">
              <span className="text-xl font-extrabold tracking-tighter text-slate-900 uppercase">ROPA EASY</span>
              <span className="text-[10px] font-medium tracking-[0.3em] text-slate-400 uppercase">Tech & Fashion</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <a href="#search" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-orange-500 transition-colors hidden sm:block">
              Buscador IA
            </a>
            <button 
              onClick={() => onNavigate('digitalization-form')}
              className="group flex items-center space-x-3 px-6 py-2 border border-slate-900 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300"
            >
              <span className="text-xs font-bold uppercase tracking-widest">Digitalizar</span>
              <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:bg-white animate-pulse"></div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
