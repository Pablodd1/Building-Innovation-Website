
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import CalculatorSection from './components/CalculatorSection';
import AIVisualizerModal from './components/AIVisualizerModal';
import CartModal from './components/CartModal';
import Footer from './components/Footer';
import { 
  FEATURED_PRODUCTS, 
  INTERIOR_PRODUCTS, 
  EXTERIOR_PRODUCTS, 
  SALE_PRODUCTS, 
  INSPIRATION_GALLERY, 
  COLLECTIONS, 
  FAQS,
  PRO_FEATURES
} from './constants';
import { Product, CartItem } from './types';
import { ChevronRight, HelpCircle, Ruler, Leaf, Layers, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1c1e] text-white selection:bg-blue-500/30">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <Hero onOpenVisualizer={() => setIsVisualizerOpen(true)} />

        {/* Collections Section */}
        <section id="collections" className="scroll-mt-[100px] pt-12 pb-20">
          <div className="max-w-7xl mx-auto px-6 mb-10 flex justify-between items-end">
            <div>
              <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Aesthetics</p>
              <h2 className="text-4xl font-bold tracking-tight">Curated Collections</h2>
            </div>
            <button className="text-sm font-bold text-white/40 hover:text-white transition-colors border-b border-white/10 pb-1">View Full Catalog</button>
          </div>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLLECTIONS.map((collection) => (
              <div key={collection.id} className="group relative aspect-[4/3] rounded-[32px] overflow-hidden cursor-pointer shadow-xl border border-white/5">
                <img src={collection.image} alt={collection.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-xl font-bold">{collection.name}</h3>
                  <p className="text-white/50 text-xs mt-1">{collection.count} Patterns</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interiors Section */}
        <section id="interiors" className="scroll-mt-[100px]">
          <ProductSection 
            title="Interior Solutions" 
            products={INTERIOR_PRODUCTS} 
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* Inspiration Section */}
        <section id="inspiration" className="scroll-mt-[100px] bg-white/[0.02] py-28 my-16 border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
             <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 blur-[150px] rounded-full translate-x-[-50%] translate-y-[-50%]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">The Portfolio</p>
              <h2 className="text-5xl font-bold tracking-tight">Design Inspiration</h2>
            </div>
            <p className="text-white/40 max-w-sm text-sm md:text-right leading-relaxed">
              Explore award-winning architectural spaces featuring our signature vinyls and facade systems.
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
            {INSPIRATION_GALLERY.map((item) => (
              <div key={item.id} className="group relative aspect-[4/5] rounded-[48px] overflow-hidden cursor-pointer shadow-2xl border border-white/10">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <h4 className="text-2xl font-bold mb-2">{item.title}</h4>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                    View Project Details <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Exteriors Section */}
        <section id="exteriors" className="scroll-mt-[100px]">
          <ProductSection 
            title="Exterior Facades" 
            products={EXTERIOR_PRODUCTS} 
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* Pro Program Section */}
        <section id="pro" className="scroll-mt-[100px] py-28 bg-gradient-to-b from-[#1a1c1e] to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-blue-600/5 rounded-[64px] p-12 lg:p-24 border border-blue-500/10 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                <ShieldCheck className="w-96 h-96 text-blue-500" />
              </div>
              
              <div className="flex-1 space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 rounded-full border border-blue-500/20">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Professional Services</span>
                </div>
                <h2 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">Architectural <br/> Partner Program</h2>
                <p className="text-xl text-white/50 leading-relaxed max-w-xl">
                  Scale your practice with our dedicated pro tools. From CAD library access to sustainable material procurement.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                  {PRO_FEATURES.map((feature, i) => (
                    <div key={i} className="space-y-4">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                         {i === 0 ? <Ruler className="w-6 h-6 text-blue-500" /> : i === 1 ? <Leaf className="w-6 h-6 text-emerald-500" /> : <Layers className="w-6 h-6 text-blue-500" />}
                      </div>
                      <h4 className="font-bold">{feature.title}</h4>
                      <p className="text-sm text-white/30">{feature.desc}</p>
                    </div>
                  ))}
                </div>
                <button className="bg-white text-black px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl shadow-white/5">
                  Apply for Pro Access
                </button>
              </div>
              
              <div className="flex-1 w-full max-w-md lg:max-w-none relative">
                 <div className="aspect-square rounded-[48px] overflow-hidden shadow-2xl border border-white/10 ring-8 ring-white/[0.02]">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-60" alt="Professional Studio" />
                 </div>
                 <div className="absolute -bottom-8 -left-8 bg-blue-600 p-8 rounded-3xl shadow-2xl max-w-xs border border-white/10">
                    <p className="text-2xl font-bold mb-2">1,200+</p>
                    <p className="text-xs text-white/70 font-medium uppercase tracking-widest">Studios Enrolled Globally</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sale Section */}
        <section id="sale" className="scroll-mt-[100px] py-12">
          <div className="max-w-7xl mx-auto px-6 mb-4 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-red-400">Architectural Clearance</h2>
            <div className="flex gap-2 text-red-400/60 text-xs font-bold uppercase tracking-wider items-center">
              Stock Limited
            </div>
          </div>
          <ProductSection 
            title="" 
            products={SALE_PRODUCTS} 
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* FAQ / Help Section */}
        <section id="help" className="scroll-mt-[100px] py-32 border-t border-white/5 bg-white/[0.01]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-6 mb-16">
              <div className="p-4 bg-blue-600/10 rounded-[32px] ring-1 ring-blue-500/20 shadow-2xl">
                <HelpCircle className="w-10 h-10 text-blue-500" />
              </div>
              <div>
                <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Concierge</p>
                <h2 className="text-5xl font-bold tracking-tight">Support Center</h2>
              </div>
            </div>
            <div className="space-y-8">
              {FAQS.map((faq, i) => (
                <details key={i} className="group glass-effect rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
                  <summary className="p-10 cursor-pointer flex items-center justify-between hover:bg-white/[0.02] transition-colors list-none">
                    <span className="text-xl font-bold text-white/90">{faq.question}</span>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-open:rotate-180 transition-transform">
                      <ChevronRight className="w-5 h-5 text-white/40" />
                    </div>
                  </summary>
                  <div className="px-10 pb-10 pt-0 text-lg text-white/50 leading-relaxed border-t border-white/5 mt-[-1px]">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Calculator CTA */}
        <CalculatorSection />
      </main>

      <Footer />

      <AIVisualizerModal 
        isOpen={isVisualizerOpen} 
        onClose={() => setIsVisualizerOpen(false)} 
      />

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default App;