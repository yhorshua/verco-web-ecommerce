'use client';

import React from 'react';
import {
  Filter,
  RotateCcw,
  HelpCircle,
  TrendingUp,
  Package,
  Award,
  ChevronRight,
  ArrowRight,
  Activity,
} from 'lucide-react';

import Hero from '../components/Hero.web';
import ProductCard from '../components/shared/ProductCard.web';
import { Product } from '../types';

interface HomeScreenProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userEmail: string | null;
  onSelectProductById: (productId: string) => void;
  onAddToCartDirect: (product: Product, size: string, color: any) => void;
  onOpenVirtualTryOn: (productId: string) => void;
}

export default function HomeScreen({
  products,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedGender,
  setSelectedGender,
  searchQuery,
  setSearchQuery,
  userEmail,
  onSelectProductById,
  onAddToCartDirect,
  onOpenVirtualTryOn,
}: HomeScreenProps) {
  const filteredProducts = products.filter((p) => {
    const matchesBrand =
      selectedBrand === 'Todas' ||
      p.brand.toLowerCase() === selectedBrand.toLowerCase();

    const matchesCategory =
      selectedCategory === 'Todos' ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesGender =
      selectedGender === 'Todos' ||
      p.gender.toLowerCase() === selectedGender.toLowerCase();

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBrand && matchesCategory && matchesGender && matchesSearch;
  });

  const resetFilters = () => {
    setSelectedCategory('Todos');
    setSelectedBrand('Todas');
    setSelectedGender('Todos');
    setSearchQuery('');
  };

  return (
    <div className="flex-1 w-full bg-white">
      <Hero
        onSelectProduct={onSelectProductById}
        onOpenVirtualTryOn={onOpenVirtualTryOn}
      />

      {/* Barra de resultados / ruta */}
      <div className="bg-[#283E6A] py-10 border-b border-[#283E6A] mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex items-center gap-2 text-xs text-white/75 font-mono uppercase">
            <span>TIENDA VERCO</span>

            <ChevronRight className="w-3 h-3 text-white/60" />

            {selectedBrand !== 'Todas' && (
              <>
                <span className="text-white font-semibold">
                  {selectedBrand}
                </span>
                <ChevronRight className="w-3 h-3 text-white/60" />
              </>
            )}

            {selectedCategory !== 'Todos' && (
              <>
                <span className="text-white font-semibold">
                  {selectedCategory}
                </span>
                <ChevronRight className="w-3 h-3 text-white/60" />
              </>
            )}

            <span className="text-[#E70033] font-black">
              BÚSQUEDA PERSONALIZADA
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-widest mt-2 flex items-center gap-2.5">
            <Filter className="w-6 h-6 text-[#E70033] animate-pulse" />
            <span>RESULTADOS FILTRADOS</span>
          </h2>

          <p className="text-xs text-white/80 mt-1 font-sans">
            Explora productos seleccionados de acuerdo con tus filtros de
            búsqueda.
          </p>
        </div>
      </div>

      {/* Catálogo principal */}
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        id="productos"
      >
        <div className="space-y-8">
          {/* Encabezado */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#283E6A]/15 pb-5">
            <div className="text-left">
              <div className="inline-flex items-center gap-1.5 bg-[#283E6A]/10 text-[#283E6A] px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest mb-2 rounded-full border border-[#283E6A]/20">
                <TrendingUp className="w-3.5 h-3.5 text-[#E70033]" />
                EQUIPO DE RENDIMIENTO VERCO
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase text-[#283E6A] leading-none">
                CALZADO Y ACCESORIOS ELITE
              </h2>

              <p className="text-gray-600 text-xs sm:text-sm tracking-tight mt-2">
                Zapatillas, prendas y accesorios diseñados para rendimiento,
                comodidad y estilo.
              </p>
            </div>

            {/* Selector de género */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 bg-white p-1.5 border border-[#283E6A]/20 rounded-full select-none shadow-sm">
              <span className="text-[10px] font-mono font-black text-[#283E6A] uppercase tracking-widest px-2.5 hidden sm:inline">
                GÉNERO:
              </span>

              {['Todos', 'Hombre', 'Mujer', 'Unisex'].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-all rounded-full cursor-pointer ${
                    selectedGender === g
                      ? 'bg-[#E70033] text-white shadow-sm'
                      : 'text-[#283E6A] hover:text-white hover:bg-[#283E6A]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Contadores */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-600 bg-white border border-[#283E6A]/15 p-4 gap-4 rounded-[20px] shadow-sm">
            <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
              <span className="flex items-center gap-1.5 text-gray-700">
                <Package className="w-4 h-4 text-[#E70033]" />
                Mostrando:{' '}
                <strong className="text-[#283E6A]">
                  {filteredProducts.length}
                </strong>{' '}
                de{' '}
                <strong className="text-[#283E6A]">
                  {products.length}
                </strong>
              </span>

              {userEmail && (
                <span className="flex items-center gap-1.5 border-l border-[#283E6A]/15 pl-4 text-[#283E6A] font-extrabold">
                  <Award className="w-4 h-4 text-[#E70033]" />
                  Atleta VIP Elite Conectado
                </span>
              )}
            </div>

            <div>
              <button
                onClick={resetFilters}
                className="text-xs text-[#E70033] hover:text-[#283E6A] transition-colors uppercase font-bold tracking-wider flex items-center gap-1 font-sans cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                REESTABLECER FILTROS
              </button>
            </div>
          </div>

          {/* Sin resultados */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-[#283E6A]/30 space-y-4 bg-white rounded-3xl">
              <div className="w-12 h-12 bg-[#283E6A]/10 border border-[#283E6A]/20 rounded-full mx-auto flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-[#E70033]" />
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-black uppercase text-[#283E6A] tracking-widest">
                  NINGÚN ARTÍCULO COINCIDE
                </h4>

                <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                  Intenta cambiar el criterio de búsqueda o limpiar las opciones
                  del filtro para volver al stock completo.
                </p>
              </div>

              <button
                onClick={resetFilters}
                className="px-5 py-3 border border-[#E70033] bg-white hover:bg-[#E70033] hover:text-white font-black uppercase text-xs tracking-widest text-[#E70033] transition-all rounded-full cursor-pointer"
              >
                LIMPIAR FILTROS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelectProduct={onSelectProductById}
                  onAddToCartDirect={onAddToCartDirect}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Sección promocional */}
      <section className="bg-[#283E6A] border-y border-[#283E6A] overflow-hidden py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 aspect-[16/10] relative overflow-hidden bg-white rounded-[32px] group border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=80"
                alt="Corredor de fondo deportivo"
                className="w-full h-full object-cover brightness-[0.82] contrast-[1.05] transform group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#283E6A] to-transparent text-left">
                <p className="text-[10px] font-mono tracking-widest text-white/90 font-bold uppercase">
                  ALTO IMPACTO BIOMECÁNICO
                </p>

                <h4 className="text-xl font-extrabold text-white uppercase tracking-tight">
                  RENDIMIENTO, COMODIDAD Y ESTILO VERCO
                </h4>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 lg:pl-6 text-left">
              <div className="inline-flex items-center gap-1.5 bg-white text-[#283E6A] border border-white px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest rounded-md">
                <Activity className="w-3.5 h-3.5 text-[#E70033]" />
                VERCO PERFORMANCE
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight leading-none">
                EQUIPAMIENTO DISEÑADO PARA TU MEJOR VERSIÓN
              </h3>

              <p className="text-white/80 text-sm leading-relaxed tracking-tight">
                Zapatillas y accesorios seleccionados para brindar comodidad,
                resistencia y rendimiento en cada movimiento.
              </p>

              <div className="space-y-3 font-mono text-xs text-white/85">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#E70033] rounded-full" />
                  <span>
                    Materiales ligeros para mayor comodidad durante el uso.
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#E70033] rounded-full" />
                  <span>
                    Diseños modernos adaptados a distintos estilos deportivos.
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#E70033] rounded-full" />
                  <span>
                    Productos pensados para rendimiento, durabilidad y presencia.
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="#productos"
                  onClick={() => {
                    setSelectedCategory('Calzado');
                  }}
                  className="inline-flex items-center gap-6 bg-white hover:bg-[#E70033] hover:text-white text-[#283E6A] font-black uppercase text-xs tracking-widest pl-5 pr-3 py-3.5 transition-all border border-white rounded-full cursor-pointer"
                >
                  <span>IR AL CALZADO</span>

                  <div className="p-1 bg-[#283E6A] text-white rounded-full">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}