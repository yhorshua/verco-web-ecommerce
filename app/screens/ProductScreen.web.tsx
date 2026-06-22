import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Minus, 
  Plus,
  ArrowLeft,
  Settings,
  Zap,
  Activity,
  User,
  Heart,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import Button from '../components/shared/Button.web';

interface ProductScreenProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size: string, color: any) => void;
  onBuyNow: (product: Product, quantity: number, size: string, color: any) => void;
  onOpenVirtualTryOn?: (productId: string) => void;
}

export default function ProductScreen({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onOpenVirtualTryOn,
}: ProductScreenProps) {
  if (!product) return null;

  // Selected config states
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<any>(product.colors[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Biomechanical simulator states (Highly innovative & educational)
  const [speed, setSpeed] = useState<number>(14); // in km/h
  const [cadence, setCadence] = useState<number>(165); // step rhythm per minute

  // Auto-sync when product shifts
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(product.sizes[0] || '');
    setSelectedColor(product.colors[0] || null);
    setQuantity(1);
    setIsFavorite(false);
  }, [product]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Simulated metrics formulas (dynamic response values)
  const gForceAbs = ((cadence * 0.012) + (speed * 0.08)).toFixed(2);
  const energyReturn = Math.min(94.8, 72.5 + (speed * 0.58) + (cadence * 0.01)).toFixed(1);
  const flyplateFlex = ((speed * 0.16) + (cadence * 0.005)).toFixed(2);
  const flightRatio = Math.min(52.0, 15.2 + (speed * 0.95)).toFixed(1);

  // Spark animations for visual laboratory rendering
  const pointPath = Array.from({ length: 25 }, (_, i) => {
    const x = i * 15;
    // Math sine wave modulated by running speed
    const y = 35 + Math.sin((i + speed) * 0.6) * (10 + (speed / 3) * 3);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex-1 w-full bg-[#faf9f6]/70 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigational arrow bar */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-200 mb-8 select-none">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-stone-600 hover:text-[#1a3e6a] transition-colors text-xs font-black uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#1a3e6a]" />
            <span>VOLVER AL CATÁLOGO GENERAL</span>
          </button>

          <div className="text-xs font-bold text-stone-400 font-mono hidden sm:inline uppercase">
            SALA DE ANÁLISIS APEX LABS • ID: {product.id}
          </div>
        </div>

        {/* Outer Split Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* L.COLUMN (SPAN 6): Product Visuals & Trust indicators */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Main high fidelity visual container */}
            <div className="relative aspect-square w-full bg-white rounded-[32px] overflow-hidden border border-stone-200/80 flex items-center justify-center p-6 group/detail shadow-sm">
              
              {/* Spinning carbon oval turntable effect */}
              <div className="absolute w-[80%] h-[70px] border border-dashed border-[#1a3e6a]/20 rounded-[100%] bottom-8 p-1 flex items-center justify-center pointer-events-none">
                <div className="w-[95%] h-[95%] border border-[#1a3e6a]/5 rounded-[100%] animate-spin duration-[40s]" />
              </div>

              {/* Cobalt blue radial flare */}
              <div className="absolute bottom-6 w-3/4 h-24 bg-[#1a3e6a]/5 rounded-full blur-[45px] pointer-events-none" />

              {/* High precision product PNG image with slight rotation */}
              <motion.img
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={activeImage}
                alt={product.name}
                className="max-h-[75%] max-w-[75%] object-contain transform -rotate-[12deg] group-hover/detail:-rotate-[6deg] transition-all duration-700 pointer-events-none filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.08)] cursor-pointer"
                referrerPolicy="no-referrer"
              />

              {/* New & Discount labels */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-[#1a3e6a] font-sans text-white font-black text-[9px] px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                    RECOMENDADO APEX
                  </span>
                )}
                {product.discount && (
                  <span className="bg-rose-50 border border-rose-100 text-rose-750 font-mono font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>

              <div className="absolute top-6 right-6">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-full border transition-all cursor-pointer ${
                    isFavorite
                      ? 'bg-rose-50 border-rose-200 text-rose-500'
                      : 'bg-[#faf9f6] border-stone-200 text-[#1a3e6a] hover:bg-stone-50'
                  }`}
                  title="Favoritos"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Image pagination slider controls */}
              <button
                onClick={() => {
                  const currentIndex = product.images.indexOf(activeImage);
                  const nextIdx = currentIndex === 0 ? product.images.length - 1 : currentIndex - 1;
                  setActiveImage(product.images[nextIdx]);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white hover:bg-[#1a3e6a] text-stone-800 hover:text-white rounded-full border border-stone-200 shadow-sm transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => {
                  const currentIndex = product.images.indexOf(activeImage);
                  const nextIdx = currentIndex === product.images.length - 1 ? 0 : currentIndex + 1;
                  setActiveImage(product.images[nextIdx]);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white hover:bg-[#1a3e6a] text-stone-800 hover:text-white rounded-full border border-stone-200 shadow-sm transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Indicator dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 px-3.5 py-1.5 border border-stone-200 rounded-full text-[9px] font-mono text-[#1a3e6a] font-extrabold uppercase shadow-sm">
                VISTA MULTI-ÁNGULO: {product.images.indexOf(activeImage) + 1} / {product.images.length}
              </div>

            </div>

            {/* Thumbnail grid */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square w-full rounded-2xl bg-white border p-2 transition-all cursor-pointer ${
                      activeImage === img
                        ? 'border-[#1a3e6a] ring-2 ring-[#1a3e6a]/20 scale-95 shadow-md'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <img src={img} alt="Miniatura" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Core Athletic features block */}
            <div className="bg-white border border-stone-200 p-6 rounded-[28px] grid grid-cols-3 gap-4 text-center font-mono">
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="w-5 h-5 text-[#1a3e6a]" />
                <span className="text-[10px] font-bold text-stone-900 uppercase">DESPACHO VIP</span>
                <span className="text-[9px] text-stone-400">Entrega rápida en 1-2 días</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 border-x border-stone-150 px-2">
                <ShieldCheck className="w-5 h-5 text-[#1a3e6a]" />
                <span className="text-[10px] font-bold text-stone-900 uppercase">100% ORIGINAL</span>
                <span className="text-[9px] text-stone-400">Canales oficiales certificados</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RefreshCw className="w-5 h-5 text-[#1a3e6a]" />
                <span className="text-[10px] font-bold text-stone-900 uppercase">GARANTIZADO</span>
                <span className="text-[9px] text-stone-400">Devoluciones libres por 30 días</span>
              </div>
            </div>

          </div>

          {/* R.COLUMN (SPAN 6): Spec configuration & Innovative Biomechanics Simulator */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Product config container */}
            <div className="bg-white border border-stone-200 rounded-[32px] p-6 sm:p-8 space-y-6 shadow-sm">
              
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-[#1a3e6a] text-[10px] font-mono font-black uppercase tracking-widest px-2.5 py-0.5 border border-blue-100 rounded-md">
                    {product.brand} ORIGINAL
                  </span>
                  <span className="text-stone-400 font-mono text-[10px] uppercase">
                    SECCIÓN: {product.gender}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900 uppercase leading-none">
                  {product.name}
                </h2>
              </div>

              {/* Price & Score */}
              <div className="flex flex-wrap items-baseline gap-4 py-3.5 border-y border-stone-150">
                <div className="flex gap-2 items-baseline">
                  <span className="text-3xl font-black font-mono tracking-tight text-[#1a3e6a]">
                    ${product.price.toFixed(2)} USD
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs font-mono text-stone-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="h-4 w-[1px] bg-stone-200 hidden sm:block" />

                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#1a3e6a]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-black text-stone-850">{product.rating.toFixed(1)}</span>
                  <span className="text-xs text-stone-500">({product.reviewsCount} reseñas)</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5 text-left">
                <span className="text-[10px] font-bold text-stone-450 uppercase tracking-widest font-mono block">INGENIERÍA DEL MATERIAL</span>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans">{product.description}</p>
              </div>

              {/* Multi-Colors Selector */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-baseline font-mono text-[10px]">
                  <span className="font-bold text-stone-450 uppercase tracking-widest">PALETA TECNOLÓGICA</span>
                  <span className="text-[#1a3e6a] font-black uppercase tracking-wider">{selectedColor?.name}</span>
                </div>
                <div className="flex items-center gap-3.5 select-none">
                  {product.colors.map((colorObj) => (
                    <button
                      key={colorObj.name}
                      onClick={() => setSelectedColor(colorObj)}
                      className={`h-9 w-9 rounded-full ${colorObj.class} flex items-center justify-center transition-all relative cursor-pointer ${
                        selectedColor?.name === colorObj.name
                          ? 'ring-4 ring-[#1a3e6a] ring-offset-2 ring-offset-white scale-105'
                          : 'opacity-85 hover:opacity-100 border border-stone-200'
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

              {/* High-End Sizing buttons */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-baseline font-mono text-[10px]">
                  <span className="font-bold text-stone-450 uppercase tracking-widest">SELECCIONA TALLA</span>
                  <span className="text-[#1a3e6a] underline cursor-pointer hover:opacity-80">TABLA DE MEDIDAS</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 select-none">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-3 text-xs font-bold font-mono text-center transition-all rounded-xl cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#1a3e6a] text-white font-black border border-[#1a3e6a] shadow-sm scale-[0.98]'
                          : 'bg-[#faf9f6]/80 text-[#1a3e6a] border border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buying Trigger Area & Quantity */}
              <div className="pt-4 border-t border-stone-150 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-stone-450 uppercase tracking-widest font-mono">FRACCIÓN / CANTIDAD</span>
                  <div className="flex items-center border border-stone-200 bg-[#faf9f6] rounded-full p-0.5 select-none text-[#1a3e6a]">
                    <button onClick={handleDecrement} className="p-2 hover:bg-white rounded-full transition-colors cursor-pointer"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="w-10 text-center text-xs font-black font-mono">{quantity}</span>
                    <button onClick={handleIncrement} className="p-2 hover:bg-white rounded-full transition-colors cursor-pointer"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  {/* Virtual Try On camera link */}
                  {onOpenVirtualTryOn && (
                    <button
                      onClick={() => onOpenVirtualTryOn(product.id)}
                      className="w-full bg-stone-[#fafcfd]/40 hover:bg-[#1a3e6a]/5 border border-[#1a3e6a]/20 hover:border-[#1a3e6a] text-[#1a3e6a] uppercase text-[10px] font-black tracking-widest py-3 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm animate-pulse"
                    >
                      <span>INICIAR PROBADOR EN TIEMPO REAL (AR CÁM)</span>
                    </button>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <button
                      onClick={() => onAddToCart(product, quantity, selectedSize, selectedColor)}
                      className="w-full uppercase text-xs font-black tracking-widest py-4 border border-stone-250 bg-[#faf9f6] text-[#1a3e6a] hover:bg-stone-50 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#1a3e6a]" />
                      CARRITO
                    </button>

                    <button
                      onClick={() => onBuyNow(product, quantity, selectedSize, selectedColor)}
                      className="w-full bg-gradient-to-r from-[#1a3e6a] to-blue-800 hover:brightness-110 text-white uppercase text-xs font-black tracking-widest py-4 rounded-full transition-all shadow-[0_8px_25px_rgba(26,62,106,0.15)] flex items-center justify-center cursor-pointer"
                    >
                      COMPRAR YA
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* HIGHLY INNOVATIVE FEATURE: Lab Biomechanical Simulator Area */}
            <div className="bg-[#1a3e6a] text-white border border-transparent rounded-[32px] p-6 lg:p-8 space-y-6 shadow-xl relative overflow-hidden">
              {/* Background high-tech grids */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
              
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="text-left space-y-0.5">
                  <div className="inline-flex items-center gap-1.5 bg-sky-500/20 text-sky-305 text-[9px] font-mono font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                    <Activity className="w-3.5 h-3.5 animate-pulse text-sky-400" /> SIMULADOR BIOMECÁNICO APEX ELITE
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight">DINÁMICAS DE TRACCIÓN EN VIVO</h3>
                </div>
                <Settings className="w-5 h-5 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
              </div>

              {/* Telemetry charts row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-left space-y-1">
                  <span className="text-[9px] text-[#faf9f6]/60 font-mono block">FUERZA DE IMPACTO</span>
                  <div className="text-lg font-mono font-black text-sky-205">{gForceAbs} <span className="text-[10px]">G</span></div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="bg-sky-400 h-full rounded-full" style={{ width: `${Math.min(100, Math.max(10, parseFloat(gForceAbs) * 30))}%` }} />
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-left space-y-1">
                  <span className="text-[9px] text-[#faf9f6]/60 font-mono block">RETORNO ENERGÍA</span>
                  <div className="text-lg font-mono font-black text-[#facc15]">{energyReturn}%</div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="bg-[#facc15] h-full rounded-full" style={{ width: `${energyReturn}%` }} />
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-left space-y-1">
                  <span className="text-[9px] text-[#faf9f6]/60 font-mono block">FLEX PLATAFORMA</span>
                  <div className="text-lg font-mono font-black text-emerald-405">{flyplateFlex} <span className="text-[10px]">mm</span></div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-455 h-full rounded-full" style={{ width: `${Math.min(100, parseFloat(flyplateFlex) * 15)}%` }} />
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-left space-y-1">
                  <span className="text-[9px] text-[#faf9f6]/60 font-mono block">Fase de Vuelo (F.R.)</span>
                  <div className="text-lg font-mono font-black text-rose-455">{flightRatio}%</div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="bg-rose-455 h-full rounded-full" style={{ width: `${flightRatio}%` }} />
                  </div>
                </div>

              </div>

              {/* Interactive sliders container */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                
                {/* Speed adjustment slider */}
                <div className="space-y-1.5 text-left text-xs">
                  <div className="flex justify-between font-mono text-[#faf9f6]/80 text-[10px]">
                    <span className="uppercase">Ajustar Velocidad de Carrera:</span>
                    <strong className="text-sky-305 font-black">{speed} km/h (Ritmo: {(60 / speed).toFixed(2)} min/km)</strong>
                  </div>
                  <input 
                    type="range"
                    min="6"
                    max="36"
                    step="0.5"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-sky-400 h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Cadence adjustment slider */}
                <div className="space-y-1.5 text-left text-xs">
                  <div className="flex justify-between font-mono text-[#faf9f6]/80 text-[10px]">
                    <span className="uppercase">Frecuencia de Zancada:</span>
                    <strong className="text-sky-305 font-black">{cadence} SPM (Pasos por Minuto)</strong>
                  </div>
                  <input 
                    type="range"
                    min="120"
                    max="220"
                    step="2"
                    value={cadence}
                    onChange={(e) => setCadence(parseInt(e.target.value))}
                    className="w-full accent-sky-400 h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

              </div>

              {/* Dynamic Oscilloscope wave visualizing speed & cadence real-time feedback */}
              <div className="bg-black/25 border border-white/5 rounded-2xl p-4 text-center mt-4">
                <div className="flex items-center justify-between text-[9px] font-mono text-[#faf9f6]/50 uppercase mb-2">
                  <span>OSCILOSCOPIO BIOMECÁNICO APEX</span>
                  <span className="text-sky-400 animate-pulse">● FEEDBACK ACTIVO</span>
                </div>
                
                <svg className="w-full h-16 pointer-events-none" viewBox="0 0 360 70">
                  {/* Static background lines */}
                  <line x1="0" y1="35" x2="360" y2="35" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4,4" />
                  
                  {/* Dynamic running biomechanical stride curve */}
                  <path
                    d={`M 0 35 L ${pointPath}`}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />
                  
                  <path
                    d={`M 0 35 L ${pointPath}`}
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300 blur-sm"
                  />
                </svg>

                <p className="text-[9px] text-[#faf9f6]/40 leading-relaxed font-mono uppercase mt-2">
                  La placa flyplate absorbe {parseFloat(gForceAbs) + 12}% de impacto en rebote con retorno inmediato de {energyReturn}%
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
