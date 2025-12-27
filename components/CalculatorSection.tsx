
import React from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

const CalculatorSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 mt-12">
      {/* Background with blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1556020685-ae41abfc9365?auto=format&fit=crop&q=80&w=1600"
          className="w-full h-full object-cover blur-[80px] opacity-20"
          alt=""
        />
        <div className="absolute inset-0 bg-[#1a1c1e]/60" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
        <div className="w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Calculator className="w-8 h-8 text-blue-400" />
        </div>
        
        <h2 className="text-4xl font-bold mb-4 tracking-tight">Not sure how much you need?</h2>
        <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
          Use our intelligent Wallpaper Calculator to estimate the exact number of rolls for your room dimensions, including pattern repeats.
        </p>

        <button className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-900/20 hover:scale-105 mx-auto">
          Open Calculator
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

export default CalculatorSection;
