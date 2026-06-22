'use client'
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
  Flame,
  Activity,
  Sparkles
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

    const matchesBrand = selectedBrand === 'Todas' || p.brand.toLowerCase() === selectedBrand.toLowerCase();


    const matchesCategory = selectedCategory === 'Todos' || p.category.toLowerCase() === selectedCategory.toLowerCase();


    const matchesGender = selectedGender === 'Todos' || p.gender.toLowerCase() === selectedGender.toLowerCase();

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBrand && matchesCategory && matchesGender && matchesSearch;
  });

  return (
    <div className="flex-1 w-full bg-[#faf9f6]/40">


      <Hero
        onSelectProduct={onSelectProductById}
        onOpenVirtualTryOn={onOpenVirtualTryOn}
      />

      {/* 2. Custom Path Breadcrumbs / Search results bar */}
      <div className="bg-[#f3f1eb] py-10 border-b border-stone-200 mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono uppercase">
            <span>TIENDA APEX COBALT</span>
            <ChevronRight className="w-3 h-3" />
            {selectedBrand !== 'Todas' && (
              <>
                <span className="text-stone-700">{selectedBrand}</span>
                <ChevronRight className="w-3 h-3" />
              </>
            )}
            {selectedCategory !== 'Todos' && (
              <>
                <span className="text-stone-700">{selectedCategory}</span>
                <ChevronRight className="w-3 h-3" />
              </>
            )}
            <span className="text-[#1a3e6a] font-bold">BÚSQUEDA PERSONALIZADA</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#1a3e6a] tracking-widest mt-2 flex items-center gap-2.5">
            <Filter className="w-6 h-6 text-[#1a3e6a] animate-pulse" />
            <span>RESULTADOS FILTRADOS</span>
          </h2>
          <p className="text-xs text-stone-600 mt-1 font-sans">
            Explora las recomendaciones hechas a medida con nuestro simulador biomecanico de alto impacto.
          </p>
        </div>
      </div>

      {/* 3. Main Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="productos">
        <div className="space-y-8">

          {/* Header block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-5">
            <div className="text-left">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1a3e6a] px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest mb-2 rounded-full border border-blue-100">
                <TrendingUp className="w-3.5 h-3.5 text-[#1a3e6a]" /> EQUIPO DE RENDIMIENTO COBALT
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase text-stone-900 leading-none">
                CALZADO Y ACCESORIOS ELITE
              </h2>
              <p className="text-stone-550 text-xs sm:text-sm tracking-tight mt-1">
                Zapatillas con fibra de carbono, prendas transpirables de compresión para batir récords mundiales.
              </p>
            </div>

            {/* Segment selectors */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 bg-[#f4f2ea] p-1.5 border border-stone-205 rounded-full select-none">
              <span className="text-[10px] font-mono font-black text-stone-500 uppercase tracking-widest px-2.5 hidden sm:inline">GÉNERO:</span>
              {['Todos', 'Hombre', 'Mujer', 'Unisex'].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-all rounded-full cursor-pointer ${selectedGender === g
                      ? 'bg-[#1a3e6a] text-white font-black shadow-sm'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Quick counters review */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-stone-500 bg-white border border-stone-200 p-4 gap-4 rounded-[20px] shadow-sm">
            <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
              <span className="flex items-center gap-1.5 text-stone-600">
                <Package className="w-4 h-4 text-[#1a3e6a]" />
                Mostrando: <strong className="text-stone-900">{filteredProducts.length}</strong> de <strong className="text-stone-550">{products.length}</strong>
              </span>
              {userEmail && (
                <span className="flex items-center gap-1.5 border-l border-stone-200 pl-4 text-[#1a3e6a] font-extrabold">
                  <Award className="w-4 h-4" /> Atleta VIP Elite Conectado
                </span>
              )}
            </div>

            <div>
              <button
                onClick={() => {
                  setSelectedCategory('Todos');
                  setSelectedBrand('Todas');
                  setSelectedGender('Todos');
                  setSearchQuery('');
                }}
                className="text-xs text-[#1a3e6a] hover:text-[#132f52] transition-colors uppercase font-bold tracking-wider flex items-center gap-1 font-sans cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> REESTABLECER FILTROS
              </button>
            </div>
          </div>

          {/* Empty search fallback */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-stone-300 space-y-4 bg-white rounded-3xl">
              <div className="w-12 h-12 bg-stone-100 border border-stone-200 rounded-full mx-auto flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-stone-405" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black uppercase text-stone-850 tracking-widest">NINGÚN ARTÍCULO COINCIDE</h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                  Intenta cambiar el criterio de búsqueda o limpiar las opciones del filtro para volver al stock completo.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('Todos');
                  setSelectedBrand('Todas');
                  setSelectedGender('Todos');
                  setSearchQuery('');
                }}
                className="px-5 py-3 border border-[#1a3e6a] hover:bg-[#1a3e6a] hover:text-white font-black uppercase text-xs tracking-widest text-[#1a3e6a] transition-all rounded-full cursor-pointer"
              >
                LIMPIAR FILTROS
              </button>
            </div>
          ) : (
            /* Products Grid with absolute consistency */
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

      <section className="bg-white border-y border-stone-200 overflow-hidden py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 aspect-[16/10] relative overflow-hidden bg-stone-100 rounded-[32px] group border border-stone-200">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=80"
                alt="Corredor de fondo deportivo"
                className="w-full h-full object-cover brightness-[0.8] contrast-[1.03] transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-stone-900 to-transparent text-left">
                <p className="text-[10px] font-mono tracking-widest text-[#faf9f6] font-bold uppercase">ALTO IMPACTO BIOMECÁNICO</p>
                <h4 className="text-xl font-extrabold text-white uppercase tracking-tight">SUDADERA PREMIUM CON CAPUCHA ADIDAS Z.N.E.</h4>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 lg:pl-6 text-left">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1a3e6a] border border-blue-100 px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest rounded-md">
                <Activity className="w-3.5 h-3.5 text-[#1a3e6a]" /> APEX COBALT LABS
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-900 uppercase tracking-tight leading-none">

              </h3>

              <p className="text-stone-600 text-sm leading-relaxed tracking-tight">
                Zapatillas con placas curvadas de carbono puro sometidas a laboratorios de tracción biomecánica. El retorno de fuerza supera el 84% en cadencias máximas.
              </p>

              <div className="space-y-3 font-mono text-xs text-stone-700">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#1a3e6a] rounded-full" />
                  <span>Amortiguaciones de espuma ligera inyectadas con nitrógeno líquido</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#1a3e6a] rounded-full" />
                  <span>Placas de fibra de carbono curvadas completas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#1a3e6a] rounded-full" />
                  <span>Tejido Primeknit+ reciclado súper duradero y fresco al pie</span>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="#productos"
                  onClick={() => { setSelectedCategory('Calzado'); }}
                  className="inline-flex items-center gap-6 bg-[#faf8f5] hover:bg-stone-200 hover:text-stone-900 text-stone-850 hover:border-transparent font-black uppercase text-xs tracking-widest pl-5 pr-3 py-3.5 transition-all border border-stone-200 rounded-full cursor-pointer"
                >
                  <span>IR AL CALZADO RESPONSIVO</span>
                  <div className="p-1 bgColor-white text-stone-850 hover:bg-stone-950 hover:text-white transition-colors rounded-full">
                    <ArrowRight className="w-4 h-4 text-[#1a3e6a]" />
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
