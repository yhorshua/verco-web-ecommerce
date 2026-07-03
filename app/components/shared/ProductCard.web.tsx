'use client';

import React from 'react';
import { ShoppingCart, Star, Eye, Tag, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../../types';

interface ProductCardProps {
  key?: string | number | React.Key;
  product: Product;
  onSelectProduct: (productId: string) => void;
  onAddToCartDirect: (product: Product, size: string, color: any) => void;
}

export default function ProductCard({
  product,
  onSelectProduct,
  onAddToCartDirect,
}: ProductCardProps) {
  const defaultSize = product.sizes[0] || 'M';
  const defaultColor =
    product.colors[0] || {
      name: 'Único',
      class: 'bg-[#283E6A]',
      hex: '#283E6A',
    };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white border border-[#283E6A]/15 rounded-[32px] overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-[#E70033]/50 hover:shadow-[0_16px_40px_rgba(40,62,106,0.10)]"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-tr from-[#283E6A] to-[#E70033] rounded-[32px] opacity-0 group-hover:opacity-5 transition-opacity duration-500 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
          {product.isNew && (
            <span className="bg-[#E70033] text-white text-[9px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current text-white animate-pulse" />
              NUEVO
            </span>
          )}

          {product.discount && (
            <span className="bg-white text-[#E70033] border border-[#E70033]/25 text-[9px] font-black tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 uppercase shadow-md">
              <Tag className="w-3 h-3 text-[#E70033]" />
              -{product.discount}% OFF
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 z-20">
          <span className="bg-white/95 backdrop-blur-md text-[9px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full border border-[#283E6A]/15 text-[#283E6A] shadow-sm">
            {product.brand}
          </span>
        </div>

        <div
          onClick={() => onSelectProduct(product.id)}
          className="relative aspect-square w-[92%] mx-auto mt-4 rounded-[24px] bg-white overflow-hidden group-hover:bg-[#283E6A]/5 transition-all duration-500 cursor-pointer flex items-center justify-center p-4 border border-[#283E6A]/10"
        >
          <div className="absolute bottom-4 w-4/5 h-6 bg-[#283E6A]/20 rounded-[100%] blur-md scale-y-[0.3] group-hover:scale-90 duration-500 transition-transform" />

          <img
            src={product.image}
            alt={product.brand + ' - ' + product.name}
            className="h-[80%] w-[80%] object-contain transform transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-6"
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 bg-[#283E6A]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="p-3 bg-white text-[#283E6A] rounded-full border border-white shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300 flex items-center justify-center gap-2 text-xs font-black tracking-wider uppercase">
              <Eye className="w-4 h-4 text-[#E70033]" />
              <span>VER DETALLES</span>
            </div>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-1.5 text-left">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#283E6A]/45">
              {product.category} • {product.gender}
            </p>

            <h3
              onClick={() => onSelectProduct(product.id)}
              className="text-sm sm:text-base font-black text-[#283E6A] tracking-tight uppercase group-hover:text-[#E70033] transition-colors line-clamp-1 cursor-pointer"
            >
              {product.name}
            </h3>

            <div className="flex items-center gap-1.5 pt-0.5">
              <div className="flex items-center bg-white border border-[#283E6A]/15 px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3 text-[#E70033] fill-[#E70033] mr-1" />
                <span className="text-[10px] text-[#283E6A] font-extrabold">
                  {product.rating.toFixed(1)}
                </span>
              </div>

              <span className="text-[10px] text-[#283E6A]/50">
                ({product.reviewsCount} opiniones)
              </span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#283E6A]/10 flex items-center justify-between gap-2">
            <div className="flex flex-col text-left">
              {product.originalPrice && (
                <span className="text-[10px] text-[#283E6A]/40 line-through font-mono">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}

              <span className="text-base font-black text-[#E70033] font-mono tracking-tight">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => onAddToCartDirect(product, defaultSize, defaultColor)}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#E70033] text-[#283E6A] hover:text-white py-3 px-4 rounded-full border border-[#283E6A]/20 hover:border-[#E70033] active:scale-95 transition-all text-[11px] font-black tracking-widest cursor-pointer"
              title={`Agregar al carrito t: ${defaultSize}`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-inherit" />
              <span>COMPRAR</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}