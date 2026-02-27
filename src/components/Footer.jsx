import React from 'react';
import { motion } from 'framer-motion';
import { 
  Puzzle, 
  Instagram, 
  Twitter, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  ArrowUp
} from 'lucide-react';

// Importación de logos desde la carpeta assets
import logoOrigin from '../assets/logoorigin.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Decoración de fondo: Pieza de rompecabezas sutil */}
      <Puzzle 
        size={300} 
        className="absolute -bottom-20 -right-20 text-white/5 rotate-12 pointer-events-none" 
      />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMNA 1: LOGOS MAXIMIZADOS Y LEGADO */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
              {/* Logo Origin Principal - Aumentado de h-14 a h-24 */}
              <img 
                src={logoOrigin} 
                alt="FUPAGUA Logo" 
                className="h-24 md:h-28 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-3xl tracking-tighter leading-none">FUPAGUA</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-fupagua-amarillo mt-1">
                Fundación de Personas Autistas del Guárico
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Transformando realidades y sembrando esperanza en el estado Guárico desde **1997**. Más de **28 años** de compromiso ininterrumpido.
            </p>
            
            <div className="flex gap-4">
              {[
                { icon: <Instagram size={18} />, link: "https://instagram.com/fupagua" },
                { icon: <Twitter size={18} />, link: "https://twitter.com/fupaguasjm" },
                { icon: <Facebook size={18} />, link: "https://facebook.com/fupagua" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-fupagua-azul hover:scale-110 transition-all shadow-lg border border-white/10"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN */}
          <div className="lg:pt-4">
            <h4 className="text-fupagua-amarillo font-black uppercase text-xs tracking-[0.2em] mb-8 italic">Navegación</h4>
            <ul className="space-y-4">
              {['Inicio', 'Nosotros', 'Noticias', 'Donaciones', 'Contacto'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-slate-400 hover:text-white hover:translate-x-2 transition-all flex items-center gap-2 group text-sm font-bold"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-fupagua-azul group-hover:bg-fupagua-amarillo transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: CONTACTO RÁPIDO */}
          <div className="lg:pt-4">
            <h4 className="text-fupagua-amarillo font-black uppercase text-xs tracking-[0.2em] mb-8 italic">Contacto Directo</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-fupagua-azul mt-1" />
                <div className="text-sm">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Línea Local / WhatsApp</p>
                  <p className="font-bold">0246-4313552</p>
                  <p className="font-bold">0424-3390902</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-fupagua-azul mt-1" />
                <div className="text-sm">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Ubicación</p>
                  <p className="font-bold">San Juan de los Morros, Edo. Guárico.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-fupagua-azul mt-1" />
                <div className="text-sm">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Correo</p>
                  <p className="font-bold">fupagua@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: PIEZA MAESTRA */}
          <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 relative overflow-hidden group h-fit">
            <Heart size={40} className="text-fupagua-rojo mb-4 fill-fupagua-rojo/20 group-hover:scale-110 transition-transform" />
            <h5 className="font-black uppercase italic text-lg leading-tight mb-2">Tu apoyo es la pieza que falta.</h5>
            <p className="text-xs text-slate-400 mb-6">Cada donación financia evaluaciones integrales para nuestra comunidad.</p>
            <a 
              href="#donar" 
              className="inline-flex items-center gap-2 bg-fupagua-azul hover:bg-white hover:text-slate-950 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all w-full justify-center"
            >
              Donar Ahora
            </a>
          </div>
        </div>

        <hr className="border-white/5 mb-10" />

        {/* BOTTOM BAR CON CRÉDITOS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-10">
          
          {/* Copyright y RIF */}
          <div className="text-center md:text-left space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              © {currentYear} FUPAGUA • RIF J-50295476-8
            </p>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-fupagua-azul/60">
              Todos los derechos reservados.
            </p>
          </div>
          
          {/* CRÉDITO DE INGENIERÍA - JHOANA RODRÍGUEZ */}
          <div className="flex flex-col items-center group">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1px] w-6 bg-fupagua-amarillo/30 group-hover:w-10 transition-all duration-500"></span>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">
                Arquitectura Tecnológica - Desarrollo 
              </p>
              <span className="h-[1px] w-6 bg-fupagua-amarillo/30 group-hover:w-10 transition-all duration-500"></span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <p className="text-[12px] font-black uppercase tracking-[0.2em] text-white italic">
                Ing. <span className="text-fupagua-amarillo transition-colors">Jhoana Rodríguez</span>
              </p>
              
              <a 
                href="mailto:engineer2025rg@gmail.com" 
                className="flex items-center gap-2 bg-white/5 hover:bg-fupagua-azul/20 border border-white/10 px-4 py-1.5 rounded-full transition-all group/btn"
              >
                <Mail size={10} className="text-fupagua-amarillo group-hover/btn:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-300 group-hover/btn:text-white tracking-widest lowercase">
                  engineer2025rg@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Botón Volver Arriba */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-fupagua-amarillo hover:text-white transition-all"
          >
            Subir <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>

        </div>
      </div>
    </footer>
  );
};

export default Footer;