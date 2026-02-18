
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
    <section id="search" className="py-32 bg-slate-50 border-y border-slate-100 overflow-hidden relative">
      {/* Background Decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none w-full text-center">
        <span className="text-[25rem] font-black uppercase tracking-tighter leading-none">SEARCH</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          <div className="lg:col-span-5">
            <header className="mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-6 block">Personal Shopper v3.1</span>
              <h2 className="text-6xl lg:text-8xl font-display text-slate-900 leading-[0.85] mb-8 tracking-tighter">
                Tu Estilo <br/><span className="italic">Procesado.</span>
              </h2>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest leading-loose max-w-sm">
                Describe un evento o una emoción y nuestra IA navegará por el catálogo de la tienda para encontrarte el look perfecto.
              </p>
            </header>

            <form onSubmit={handleDemoSearch} className="relative group">
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busco un look para un festival tech..."
                className="w-full bg-white border border-slate-200 px-8 py-7 text-xs uppercase tracking-[0.2em] outline-none focus:border-slate-900 transition-all shadow-xl font-bold"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-3 top-3 bottom-3 px-8 bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em] hover:bg-orange-500 transition-colors disabled:opacity-50"
              >
                {loading ? 'Consultando...' : 'Encontrar'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7">
            <div className="min-h-[500px] flex items-center justify-center bg-white border border-slate-100 p-8 lg:p-20 relative shadow-2xl">
              {result ? (
                <div className="w-full animate-in fade-in slide-in-from-bottom-12 duration-1000">
                  <div className="flex flex-wrap gap-3 mb-10">
                    {result.keywords?.map((k: string) => (
                      <span key={k} className="px-4 py-1.5 border border-slate-100 text-[8px] font-black uppercase tracking-widest text-slate-400 rounded-full bg-slate-50">
                        #{k}
                      </span>
                    ))}
                  </div>
                  
                  <blockquote className="text-3xl lg:text-4xl font-display italic text-slate-900 leading-[1.1] mb-16 border-l-4 border-orange-500 pl-8">
                    "{result.advice}"
                  </blockquote>

                  {result.recommendedProduct && (
                    <div className="flex items-center p-8 bg-slate-50 border border-slate-100 group cursor-pointer hover:border-orange-500 transition-all transform hover:-translate-y-1">
                      <div className="w-24 h-32 bg-slate-200 mr-8 overflow-hidden relative">
                         <div className="absolute inset-0 bg-slate-300 animate-pulse"></div>
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-orange-500 uppercase tracking-[0.3em] mb-2 block">Match Sugerido</span>
                        <h4 className="text-lg font-black uppercase tracking-tighter text-slate-900">{result.recommendedProduct}</h4>
                        <div className="mt-4 inline-flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                          Añadir al carrito 
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                   <div className="w-24 h-24 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                      <div className="w-12 h-12 bg-slate-50 rounded-full"></div>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200">Waiting for Insight</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AISearchSection;
