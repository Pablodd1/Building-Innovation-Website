
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductSectionProps {
  title: string;
  products: Product[];
  showExplore?: boolean;
  onAddToCart: (product: Product) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products, showExplore = false, onAddToCart }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {showExplore && (
          <button className="text-sm font-medium text-white/40 hover:text-white transition-colors">
            Explore Collections
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
