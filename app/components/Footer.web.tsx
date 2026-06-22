import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Flame, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // SweetAlert notification for subscription confirmation in Cobalt/Bone theme
    Swal.fire({
      title: '¡Suscripción Exitosa!',
      text: 'Te has unido al Club APEX SPORT. Recibirás un cupón de 15% de descuento directo en tu correo.',
      icon: 'success',
      background: '#ffffff',
      color: '#1c1917',
      confirmButtonColor: '#1a3e6a', // deep cobalt blue #1a3e6a
      customClass: {
        popup: 'border border-stone-200 rounded-[28px]',
        confirmButton: 'rounded-full uppercase tracking-wider text-xs font-black px-6 py-3.5 text-white font-sans cursor-pointer'
      }
    });

    setEmail('');
  };

  return (
    <footer className="bg-[#faf9f6] border-t border-stone-200 text-stone-800 pt-16 pb-8" id="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Store info, identity & contact info */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-blue-900 via-[#1a3e6a] to-blue-600 bg-clip-text text-transparent">
                APEX
              </span>
              <span className="font-black text-2xl tracking-tighter text-stone-900">
                SPORT
              </span>
            </div>
            
            <p className="text-stone-600 text-xs leading-relaxed max-w-sm font-sans tracking-tight">
              Líderes en calzado de alta tecnología para atletismo, maratón y entrenamientos de alta intensidad. Representamos el rendimiento puro inspirado en Adidas, Puma y Nike para atletas sin límites.
            </p>

            <div className="space-y-2.5 text-xs text-stone-600 font-mono">
              <div className="flex items-center gap-2.5 hover:text-[#1a3e6a] transition-colors cursor-pointer">
                <MapPin className="w-4 h-4 text-[#1a3e6a] flex-shrink-0" />
                <span>Av. de la Victoria 1050, Ciudad Deportiva</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-[#1a3e6a] transition-colors cursor-pointer">
                <Phone className="w-4 h-4 text-[#1a3e6a] flex-shrink-0" />
                <span>+54 9 11 3456-7890</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-[#1a3e6a] transition-colors cursor-pointer">
                <Mail className="w-4 h-4 text-[#1a3e6a] flex-shrink-0" />
                <span>soporte@apexsport.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Categories quick links */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1a3e6a]">
              CATEGORÍAS PREMIUM
            </h3>
            <ul className="space-y-2 text-xs text-stone-600 font-mono">
              <li>
                <a href="#productos" className="hover:text-[#1a3e6a] transition-colors">Calzado de Competición</a>
              </li>
              <li>
                <a href="#productos" className="hover:text-[#1a3e6a] transition-colors">Zapatillas Fibra de Carbono</a>
              </li>
              <li>
                <a href="#productos" className="hover:text-[#1a3e6a] transition-colors font-semibold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-blue-500 fill-blue-500" /> Colección Maratón
                </a>
              </li>
              <li>
                <a href="#productos" className="hover:text-[#1a3e6a] transition-colors">Prendas de Compresión Dry-Fit</a>
              </li>
              <li>
                <a href="#productos" className="hover:text-[#1a3e6a] transition-colors">Indumentaria Activa Nike/Puma</a>
              </li>
              <li>
                <a href="#productos" className="hover:text-[#1a3e6a] transition-colors">Accesorios e Hidratación Pro</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Info links */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1a3e6a]">
              EXPLORAR APEX
            </h3>
            <ul className="space-y-2 text-xs text-stone-600 font-mono">
              <li>
                <a href="#" className="hover:text-[#1a3e6a] transition-colors">Sobre Nosotros</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1a3e6a] transition-colors">Garantía de Autenticidad</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1a3e6a] transition-colors">Programa de Atletas Club</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1a3e6a] transition-colors">Guía Inteligente de Tallas</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1a3e6a] transition-colors">Políticas de Devolución Fáciles</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1a3e6a] transition-colors">Preguntas Frecuentes FAQ</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter sign-up, subscription */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1a3e6a] flex items-center gap-1.5">
              <span>ÚNETE AL SQUAD</span>
              <Sparkles className="w-3.5 h-3.5 text-[#1a3e6a] animate-pulse" />
            </h3>
            
            <p className="text-stone-600 text-xs leading-relaxed font-sans tracking-tight">
              Suscríbete para enterarte de lanzamientos VIP, zapatillas exclusivas de edición limitada y ofertas que vuelan rápido.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Introduce tu correo electrónico"
                  className="w-full bg-white border border-stone-250 focus:border-[#1a3e6a] focus:outline-none p-3.5 pr-10 text-xs font-mono text-stone-800 rounded-xl"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-3.5 p-1 text-[#1a3e6a] hover:text-[#132f52] transition-colors cursor-pointer"
                  title="Suscribirse al boletín"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-stone-500 font-sans">
                Cupón instantáneo del <strong className="text-stone-800">15% de Descuento</strong> disponible al suscribirte hoy.
              </p>
            </form>
          </div>

        </div>

        {/* Center line decoration */}
        <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-stone-500 font-mono tracking-tight text-center md:text-left">
            © {new Date().getFullYear()} APEX SPORT INC. TODOS LOS DERECHOS RESERVADOS. PROYECCIÓN ATLETAS DE ÉLITE S.A.
          </p>

          <div className="flex gap-4 text-[10px] text-stone-500 font-mono justify-center">
            <a href="#" className="hover:text-[#1a3e6a] transition-colors">POLÍTICAS DE PRIVACIDAD</a>
            <span>•</span>
            <a href="#" className="hover:text-[#1a3e6a] transition-colors">TÉRMINOS Y CONDICIONES</a>
            <span>•</span>
            <a href="#" className="hover:text-[#1a3e6a] transition-colors">MAPA DEL SITIO</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
