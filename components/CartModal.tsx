
import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#1a1c1e] h-full shadow-2xl border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/10 rounded-xl">
              <ShoppingBag className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold">Shopping Bag</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-medium">Your bag is currently empty.</p>
              <button onClick={onClose} className="text-sm text-blue-400 font-bold hover:underline underline-offset-4">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-white/5 shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-sm text-white/90">{item.title}</h3>
                  <p className="text-xs text-white/40">{item.collection}</p>
                  <p className="text-sm font-bold text-blue-400">${item.price.toFixed(2)}</p>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-white/5 rounded-l-lg transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-white/5 rounded-r-lg transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-white/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white/[0.02] border-t border-white/10 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/40">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-white/40">
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2">
                <span>Total</span>
                <span className="text-blue-500">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/10 active:scale-[0.98]">
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-[10px] text-center text-white/20 uppercase tracking-widest font-medium">
              Secured Checkout by Stripe
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
