'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCw,
  Minus,
  Plus,
  ArrowLeft,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tag,
  Eye,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductScreenProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    size: string,
    color: any,
  ) => void;
  onBuyNow: (
    product: Product,
    quantity: number,
    size: string,
    color: any,
  ) => void;
  onOpenVirtualTryOn?: (productId: string) => void;

  recommendedProducts?: Product[];
  onSelectRecommendedProduct?: (productId: string) => void;
}

export default function ProductScreen({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onOpenVirtualTryOn,
  recommendedProducts = [],
  onSelectRecommendedProduct,
}: ProductScreenProps) {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<any>(
    product.colors[0] || null,
  );
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(product.sizes[0] || '');
    setSelectedColor(product.colors[0] || null);
    setQuantity(1);
    setIsFavorite(false);
  }, [product]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const scrollRecommendations = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === 'left' ? -320 : 320,
      behavior: 'smooth',
    });
  };

  const recommendations = recommendedProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 12);

  return (
    <div className="flex-1 w-full bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barra superior */}
        <div className="flex items-center justify-between pb-6 border-b border-[#283E6A]/15 mb-8 select-none">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-[#283E6A]/75 hover:text-[#E70033] transition-colors text-xs font-black uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#E70033]" />
            <span>VOLVER AL CATÁLOGO GENERAL</span>
          </button>

          <div className="text-xs font-bold text-[#283E6A]/45 font-mono hidden sm:inline uppercase">
            DETALLE DEL PRODUCTO • ID: {product.id}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna izquierda */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-square w-full bg-white rounded-[32px] overflow-hidden border border-[#283E6A]/15 flex items-center justify-center p-6 group/detail shadow-sm">
              <div className="absolute w-[80%] h-[70px] border border-dashed border-[#283E6A]/20 rounded-[100%] bottom-8 p-1 flex items-center justify-center pointer-events-none">
                <div className="w-[95%] h-[95%] border border-[#E70033]/10 rounded-[100%] animate-spin duration-[40s]" />
              </div>

              <div className="absolute bottom-6 w-3/4 h-24 bg-[#283E6A]/8 rounded-full blur-[45px] pointer-events-none" />

              <motion.img
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={activeImage}
                alt={product.name}
                className="max-h-[75%] max-w-[75%] object-contain transform -rotate-[12deg] group-hover/detail:-rotate-[6deg] transition-all duration-700 pointer-events-none filter drop-shadow-[0_16px_32px_rgba(40,62,106,0.15)] cursor-pointer"
                referrerPolicy="no-referrer"
              />

              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-[#E70033] font-sans text-white font-black text-[9px] px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                    RECOMENDADO VERCO
                  </span>
                )}

                {product.discount && (
                  <span className="bg-white border border-[#E70033]/25 text-[#E70033] font-mono font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>

              <div className="absolute top-6 right-6">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-full border transition-all cursor-pointer ${
                    isFavorite
                      ? 'bg-[#E70033] border-[#E70033] text-white'
                      : 'bg-white border-[#283E6A]/20 text-[#283E6A] hover:bg-[#283E6A] hover:text-white'
                  }`}
                  title="Favoritos"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite ? 'fill-current' : ''
                    }`}
                  />
                </button>
              </div>

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      const currentIndex = product.images.indexOf(activeImage);
                      const nextIdx =
                        currentIndex === 0
                          ? product.images.length - 1
                          : currentIndex - 1;

                      setActiveImage(product.images[nextIdx]);
                    }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white hover:bg-[#283E6A] text-[#283E6A] hover:text-white rounded-full border border-[#283E6A]/20 shadow-sm transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      const currentIndex = product.images.indexOf(activeImage);
                      const nextIdx =
                        currentIndex === product.images.length - 1
                          ? 0
                          : currentIndex + 1;

                      setActiveImage(product.images[nextIdx]);
                    }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white hover:bg-[#283E6A] text-[#283E6A] hover:text-white rounded-full border border-[#283E6A]/20 shadow-sm transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 px-3.5 py-1.5 border border-[#283E6A]/15 rounded-full text-[9px] font-mono text-[#283E6A] font-extrabold uppercase shadow-sm">
                VISTA MULTIÁNGULO:{' '}
                {product.images.indexOf(activeImage) + 1} /{' '}
                {product.images.length}
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square w-full rounded-2xl bg-white border p-2 transition-all cursor-pointer ${
                      activeImage === img
                        ? 'border-[#E70033] ring-2 ring-[#E70033]/20 scale-95 shadow-md'
                        : 'border-[#283E6A]/15 hover:border-[#283E6A]/40'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Miniatura"
                      className="h-full w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="bg-white border border-[#283E6A]/15 p-6 rounded-[28px] grid grid-cols-3 gap-4 text-center font-mono">
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="w-5 h-5 text-[#E70033]" />
                <span className="text-[10px] font-bold text-[#283E6A] uppercase">
                  DESPACHO RÁPIDO
                </span>
                <span className="text-[9px] text-[#283E6A]/45">
                  Entrega según disponibilidad
                </span>
              </div>

              <div className="flex flex-col items-center gap-1.5 border-x border-[#283E6A]/10 px-2">
                <ShieldCheck className="w-5 h-5 text-[#E70033]" />
                <span className="text-[10px] font-bold text-[#283E6A] uppercase">
                  COMPRA SEGURA
                </span>
                <span className="text-[9px] text-[#283E6A]/45">
                  Atención y seguimiento
                </span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <RefreshCw className="w-5 h-5 text-[#E70033]" />
                <span className="text-[10px] font-bold text-[#283E6A] uppercase">
                  GARANTIZADO
                </span>
                <span className="text-[9px] text-[#283E6A]/45">
                  Cambios según política
                </span>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-[#283E6A]/15 rounded-[32px] p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-[#283E6A]/10 text-[#283E6A] text-[10px] font-mono font-black uppercase tracking-widest px-2.5 py-0.5 border border-[#283E6A]/15 rounded-md">
                    {product.brand} ORIGINAL
                  </span>

                  <span className="text-[#283E6A]/45 font-mono text-[10px] uppercase">
                    SECCIÓN: {product.gender}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#283E6A] uppercase leading-none">
                  {product.name}
                </h2>
              </div>

              <div className="flex flex-wrap items-baseline gap-4 py-3.5 border-y border-[#283E6A]/10">
                <div className="flex gap-2 items-baseline">
                  <span className="text-3xl font-black font-mono tracking-tight text-[#E70033]">
                    ${product.price.toFixed(2)} USD
                  </span>

                  {product.originalPrice && (
                    <span className="text-xs font-mono text-[#283E6A]/40 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="h-4 w-[1px] bg-[#283E6A]/15 hidden sm:block" />

                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#E70033]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-current'
                            : 'text-[#283E6A]/15'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-black text-[#283E6A]">
                    {product.rating.toFixed(1)}
                  </span>

                  <span className="text-xs text-[#283E6A]/55">
                    ({product.reviewsCount} reseñas)
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <span className="text-[10px] font-bold text-[#283E6A]/45 uppercase tracking-widest font-mono block">
                  DESCRIPCIÓN DEL PRODUCTO
                </span>

                <p className="text-[#283E6A]/75 text-xs sm:text-sm leading-relaxed font-sans">
                  {product.description}
                </p>
              </div>

              <div className="space-y-2 text-left">
                <div className="flex justify-between items-baseline font-mono text-[10px]">
                  <span className="font-bold text-[#283E6A]/45 uppercase tracking-widest">
                    COLOR DISPONIBLE
                  </span>

                  <span className="text-[#E70033] font-black uppercase tracking-wider">
                    {selectedColor?.name}
                  </span>
                </div>

                <div className="flex items-center gap-3.5 select-none">
                  {product.colors.map((colorObj) => (
                    <button
                      key={colorObj.name}
                      onClick={() => setSelectedColor(colorObj)}
                      className={`h-9 w-9 rounded-full ${colorObj.class} flex items-center justify-center transition-all relative cursor-pointer ${
                        selectedColor?.name === colorObj.name
                          ? 'ring-4 ring-[#E70033] ring-offset-2 ring-offset-white scale-105'
                          : 'opacity-85 hover:opacity-100 border border-[#283E6A]/20'
                      }`}
                      title={colorObj.name}
                    >
                      {selectedColor?.name === colorObj.name && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-left">
                <div className="flex justify-between items-baseline font-mono text-[10px]">
                  <span className="font-bold text-[#283E6A]/45 uppercase tracking-widest">
                    SELECCIONA TALLA
                  </span>

                  <span className="text-[#E70033] underline cursor-pointer hover:opacity-80">
                    TABLA DE MEDIDAS
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 select-none">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-3 text-xs font-bold font-mono text-center transition-all rounded-xl cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#283E6A] text-white font-black border border-[#283E6A] shadow-sm scale-[0.98]'
                          : 'bg-white text-[#283E6A] border border-[#283E6A]/20 hover:border-[#E70033] hover:text-[#E70033]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#283E6A]/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#283E6A]/45 uppercase tracking-widest font-mono">
                    CANTIDAD
                  </span>

                  <div className="flex items-center border border-[#283E6A]/20 bg-white rounded-full p-0.5 select-none text-[#283E6A]">
                    <button
                      onClick={handleDecrement}
                      className="p-2 hover:bg-[#283E6A]/5 rounded-full transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-10 text-center text-xs font-black font-mono">
                      {quantity}
                    </span>

                    <button
                      onClick={handleIncrement}
                      className="p-2 hover:bg-[#283E6A]/5 rounded-full transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  {onOpenVirtualTryOn && (
                    <button
                      onClick={() => onOpenVirtualTryOn(product.id)}
                      className="w-full bg-white hover:bg-[#283E6A]/5 border border-[#283E6A]/20 hover:border-[#E70033] text-[#283E6A] hover:text-[#E70033] uppercase text-[10px] font-black tracking-widest py-3 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Eye className="w-4 h-4 text-[#E70033]" />
                      <span>PROBAR PRODUCTO EN TIEMPO REAL</span>
                    </button>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <button
                      onClick={() =>
                        onAddToCart(
                          product,
                          quantity,
                          selectedSize,
                          selectedColor,
                        )
                      }
                      className="w-full uppercase text-xs font-black tracking-widest py-4 border border-[#283E6A]/25 bg-white text-[#283E6A] hover:bg-[#283E6A] hover:text-white rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      CARRITO
                    </button>

                    <button
                      onClick={() =>
                        onBuyNow(
                          product,
                          quantity,
                          selectedSize,
                          selectedColor,
                        )
                      }
                      className="w-full bg-[#E70033] hover:bg-[#283E6A] text-white uppercase text-xs font-black tracking-widest py-4 rounded-full transition-all shadow-[0_8px_25px_rgba(231,0,51,0.18)] flex items-center justify-center cursor-pointer"
                    >
                      COMPRAR YA
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recomendaciones en lugar del bloque biométrico */}
            <div className="bg-[#283E6A] border border-[#283E6A] rounded-[32px] p-6 sm:p-7 space-y-5 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between gap-4">
                <div className="text-left">
                  <div className="inline-flex items-center gap-1.5 bg-white text-[#283E6A] border border-white px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#E70033]" />
                    RECOMENDACIONES VERCO
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight leading-none">
                    Productos que también podrían gustarte
                  </h3>

                  <p className="text-white/70 text-xs mt-2">
                    Explora productos relacionados, novedades y opciones
                    destacadas para complementar tu compra.
                  </p>
                </div>

                {recommendations.length > 0 && (
                  <div className="hidden sm:flex items-center gap-2">
                    <button
                      onClick={() => scrollRecommendations('left')}
                      className="h-10 w-10 rounded-full bg-white text-[#283E6A] hover:bg-[#E70033] hover:text-white transition-all flex items-center justify-center"
                      title="Anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => scrollRecommendations('right')}
                      className="h-10 w-10 rounded-full bg-white text-[#283E6A] hover:bg-[#E70033] hover:text-white transition-all flex items-center justify-center"
                      title="Siguiente"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {recommendations.length === 0 ? (
                <div className="bg-white/10 border border-white/15 rounded-2xl p-5 text-white/75 text-xs">
                  Aún no hay productos recomendados disponibles.
                </div>
              ) : (
                <div
                  ref={sliderRef}
                  className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pr-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {recommendations.map((item) => {
                    const discount = item.discount ?? 0;

                    return (
                      <div
                        key={item.id}
                        className="min-w-[210px] max-w-[210px] snap-start bg-white rounded-[24px] border border-white overflow-hidden shadow-sm group"
                      >
                        <div
                          onClick={() =>
                            onSelectRecommendedProduct?.(item.id)
                          }
                          className="relative h-40 bg-white flex items-center justify-center p-4 cursor-pointer overflow-hidden"
                        >
                          {item.isNew && (
                            <span className="absolute top-3 left-3 bg-[#E70033] text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full">
                              Nuevo
                            </span>
                          )}

                          {discount > 0 && (
                            <span className="absolute top-3 right-3 bg-[#283E6A] text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full flex items-center gap-1">
                              <Tag className="w-2.5 h-2.5" />
                              -{discount}%
                            </span>
                          )}

                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-[85%] w-[85%] object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="p-4 space-y-2 text-left">
                          <div>
                            <p className="text-[9px] font-mono font-black uppercase tracking-widest text-[#E70033]">
                              {item.brand}
                            </p>

                            <h4
                              onClick={() =>
                                onSelectRecommendedProduct?.(item.id)
                              }
                              className="text-xs font-black uppercase text-[#283E6A] line-clamp-1 cursor-pointer hover:text-[#E70033]"
                            >
                              {item.name}
                            </h4>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-col">
                              {item.originalPrice && (
                                <span className="text-[9px] text-[#283E6A]/35 line-through font-mono">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              )}

                              <span className="text-sm font-black text-[#E70033] font-mono">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>

                            <button
                              onClick={() =>
                                onAddToCart(
                                  item,
                                  1,
                                  item.sizes[0] || '',
                                  item.colors[0] || null,
                                )
                              }
                              className="h-9 w-9 rounded-full bg-[#283E6A] hover:bg-[#E70033] text-white flex items-center justify-center transition-all"
                              title="Agregar recomendado"
                            >
                              <ShoppingBag className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {recommendations.length > 0 && (
                <div className="flex sm:hidden justify-center gap-2 pt-1">
                  <button
                    onClick={() => scrollRecommendations('left')}
                    className="h-10 w-10 rounded-full bg-white text-[#283E6A] hover:bg-[#E70033] hover:text-white transition-all flex items-center justify-center"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => scrollRecommendations('right')}
                    className="h-10 w-10 rounded-full bg-white text-[#283E6A] hover:bg-[#E70033] hover:text-white transition-all flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}