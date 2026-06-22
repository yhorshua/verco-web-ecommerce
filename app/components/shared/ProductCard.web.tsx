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
  const defaultColor = product.colors[0] || { name: 'Único', class: 'bg-stone-500', hex: '#666666' };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white border border-stone-200 rounded-[32px] overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-[#1a3e6a]/40 hover:shadow-[0_16px_40px_rgba(26,62,106,0.06)]"
    >
      {/* Background Interactive Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-tr from-[#1a3e6a] to-blue-500 rounded-[32px] opacity-0 group-hover:opacity-5 transition-opacity duration-500 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
          {product.isNew && (
            <span className="bg-[#1a3e6a] text-white text-[9px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current text-white animate-pulse" />
              NUEVO
            </span>
          )}
          {product.discount && (
            <span className="bg-[#f0f4f8] text-[#1a3e6a] border border-blue-100 text-[9px] font-black tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 uppercase shadow-md">
              <Tag className="w-3 h-3 text-[#1a3e6a]" />
              -{product.discount}% OFF
            </span>
          )}
        </div>

        {/* Brand Round Pill */}
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-[#faf9f6]/90 backdrop-blur-md text-[9px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full border border-stone-200 text-[#1a3e6a] shadow-sm">
            {product.brand}
          </span>
        </div>

        {/* Product Image Area */}
        <div 
          onClick={() => onSelectProduct(product.id)}
          className="relative aspect-square w-[92%] mx-auto mt-4 rounded-[24px] bg-[#faf9f6] overflow-hidden group-hover:bg-[#f3f1eb] transition-all duration-500 cursor-pointer flex items-center justify-center p-4 border border-stone-100"
        >
          {/* Subtle turntable shadow ring */}
          <div className="absolute bottom-4 w-4/5 h-6 bg-stone-300/30 rounded-[100%] blur-md scale-y-[0.3] group-hover:scale-90 duration-500 transition-transform" />

          <img
            src={product.image}
            alt={product.brand + ' - ' + product.name}
            className="h-[80%] w-[80%] object-contain transform transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-6"
            referrerPolicy="no-referrer"
          />

          {/* Hover interactive overlay */}
          <div className="absolute inset-0 bg-[#1a3e6a]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="p-3 bg-white text-[#1a3e6a] rounded-full border border-stone-100 shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300 flex items-center justify-center gap-2 text-xs font-black tracking-wider uppercase">
              <Eye className="w-4 h-4 text-[#1a3e6a]" />
              <span>VER DETALLES</span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-1.5 text-left">
            {/* Category & Segment */}
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400">
              {product.category} • {product.gender}
            </p>

            {/* Product Name */}
            <h3 
              onClick={() => onSelectProduct(product.id)}
              className="text-sm sm:text-base font-black text-stone-900 tracking-tight uppercase group-hover:text-[#1a3e6a] transition-colors line-clamp-1 cursor-pointer"
            >
              {product.name}
            </h3>

            {/* Rating Stars */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <div className="flex items-center bg-[#faf9f6] border border-stone-200 px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3 text-[#1a3e6a] fill-[#1a3e6a] mr-1" />
                <span className="text-[10px] text-[#1a3e6a] font-extrabold">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-[10px] text-stone-550">({product.reviewsCount} opiniones)</span>
            </div>
          </div>

          {/* Pricing & Add Button row */}
          <div className="mt-5 pt-4 border-t border-stone-150 flex items-center justify-between gap-2">
            
            {/* Price */}
            <div className="flex flex-col text-left">
              {product.originalPrice && (
                <span className="text-[10px] text-stone-400 line-through font-mono">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-base font-black text-[#1a3e6a] font-mono tracking-tight">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Call Action Button */}
            <button
              onClick={() => onAddToCartDirect(product, defaultSize, defaultColor)}
              className="inline-flex items-center gap-2 bg-[#faf9f6] hover:bg-[#1a3e6a] text-[#1a3e6a] hover:text-white py-3 px-4 rounded-full border border-[#1a3e6a]/20 hover:border-transparent active:scale-95 transition-all text-[11px] font-black tracking-widest cursor-pointer"
              title={`Agregar al carro t: ${defaultSize}`}
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
