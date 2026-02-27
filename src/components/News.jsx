import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Instagram, Calendar, ArrowUpRight, Share2, Tag, GraduationCap, Users, Heart, Lightbulb, Sparkles } from 'lucide-react';

const News = () => {
  const [activeTab, setActiveTab] = useState('padres');

  const categories = [
    { id: 'padres', label: 'Padres y Familias', icon: <Users size={16} />, color: 'bg-fupagua-azul' },
    { id: 'especialistas', label: 'Especialistas', icon: <GraduationCap size={16} />, color: 'bg-fupagua-rojo' },
    { id: 'comunidad', label: 'Comunidad / PCD', icon: <Heart size={16} />, color: 'bg-fupagua-verde' },
  ];

  const newsItems = [
    {
      id: 1,
      userType: 'padres',
      category: "Taller",
      date: "25 Feb 2026",
      title: "Manejo de Emociones en el Hogar",
      description: "Un taller diseñado para dar respiro y herramientas a los padres de niños con TEA.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
      link: "https://instagram.com/fupagua"
    },
    {
      id: 2,
      userType: 'especialistas',
      category: "Formación",
      date: "10 Mar 2026",
      title: "Simposio: Neurodiversidad",
      description: "Actualización técnica para psicólogos y terapeutas sobre nuevos protocolos de intervención.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800",
      link: "https://instagram.com/fupagua"
    },
    {
      id: 3,
      userType: 'comunidad',
      category: "Inclusión",
      date: "05 Mar 2026",
      title: "Emprendimiento Adaptado",
      description: "Información sobre nuestros nuevos talleres de oficio para jóvenes con discapacidad.",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800",
      link: "https://instagram.com/fupagua"
    },
    {
      id: 4,
      userType: 'padres',
      category: "Institucional",
      date: "01 Feb 2026",
      title: "28 Años de Historia Fupagua",
      description: "Conoce cómo nacimos en 1997 y nuestra evolución en el estado Guárico.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800",
      link: "#nosotros"
    }
  ];

  const filteredNews = newsItems.filter(item => item.userType === activeTab);

  return (
    // AJUSTE: pt-32 para evitar choque con Navbar y pb-24 para espacio libre
    <section id="noticias" className="pt-32 pb-24 bg-white overflow-hidden relative">
      
      {/* Detalle decorativo de fondo */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[20vw] font-black uppercase italic leading-none text-right -mr-20">
          NEWS
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabecera Principal - TITULO MEJORADO */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="p-2 bg-fupagua-amarillo/20 rounded-lg">
                <Lightbulb size={16} className="text-fupagua-amarillo" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-fupagua-azul">Centro de Información</span>
            </motion.div>

            <h2 className="text-5xl md:text-8xl font-black text-slate-900 uppercase italic leading-[0.85] tracking-tighter">
              Contenido <br /> 
              <span className="relative text-fupagua-azul font-light italic ml-2 md:ml-4">
                Para Ti
                <svg className="absolute -bottom-2 left-0 w-full h-4 text-fupagua-amarillo/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>
            </h2>
          </div>

          {/* Selector (Tabs) */}
          <div className="flex flex-wrap gap-2 bg-slate-50 p-2 rounded-[25px] border border-slate-100 shadow-inner">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-6 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === cat.id 
                  ? `${cat.color} text-white shadow-xl scale-105` 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((news) => (
              <motion.div
                key={news.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[45px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[9px] font-black uppercase text-slate-900 flex items-center gap-2 shadow-lg">
                      <Tag size={12} className="text-fupagua-amarillo" /> {news.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase mb-4 tracking-widest">
                    <Calendar size={12} className="text-fupagua-azul" /> {news.date}
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase italic text-slate-900 leading-tight mb-4 group-hover:text-fupagua-azul transition-colors">
                    {news.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-grow">
                    {news.description}
                  </p>

                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <a 
                      href={news.link}
                      className="group/btn flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-fupagua-rojo transition-all"
                    >
                      Más detalles 
                      <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                    <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer Instagram */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 p-10 md:p-14 bg-slate-900 rounded-[60px] text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fupagua-azul via-fupagua-amarillo to-fupagua-rojo" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
              <Sparkles size={14} className="text-fupagua-amarillo" />
              <span className="text-white text-[9px] font-black uppercase tracking-[0.3em]">Actualidad Diaria</span>
            </div>
            <h4 className="text-white text-2xl md:text-4xl font-black uppercase italic mb-8 max-w-2xl mx-auto leading-tight">
              ¿Quieres estar al día <br className="hidden md:block"/> minuto a minuto?
            </h4>
            <a 
              href="https://instagram.com/fupagua" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-fupagua-amarillo transition-all shadow-xl shadow-white/5"
            >
              <Instagram size={20} /> Ver Instagram
            </a>
          </div>
          <Instagram size={200} className="absolute -right-10 -bottom-10 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
        </motion.div>

        {/* Mención Trayectoria */}
        <div className="mt-12 text-center">
            <p className="text-slate-300 font-black uppercase text-[10px] tracking-[0.5em]">
              Desde 1997 • 28 años comunicando esperanza
            </p>
        </div>
      </div>
    </section>
  );
};

export default News;