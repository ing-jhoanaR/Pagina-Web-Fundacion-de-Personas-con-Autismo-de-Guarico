

import React, { useState, useEffect } from 'react';
import { NavHashLink } from 'react-router-hash-link';
import { 
  Heart, Menu, X, Sparkles, Building2, HandHeart, 
  Newspaper, ChevronDown, ArrowRight,
  Award, Target, Image as ImageIcon
} from 'lucide-react';
import LogoImg from '../assets/logoorigin.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
  }, [mobileMenuOpen]);

  const menuItems = [
    { name: 'Inicio', href: '/#', isDirect: true },
    {
      name: 'Conócenos',
      subLinks: [
        { name: 'Presentación', href: '/#presentacion', icon: <Sparkles size={18} /> }, 
        { name: 'Nuestra Historia', href: '/#nosotros', icon: <Building2 size={18} /> },
        { name: 'Consejo Directivo', href: '/#consejo', icon: <Award size={18} /> },
        { name: 'Nuestros Valores', href: '/#valores', icon: <Target size={18} /> },
        { name: 'Galería', href: '/#galeria', icon: <ImageIcon size={18} /> },
      ]
    },
    { name: 'Servicios', href: '/servicios', isDirect: true },
    {
      name: 'Comunidad',
      subLinks: [
        { name: 'Testimonios', href: '/testimonios', icon: <HandHeart size={18} /> },
        { name: 'Noticias', href: '/noticias', icon: <Newspaper size={18} /> },
      ]
    },
    { name: 'Tienda', href: '/tienda', isDirect: true },
    { name: 'Contacto', href: '/contacto', isDirect: true },
  ];

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <nav className={`w-[94%] max-w-[1440px] mx-auto transition-all duration-500 flex items-center justify-between px-4 md:px-8 ${
        isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[25px] py-2 border border-slate-100' 
        : 'bg-white/80 backdrop-blur-md rounded-[30px] py-4 border-b-2 border-fupagua-amarillo/30'
      }`}>
        
        {/* LOGOTIPO */}
        <NavHashLink smooth to="/#hero" className="flex items-center gap-2 md:gap-3 group cursor-pointer flex-shrink-0">
          <img 
            src={LogoImg}
            alt="FUPAGUA Logo" 
            className={`transition-all duration-500 object-contain ${isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'}`} 
          />
          <div className="flex flex-col border-l-2 border-slate-200 pl-2 md:pl-3">
            <span className="text-xl md:text-2xl font-black text-fupagua-azul leading-none uppercase tracking-tighter italic">Fupagua</span>
            <span className="hidden sm:block text-[7px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mt-1">+28 Años de Excelencia</span>
          </div>
        </NavHashLink>

        {/* MENÚ DESKTOP */}
        <div className="hidden xl:flex items-center gap-1 ml-auto">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group py-2">
              {item.isDirect ? (
                <NavHashLink 
                  smooth to={item.href} 
                  className="px-4 py-2 text-[12px] font-black uppercase text-slate-700 hover:text-fupagua-azul transition-all tracking-widest relative after:content-[''] after:absolute after:bottom-0 after:left-4 after:w-0 after:h-0.5 after:bg-fupagua-amarillo after:transition-all hover:after:w-[calc(100%-32px)]"
                >
                  {item.name}
                </NavHashLink>
              ) : (
                <button className="flex items-center gap-1 px-4 py-2 text-[12px] font-black uppercase text-slate-700 group-hover:text-fupagua-azul transition-all tracking-widest">
                  {item.name} <ChevronDown size={14} className="text-fupagua-amarillo group-hover:rotate-180 transition-transform duration-300" />
                </button>
              )}
              
              {!item.isDirect && (
                <div className="absolute top-full right-0 w-72 pt-4 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                  <div className="bg-white rounded-[25px] shadow-2xl border border-slate-100 overflow-hidden p-3 ring-1 ring-black/5">
                    {item.subLinks.map((sub) => (
                      <NavHashLink 
                        key={sub.name} smooth to={sub.href} 
                        className="flex items-center gap-3 p-3.5 hover:bg-slate-50 rounded-xl text-[11px] font-black text-slate-600 hover:text-fupagua-azul uppercase tracking-wider transition-all group/sub"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-fupagua-amarillo group-hover/sub:bg-fupagua-azul group-hover/sub:text-white transition-colors">
                          {sub.icon}
                        </div>
                        {sub.name}
                      </NavHashLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <NavHashLink 
            smooth to="/#donacion" 
            className="ml-6 bg-slate-900 text-white px-8 py-3.5 rounded-full font-black text-[11px] tracking-[0.2em] shadow-xl hover:bg-fupagua-azul hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
          >
            <Heart size={16} className="text-fupagua-amarillo group-hover:fill-fupagua-amarillo transition-all" /> 
            APOYAR AHORA
          </NavHashLink>
        </div>

        {/* BOTÓN HAMBURGUESA MÓVIL */}
        <button 
          className="xl:hidden flex items-center gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100 active:scale-95 transition-all" 
          onClick={() => setMobileMenuOpen(true)}
        >
          <div className="bg-fupagua-azul p-2 rounded-xl text-white shadow-lg">
            <Menu size={20} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest pr-2 text-slate-600">Menú</span>
        </button>

        {/* SIDEBAR MÓVIL COMPLETO */}
        <div className={`fixed inset-0 z-[200] ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
          
          {/* Fondo oscuro (Overlay) */}
          <div 
            className={`fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={closeMobile}
          />

          {/* Panel Lateral */}
          <div className={`fixed top-0 right-0 w-[85%] max-w-sm h-screen bg-white shadow-[-20px_0_80px_rgba(0,0,0,0.5)] transition-transform duration-500 flex flex-col ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`} onClick={e => e.stopPropagation()}>
            
            {/* 1. Header Fijo */}
            <div className="p-6 flex justify-between items-center border-b border-slate-50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <img src={LogoImg} className="h-9" alt="Logo" />
                <div className="flex flex-col">
                  <span className="text-xl font-black text-fupagua-azul italic leading-none uppercase">FUPAGUA</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">Fundada en 1997</span>
                </div>
              </div>
              <button onClick={closeMobile} className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-xl text-slate-900">
                <X size={24} />
              </button>
            </div>

            {/* 2. Cuerpo con Scroll */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              {menuItems.map((item, idx) => (
                <div 
                  key={item.name} 
                  className={`transform transition-all duration-500 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  {item.isDirect ? (
                    <NavHashLink 
                      smooth to={item.href} onClick={closeMobile} 
                      className="flex items-center justify-between text-2xl font-black text-slate-900 uppercase italic tracking-tighter hover:text-fupagua-azul transition-colors"
                    >
                      <span>{item.name}</span>
                      <ArrowRight size={20} className="text-fupagua-amarillo" />
                    </NavHashLink>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="h-[2px] w-4 bg-fupagua-amarillo"></span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.name}</span>
                      </div>
                      <div className="grid gap-2">
                        {item.subLinks.map(sub => (
                          <NavHashLink 
                            key={sub.name} smooth to={sub.href} onClick={closeMobile} 
                            className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-2xl text-xs font-black text-slate-700 active:bg-slate-100 transition-all shadow-sm"
                          >
                            <span className="text-fupagua-azul">{sub.icon}</span>
                            {sub.name}
                          </NavHashLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 3. Footer Fijo con el BOTÓN REAL DE DONAR */}
            <div className="p-6 bg-white border-t border-slate-100 flex-shrink-0">
              <NavHashLink 
                smooth to="/#donacion" 
                onClick={closeMobile}
                className="w-full bg-slate-900 text-white py-5 rounded-[24px] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest shadow-[0_15px_30px_rgba(0,0,0,0.2)] active:scale-95 transition-all border-2 border-transparent"
              >
                <Heart size={20} className="text-fupagua-amarillo fill-fupagua-amarillo" /> 
                ¡QUIERO APOYAR AHORA!
              </NavHashLink>
              <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-6">
                +28 Años Transformando Vidas
              </p>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;