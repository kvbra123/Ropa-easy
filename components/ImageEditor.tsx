
import React, { useState, useRef } from 'react';
import { editImageWithGemini } from '../services/geminiService';

interface ImageEditorProps {
  onBack: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ onBack }) => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setEditedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalImage || !prompt.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await editImageWithGemini(originalImage, prompt, 'image/jpeg');
      setEditedImage(result);
    } catch (err) {
      setError("Error en el renderizado 1:1. Por favor, asegúrate de que la imagen sea nítida.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <button onClick={onBack} className="flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              Volver al Admin de Shopify
            </button>
            <h2 className="text-5xl lg:text-7xl font-display italic text-slate-900 tracking-tight">Studio 1:1 Cuadrado</h2>
            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.5em] mt-4">Motor de activos Gemini Pro</p>
          </div>
          <div className="bg-white px-6 py-4 border border-slate-100 shadow-sm rounded-sm hidden md:block">
             <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Salida Optimizada para Feed</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="bg-white p-10 border border-slate-100 shadow-xl">
              <form onSubmit={handleEdit} className="space-y-10">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square border-2 border-dashed border-slate-200 hover:border-orange-500 bg-slate-50 transition-all cursor-pointer flex items-center justify-center overflow-hidden group"
                >
                  {originalImage ? (
                    <img src={originalImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Original" />
                  ) : (
                    <div className="text-center opacity-30">
                      <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      <span className="text-[10px] font-black uppercase tracking-widest">Subir Prenda</span>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block underline decoration-orange-500 underline-offset-8">Instrucciones de Edición</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-6 bg-slate-50 border border-slate-100 outline-none focus:border-slate-900 text-[11px] font-bold uppercase tracking-widest min-h-[140px]"
                    placeholder="Ej: Fondo minimalista de cemento pulido, luz cenital cálida..."
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading || !originalImage}
                  className="w-full py-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-orange-500 transition-all disabled:opacity-20"
                >
                  {loading ? 'Redimensionando a 1:1...' : 'Generar Asset Cuadrado'}
                </button>
                {error && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest text-center">{error}</p>}
              </form>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 shadow-2xl relative aspect-square flex items-center justify-center overflow-hidden">
              {editedImage ? (
                <div className="w-full h-full animate-in fade-in duration-1000">
                  <img src={editedImage} className="w-full h-full object-contain" alt="Resultado Final" />
                  <div className="absolute top-8 right-8">
                     <span className="bg-orange-500 text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-lg">
                       Formato Shopify 1:1
                     </span>
                  </div>
                  <div className="absolute bottom-10 left-10 right-10 flex gap-6">
                     <button className="flex-1 py-5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-colors shadow-xl">
                       Sincronizar con Catálogo
                     </button>
                     <button className="flex-1 py-5 border border-slate-900 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
                       Descargar JPG
                     </button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-20 max-w-md mx-auto">
                  <div className="w-32 h-32 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-10 opacity-20">
                    <div className="w-16 h-16 border-2 border-slate-900 border-dashed animate-spin-slow rounded-full"></div>
                  </div>
                  <p className="text-[10px] text-slate-300 uppercase tracking-widest leading-loose">
                    El sistema forzará una salida de 1024x1024 píxeles para mantener la consistencia visual en toda tu tienda online.
                  </p>
                </div>
              )}
              
              <div className="absolute inset-0 pointer-events-none border border-slate-100/30 grid grid-cols-2 grid-rows-2">
                <div className="border-r border-b border-slate-100/30"></div>
                <div className="border-b border-slate-100/30"></div>
                <div className="border-r border-slate-100/30"></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ImageEditor;
