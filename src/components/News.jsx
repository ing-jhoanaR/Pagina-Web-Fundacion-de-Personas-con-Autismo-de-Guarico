import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Instagram, Calendar, ArrowUpRight, Share2, Tag, GraduationCap, Users, Heart, Lightbulb } from 'lucide-react';

const News = () => {
  // Estado para filtrar por tipo de usuario
  const [activeTab, setActiveTab] = useState('padres');

  const categories = [
    { id: 'padres', label: 'Padres y Familias', icon: <Users size={18} />, color: 'bg-fupagua-azul' },
    { id: 'especialistas', label: 'Especialistas', icon: <GraduationCap size={18} />, color: 'bg-fupagua-rojo' },
    { id: 'comunidad', label: 'Comunidad / PCD', icon: <Heart size={18} />, color: 'bg-fupagua-verde' },
  ];

  const newsItems = [
    // NOTICIAS PARA PADRES
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
    // NOTICIAS PARA ESPECIALISTAS
    {
      id: 2,
      userType: 'especialistas',
      category: "Formación",
      date: "10 Mar 2026",
      title: "Simposio: Neurodiversidad en el Siglo XXI",
      description: "Actualización técnica para psicólogos y terapeutas sobre nuevos protocolos de intervención.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800",
      link: "https://instagram.com/fupagua"
    },
    // NOTICIAS PARA PCD / COMUNIDAD
    {
      id: 3,
      userType: 'comunidad',
      category: "Inclusión",
      date: "05 Mar 2026",
      title: "Programa de Emprendimiento Adaptado",
      description: "Información sobre nuestros nuevos talleres de oficio para jóvenes con discapacidad.",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800",
      link: "https://instagram.com/fupagua"
    },
    // NOTICIA GENERAL DE FUPAGUA (Aparece en todas o una específica)
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
    <section id="noticias" className="py-24 bg-slate-50 overflow-hidden min-h-[900px]">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Cabecera Principal */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-fupagua-azul font-black uppercase text-[10px] tracking-[0.4em] mb-4">
              <Lightbulb size={16} className="text-fupagua-amarillo" /> Centro de Información
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase italic leading-[0.8] tracking-tighter">
              Contenido <br /> 
              <span className="text-fupagua-azul text-4xl md:text-6xl italic opacity-80 underline decoration-fupagua-amarillo">Para Ti</span>
            </h2>
          </div>

          {/* Selector de Usuario (Tabs) */}
          <div className="flex flex-wrap gap-2 bg-white p-2 rounded-[30px] shadow-xl border border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-[25px] text-[11px] font-black uppercase tracking-widest transition-all ${
                  activeTab === cat.id 
                  ? `${cat.color} text-white shadow-lg scale-105` 
                  : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Animada de Noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((news) => (
              <motion.div
                key={news.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group bg-white rounded-[45px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col h-full"
              >
                {/* Imagen */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-black uppercase text-slate-900 flex items-center gap-2 shadow-lg">
                      <Tag size={12} className="text-fupagua-amarillo" /> {news.category}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase mb-4">
                    <Calendar size={12} /> {news.date}
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
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-fupagua-rojo transition-all"
                    >
                      Más detalles <ArrowUpRight size={14} />
                    </a>
                    <button className="p-3 bg-slate-50 rounded-full text-slate-400 hover:bg-fupagua-azul hover:text-white transition-all">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Botón Instagram Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-10 bg-slate-900 rounded-[50px] text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h4 className="text-white text-2xl font-black uppercase italic mb-4">¿Quieres estar al día minuto a minuto?</h4>
            <a 
              href="https://instagram.com/fupagua" 
              target="_blank"
              className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-fupagua-amarillo transition-all"
            >
              <Instagram size={20} /> Ver todo en Instagram
            </a>
          </div>
          <Instagram size={200} className="absolute -right-10 -bottom-10 text-white/5 rotate-12" />
        </motion.div>

        {/* Mención Trayectoria */}
        <div className="mt-12 text-center">
            <p className="text-slate-400 font-bold uppercase text-[9px] tracking-[0.5em]">
              Desde 1997 • Formando y comunicando esperanza
            </p>
        </div>
      </div>
    </section>
  );
};

export default News;