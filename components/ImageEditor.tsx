
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
      setError("Hubo un problema al procesar la imagen. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        <button onClick={onBack} className="flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors mb-12">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Volver a la tienda
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4 block">Nano Banana Power</span>
              <h2 className="text-5xl font-display leading-[0.9] text-slate-900 italic">Editor de <br/>Catálogo IA.</h2>
              <p className="mt-8 text-xs text-slate-400 uppercase tracking-widest leading-loose">
                Sube una prenda y usa el lenguaje natural para retocarla. Cambia fondos, aplica filtros editoriales o modifica el estilo con un solo comando.
              </p>
            </div>

            <form onSubmit={handleEdit} className="space-y-8">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`aspect-[4/5] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative group
                  ${originalImage ? 'border-slate-100' : 'border-slate-200 hover:border-orange-500 bg-slate-50'}`}
              >
                {originalImage ? (
                  <>
                    <img src={originalImage} className="w-full h-full object-cover" alt="Original" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest">
                      Cambiar Imagen
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Seleccionar Foto</span>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              </div>

              <div className="group border-b border-slate-100 focus-within:border-orange-500 transition-all">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Instrucción de Edición</label>
                <input 
                  required 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  type="text" 
                  className="w-full py-6 bg-transparent outline-none font-display text-2xl placeholder:text-slate-200" 
                  placeholder="Ej: Añade un filtro retro..." 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading || !originalImage}
                className="w-full py-6 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-orange-600 transition-all disabled:opacity-30 flex items-center justify-center space-x-4"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Procesando Visión...</span>
                  </>
                ) : (
                  <span>Ejecutar Cambio IA</span>
                )}
              </button>
              
              {error && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest text-center">{error}</p>}
            </form>
          </div>

          <div className="lg:col-span-7 bg-slate-50 relative min-h-[500px] flex items-center justify-center">
            {editedImage ? (
              <div className="w-full h-full animate-in fade-in zoom-in duration-700">
                <img src={editedImage} className="w-full h-full object-contain" alt="Resultado IA" />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur px-4 py-2 border border-slate-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Resultado Generado</span>
                </div>
              </div>
            ) : (
              <div className="text-center p-12 max-w-sm">
                <div className="w-20 h-20 border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-8 opacity-50">
                   <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                   </svg>
                </div>
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] leading-loose">
                  Sube una imagen y describe el cambio para ver la potencia de Nano Banana en tu catálogo.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
