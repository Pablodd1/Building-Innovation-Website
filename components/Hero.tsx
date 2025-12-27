
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { CAROUSEL_ITEMS } from '../constants';

interface HeroProps {
  onOpenVisualizer: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenVisualizer }) => {
  const [activeIndex, setActiveIndex] = useState(2); // Start with center image like screenshot

  const next = () => setActiveIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);

  return (
    <section className="relative pt-8 pb-12 overflow-hidden">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span>Home</span>
          <span>/</span>
          <span>Building Innovations</span>
          <span>/</span>
          <span className="text-white/80">Wallpaper</span>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative flex justify-center items-center gap-4 px-4 h-[400px]">
        {/* Navigation Arrows */}
        <button 
          onClick={prev}
          className="absolute left-10 z-10 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={next}
          className="absolute right-10 z-10 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="flex gap-4 items-center justify-center w-full max-w-[1400px]">
          {CAROUSEL_ITEMS.map((item, index) => {
            const isActive = index === activeIndex;
            const isPrev = index === (activeIndex - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
            const isNext = index === (activeIndex + 1) % CAROUSEL_ITEMS.length;

            if (!isActive && !isPrev && !isNext) return null;

            return (
              <div
                key={item.id}
                className={`relative transition-all duration-500 rounded-3xl overflow-hidden shadow-2xl ${
                  isActive 
                    ? 'w-[450px] h-[350px] z-20 scale-110' 
                    : 'w-[300px] h-[280px] z-10 opacity-40 blur-[1px]'
                }`}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end items-center pb-8">
                    <button 
                      onClick={onOpenVisualizer}
                      className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm transition-transform hover:scale-105"
                    >
                      <Sparkles className="w-4 h-4 text-blue-600 group-hover:animate-pulse" />
                      Try Our AI Visualizer
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {CAROUSEL_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === activeIndex ? 'bg-white w-4' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
