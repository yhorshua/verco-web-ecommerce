import React, { useState } from 'react';
import { Search, ShoppingBag, User, Flame, Sparkles, Filter, X, Package, Van } from 'lucide-react';
import { Product } from '../types';
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

  const categories = ['Todos', 'Calzado', 'Ropa', 'Accesorios'];
  const brands = ['Todas', 'Nike', 'Adidas', 'Puma'];
  const genders = ['Todos', 'Hombre', 'Mujer', 'Unisex'];

  return (
    <nav className="sticky top-0 z-50 bg-[#faf9f6]/95 backdrop-blur-md text-stone-900 border-b border-stone-200/85 transition-all duration-300">
      {/* Top promotional bar - Cobalt thematic */}
      <div className="bg-gradient-to-r from-blue-900 via-[#1a3e6a] to-blue-850 text-center text-xs font-bold tracking-widest py-1 px-4 flex items-center justify-center gap-2 text-white">
        <Flame className="w-3.5 h-3.5 text-sky-305 animate-pulse" />
        <Van /><span>COMPRA HASTA LAS 11:30 AM Y RECIBE HOY </span>
        <Sparkles className="w-3.5 h-3.5 text-sky-305 animate-bounce" />
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

          {/* Desktop Categories Filter (Mid Nav) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-black tracking-widest uppercase transition-all duration-200 border-b-2 hover:text-[#1a3e6a] cursor-pointer ${(cat === 'Todos' && selectedCategory === 'Todos') || cat === selectedCategory
                    ? 'border-[#1a3e6a] text-[#1a3e6a] font-all'
                    : 'border-transparent text-stone-605 hover:border-stone-300'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar with custom focus cobalt highlight */}
          <div className="flex-1 max-w-sm hidden md:block">
            <div className={`relative flex items-center bg-[#f3f1eb] rounded-full border transition-all duration-200 ${searchFocused ? 'border-[#1a3e6a] bg-white shadow-sm' : 'border-stone-200/85 hover:border-stone-300'
              }`}>
              <Search className={`w-4 h-4 ml-3.5 flex-shrink-0 transition-colors ${searchFocused ? 'text-[#1a3e6a]' : 'text-stone-400'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar calzado elite, fitness o marcas..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full bg-transparent border-none text-stone-900 text-xs py-2.5 px-3 focus:outline-none placeholder-stone-400 font-mono tracking-tight"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="pr-3 text-stone-400 hover:text-stone-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
{/*
            {/* Quick Brand Badges (Desktop)
            <div className="hidden xl:flex items-center gap-1 text-xs border-r border-stone-200 pr-4 mr-2">
              <span className="text-stone-500 font-bold uppercase tracking-widest mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#1a3e6a]" /> MARCAS:
              </span>
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b === 'Todas' ? 'Todas' : b)}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all duration-150 rounded-full cursor-pointer ${(b === 'Todas' && selectedBrand === 'Todas') || b === selectedBrand
                      ? 'bg-[#1a3e6a] text-white font-black shadow-sm'
                      : 'bg-[#edeae4] text-stone-605 hover:bg-stone-200 hover:text-stone-900'
                    }`}
                >
                  {b}
                </button>
              ))}
            </div>
            */}

            {/* Account Link */}
            <button
              onClick={onOpenLogin}
              className="p-2 text-stone-650 hover:text-[#1a3e6a] focus:outline-none transition-colors border border-transparent rounded-full flex items-center justify-center gap-1.5 cursor-pointer"
              title="Mi Cuenta"
              id="btn-login-navbar"
            >
              <User className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span className="text-[11px] font-black tracking-widest uppercase hidden sm:inline text-stone-750">Mi Cuenta</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="p-2 text-stone-650 hover:text-[#1a3e6a] focus:outline-none transition-all relative border border-stone-205 hover:border-[#1a3e6a]/40 bg-white rounded-full flex items-center justify-center gap-2 px-3 sm:px-4 cursor-pointer shadow-sm"
              title="Mi Carrito APEX"
              id="btn-cart-navbar"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#1a3e6a]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-[#1a3e6a] text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border border-white animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-black tracking-widest text-stone-850 uppercase hidden lg:inline">Bolsa</span>
            </button>

            {/* Hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-605 hover:text-[#1a3e6a] lg:hidden focus:outline-none border border-stone-200 rounded-full ml-2 bg-white shadow-sm cursor-pointer"
              title="Menú"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden border-t border-stone-200 bg-white p-3">
        <div className="relative flex items-center bg-[#f3f1eb] rounded-full border border-stone-205">
          <Search className="w-4 h-4 text-stone-400 ml-3.5 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos y marcas..."
            className="w-full bg-transparent border-none text-stone-800 text-xs py-2 px-3 focus:outline-none placeholder-stone-400 font-mono"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="pr-3 text-stone-400">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer panel overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 shadow-xl animate-fade-in">
          <div className="px-4 pt-4 pb-6 space-y-4">

            {/* Category selection */}
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 font-mono">Categorías</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 px-3 text-xs font-black tracking-widest uppercase transition-all text-left rounded-xl cursor-pointer ${(cat === 'Todos' && selectedCategory === 'Todos') || cat === selectedCategory
                        ? 'bg-[#1a3e6a] text-white font-black'
                        : 'bg-[#f3f1eb] text-stone-700 hover:bg-stone-200'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand selection */}
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 font-mono">Marcas deportivas</p>
              <div className="grid grid-cols-4 gap-1.5">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setSelectedBrand(b === 'Todas' ? 'Todas' : b);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-1.5 text-center text-[10px] font-black uppercase tracking-wider transition-all rounded-lg cursor-pointer ${(b === 'Todas' && selectedBrand === 'Todas') || b === selectedBrand
                        ? 'bg-[#1a3e6a] text-white font-black'
                        : 'bg-[#f3f1eb] text-stone-700'
                      }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender selection */}
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 font-mono">Tramos género</p>
              <div className="grid grid-cols-4 gap-1.5">
                {genders.map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setSelectedGender(g);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-1.5 text-center text-[10px] font-black uppercase tracking-wider transition-all rounded-lg cursor-pointer ${g === selectedGender
                        ? 'bg-[#1a3e6a] text-white font-black'
                        : 'bg-[#f3f1eb] text-stone-700'
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
