'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Flame,
  Sparkles,
} from 'lucide-react';
import Swal from 'sweetalert2';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    Swal.fire({
      title: '¡Suscripción exitosa!',
      text: 'Te has unido a la comunidad VERCO. Recibirás novedades, promociones y lanzamientos exclusivos en tu correo.',
      icon: 'success',
      background: '#ffffff',
      color: '#283E6A',
      confirmButtonColor: '#E70033',
      customClass: {
        popup: 'border border-[#283E6A]/20 rounded-[28px]',
        confirmButton:
          'rounded-full uppercase tracking-wider text-xs font-black px-6 py-3.5 text-white font-sans cursor-pointer',
      },
    });

    setEmail('');
  };

  return (
    <footer
      className="bg-[#283E6A] border-t border-[#283E6A] text-white pt-16 pb-8"
      id="footer-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Columnas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Columna 1 */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-2xl tracking-tighter text-white">
                VERCO
              </span>
            </div>

            <p className="text-white/75 text-xs leading-relaxed max-w-sm font-sans tracking-tight">
              Tienda especializada en calzado, ropa y accesorios deportivos,
              orientada a brindar productos modernos, cómodos y funcionales para
              cada estilo de vida.
            </p>

            <div className="space-y-2.5 text-xs text-white/75 font-mono">
              <div className="flex items-center gap-2.5 hover:text-[#E70033] transition-colors cursor-pointer">
                <MapPin className="w-4 h-4 text-[#E70033] flex-shrink-0" />
                <span>Lima, Perú</span>
              </div>

              <div className="flex items-center gap-2.5 hover:text-[#E70033] transition-colors cursor-pointer">
                <Phone className="w-4 h-4 text-[#E70033] flex-shrink-0" />
                <span>+51 900 000 000</span>
              </div>

              <div className="flex items-center gap-2.5 hover:text-[#E70033] transition-colors cursor-pointer">
                <Mail className="w-4 h-4 text-[#E70033] flex-shrink-0" />
                <span>soporte@verco.online</span>
              </div>
            </div>
          </div>

          {/* Columna 2 */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-white">
              CATEGORÍAS
            </h3>

            <ul className="space-y-2 text-xs text-white/75 font-mono">
              <li>
                <a href="#productos" className="hover:text-[#E70033] transition-colors">
                  Calzado deportivo
                </a>
              </li>
              <li>
                <a href="#productos" className="hover:text-[#E70033] transition-colors">
                  Zapatillas urbanas
                </a>
              </li>
              <li>
                <a
                  href="#productos"
                  className="hover:text-[#E70033] transition-colors font-semibold flex items-center gap-1"
                >
                  <Flame className="w-3.5 h-3.5 text-[#E70033] fill-[#E70033]" />
                  Colecciones destacadas
                </a>
              </li>
              <li>
                <a href="#productos" className="hover:text-[#E70033] transition-colors">
                  Ropa deportiva
                </a>
              </li>
              <li>
                <a href="#productos" className="hover:text-[#E70033] transition-colors">
                  Accesorios
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3 */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-white">
              INFORMACIÓN
            </h3>

            <ul className="space-y-2 text-xs text-white/75 font-mono">
              <li>
                <a href="#" className="hover:text-[#E70033] transition-colors">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E70033] transition-colors">
                  Guía de tallas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E70033] transition-colors">
                  Cambios y devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E70033] transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a
                  href="/politica-privacidad"
                  className="hover:text-[#E70033] transition-colors"
                >
                  Política de privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4 */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-white flex items-center gap-1.5">
              <span>ÚNETE A VERCO</span>
              <Sparkles className="w-3.5 h-3.5 text-[#E70033] animate-pulse" />
            </h3>

            <p className="text-white/75 text-xs leading-relaxed font-sans tracking-tight">
              Suscríbete para recibir novedades, promociones, lanzamientos y
              ofertas especiales.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Introduce tu correo electrónico"
                  className="w-full bg-white border border-white focus:border-[#E70033] focus:outline-none p-3.5 pr-10 text-xs font-mono text-[#283E6A] rounded-xl placeholder-[#283E6A]/45"
                />

                <button
                  type="submit"
                  className="absolute right-3 top-3.5 p-1 text-[#E70033] hover:text-[#283E6A] transition-colors cursor-pointer"
                  title="Suscribirse"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] text-white/60 font-sans">
                Recibe novedades y promociones exclusivas de VERCO.
              </p>
            </form>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-white/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-white/60 font-mono tracking-tight text-center md:text-left">
            © {new Date().getFullYear()} VERCO. TODOS LOS DERECHOS RESERVADOS.
          </p>

          <div className="flex gap-4 text-[10px] text-white/60 font-mono justify-center">
            <a
              href="/politica-privacidad"
              className="hover:text-[#E70033] transition-colors"
            >
              POLÍTICA DE PRIVACIDAD
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#E70033] transition-colors">
              TÉRMINOS Y CONDICIONES
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#E70033] transition-colors">
              MAPA DEL SITIO
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}