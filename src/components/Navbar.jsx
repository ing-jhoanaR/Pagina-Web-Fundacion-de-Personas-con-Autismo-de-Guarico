

import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Sparkles, Building2, HandHeart, Newspaper, ChevronDown, ArrowRight } from 'lucide-react';
import LogoImg from '../assets/logoorigin.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      name: 'Conócenos',
      subLinks: [
        { name: 'Presentación', href: '#presentacion', icon: <Sparkles size={18} /> }, 
        { name: 'Nosotros', href: '#nosotros', icon: <Building2 size={18} /> },
      ]
    },
    { name: 'Servicios', href: '#servicios', isDirect: true },
    {
      name: 'Comunidad',
      subLinks: [
        { name: 'Unite', href: '#unite', icon: <HandHeart size={18} /> },
        { name: 'Noticias', href: '#noticias', icon: <Newspaper size={18} /> },
      ]
    },
    { name: 'Tienda', href: '#tienda', isDirect: true },
    { name: 'Contacto', href: '#contacto', isDirect: true },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <nav className={`w-[94%] max-w-[1440px] mx-auto transition-all duration-500 flex items-center justify-between px-4 md:px-8 ${
        isScrolled 
        ? 'bg-white/90 backdrop-blur-lg shadow-2xl rounded-[25px] py-2 border border-slate-100' 
        : 'bg-white/80 backdrop-blur-md rounded-[30px] py-4 border-b-2 border-fupagua-amarillo/30'
      }`}>
        
        {/* LOGOTIPO */}
        <div className="flex items-center gap-2 md:gap-3 group cursor-pointer flex-shrink-0">
          <img 
            src={LogoImg}
            alt="FUPAGUA Logo" 
            className={`transition-all duration-500 object-contain ${
              isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'
            }`} 
          />
          <div className="flex flex-col border-l-2 border-slate-200 pl-2 md:pl-3">
            <span className="text-xl md:text-2xl font-black text-fupagua-azul leading-none uppercase tracking-tighter italic">
              Fupagua
            </span>
            <span className="hidden sm:block text-[7px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mt-1">
              +28 Años de Excelencia
            </span>
          </div>
        </div>

        {/* MENÚ DESKTOP (Sin cambios) */}
        <div className="hidden xl:flex items-center gap-2 ml-auto">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group py-2">
              {item.isDirect ? (
                <a href={item.href} className="px-4 py-2 text-[13px] font-black uppercase text-slate-700 hover:text-fupagua-azul transition-all tracking-widest">
                  {item.name}
                </a>
              ) : (
                <button className="flex items-center gap-1 px-4 py-2 text-[13px] font-black uppercase text-slate-700 group-hover:text-fupagua-azul transition-all tracking-widest">
                  {item.name} <ChevronDown size={14} className="text-fupagua-amarillo group-hover:rotate-180 transition-transform" />
                </button>
              )}
              
              {!item.isDirect && (
                <div className="absolute top-full right-0 w-64 pt-4 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                  <div className="bg-white rounded-[25px] shadow-2xl border border-slate-100 overflow-hidden p-3">
                    {item.subLinks.map((sub) => (
                      <a 
                        key={sub.name} 
                        href={sub.href} 
                        className="flex items-center gap-3 p-4 hover:bg-fupagua-azul/5 rounded-xl text-[11px] font-black text-slate-600 hover:text-fupagua-azul uppercase tracking-wider transition-all"
                      >
                        <span className="text-fupagua-amarillo">{sub.icon}</span> 
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <a 
            href="#donar" 
            className="ml-6 bg-slate-900 text-white px-8 py-3.5 rounded-full font-black text-[11px] tracking-[0.2em] shadow-xl hover:bg-fupagua-azul hover:scale-105 transition-all flex items-center gap-2 group"
          >
            <Heart size={16} className="text-fupagua-amarillo group-hover:fill-fupagua-amarillo transition-all" /> 
            APOYAR AHORA
          </a>
        </div>

        {/* BOTÓN MÓVIL (Hamburguesa) */}
        <button 
          className="xl:hidden p-3 bg-fupagua-azul text-white rounded-2xl shadow-lg active:scale-95 transition-all" 
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* SIDEBAR MÓVIL MEJORADO */}
        <div 
          className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[120] transition-opacity duration-500 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`} 
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className={`absolute top-0 right-0 w-[85%] max-w-sm h-screen bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`} 
            onClick={e => e.stopPropagation()}
          >
            {/* Cabecera Sidebar */}
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
              <div className="flex items-center gap-2">
                <img src={LogoImg} className="h-8" alt="Logo" />
                <span className="text-lg font-black text-fupagua-azul italic">FUPAGUA</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-3 bg-slate-100 rounded-full text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links Sidebar */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {menuItems.map((item) => (
                <div key={item.name} className="border-b border-slate-50 pb-4">
                  {item.isDirect ? (
                    <a 
                      href={item.href} 
                      onClick={() => setMobileMenuOpen(false)} 
                      className="flex items-center justify-between text-2xl font-black text-slate-900 uppercase italic tracking-tighter"
                    >
                      {item.name}
                      <ArrowRight size={20} className="text-fupagua-azul" />
                    </a>
                  ) : (
                    <div className="space-y-4">
                      <span className="text-[10px] font-black text-fupagua-amarillo uppercase tracking-[0.2em] block">{item.name}</span>
                      <div className="grid gap-2">
                        {item.subLinks.map(sub => (
                          <a 
                            key={sub.name} 
                            href={sub.href} 
                            onClick={() => setMobileMenuOpen(false)} 
                            className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-700"
                          >
                            <span className="text-fupagua-azul">{sub.icon}</span>
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer Sidebar (Botón Apoyar) */}
            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <a 
                href="#donar" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-fupagua-azul text-white py-5 rounded-[20px] flex items-center justify-center gap-3 font-black text-sm uppercase tracking-[0.2em] shadow-xl"
              >
                <Heart size={20} className="text-fupagua-amarillo fill-fupagua-amarillo" /> Quiero Apoyar
              </a>
              <p className="text-center mt-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Desde 1997 San Juan de los Morros
              </p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;