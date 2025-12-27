
import React from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const navItems = [
    { label: 'Collections', id: 'collections' },
    { label: 'Interiors', id: 'interiors' },
    { label: 'Exteriors', id: 'exteriors' },
    { label: 'Pro Program', id: 'pro' },
    { label: 'Inspiration', id: 'inspiration' },
    { label: 'Sale', id: 'sale' },
    { label: 'Help', id: 'help' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header className="sticky top-0 z-[60] bg-[#121212] border-b border-white/5 px-8 py-5">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        
        {/* Navigation Links - Matching the screenshot style */}
        <nav className="flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-[11px] uppercase tracking-[0.15em] font-bold text-white/60 hover:text-white transition-all whitespace-nowrap cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions Area */}
        <div className="flex items-center gap-8 flex-1 justify-end ml-12">
          
          {/* Search Bar - Matching the rounded pill design from screenshot */}
          <div className="relative w-full max-w-[340px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-[#1c1c1c] border border-white/10 rounded-full py-2.5 pl-11 pr-5 text-sm text-white placeholder:text-white/20 focus:outline-none search-input-focus transition-all shadow-inner"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenCart}
              className="p-2.5 hover:bg-white/5 rounded-full transition-all relative group"
            >
              <ShoppingCart className="w-[22px] h-[22px] text-white/80 group-hover:text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-600 rounded-full border-2 border-[#121212] text-[10px] flex items-center justify-center font-black shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="p-2.5 hover:bg-white/5 rounded-full transition-all group">
              <User className="w-[22px] h-[22px] text-white/80 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
