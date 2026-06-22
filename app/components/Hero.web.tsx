import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ScanEye, Flame, Disc } from 'lucide-react';
import { HERO_SLIDES } from '../data/products';

interface HeroProps {
  onSelectProduct: (productId: string) => void;
  onOpenVirtualTryOn: (productId: string) => void;
}

export default function Hero({ onSelectProduct, onOpenVirtualTryOn }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide();
    }, 8500); // Prolonged display for enjoying animations
    return () => clearInterval(slideTimer);
  }, [nextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  // Define unique futuristic liquid blobs context for the selected brand
  const getBrandBlobs = (brand: string) => {
    switch (brand) {
      case 'Nike':
        return {
          bgColor: 'bg-gradient-to-tr from-blue-100/60 via-[#1a3e6a]/10 to-stone-100/55',
          textColor: 'text-[#1a3e6a]/10',
          glowColor: 'shadow-[0_0_80px_rgba(26,62,106,0.15)]',
          outlineText: 'N_I_K_E'
        };
      case 'Adidas':
        return {
          bgColor: 'bg-gradient-to-tr from-[#faf9f6] via-blue-100/30 to-stone-200/50',
          textColor: 'text-[#1a3e6a]/15',
          glowColor: 'shadow-[0_0_80px_rgba(26,62,106,0.12)]',
          outlineText: 'A_D_I_D_A_S'
        };
      case 'Puma':
        return {
          bgColor: 'bg-gradient-to-tr from-sky-100/55 via-[#1a3e6a]/5 to-zinc-150',
          textColor: 'text-[#1a3e6a]/10',
          glowColor: 'shadow-[0_0_80px_rgba(26,62,106,0.14)]',
          outlineText: 'P_U_M_A'
        };
      default:
        return {
          bgColor: 'bg-gradient-to-tr from-stone-100 to-stone-250',
          textColor: 'text-neutral-800/10',
          glowColor: '',
          outlineText: 'A_P_E_X'
        };
    }
  };

  const brandContext = getBrandBlobs(slide.brand);

  return (
    <section className="relative h-[640px] sm:h-[720px] lg:h-[820px] bg-[#faf9f6]/95 overflow-hidden flex items-center border-b border-stone-200/80" id="hero-slider">
      
      {/* Background Soft Interactive Warm Rose/Clay ambiance inspired by the mockup backdrop */}
      <div className="absolute inset-0 bg-[#faf9f6] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-orange-200/25 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-rose-200/20 blur-3xl" />
      
      {/* Giant Hollow Brand outline background text */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center select-none pointer-events-none z-0 overflow-hidden">
        <span 
          className="text-[12vw] font-black tracking-[0.2em] uppercase font-display text-transparent opacity-30 select-none"
          style={{ WebkitTextStroke: '1px rgba(120, 113, 108, 0.08)' }}
        >
          {brandContext.outlineText}
        </span>
      </div>

      {/* Floating interactive liquid bubbles and droplets matching Screen 1 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          {/* Dripping bubbles with seamless transform floating loops */}
          <circle cx="20%" cy="30%" r="24" fill="url(#liquid-gradient)" className="animate-pulse duration-[8s]" />
          <circle cx="25%" cy="33%" r="8" fill="url(#liquid-gradient)" className="animate-bounce duration-[4s]" />
          <circle cx="22%" cy="27%" r="12" fill="url(#liquid-gradient)" />
          
          <circle cx="75%" cy="40%" r="30" fill="url(#liquid-gradient)" className="animate-pulse" />
          <circle cx="79%" cy="37%" r="14" fill="url(#liquid-gradient)" className="animate-bounce" />
          <circle cx="72%" cy="43%" r="8" fill="url(#liquid-gradient)" />
          
          <defs>
            <radialGradient id="liquid-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#ef4444" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Core Dynamic Content Slider with AnimatePresence */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* COLUMN LEFT: Title, descriptions and round pill buttons */}
          <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
            
            {/* Pill Header Badge */}
            <div className="inline-flex items-center gap-2 bg-white/95 hover:bg-[#fafaf6] px-3.5 py-1.5 rounded-full border border-stone-200/80 shadow-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1a3e6a]"></span>
              </span>
              <span className="text-[10px] font-black tracking-[0.2em] font-mono text-stone-600 uppercase">
                COLECCIÓN FUTURISTA • {slide.brand}
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-[#1a3e6a] text-xs sm:text-sm font-mono font-bold tracking-[0.3em] uppercase">
              {slide.subtitle}
            </p>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-sans font-black text-stone-900 tracking-tighter leading-[0.9] uppercase">
              {slide.title.split('.').map((p, index) => (
                <span key={index} className="block">
                  {p}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p className="text-stone-600 text-sm sm:text-base tracking-tight leading-relaxed max-w-lg font-sans">
              {slide.description}
            </p>

            {/* Pill-shaped Gorgeous Buttons matching screen 2 button shapes */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              
              <button
                onClick={() => onSelectProduct(slide.productId)}
                className="group w-full sm:w-auto flex items-center justify-center gap-4 bg-gradient-to-r from-[#1a3e6a] via-blue-800 to-[#1a3e6a] hover:brightness-110 text-white font-black uppercase text-xs tracking-widest px-8 py-4.5 rounded-full shadow-[0_8px_30px_rgba(26,62,106,0.2)] transition-all active:scale-95 duration-300 cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => onOpenVirtualTryOn(slide.productId)}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#f5f2eb] hover:bg-stone-200 text-stone-950 border border-stone-300 hover:border-stone-400 font-mono font-bold text-xs tracking-wider px-8 py-4.5 rounded-full transition-all active:scale-95 cursor-pointer"
              >
                <ScanEye className="w-4.5 h-4.5 text-[#1a3e6a] animate-pulse" />
                <span>PROBADOR VIRTUAL AR</span>
              </button>

              </div>

            {/* Carousel navigation pills indicators inside Left layout */}
            <div className="flex items-center gap-1.5 pt-6 justify-center lg:justify-start">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 transition-all duration-[600ms] rounded-full focus:outline-none cursor-pointer ${
                    idx === currentSlide ? 'w-10 bg-[#1a3e6a]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Deslizar a la posición ${idx + 1}`}
                />
              ))}
            </div>

          </div>

          {/* COLUMN RIGHT: Immersive floating sneaker on radial glow matching Screen 1 (Try On AR screen) */}
          <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2 py-8 lg:py-0">
            
            {/* Glowing radial circular orbit under shoe - inspired by detail turntable UI */}
            <div className={`absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full blur-[70px] ${brandContext.bgColor} transition-all duration-[1200ms] z-0`} />
            
            {/* Real aesthetic circle spinning under shoe as showcase ring pedestal */}
            <div className="absolute w-[260px] h-[70px] sm:w-[380px] sm:h-[100px] border border-orange-500/15 rounded-[100%] bottom-0 lg:bottom-10 opacity-70 z-0 flex items-center justify-center">
              <div className="w-[85%] h-[85%] border border-[#ef4444]/5 border-dashed border-stone-300 rounded-[100%] animate-spin duration-[40s] flex items-center justify-center">
                <Disc className="w-5 h-5 text-stone-400" />
              </div>
            </div>

            {/* Main Showcase shoe image Container floating elegantly with mouse-hover hover transform */}
            <div className="relative group/shoe z-10 select-none max-w-[280px] sm:max-w-[420px] filter drop-shadow-[0_20px_25px_rgba(40,40,40,0.12)]">
              
              {/* Drifting water splash effect icons */}
              <div className="absolute -top-10 -right-4 bg-[#1a3e6a] border border-transparent text-white font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 animate-bounce">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>TECNOLOGÍA RESPONSIVA</span>
              </div>

              {/* Shoe Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-auto object-contain transform -rotate-[15deg] group-hover/shoe:rotate-[-10deg] group-hover/shoe:-translate-y-4 transition-transform duration-700 ease-out pointer-events-none"
              />

              {/* Small abstract organic droplets floating alongside shoe matching design */}
              <div className="absolute bottom-10 left-10 w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping duration-[3s]" />
              <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-sky-500 rounded-full animate-ping duration-[2s]" />

            </div>

          </div>

        </div>
      </div>

      {/* Manual Side Navigation Arrows */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex items-center gap-2 z-30">
        <button
          onClick={prevSlide}
          className="p-3 bg-[#fbfaf7] hover:bg-[#1a3e6a] text-stone-800 hover:text-white border border-stone-250 hover:border-transparent rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer shadow-sm animate-pulse"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={nextSlide}
          className="p-3 bg-[#fbfaf7] hover:bg-[#1a3e6a] text-stone-800 hover:text-white border border-stone-250 hover:border-transparent rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer shadow-sm animate-pulse"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
}

