
import React, { useState } from 'react';
import { getAIFashionAdvice } from '../services/geminiService';

const AISearchSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleDemoSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const data = await getAIFashionAdvice(query);
    setResult(data);
    setLoading(false);
  };

  return (
    <section id="search" className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-5">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-6 block">Inteligencia Predictiva</span>
            <h2 className="text-5xl lg:text-7xl font-display text-slate-900 leading-[0.9] mb-8">
              Tu Estilo <br/><span className="italic">Decodificado.</span>
            </h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest leading-loose mb-12">
              Habla con nuestra IA como si fuera tu estilista personal. Encuentra el look perfecto mediante lenguaje natural.
            </p>

            <form onSubmit={handleDemoSearch} className="relative">
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busco algo futurista para una cena..."
                className="w-full bg-white border border-slate-200 px-6 py-5 text-sm uppercase tracking-widest outline-none focus:border-slate-900 transition-all shadow-sm"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 px-6 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors disabled:opacity-50"
              >
                {loading ? 'Analizando...' : 'Consultar'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 min-h-[400px] flex items-center justify-center bg-white border border-slate-100 p-8 lg:p-16 relative overflow-hidden">
            {result ? (
              <div className="w-full animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="flex items-center space-x-4 mb-8">
                  {result.keywords?.map((k: string) => (
                    <span key={k} className="px-3 py-1 bg-slate-100 text-[9px] font-bold uppercase tracking-widest text-slate-500 rounded-full">
                      #{k}
                    </span>
                  ))}
                </div>
                
                <blockquote className="text-2xl lg:text-3xl font-display italic text-slate-900 leading-tight mb-12">
                  "{result.advice}"
                </blockquote>

                {result.recommendedProduct && (
                  <div className="flex items-center p-6 border border-slate-100 group cursor-pointer hover:border-orange-500 transition-colors">
                    <div className="w-20 h-24 bg-slate-50 mr-6 overflow-hidden">
                       <div className="w-full h-full bg-slate-200 animate-pulse"></div>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1 block">Match Sugerido</span>
                      <h4 className="text-sm font-bold uppercase tracking-tighter text-slate-900">{result.recommendedProduct}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase">Ver en catálogo →</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center opacity-20">
                 <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                 </svg>
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em]">IA Esperando Entrada</span>
              </div>
            )}
            
            <div className="absolute top-0 right-0 p-4">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AISearchSection;
