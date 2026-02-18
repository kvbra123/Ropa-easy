
import React, { useState } from 'react';
import { getAIFashionAdvice } from '../services/geminiService';

const AISearchSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDemoSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const result = await getAIFashionAdvice(query);
    setAiResponse(result);
    setLoading(false);
  };

  return (
    <section id="search" className="py-32 lg:py-48 bg-white border-t border-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 space-y-8">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-px w-8 bg-orange-500"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500">Intelligent Search Engine</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-display text-slate-900 leading-[1.1]">
              Conversa con el futuro <br/><span className="italic">de tu armario.</span>
            </h2>
          </div>
          <div className="lg:max-w-[300px]">
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] leading-loose italic">
              "Busco algo para una cena en el desierto, que sea técnico pero elegante y que combine con mis botas de cuero oliva."
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-8 lg:p-20 rounded-2xl relative overflow-hidden">
          <form onSubmit={handleDemoSearch} className="relative z-10">
            <div className="flex flex-col space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Petición a la IA</label>
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe tu visión..."
                className="w-full bg-transparent border-b-2 border-slate-200 py-6 lg:py-10 text-2xl lg:text-5xl font-display outline-none focus:border-orange-500 transition-all placeholder:text-slate-200 text-slate-900"
              />
            </div>
            <div className="flex justify-end mt-8">
              <button 
                type="submit"
                disabled={loading}
                className="px-10 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-orange-500 disabled:opacity-30 transition-all flex items-center space-x-3 group"
              >
                {loading ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Procesando Estilo...</span>
                  </>
                ) : (
                  <>
                    <span>Consultar Oráculo</span>
                    <svg className="w-4 h-4 transform group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7M5 12h14"/></svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {aiResponse && (
            <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="lg:col-span-3">
                <div className="sticky top-24 pt-4 border-t border-orange-500">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Propuesta Editorial</span>
                  <div className="mt-4 text-[9px] text-slate-400 uppercase tracking-widest font-bold">Respuesta Generada por Gemini 2.5</div>
                </div>
              </div>
              <div className="lg:col-span-9 bg-white p-8 lg:p-12 shadow-sm rounded-xl">
                <p className="text-2xl lg:text-3xl text-slate-700 font-medium leading-[1.4] italic font-display">
                  "{aiResponse}"
                </p>
                <div className="mt-10 flex items-center space-x-6">
                  <button className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:text-slate-900 transition-colors">Añadir Looks Sugeridos al Carrito</button>
                  <div className="h-px flex-1 bg-slate-100"></div>
                </div>
              </div>
            </div>
          )}

          {/* Decoración de fondo */}
          <div className="absolute -bottom-24 -right-24 text-[30rem] font-black text-slate-100/50 pointer-events-none leading-none select-none">
            AI
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISearchSection;
