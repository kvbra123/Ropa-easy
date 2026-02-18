
import React, { useEffect, useState } from 'react';
import { getFeaturedProducts, ShopifyProduct } from '../services/shopifyService';

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-slate-100 pb-8">
          <div className="mb-4 md:mb-0">
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-orange-500 mb-2 block">The New Standard</span>
            <h2 className="text-5xl font-display italic text-slate-900 tracking-tight">Cápsula Digital 01</h2>
          </div>
          <div className="flex space-x-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <button className="text-slate-900 border-b border-slate-900 pb-1">Todo</button>
            <button className="hover:text-slate-900 transition-colors">Técnico</button>
            <button className="hover:text-slate-900 transition-colors">Accesorios</button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-slate-50 mb-6"></div>
                <div className="h-3 bg-slate-50 w-2/3 mb-3"></div>
                <div className="h-3 bg-slate-50 w-1/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20 lg:gap-x-20">
            {products.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-50 mb-8">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                     <span className="px-2 py-1 bg-white text-[8px] font-black uppercase tracking-widest text-slate-900">New In</span>
                  </div>
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-500"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/90 backdrop-blur-md">
                     <button className="w-full py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-500 transition-colors">
                        Añadir al Carrito
                     </button>
                  </div>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-medium text-slate-400 line-through">280.00 EUR</span>
                    <span className="text-xs font-bold text-slate-900">{product.price} {product.currencyCode}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
