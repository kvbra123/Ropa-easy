
import React, { useState } from 'react';
import { FormData } from '../types';

interface LeadFormProps {
  onBack: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', regionCode: '+34', phone: '', brandName: '', catalogSize: '1-10', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    console.log('Form submitted:', formData);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center max-w-md animate-in zoom-in duration-500">
          <h2 className="text-5xl font-display italic mb-6 text-slate-900">Solicitud <br/>Enviada.</h2>
          <p className="text-xs text-slate-500 uppercase tracking-widest leading-loose mb-12">
            Tu marca está a punto de evolucionar. Nuestro equipo se pondrá en contacto en las próximas 24 horas.
          </p>
          <button 
            onClick={onBack}
            className="px-12 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-orange-600 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Panel Decorativo Lateral */}
        <div className="lg:col-span-4 bg-slate-900 p-12 lg:p-20 text-white flex flex-col justify-between hidden lg:flex">
          <div className="space-y-12">
            <button onClick={onBack} className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Regresar
            </button>
            <h2 className="text-5xl font-display leading-[0.9]">Elevamos <br/>tu catálogo <br/>a 3D.</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest leading-loose">
              Nacidas en la carretera, creadas para la ciudad. Nuestras piezas digitales brindan la confianza para que las marcas se muevan con libertad.
            </p>
          </div>
          <div className="text-[10px] font-medium text-slate-500 tracking-widest uppercase italic">
            &copy; 2024 Ropa Easy - Sin Concesiones.
          </div>
        </div>

        {/* Panel del Formulario */}
        <div className="lg:col-span-8 p-12 lg:p-24 bg-white overflow-y-auto">
          <div className="max-w-xl mx-auto">
            <div className="mb-16">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4 block">Formulario de Solicitud</span>
              <h3 className="text-3xl font-bold text-slate-900 uppercase tracking-tighter">Digitaliza tu Marca</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group border-b border-slate-100 focus-within:border-orange-500 transition-all">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nombre de la Persona</label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full py-4 bg-transparent outline-none font-medium" placeholder="Escribe tu nombre" />
                </div>
                <div className="group border-b border-slate-100 focus-within:border-orange-500 transition-all">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Corporativo</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full py-4 bg-transparent outline-none font-medium" placeholder="hola@tu-marca.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 group border-b border-slate-100 focus-within:border-orange-500 transition-all">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cód.</label>
                    <input required name="regionCode" value={formData.regionCode} onChange={handleChange} type="text" className="w-full py-4 bg-transparent outline-none font-medium" placeholder="+34" />
                  </div>
                  <div className="col-span-3 group border-b border-slate-100 focus-within:border-orange-500 transition-all">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Teléfono</label>
                    <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full py-4 bg-transparent outline-none font-medium" placeholder="600 000 000" />
                  </div>
                </div>
                <div className="group border-b border-slate-100 focus-within:border-orange-500 transition-all">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nombre de la Marca</label>
                  <input required name="brandName" value={formData.brandName} onChange={handleChange} type="text" className="w-full py-4 bg-transparent outline-none font-medium" placeholder="Tu marca" />
                </div>
              </div>

              <div className="group border-b border-slate-100 focus-within:border-orange-500 transition-all">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tamaño del Catálogo</label>
                <select name="catalogSize" value={formData.catalogSize} onChange={handleChange} className="w-full py-4 bg-transparent outline-none font-medium appearance-none">
                  <option value="1-10">1-10 Prendas</option>
                  <option value="11-50">11-50 Prendas</option>
                  <option value="51+">Más de 50</option>
                </select>
              </div>

              <div className="group border-b border-slate-100 focus-within:border-orange-500 transition-all">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mensaje (Opcional)</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={1} className="w-full py-4 bg-transparent outline-none font-medium resize-none" placeholder="Cuéntanos sobre tu proyecto..." />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-6 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-orange-600 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Procesando...' : 'Solicitar Servicio Gratis'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
