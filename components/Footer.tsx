
import React from 'react';
import { Building2, Mail, Phone, MapPin, Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/40 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-none tracking-tight text-white">Building</h1>
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">Innovations</p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Pioneering the intersection of architectural aesthetics and artificial intelligence. We provide premium wallpaper and facade solutions for modern spaces.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <Instagram className="w-4 h-4 text-white/60" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <Twitter className="w-4 h-4 text-white/60" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <Facebook className="w-4 h-4 text-white/60" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">Collections</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Nordic Minimalism</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Industrial Industrial Loft</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Botanical Sanctuary</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Luxury Geometric</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Exterior Facades</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">Company</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Architectural Program</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">Newsletter</h4>
            <p className="text-xs text-white/40 leading-relaxed">
              Get weekly design inspiration and exclusive access to new AI features.
            </p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
              />
              <button className="absolute right-2 top-1.5 p-1.5 bg-blue-600 rounded-lg hover:bg-blue-500 transition-all group-hover:scale-105">
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/5 items-center">
          <div className="flex items-center gap-3 text-sm text-white/40">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span>128 Design District, San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/40 justify-center">
            <Mail className="w-4 h-4 text-blue-500" />
            <span>concierge@buildinginnovations.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/40 justify-end">
            <Phone className="w-4 h-4 text-blue-500" />
            <span>+1 (888) 123-ARCH</span>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-medium">
            © 2024 Building Innovations Group. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
