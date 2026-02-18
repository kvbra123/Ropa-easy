
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
    <section id="search" className="py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 space-y-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4 block">Manifesto IA</span>
            <h2 className="text-4xl lg:text-6xl font-display text-slate-900 leading-tight">
              Pronto, el buscador que <br/><span className="italic">realmente</span> te conoce.
            </h2>
          </div>
          <p className="text-xs text-slate-400 uppercase tracking-widest max-w-[240px] leading-loose">
            Buscando a través de millones de piezas técnicas, protectoras y femeninas sin concesiones.
          </p>
        </div>

        <div className="border-y border-slate-100 py-12">
          <form onSubmit={handleDemoSearch} className="relative group max-w-4xl">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Descríbenos tu outfit ideal..."
              className="w-full bg-transparent border-b-2 border-slate-100 py-8 text-2xl lg:text-4xl font-display outline-none focus:border-orange-500 transition-all placeholder:text-slate-200"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-0 bottom-8 text-xs font-black uppercase tracking-widest text-slate-900 hover:text-orange-500 disabled:opacity-30"
            >
              {loading ? 'Consultando...' : 'Ver Visión'}
            </button>
          </form>

          {aiResponse && (
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="lg:col-span-4 py-4 border-t border-orange-500">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Respuesta de IA</span>
              </div>
              <div className="lg:col-span-8">
                <p className="text-xl lg:text-2xl text-slate-600 font-medium leading-relaxed italic">
                  "{aiResponse}"
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-20 flex flex-wrap gap-x-20 gap-y-12">
           {[
            { id: '01', label: 'Búsqueda por Voz' },
            { id: '02', label: 'Match de Estilo' },
            { id: '03', label: 'Catálogos 3D' },
            { id: '04', label: 'Protección de Datos' }
           ].map((item) => (
             <div key={item.id} className="flex items-center space-x-4">
               <span className="text-[10px] font-black text-slate-300">{item.id}</span>
               <span className="text-xs font-bold uppercase tracking-widest text-slate-900">{item.label}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default AISearchSection;
