
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
      console.error('Error editing image:', err);
      setError("Error en el renderizado. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <button onClick={onBack} className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 mb-6 flex items-center">
               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-width="2"/></svg>
               Regresar a Shopify Admin
            </button>
            <h2 className="text-6xl font-display italic text-slate-900">Studio 1:1.</h2>
          </div>
          <div className="bg-white p-4 border border-slate-100 hidden md:block">
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">IA Active: Gemini 2.5 Flash Image</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Panel de Control */}
          <div className="lg:col-span-4 bg-white p-10 border border-slate-100 shadow-xl">
             <form onSubmit={handleEdit} className="space-y-10">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square border-2 border-dashed border-slate-100 hover:border-orange-500 bg-slate-50 transition-all cursor-pointer flex items-center justify-center overflow-hidden relative"
                >
                  {originalImage ? (
                    <img src={originalImage} className="w-full h-full object-cover" alt="Source" />
                  ) : (
                    <div className="text-center opacity-30">
                      <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke-width="1.5"/></svg>
                      <span className="text-[10px] font-black uppercase tracking-widest">Cargar Prenda</span>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block underline underline-offset-8 decoration-orange-500">Instrucciones Editoriales</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-6 bg-slate-50 border border-slate-100 outline-none focus:border-slate-900 text-[11px] font-bold uppercase tracking-widest min-h-[120px]"
                    placeholder="Ej: Fondo blanco estudio, iluminación suave..."
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading || !originalImage}
                  className="w-full py-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-orange-500 transition-all disabled:opacity-20 shadow-xl"
                >
                  {loading ? 'Sincronizando Proporción...' : 'Generar Activo Shopify'}
                </button>
                {error && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest text-center">{error}</p>}
             </form>
          </div>

          {/* Canvas de Salida */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 shadow-2xl relative aspect-square flex items-center justify-center overflow-hidden">
               {editedImage ? (
                 <div className="w-full h-full animate-in fade-in duration-1000">
                    <img src={editedImage} className="w-full h-full object-contain" alt="Resultado Final" />
                    <div className="absolute bottom-8 left-8 right-8 flex gap-4">
                       <button className="flex-1 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-500">
                          Subir a Shopify Files
                       </button>
                    </div>
                 </div>
               ) : (
                 <div className="text-center p-20 opacity-10">
                    <span className="text-[15rem] font-black leading-none">1:1</span>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] mt-4">Canvas Preview</p>
                 </div>
               )}
               
               {/* Guía Técnica */}
               <div className="absolute inset-0 pointer-events-none border border-slate-100/30 grid grid-cols-3 grid-rows-3">
                  {[...Array(9)].map((_, i) => <div key={i} className="border border-slate-100/20"></div>)}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
