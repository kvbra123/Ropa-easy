
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
      setError("Error en el procesado 1:1. Por favor, intenta con otra descripción.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        <header className="flex justify-between items-center mb-16 border-b border-slate-100 pb-8">
          <div>
            <button onClick={onBack} className="flex items-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors mb-4">
              <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
              Return to Merchant Hub
            </button>
            <h2 className="text-4xl font-display italic text-slate-900">Editor de Catálogo 1:1</h2>
          </div>
          <div className="hidden md:block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
              Gemini 2.5 Flash Image Active
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Panel de Control */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-slate-50 p-8 border border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 block">Configuración de Assets</span>
              
              <form onSubmit={handleEdit} className="space-y-10">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square w-full border-2 border-dashed border-slate-200 hover:border-orange-500 bg-white cursor-pointer transition-all flex flex-col items-center justify-center relative overflow-hidden group"
                >
                  {originalImage ? (
                    <img src={originalImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Upload" />
                  ) : (
                    <div className="text-center">
                      <svg className="w-8 h-8 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subir Prenda</p>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                </div>

                <div className="space-y-4">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-900">Prompt de Edición (Editorial)</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-4 bg-white border border-slate-200 outline-none focus:border-slate-900 text-xs tracking-widest uppercase transition-all min-h-[100px]"
                    placeholder="Ej: Fondo de mármol blanco, luz suave de ventana, estilo minimalista."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading || !originalImage}
                  className="w-full py-5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-orange-500 transition-all disabled:opacity-30 disabled:hover:bg-slate-900"
                >
                  {loading ? 'Generando Cuadrado Perfect...' : 'Procesar Imagen'}
                </button>
                
                {error && <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest text-center mt-4">{error}</p>}
              </form>
            </div>
          </div>

          {/* Panel de Resultado */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="relative aspect-square bg-white border border-slate-100 flex items-center justify-center overflow-hidden shadow-2xl">
              {editedImage ? (
                <div className="w-full h-full animate-in fade-in duration-1000">
                  <img src={editedImage} className="w-full h-full object-contain" alt="Resultado Final" />
                  <div className="absolute bottom-8 right-8 flex space-x-2">
                    <button className="bg-slate-900 text-white px-6 py-3 text-[9px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all">
                      Descargar para Shopify
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-20 border-2 border-slate-50 rounded-full w-2/3 aspect-square flex flex-col items-center justify-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200 mb-4">Canvas Preview</span>
                  <p className="text-[9px] text-slate-300 uppercase tracking-widest text-center leading-loose">
                    El sistema generará una imagen en relación de aspecto 1:1, optimizada para el sistema Grid de tu tienda Shopify.
                  </p>
                </div>
              )}
              
              {/* Overlay Técnico */}
              <div className="absolute inset-0 pointer-events-none border border-slate-100 opacity-50">
                 <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-100"></div>
                 <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
