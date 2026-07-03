import React, { useRef, useState, useEffect } from 'react';
import { 
  X, 
  Camera, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Sparkles, 
  HelpCircle, 
  Check, 
  RefreshCw, 
  Maximize, 
  Sliders, 
  Upload, 
  AlertCircle,
  Footprints,
  Eye
} from 'lucide-react';
import Swal from 'sweetalert2';
import { Product } from '../types';

interface VirtualTryOnModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

// Simulated preset feet templates when camera is offline
const FOOT_PRESETS = [
  { id: 'preset1', name: 'Calcetín Deportivo Blanco', url: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=80&w=600&auto=format&fit=crop' },
  { id: 'preset2', name: 'Terreno Gym con Espejo', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop' },
  { id: 'preset3', name: 'Suelo Urbano Hormigón', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop' }
];

export default function VirtualTryOnModal({ product, isOpen, onClose }: VirtualTryOnModalProps) {
  if (!isOpen || !product) return null;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

  // Sneaker transformations
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(-15);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [shoeAngle, setShoeAngle] = useState<'profile' | 'top' | 'heel'>('profile');

  // Dragging states
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Scan simulation states
  const [scanning, setScanning] = useState(true);
  const [scanStatus, setScanStatus] = useState('CALIBRANDO ENTORNO AR...');

  // Start Camera
  const startCamera = async () => {
    setCameraError(null);
    setUploadedImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 640 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
        triggerScanningFeedback('CÁMARA CONECTADA • AJUSTANDO PERSPECTIVA...');
      }
    } catch (err: any) {
      console.error("Camera access failed", err);
      setCameraError('No pudimos acceder a tu cámara. Puedes usar nuestros fondos preestablecidos o subir una foto.');
      setCameraActive(false);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Switch scan message periodically
  const triggerScanningFeedback = (initialMsg: string) => {
    setScanning(true);
    setScanStatus(initialMsg);
    setTimeout(() => {
      setScanStatus('OPTIMIZANDO RAYOS INFRARROJOS AR...');
      setTimeout(() => {
        setScanStatus('PROCESAMIENTO DE MALLA COMPLETADO');
        setScanning(false);
      }, 2000);
    }, 1500);
  };

  useEffect(() => {
    triggerScanningFeedback('INICIALIZANDO PRÓBETA VIRTUAL...');
    startCamera(); // Try to auto-start camera on mount

    return () => {
      stopCamera();
    };
  }, [product.id]);

  // Handle image upload fallback
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      stopCamera();
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
          triggerScanningFeedback('IMAGEN CARGADA • DETECTANDO PUNTO DE APOYO...');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch triggers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleCaptureSnapshot = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Ajuste Capturado!',
      text: 'Tu look futurista ha sido simulado con éxito. El estilista de IA de Apex recomienda una combinación con pantalones cargo oscuros.',
      confirmButtonText: 'EXCELENTE • SEGUIR ADELANTE',
      confirmButtonColor: '#1a3e6a',
      background: '#ffffff',
      color: '#1c1917',
      customClass: {
        popup: 'border border-stone-200 rounded-[28px]',
        confirmButton: 'rounded-full uppercase tracking-wider text-xs font-black px-6 py-3.5 text-white font-sans cursor-pointer'
      }
    });
  };

  const resetShoeTransformation = () => {
    setScale(1);
    setRotation(-15);
    setPosition({ x: 0, y: 0 });
    triggerScanningFeedback('RECALIBRANDO SNEAKER DE PRUEBA...');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      
      {/* Outer Card with glowing border matching Screen 1 Try On Mockup */}
      <div className="relative w-full max-w-4xl bg-stone-900/95 border border-zinc-800 rounded-[40px] shadow-[0_20px_60px_rgba(26,62,106,0.25)] overflow-hidden flex flex-col lg:flex-row">
        
        {/* Close Button absolute top */}
        <button 
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="absolute top-5 right-5 z-40 p-2.5 bg-black/80 text-zinc-300 hover:text-white rounded-full border border-zinc-800 hover:scale-105 transition-transform cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COMPONENT: Interactive Live AR Canvas Viewport */}
        <div className="relative lg:w-3/5 h-[400px] sm:h-[500px] lg:h-[600px] bg-black flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-800">
          
          {/* Cyber grid indicator underlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(26,62,106,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(26,62,106,0.06)_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none" />

          {/* Fallback Static Preset Footprints Background when camera lacks permissions */}
          {!cameraActive && !uploadedImage && (
            <img 
              src={FOOT_PRESETS[selectedPresetIndex].url}
              alt="Foot template"
              className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-110"
            />
          )}

          {/* Uploaded user photo backdrop */}
          {uploadedImage && (
            <img 
              src={uploadedImage}
              alt="Uploaded user foot"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Live Video Camera stream feed */}
          <video 
            ref={videoRef}
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover scale-x-[-1] ${cameraActive ? 'block' : 'hidden'}`}
          />

          {/* Neon AR scanning line sweeping top to bottom */}
          {scanning && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-450 to-transparent shadow-[0_0_15px_rgba(56,189,248,1)] animate-bounce z-20 pointer-events-none" />
          )}

          {/* Live Scanner Cyber Metrics & HUD overlay */}
          <div className="absolute top-4 left-4 z-20 space-y-1 bg-black/60 backdrop-blur-md border border-zinc-800/80 p-3 rounded-2xl pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-450 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500"></span>
              </span>
              <p className="text-[9px] font-black tracking-widest text-[#a8a29e] font-mono uppercase">ESTADO DE ACCIÓN AR</p>
            </div>
            <p className="text-[11px] font-mono text-sky-400 font-extrabold">{scanStatus}</p>
          </div>

          <div className="absolute top-4 right-16 z-20 hidden sm:block bg-black/60 backdrop-blur-md border border-zinc-800 px-3 py-1.5 rounded-full pointer-events-none text-[9px] font-mono text-zinc-400 font-bold">
            LATENCIA: <span className="text-emerald-400">12ms</span> • COINCIDENCIA: <span className="text-sky-400">92.4%</span>
          </div>

          {/* PERSPECTIVE GUIDE TARGET BULB */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] border border-dashed border-sky-500/10 rounded-full flex items-center justify-center animate-spin duration-[24s] pointer-events-none">
            <div className="w-[85%] h-[85%] border border-sky-500/20 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            </div>
          </div>

          {/* INTERACTIVE DRAGGABLE SNEAKER IMAGE OVERLAY */}
          <div 
            className="absolute z-30 cursor-grab active:cursor-grabbing hover:scale-105 active:scale-100 transition-transform duration-155 relative select-none touch-none"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.65)) brightness(1.1)'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Direct Indicator showing shoe can be moved */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 text-[8px] font-mono text-sky-400 px-2 py-0.5 rounded border border-sky-500/30 opacity-0 hover:opacity-100 uppercase pointer-events-none tracking-widest whitespace-nowrap">
              ← ARRASTRA Y AJUSTA →
            </div>

            <img 
              src={product.image}
              alt={product.name}
              className="w-[200px] h-auto object-contain transform scale-x-[-1]"
              draggable={false}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Interactive controls bar aligned bottom center of viewport */}
          <div className="absolute bottom-4 inset-x-4 z-40 bg-black/80 backdrop-blur-md border border-zinc-800 p-2.5 rounded-2xl flex items-center justify-between gap-2 shadow-2xl">
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setScale(prev => Math.min(prev + 0.1, 2.2))}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl border border-zinc-800 active:scale-95 transition-all cursor-pointer"
                title="Aumentar tamaño de calzado"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setScale(prev => Math.max(prev - 0.1, 0.4))}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl border border-zinc-800 active:scale-95 transition-all cursor-pointer"
                title="Reducir tamaño de calzado"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setRotation(prev => prev + 5)}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-sky-400 hover:text-white rounded-xl border border-zinc-800 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Girar calzado hacia la derecha"
              >
                <RotateCw className="w-4 h-4" />
                <span className="text-[10px] font-bold font-mono">ROTAR</span>
              </button>

              <button 
                onClick={resetShoeTransformation}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 active:scale-95 transition-all cursor-pointer"
                title="Restaurar valores de diseño"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <button 
              onClick={handleCaptureSnapshot}
              className="px-4 py-2 bg-gradient-to-r from-[#1a3e6a] to-blue-800 hover:brightness-110 text-white text-[10px] font-black uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>CAPTURAR</span>
            </button>
          </div>

        </div>

        {/* RIGHT COMPONENT: Configurator, presets selections, camera togglers */}
        <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* Header info */}
            <div>
              <p className="text-sky-400 text-xs font-mono font-bold uppercase tracking-[0.2em]">LABORATORIO SNEAKER AR</p>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mt-1">{product.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-[10px] font-mono text-zinc-400 font-extrabold uppercase">
                  {product.brand} ORIGINAL
                </span>
                <span className="bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full text-[10px] font-mono text-sky-450 font-extrabold uppercase">
                  TESTATOR V1.2
                </span>
              </div>
            </div>

            {/* Custom Instruction Hint */}
            <div className="bg-zinc-950/80 border border-zinc-900/60 p-4 rounded-3xl space-y-2">
              <span className="flex items-center gap-1.5 text-zinc-100 text-xs font-black uppercase">
                <HelpCircle className="w-4 h-4 text-sky-400" />
                ¿CÓMO OPERAR EL PROBADOR?
              </span>
              <ul className="text-[11px] text-zinc-400 space-y-1 list-disc pl-4 font-sans">
                <li>Apunta el lente de la cámara del móvil hacia tus <strong>pies o tobillos</strong>.</li>
                <li><strong>Arrastra el calzado</strong> directamente para posicionarlo.</li>
                <li>Usa los controles de la izquierda para <strong>escalar (+) y (-)</strong> el sneaker.</li>
                <li>Gira con el botón <strong className="text-sky-405">ROTAR</strong> para calibrar el ángulo de encaje perfecto.</li>
              </ul>
            </div>

            {/* Camera Options & File Uploader */}
            <div className="space-y-3">
              <p className="text-[10px] font-black text-[#a8a29e] tracking-widest uppercase font-mono">OPCIONES DE CAPTURA DE FONDO</p>
              
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={startCamera}
                  className={`py-3 px-4 rounded-2xl font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    cameraActive 
                      ? 'bg-[#1a3e6a] text-white font-black' 
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>ENCENDER CÁMARA</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="py-3 px-4 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-2xl font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>SUBIR FOTO</span>
                </button>
              </div>

              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*"
                className="hidden" 
                onChange={handleImageUpload}
              />
            </div>

            {/* Simulated preset environments fallback loops */}
            <div className="space-y-2.5">
              <p className="text-[10px] font-black text-[#a8a29e] tracking-widest uppercase font-mono">FONDOS PREESTABLECIDOS PARA PRUEBA</p>
              
              <div className="flex flex-col gap-2">
                {FOOT_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      stopCamera();
                      setUploadedImage(null);
                      setSelectedPresetIndex(idx);
                      triggerScanningFeedback(`CARGANDO POSE: ${preset.name.toUpperCase()}`);
                    }}
                    className={`p-2.5 text-left rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                      !cameraActive && !uploadedImage && selectedPresetIndex === idx
                        ? 'bg-zinc-950 border-[#1a3e6a] text-white font-semibold'
                        : 'bg-zinc-900 border-zinc-800/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <img 
                      src={preset.url} 
                      className="w-10 h-10 object-cover rounded-xl border border-zinc-800" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-extrabold truncate uppercase">{preset.name}</p>
                      <p className="text-[9px] font-mono text-zinc-500">Preset local #0{idx+1}</p>
                    </div>
                    {!cameraActive && !uploadedImage && selectedPresetIndex === idx && (
                      <Check className="w-4.5 h-4.5 text-sky-400 stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Footer of modal */}
          <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between gap-4 mt-6">
            <div className="flex flex-col">
              <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Costo Estimado</p>
              <p className="text-xl font-mono text-white font-black">${product.price.toFixed(2)} USD</p>
            </div>

            <button
              onClick={() => {
                stopCamera();
                onClose();
                // Select product detail or add
                Swal.fire({
                  title: '¡Diseño Reservado!',
                  text: `¿Deseas agregar esta pieza (${product.name}) directamente a tu carrito de compras?`,
                  icon: 'question',
                  showCancelButton: true,
                  confirmButtonText: 'SÍ, AGREGAR AL CARRITO',
                  cancelButtonText: 'VOLVER AL DISEÑO',
                  confirmButtonColor: '#1a3e6a',
                  cancelButtonColor: '#78716c',
                  background: '#ffffff',
                  color: '#1c1917',
                  customClass: {
                    popup: 'border border-stone-200 rounded-[28px]',
                    confirmButton: 'rounded-full text-white font-black uppercase tracking-wider text-xs px-6 py-3.5 font-sans cursor-pointer',
                    cancelButton: 'rounded-full text-white uppercase tracking-wider text-xs px-6 py-3.5 font-sans cursor-pointer'
                  }
                });
              }}
              className="flex-1 py-4.5 bg-gradient-to-r from-[#1a3e6a] to-blue-850 hover:brightness-110 text-white rounded-full font-black text-xs uppercase tracking-widest text-center cursor-pointer shadow-lg active:scale-95 transition-all"
            >
              CONTINUAR CON ESTE LOOK
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
