import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: (subtotal: number, shipping: number, total: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  if (!isOpen) return null;

  // Calculators
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingThreshold = 150;
  
  // Conditionally free delivery
  const rawShipping = rawSubtotal >= shippingThreshold || rawSubtotal === 0 ? 0 : 15;
  const discountAmount = promoApplied ? rawSubtotal * 0.15 : 0; // 15% discount code
  const finalTotal = Math.max(0, rawSubtotal + rawShipping - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'APEX15') {
      setPromoApplied(true);
      setPromoDiscount(15);
    } else {
      alert('Código promocional no válido. Intenta con APEX15');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Backdrop transparency shield */}
        <div 
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
          
          <div className="pointer-events-auto w-screen max-w-md transform bg-[#faf9f6] border-l border-stone-200/80 shadow-2xl transition-all duration-500 flex flex-col justify-between">
            
            {/* DRAWER HEADER */}
            <div className="p-6 border-b border-stone-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#1a3e6a]" />
                <h2 className="text-sm font-black tracking-widest uppercase text-stone-900" id="slide-over-title">
                  MI CARRITO ({cartItems.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-stone-500 hover:text-stone-900 bg-stone-100 w-9 h-9 flex items-center justify-center border border-stone-200 hover:border-stone-300 rounded-full transition-colors cursor-pointer"
                title="Cerrar carrito"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* SCROLLABLE ITEMIZED LIST */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              
              {cartItems.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 bg-white border border-stone-200 rotate-12 flex items-center justify-center rounded-[24px]">
                    <ShoppingBag className="w-7 h-7 text-stone-400 -rotate-12" />
                  </div>
                  <div className="space-y-1.5 max-w-xs">
                    <h3 className="font-extrabold text-stone-850 uppercase text-sm tracking-widest">
                      Tu carrito está vacío.
                    </h3>
                    <p className="text-stone-500 text-xs">
                      ¿Quieres romper récords hoy? Agrega zapatillas con fibra de carbono o indumentaria deportiva para arrancar.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-5 py-3.5 hover:bg-[#132f52] bg-[#1a3e6a] text-white font-black text-xs tracking-widest uppercase rounded-full transition-colors cursor-pointer"
                  >
                    CONTINUAR NAVEGANDO
                  </button>
                </div>
              ) : (
                <div className="space-y-4 divide-y divide-stone-200">
                  {cartItems.map((item, idx) => (
                    <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`} className={`flex gap-4 pt-4 ${idx === 0 ? 'pt-0' : ''}`}>
                      
                      {/* Product small image thumbnail */}
                      <div className="h-20 w-20 flex-shrink-0 bg-white border border-stone-200 rounded-2xl overflow-hidden p-2 flex items-center justify-center shadow-sm">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="max-h-[90%] max-w-[90%] object-contain"
                        />
                      </div>

                      {/* Product general and selection info */}
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="text-xs font-black text-stone-900 hover:text-[#1a3e6a] cursor-pointer uppercase tracking-tight line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(idx)}
                              className="text-stone-400 hover:text-red-500 transition-colors p-1"
                              title="Borrar producto de la bolsa"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <p className="text-[10px] font-bold text-[#1a3e6a] uppercase tracking-wider mt-0.5 font-mono">
                            {item.product.brand}
                          </p>
                          
                          {/* Attributes details */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            <span className="bg-white text-stone-600 border border-stone-200 text-[9px] font-mono font-bold px-1.5 py-0.5 tracking-tight rounded-md">
                              TALLA: {item.selectedSize}
                            </span>
                            <span className="bg-white text-stone-600 border border-stone-200 text-[9px] font-mono font-bold px-1.5 py-0.5 flex items-center gap-1 rounded-md">
                              COLOR: <span className={`w-1.5 h-1.5 rounded-full ${item.selectedColor.class}`} /> {item.selectedColor.name}
                            </span>
                          </div>
                        </div>

                        {/* Quantity and Price row */}
                        <div className="flex items-center justify-between gap-2 mt-2">
                          
                          {/* Unit counter adjusters */}
                          <div className="flex items-center border border-stone-200 bg-white rounded-full p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                              className="p-1 px-2 text-stone-500 hover:text-stone-900"
                              title="Disminuir"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-mono font-bold text-stone-850">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                              className="p-1 px-2 text-stone-500 hover:text-stone-900"
                              title="Aumentar"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Item total price */}
                          <span className="text-xs font-extrabold font-mono text-stone-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>

                        </div>

                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* FOOTER BREAKDOWN STATS AND CHECKOUT */}
            {cartItems.length > 0 && (
              <div className="bg-white p-6 border-t border-stone-200/80 space-y-4">
                
                {/* Promo Code form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Código de cupón (P. ej. APEX15)"
                    disabled={promoApplied}
                    className="flex-1 bg-[#faf8f5] text-xs border border-stone-200 focus:border-[#1a3e6a] focus:outline-none p-3 text-stone-800 font-mono placeholder-stone-400 disabled:opacity-50 rounded-xl"
                  />
                  <button
                    type="submit"
                    disabled={promoApplied}
                    className="bg-stone-100 text-stone-700 hover:bg-[#1a3e6a] hover:text-white font-black uppercase text-[10px] tracking-widest px-4 transition-colors disabled:opacity-50 disabled:bg-[#1a3e6a]/20 disabled:text-[#1a3e6a] rounded-xl cursor-pointer"
                  >
                    {promoApplied ? 'APLICADO' : 'APLICAR'}
                  </button>
                </form>

                {promoApplied && (
                  <div className="flex items-center justify-between text-xs bg-[#1a3e6a]/10 border border-[#1a3e6a]/20 px-3 py-2 rounded-xl text-left">
                    <span className="text-[#1a3e6a] font-extrabold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      ¡Descuento del 15% aplicado!
                    </span>
                    <button 
                      onClick={() => { setPromoApplied(false); setPromoCode(''); }}
                      className="text-stone-400 hover:text-stone-900 text-[10px] uppercase font-black tracking-widest cursor-pointer"
                    >
                      Remover
                    </button>
                  </div>
                )}

                {/* Values table */}
                <div className="space-y-2 text-xs font-mono text-left">
                  <div className="flex justify-between text-stone-500">
                    <span>SUBTOTAL</span>
                    <span>${rawSubtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-stone-500">
                    <span>ENVÍO</span>
                    <span>
                      {rawShipping === 0 ? (
                        <span className="text-emerald-600 font-bold">GRATIS</span>
                      ) : (
                        `$${rawShipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-red-500">
                      <span>DESCUENTO (APEX15)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  {/* Free shipping goal builder */}
                  {rawSubtotal < shippingThreshold && (
                    <p className="text-[10px] text-amber-600 font-sans tracking-tight font-semibold">
                      Faltan <span className="font-bold">${(shippingThreshold - rawSubtotal).toFixed(2)}</span> para obtener ENVÍO GRATIS.
                    </p>
                  )}

                  <div className="h-[1px] bg-stone-100 my-2" />

                  <div className="flex justify-between text-sm font-black text-stone-850 pt-2.5 border-t border-stone-150">
                    <span>TOTAL ESTIMADO</span>
                    <span className="text-[#1a3e6a] text-base font-black">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-stone-150 pt-4 space-y-3">
                  {/* Checkout Button */}
                  <button
                    onClick={() => onCheckout(rawSubtotal, rawShipping, finalTotal)}
                    className="w-full flex items-center justify-between bg-gradient-to-r from-[#1a3e6a] to-blue-800 hover:brightness-110 text-white font-black uppercase text-xs tracking-widest pl-6 pr-4 py-4 rounded-full transition-all duration-300 shadow-md cursor-pointer active:scale-95"
                  >
                    <span>FINALIZAR COMPRA</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>

                  {/* Safe label guarantees */}
                  <div className="flex items-center justify-center gap-1.5 text-[9px] text-stone-400 font-sans font-bold flex-wrap">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1a3e6a]" />
                    <span>Pago Seguro SSL</span>
                    <div className="w-[1px] h-3 bg-stone-200" />
                    <CreditCard className="w-3.5 h-3.5 text-[#1a3e6a]" />
                    <span>Tarjetas de Crédito / Débito</span>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
