'use client';

import React, { useState } from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Sparkles,
} from 'lucide-react';
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

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const shippingThreshold = 150;
  const rawShipping = rawSubtotal >= shippingThreshold || rawSubtotal === 0 ? 0 : 15;
  const discountAmount = promoApplied ? rawSubtotal * 0.15 : 0;
  const finalTotal = Math.max(0, rawSubtotal + rawShipping - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();

    if (promoCode.toUpperCase() === 'VERCO15') {
      setPromoApplied(true);
    } else {
      alert('Código promocional no válido. Intenta con VERCO15');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-[#283E6A]/70 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
          <div className="pointer-events-auto w-screen max-w-md transform bg-white border-l border-[#283E6A]/15 shadow-2xl transition-all duration-500 flex flex-col justify-between">
            <div className="p-6 border-b border-[#283E6A]/15 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#E70033]" />
                <h2
                  className="text-sm font-black tracking-widest uppercase text-[#283E6A]"
                  id="slide-over-title"
                >
                  MI CARRITO ({cartItems.length})
                </h2>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-[#283E6A] hover:text-white bg-white hover:bg-[#E70033] w-9 h-9 flex items-center justify-center border border-[#283E6A]/20 hover:border-[#E70033] rounded-full transition-colors cursor-pointer"
                title="Cerrar carrito"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 bg-white border border-[#283E6A]/20 rotate-12 flex items-center justify-center rounded-[24px]">
                    <ShoppingBag className="w-7 h-7 text-[#E70033] -rotate-12" />
                  </div>

                  <div className="space-y-1.5 max-w-xs">
                    <h3 className="font-extrabold text-[#283E6A] uppercase text-sm tracking-widest">
                      Tu carrito está vacío.
                    </h3>

                    <p className="text-[#283E6A]/65 text-xs">
                      Agrega tus productos favoritos y continúa con tu compra en VERCO.
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className="px-5 py-3.5 hover:bg-[#E70033] bg-[#283E6A] text-white font-black text-xs tracking-widest uppercase rounded-full transition-colors cursor-pointer"
                  >
                    CONTINUAR NAVEGANDO
                  </button>
                </div>
              ) : (
                <div className="space-y-4 divide-y divide-[#283E6A]/10">
                  {cartItems.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                      className={`flex gap-4 pt-4 ${idx === 0 ? 'pt-0' : ''}`}
                    >
                      <div className="h-20 w-20 flex-shrink-0 bg-white border border-[#283E6A]/15 rounded-2xl overflow-hidden p-2 flex items-center justify-center shadow-sm">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="max-h-[90%] max-w-[90%] object-contain"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="text-xs font-black text-[#283E6A] hover:text-[#E70033] cursor-pointer uppercase tracking-tight line-clamp-1">
                              {item.product.name}
                            </h4>

                            <button
                              onClick={() => onRemoveItem(idx)}
                              className="text-[#283E6A]/45 hover:text-[#E70033] transition-colors p-1"
                              title="Borrar producto de la bolsa"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="text-[10px] font-bold text-[#E70033] uppercase tracking-wider mt-0.5 font-mono">
                            {item.product.brand}
                          </p>

                          <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            <span className="bg-white text-[#283E6A]/75 border border-[#283E6A]/15 text-[9px] font-mono font-bold px-1.5 py-0.5 tracking-tight rounded-md">
                              TALLA: {item.selectedSize}
                            </span>

                            <span className="bg-white text-[#283E6A]/75 border border-[#283E6A]/15 text-[9px] font-mono font-bold px-1.5 py-0.5 flex items-center gap-1 rounded-md">
                              COLOR:{' '}
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${item.selectedColor.class}`}
                              />{' '}
                              {item.selectedColor.name}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 mt-2">
                          <div className="flex items-center border border-[#283E6A]/15 bg-white rounded-full p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                              className="p-1 px-2 text-[#283E6A]/60 hover:text-[#E70033]"
                              title="Disminuir"
                            >
                              <Minus className="w-3 h-3" />
                            </button>

                            <span className="w-6 text-center text-xs font-mono font-bold text-[#283E6A]">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                              className="p-1 px-2 text-[#283E6A]/60 hover:text-[#E70033]"
                              title="Aumentar"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-extrabold font-mono text-[#283E6A]">
                            ${Number(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="bg-white p-6 border-t border-[#283E6A]/15 space-y-4">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Código de cupón. Ej: VERCO15"
                    disabled={promoApplied}
                    className="flex-1 bg-white text-xs border border-[#283E6A]/20 focus:border-[#E70033] focus:outline-none p-3 text-[#283E6A] font-mono placeholder-[#283E6A]/40 disabled:opacity-50 rounded-xl"
                  />

                  <button
                    type="submit"
                    disabled={promoApplied}
                    className="bg-[#283E6A]/10 text-[#283E6A] hover:bg-[#E70033] hover:text-white font-black uppercase text-[10px] tracking-widest px-4 transition-colors disabled:opacity-50 disabled:bg-[#E70033]/15 disabled:text-[#E70033] rounded-xl cursor-pointer"
                  >
                    {promoApplied ? 'APLICADO' : 'APLICAR'}
                  </button>
                </form>

                {promoApplied && (
                  <div className="flex items-center justify-between text-xs bg-[#E70033]/10 border border-[#E70033]/20 px-3 py-2 rounded-xl text-left">
                    <span className="text-[#E70033] font-extrabold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      ¡Descuento del 15% aplicado!
                    </span>

                    <button
                      onClick={() => {
                        setPromoApplied(false);
                        setPromoCode('');
                      }}
                      className="text-[#283E6A]/50 hover:text-[#283E6A] text-[10px] uppercase font-black tracking-widest cursor-pointer"
                    >
                      Remover
                    </button>
                  </div>
                )}

                <div className="space-y-2 text-xs font-mono text-left">
                  <div className="flex justify-between text-[#283E6A]/65">
                    <span>SUBTOTAL</span>
                    <span>${rawSubtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-[#283E6A]/65">
                    <span>ENVÍO</span>
                    <span>
                      {rawShipping === 0 ? (
                        <span className="text-[#E70033] font-bold">GRATIS</span>
                      ) : (
                        `$${rawShipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-[#E70033]">
                      <span>DESCUENTO (VERCO15)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  {rawSubtotal < shippingThreshold && (
                    <p className="text-[10px] text-[#E70033] font-sans tracking-tight font-semibold">
                      Faltan{' '}
                      <span className="font-bold">
                        ${(shippingThreshold - rawSubtotal).toFixed(2)}
                      </span>{' '}
                      para obtener ENVÍO GRATIS.
                    </p>
                  )}

                  <div className="h-[1px] bg-[#283E6A]/10 my-2" />

                  <div className="flex justify-between text-sm font-black text-[#283E6A] pt-2.5 border-t border-[#283E6A]/10">
                    <span>TOTAL ESTIMADO</span>
                    <span className="text-[#E70033] text-base font-black">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#283E6A]/10 pt-4 space-y-3">
                  <button
                    onClick={() => onCheckout(rawSubtotal, rawShipping, finalTotal)}
                    className="w-full flex items-center justify-between bg-[#283E6A] hover:bg-[#E70033] text-white font-black uppercase text-xs tracking-widest pl-6 pr-4 py-4 rounded-full transition-all duration-300 shadow-md cursor-pointer active:scale-95"
                  >
                    <span>FINALIZAR COMPRA</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[9px] text-[#283E6A]/50 font-sans font-bold flex-wrap">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E70033]" />
                    <span>Pago Seguro SSL</span>
                    <div className="w-[1px] h-3 bg-[#283E6A]/15" />
                    <CreditCard className="w-3.5 h-3.5 text-[#E70033]" />
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