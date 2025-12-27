
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group glass-effect rounded-[32px] p-2 hover:bg-white/[0.08] transition-all cursor-pointer border border-white/5 hover:border-white/20">
      <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-white/5">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.badge && (
          <div className={`absolute top-4 left-4 ${product.badgeColor || 'bg-blue-600'} text-[10px] font-bold text-white px-2 py-1 rounded-md uppercase tracking-wider shadow-lg`}>
            {product.badge}
          </div>
        )}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold border border-white/10">
          ${product.price.toFixed(2)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors">
          {product.title}
        </h3>
        <p className="text-xs text-white/40 mt-1 font-medium">
          {product.collection}
        </p>
        <div className="mt-6 flex flex-col gap-2">
          {product.id.startsWith('e') || product.id === 'f4' ? (
            <button className="w-full py-3 px-4 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all border border-white/5">
              View Details
            </button>
          ) : (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="w-full py-3 px-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-blue-50 transition-all shadow-xl hover:shadow-blue-500/10 active:scale-[0.98]"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
