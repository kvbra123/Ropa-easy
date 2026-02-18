
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
    <section id="search" className="py-32 bg-slate-900 text-white overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          <div className="lg:col-span-5">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-8 block">Shopify Intelligence v4</span>
            <h2 className="text-6xl lg:text-8xl font-display italic leading-[0.85] mb-12 tracking-tighter">
              Buscador <br/><span className="text-slate-400">Contextual.</span>
            </h2>
            <p className="text-[11px] text-white/40 uppercase tracking-widest leading-loose max-w-sm mb-16">
              Nuestra IA no solo busca productos, diseña tu presencia. Describe tu intención y te conectaremos con el asset perfecto.
            </p>

            <form onSubmit={handleDemoSearch} className="relative group">
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busco algo minimalista para otoño..."
                className="w-full bg-transparent border-b border-white/20 px-0 py-8 text-xl uppercase tracking-widest outline-none focus:border-orange-500 transition-all font-display italic"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-0 bottom-6 px-8 py-3 bg-white text-slate-900 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50"
              >
                {loading ? 'Analizando...' : 'Consultar'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7">
            <div className="min-h-[500px] bg-white text-slate-900 p-12 lg:p-20 shadow-2xl relative overflow-hidden group">
              {result ? (
                <div className="animate-in slide-in-from-right-10 duration-700">
                  <div className="flex space-x-4 mb-12">
                    {result.keywords?.map((k: string) => (
                      <span key={k} className="px-4 py-1.5 bg-slate-50 text-[8px] font-black uppercase tracking-widest text-slate-400 border border-slate-100">
                        #{k}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-display leading-[1.1] mb-16 italic">
                    "{result.advice}"
                  </h3>

                  <div className="flex items-center p-8 bg-slate-50 group/item cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-500">
                    <div className="w-20 h-28 bg-slate-200 mr-8 overflow-hidden">
                       <div className="w-full h-full bg-slate-300 animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-2 block">Match Sugerido</span>
                      <h4 className="text-sm font-black uppercase tracking-widest mb-4">{result.recommendedProduct}</h4>
                      <button className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-current pb-1 group-hover/item:border-orange-500">
                        Ver Detalles en Catálogo
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-10">
                  <span className="text-[12rem] font-black leading-none">AI</span>
                  <span className="text-[10px] font-black uppercase tracking-[1em] mt-4">Esperando Prompt</span>
                </div>
              )}
              
              {/* Acento Visual */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 -rotate-45 translate-x-16 -translate-y-16"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AISearchSection;
