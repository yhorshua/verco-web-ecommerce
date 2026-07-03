'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ScanEye,
  Flame,
  Disc,
} from 'lucide-react';
import { HERO_SLIDES } from '../data/products';

interface HeroProps {
  onSelectProduct: (productId: string) => void;
  onOpenVirtualTryOn: (productId: string) => void;
}

export default function Hero({
  onSelectProduct,
  onOpenVirtualTryOn,
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? HERO_SLIDES.length - 1 : prev - 1,
    );
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === HERO_SLIDES.length - 1 ? 0 : prev + 1,
    );
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide();
    }, 8500);

    return () => clearInterval(slideTimer);
  }, [nextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  const getBrandBlobs = (brand: string) => {
    switch (brand) {
      case 'Nike':
        return {
          bgColor:
            'bg-gradient-to-tr from-[#283E6A]/15 via-[#E70033]/10 to-white',
          outlineText: 'N_I_K_E',
        };

      case 'Adidas':
        return {
          bgColor:
            'bg-gradient-to-tr from-white via-[#283E6A]/10 to-[#E70033]/10',
          outlineText: 'A_D_I_D_A_S',
        };

      case 'Puma':
        return {
          bgColor:
            'bg-gradient-to-tr from-[#E70033]/10 via-white to-[#283E6A]/15',
          outlineText: 'P_U_M_A',
        };

      default:
        return {
          bgColor:
            'bg-gradient-to-tr from-white via-[#283E6A]/10 to-[#E70033]/10',
          outlineText: 'V_E_R_C_O',
        };
    }
  };

  const brandContext = getBrandBlobs(slide.brand);

  return (
    <section
      className="relative min-h-[650px] sm:min-h-[620px] lg:h-[580px] lg:min-h-0 bg-white overflow-hidden flex items-center border-b border-[#283E6A]/15 py-8 sm:py-10 lg:py-0"
      id="hero-slider"
    >
      {/* Fondo */}
      <div className="absolute inset-0 bg-white pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#283E6A]/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-[#E70033]/15 blur-3xl" />

      {/* Texto grande de fondo */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center select-none pointer-events-none z-0 overflow-hidden">
        <span
          className="text-[16vw] sm:text-[13vw] lg:text-[10vw] font-black tracking-[0.18em] uppercase font-display text-transparent opacity-35 select-none"
          style={{ WebkitTextStroke: '1px rgba(40, 62, 106, 0.10)' }}
        >
          {brandContext.outlineText}
        </span>
      </div>

      {/* Burbujas decorativas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20%" cy="30%" r="20" fill="url(#verco-liquid-gradient)" className="animate-pulse duration-[8s]" />
          <circle cx="25%" cy="33%" r="7" fill="url(#verco-liquid-gradient)" className="animate-bounce duration-[4s]" />
          <circle cx="22%" cy="27%" r="10" fill="url(#verco-liquid-gradient)" />

          <circle cx="75%" cy="40%" r="24" fill="url(#verco-liquid-gradient)" className="animate-pulse" />
          <circle cx="79%" cy="37%" r="11" fill="url(#verco-liquid-gradient)" className="animate-bounce" />
          <circle cx="72%" cy="43%" r="7" fill="url(#verco-liquid-gradient)" />

          <defs>
            <radialGradient id="verco-liquid-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E70033" stopOpacity="0.32" />
              <stop offset="70%" stopColor="#283E6A" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Contenido */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Columna izquierda */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#283E6A]/15 shadow-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E70033] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E70033]" />
              </span>

              <span className="text-[9px] sm:text-[10px] font-black tracking-[0.18em] font-mono text-[#283E6A] uppercase">
                COLECCIÓN VERCO • {slide.brand}
              </span>
            </div>

            <p className="text-[#E70033] text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase">
              {slide.subtitle}
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-sans font-black text-[#283E6A] tracking-tighter leading-[0.92] uppercase max-w-xl">
              {slide.title.split('.').map((p, index) => (
                <span key={index} className="block">
                  {p}
                </span>
              ))}
            </h1>

            <p className="text-[#283E6A]/75 text-xs sm:text-sm leading-relaxed max-w-md font-sans">
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onSelectProduct(slide.productId)}
                className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-[#283E6A] hover:bg-[#E70033] text-white font-black uppercase text-[11px] tracking-widest px-7 py-4 rounded-full shadow-[0_8px_24px_rgba(40,62,106,0.20)] transition-all active:scale-95 duration-300 cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-1.5 pt-3 justify-center lg:justify-start">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 transition-all duration-[600ms] rounded-full focus:outline-none cursor-pointer ${
                    idx === currentSlide
                      ? 'w-9 bg-[#E70033]'
                      : 'w-2 bg-[#283E6A]/25 hover:bg-[#283E6A]/45'
                  }`}
                  aria-label={`Deslizar a la posición ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Columna derecha */}
          <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2 py-2 sm:py-4 lg:py-0 min-h-[260px] sm:min-h-[320px] lg:min-h-0">
            <div
              className={`absolute w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[340px] lg:h-[340px] rounded-full blur-[55px] ${brandContext.bgColor} transition-all duration-[1200ms] z-0`}
            />

            <div className="absolute w-[220px] h-[55px] sm:w-[320px] sm:h-[80px] lg:w-[340px] lg:h-[85px] border border-[#E70033]/20 rounded-[100%] bottom-2 sm:bottom-4 lg:bottom-8 opacity-80 z-0 flex items-center justify-center">
              <div className="w-[85%] h-[85%] border border-[#283E6A]/20 border-dashed rounded-[100%] animate-spin duration-[40s] flex items-center justify-center">
                <Disc className="w-4 h-4 text-[#283E6A]/50" />
              </div>
            </div>

            <div className="relative group/shoe z-10 select-none max-w-[220px] sm:max-w-[310px] lg:max-w-[340px] xl:max-w-[360px] filter drop-shadow-[0_18px_24px_rgba(40,62,106,0.18)]">
              <div className="absolute -top-7 -right-3 bg-[#E70033] border border-transparent text-white font-mono text-[8px] sm:text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 animate-bounce">
                <Flame className="w-3 h-3 fill-current" />
                <span className="hidden sm:inline">TECNOLOGÍA RESPONSIVA</span>
                <span className="sm:hidden">RESPONSIVA</span>
              </div>

              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-auto object-contain transform -rotate-[14deg] group-hover/shoe:rotate-[-9deg] group-hover/shoe:-translate-y-3 transition-transform duration-700 ease-out pointer-events-none"
              />

              <div className="absolute bottom-8 left-8 w-2 h-2 bg-[#E70033] rounded-full animate-ping duration-[3s]" />
              <div className="absolute top-16 right-16 w-1.5 h-1.5 bg-[#283E6A] rounded-full animate-ping duration-[2s]" />
            </div>
          </div>
        </div>
      </div>

      {/* Flechas */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 z-30">
        <button
          onClick={prevSlide}
          className="p-2.5 bg-white hover:bg-[#283E6A] text-[#283E6A] hover:text-white border border-[#283E6A]/20 hover:border-[#283E6A] rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#E70033] cursor-pointer shadow-sm"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={nextSlide}
          className="p-2.5 bg-white hover:bg-[#283E6A] text-[#283E6A] hover:text-white border border-[#283E6A]/20 hover:border-[#283E6A] rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#E70033] cursor-pointer shadow-sm"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}