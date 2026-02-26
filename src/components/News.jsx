
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Instagram, Calendar, ArrowUpRight, Share2, Tag, GraduationCap, Users, Heart, Lightbulb } from 'lucide-react';

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
    // AJUSTE: py-24 a py-16 y min-h reducido
    <section id="noticias" className="py-16 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabecera Principal */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-fupagua-azul font-black uppercase text-[9px] tracking-[0.3em] mb-3">
              <Lightbulb size={14} className="text-fupagua-amarillo" /> Centro de Información
            </div>
            {/* AJUSTE: Título de 7xl a 5xl */}
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic leading-tight tracking-tighter">
              Contenido <br /> 
              <span className="text-fupagua-azul text-2xl md:text-4xl italic opacity-80 underline decoration-fupagua-amarillo">Para Ti</span>
            </h2>
          </div>

          {/* Selector (Tabs) - Ajuste de padding */}
          <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl shadow-lg border border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === cat.id 
                  ? `${cat.color} text-white shadow-md` 
                  : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((news) => (
              <motion.div
                key={news.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group bg-white rounded-[35px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                {/* Imagen - AJUSTE: Altura de h-64 a h-52 */}
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[8px] font-black uppercase text-slate-900 flex items-center gap-2 shadow-md">
                      <Tag size={10} className="text-fupagua-amarillo" /> {news.category}
                    </span>
                  </div>
                </div>

                {/* Contenido - AJUSTE: p-8 a p-6 */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-slate-400 text-[9px] font-bold uppercase mb-3">
                    <Calendar size={10} /> {news.date}
                  </div>
                  
                  <h3 className="text-xl font-black uppercase italic text-slate-900 leading-tight mb-3 group-hover:text-fupagua-azul transition-colors">
                    {news.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6 flex-grow">
                    {news.description}
                  </p>

                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <a 
                      href={news.link}
                      className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-900 hover:text-fupagua-rojo transition-all"
                    >
                      Más detalles <ArrowUpRight size={12} />
                    </a>
                    <button className="p-2.5 bg-slate-50 rounded-full text-slate-400 hover:bg-fupagua-azul hover:text-white transition-all">
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Botón Instagram Footer - AJUSTE: Padding p-10 a p-8 */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-8 bg-slate-900 rounded-[40px] text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h4 className="text-white text-xl font-black uppercase italic mb-4">¿Quieres estar al día minuto a minuto?</h4>
            <a 
              href="https://instagram.com/fupagua" 
              target="_blank"
              className="inline-flex items-center gap-3 bg-white px-6 py-3.5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-fupagua-amarillo transition-all"
            >
              <Instagram size={18} /> Ver Instagram
            </a>
          </div>
          <Instagram size={150} className="absolute -right-8 -bottom-8 text-white/5 rotate-12" />
        </motion.div>

        {/* Mención Trayectoria */}
        <div className="mt-10 text-center">
            <p className="text-slate-400 font-bold uppercase text-[8px] tracking-[0.4em]">
              Desde 1997 • 28 años comunicando esperanza
            </p>
        </div>
      </div>
    </section>
  );
};

export default News;