
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
    <section className="py-24 bg-white editorial-grid">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-end mb-16 border-b border-slate-100 pb-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2 block">Selección Actual</span>
            <h2 className="text-4xl font-display italic text-slate-900">Nuevos Looks</h2>
          </div>
          <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-orange-500 transition-colors">Ver Todo</a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] bg-slate-100 mb-6"></div>
                <div className="h-4 bg-slate-100 w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-100 w-1/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-[2/3] overflow-hidden bg-slate-50 mb-6">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                  <div className="absolute bottom-6 left-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="w-full py-4 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-slate-900 hover:text-white transition-colors">
                      Comprar ahora
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-1">{product.title}</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Colección Heroines</p>
                  </div>
                  <span className="text-xs font-medium text-slate-500">{product.price} {product.currencyCode}</span>
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
