'use client';

import React, { useEffect, useState } from 'react';
import {
  Search,
  ShoppingBag,
  User,
  Flame,
  Sparkles,
  X,
  Van,
} from 'lucide-react';
import Image from 'next/image';

interface NavbarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenLogin: () => void;
}

export default function Navbar({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedGender,
  setSelectedGender,
  searchQuery,
  setSearchQuery,
  cartCount,
  onOpenCart,
  onOpenLogin,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const promoMessages = [
    {
      text: 'COMPRA HASTA LAS 11:30 AM Y RECIBE HOY',
      icon: Van,
    },
    {
      text: 'DELIVERY GRATIS A TODA LIMA METROPOLITANA',
      icon: Sparkles,
    },
    {
      text: 'PAGO CONTRA ENTREGA EN TODA LIMA METROPOLITANA',
      icon: Flame,
    },
  ];

  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoMessages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [promoMessages.length]);

  const CurrentPromoIcon = promoMessages[promoIndex].icon;

  const categories = ['Todos', 'Calzado', 'Ropa', 'Accesorios'];
  const brands = ['Todas', 'Nike', 'Adidas', 'Puma'];
  const genders = ['Todos', 'Hombre', 'Mujer', 'Unisex'];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-[#283E6A] border-b border-[#283E6A]/15 transition-all duration-300">
      {/* Barra promocional superior */}
      <div className="bg-[#283E6A] text-center text-xs font-bold tracking-widest py-1.5 px-4 flex items-center justify-center gap-2 text-white overflow-hidden">
        <Flame className="w-3.5 h-3.5 text-[#E70033] animate-pulse fill-[#E70033] flex-shrink-0" />

        <div
          key={promoIndex}
          className="flex items-center justify-center gap-2 animate-promo-slide"
        >
          <CurrentPromoIcon className="w-4 h-4 text-white flex-shrink-0" />

          <span className="uppercase text-[10px] sm:text-xs leading-tight">
            {promoMessages[promoIndex].text}
          </span>
        </div>

        <Sparkles className="w-3.5 h-3.5 text-[#E70033] animate-bounce flex-shrink-0" />

        <style jsx>{`
    @keyframes promoSlide {
      0% {
        opacity: 0;
        transform: translateY(8px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-promo-slide {
      animation: promoSlide 0.45s ease-in-out;
    }
  `}</style>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center gap-2 focus:outline-none">
              <Image
                src="/img/verco-logo-01.png"
                alt="Logo VERCO"
                width={120}
                height={45}
                priority
                className="h-10 w-auto object-contain"
              />
            </a>
          </div>

          {/* Categorías desktop */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-black tracking-widest uppercase transition-all duration-200 border-b-2 cursor-pointer ${(cat === 'Todos' && selectedCategory === 'Todos') ||
                    cat === selectedCategory
                    ? 'border-[#E70033] text-[#283E6A]'
                    : 'border-transparent text-[#283E6A]/70 hover:text-[#E70033] hover:border-[#E70033]/40'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Buscador desktop */}
          <div className="flex-1 max-w-sm hidden md:block">
            <div
              className={`relative flex items-center bg-white rounded-full border transition-all duration-200 ${searchFocused
                  ? 'border-[#E70033] shadow-sm ring-2 ring-[#E70033]/10'
                  : 'border-[#283E6A]/20 hover:border-[#283E6A]/40'
                }`}
            >
              <Search
                className={`w-4 h-4 ml-3.5 flex-shrink-0 transition-colors ${searchFocused ? 'text-[#E70033]' : 'text-[#283E6A]/50'
                  }`}
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar calzado, ropa o marcas..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full bg-transparent border-none text-[#283E6A] text-xs py-2.5 px-3 focus:outline-none placeholder-[#283E6A]/40 font-mono tracking-tight"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="pr-3 text-[#283E6A]/50 hover:text-[#E70033]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onOpenLogin}
              className="p-2 text-[#283E6A]/80 hover:text-[#E70033] focus:outline-none transition-colors border border-transparent rounded-full flex items-center justify-center gap-1.5 cursor-pointer"
              title="Mi Cuenta"
              id="btn-login-navbar"
            >
              <User className="w-5 h-5" />
              <span className="text-[11px] font-black tracking-widest uppercase hidden sm:inline">
                Mi Cuenta
              </span>
            </button>

            <button
              onClick={onOpenCart}
              className="p-2 text-[#283E6A] hover:text-[#E70033] focus:outline-none transition-all relative border border-[#283E6A]/20 hover:border-[#E70033]/50 bg-white rounded-full flex items-center justify-center gap-2 px-3 sm:px-4 cursor-pointer shadow-sm"
              title="Mi Carrito"
              id="btn-cart-navbar"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#283E6A]" />

                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-[#E70033] text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border border-white animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>

              <span className="text-xs font-black tracking-widest text-[#283E6A] uppercase hidden lg:inline">
                Bolsa
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#283E6A] hover:text-[#E70033] lg:hidden focus:outline-none border border-[#283E6A]/20 rounded-full ml-2 bg-white shadow-sm cursor-pointer"
              title="Menú"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Buscador móvil */}
      <div className="md:hidden border-t border-[#283E6A]/15 bg-white p-3">
        <div className="relative flex items-center bg-white rounded-full border border-[#283E6A]/20">
          <Search className="w-4 h-4 text-[#283E6A]/50 ml-3.5 flex-shrink-0" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos y marcas..."
            className="w-full bg-transparent border-none text-[#283E6A] text-xs py-2 px-3 focus:outline-none placeholder-[#283E6A]/40 font-mono"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="pr-3 text-[#283E6A]/50 hover:text-[#E70033]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#283E6A]/15 shadow-xl animate-fade-in">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <div>
              <p className="text-xs font-bold text-[#283E6A]/60 uppercase tracking-widest mb-2 font-mono">
                Categorías
              </p>

              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 px-3 text-xs font-black tracking-widest uppercase transition-all text-left rounded-xl cursor-pointer ${(cat === 'Todos' && selectedCategory === 'Todos') ||
                        cat === selectedCategory
                        ? 'bg-[#283E6A] text-white'
                        : 'bg-[#283E6A]/5 text-[#283E6A] hover:bg-[#283E6A]/10'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-[#283E6A]/60 uppercase tracking-widest mb-2 font-mono">
                Marcas deportivas
              </p>

              <div className="grid grid-cols-4 gap-1.5">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setSelectedBrand(b === 'Todas' ? 'Todas' : b);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-1.5 text-center text-[10px] font-black uppercase tracking-wider transition-all rounded-lg cursor-pointer ${(b === 'Todas' && selectedBrand === 'Todas') ||
                        b === selectedBrand
                        ? 'bg-[#E70033] text-white'
                        : 'bg-[#283E6A]/5 text-[#283E6A]'
                      }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-[#283E6A]/60 uppercase tracking-widest mb-2 font-mono">
                Género
              </p>

              <div className="grid grid-cols-4 gap-1.5">
                {genders.map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setSelectedGender(g);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-1.5 text-center text-[10px] font-black uppercase tracking-wider transition-all rounded-lg cursor-pointer ${g === selectedGender
                        ? 'bg-[#E70033] text-white'
                        : 'bg-[#283E6A]/5 text-[#283E6A]'
                      }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}