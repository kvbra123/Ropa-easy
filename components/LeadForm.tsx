
import React, { useState } from 'react';
import { FormData } from '../types';

interface LeadFormProps {
  onBack: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Shopify requiere que el formulario sea enviado por POST a /contact
  // Para hacerlo desde React y que Shopify lo procese, usamos un formulario oculto 
  // o simplemente enviamos los datos con los nombres de campo que Shopify espera.
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Nota: Para que Shopify registre el envío y mande el email, 
    // el formulario debe enviarse de forma tradicional o mediante AJAX a /contact.
    // Aquí implementamos una lógica que simula el éxito visual, 
    // pero para producción en Shopify se recomienda que este componente 
    // sea un 'Liquid Section' o que use la API de Shopify.
    
    // Por ahora, simularemos el éxito para la UI. 
    // Si quieres que funcione REALMENTE, el botón debe disparar un formulario HTML estándar.
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center max-w-md animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-5xl font-display italic mb-6 text-slate-900">Solicitud <br/>Enviada.</h2>
          <p className="text-xs text-slate-500 uppercase tracking-widest leading-loose mb-12">
            Tu marca está a punto de evolucionar. Nuestro equipo de digitalización técnica revisará tu catálogo y te contactará en las próximas 24 horas.
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
        <div className="lg:col-span-4 bg-slate-900 p-12 lg:p-20 text-white flex flex-col justify-between hidden lg:flex relative overflow-hidden">
          <div className="relative z-10 space-y-12">
            <button onClick={onBack} className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Regresar
            </button>
            <div className="space-y-4">
              <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em]">B2B Solutions</span>
              <h2 className="text-6xl font-display italic leading-[0.9]">Transforma <br/>Físico en <br/>Digital.</h2>
            </div>
            <p className="text-[11px] text-slate-400 uppercase tracking-widest leading-loose max-w-xs">
              Nuestra tecnología patentada de escaneo 3D permite que tus productos sean probados virtualmente por miles de usuarias en todo el mundo.
            </p>
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-slate-700"></div>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Tecnología Ropa Easy</span>
            </div>
          </div>

          {/* Elemento decorativo */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[20rem] font-display italic text-white/[0.03] pointer-events-none">
            3D
          </div>
        </div>

        {/* Panel del Formulario - Configurado para Shopify */}
        <div className="lg:col-span-8 p-12 lg:p-24 bg-white overflow-y-auto">
          <div className="max-w-xl mx-auto">
            <div className="mb-16">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4 block">Lead Generation</span>
              <h3 className="text-4xl font-display text-slate-900 leading-tight">Digitaliza tu Catálogo</h3>
              <p className="text-slate-400 text-xs mt-4 uppercase tracking-widest">Sin costes iniciales para partners seleccionados.</p>
            </div>

            {/* Este formulario usa la estructura que Shopify espera para contact form */}
            <form 
              action="/contact#contact_form" 
              method="post" 
              id="contact_form" 
              acceptCharset="UTF-8"
              className="space-y-12"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form_type" value="contact" />
              <input type="hidden" name="utf8" value="✓" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group border-b border-slate-100 focus-within:border-orange-500 transition-all">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Nombre / Empresa</label>
                  <input required name="contact[name]" type="text" className="w-full py-4 bg-transparent outline-none font-medium text-slate-900" placeholder="Ej: Ropa Easy Studio" />
                </div>
                <div className="group border-b border-slate-100 focus-within:border-orange-500 transition-all">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Email de Contacto</label>
                  <input required name="contact[email]" type="email" className="w-full py-4 bg-transparent outline-none font-medium text-slate-900" placeholder="contacto@marca.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group border-b border-slate-100 focus-within:border-orange-500 transition-all">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Teléfono</label>
                  <input name="contact[phone]" type="tel" className="w-full py-4 bg-transparent outline-none font-medium text-slate-900" placeholder="+34 000 000 000" />
                </div>
                <div className="group border-b border-slate-100 focus-within:border-orange-500 transition-all">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Volumen de Catálogo</label>
                  <select name="contact[note][Catalog Size]" className="w-full py-4 bg-transparent outline-none font-medium appearance-none text-slate-900">
                    <option value="1-10">1-10 Prendas</option>
                    <option value="11-50">11-50 Prendas</option>
                    <option value="51+">Colección Completa (50+)</option>
                  </select>
                </div>
              </div>

              <div className="group border-b border-slate-100 focus-within:border-orange-500 transition-all">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Tu Visión / Mensaje</label>
                <textarea name="contact[body]" rows={2} className="w-full py-4 bg-transparent outline-none font-medium text-slate-900 resize-none" placeholder="Cuéntanos sobre tu marca..." />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-orange-500 transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center space-x-4 group"
                >
                  <span>{isSubmitting ? 'Procesando...' : 'Solicitar Digitalización'}</span>
                  {!isSubmitting && <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7M5 12h14"/></svg>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
