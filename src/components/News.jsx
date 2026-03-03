import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, Instagram, Calendar, ArrowUpRight, Share2, Tag, 
  GraduationCap, Users, Heart, Lightbulb, Sparkles, Play, ExternalLink, Youtube, Filter
} from 'lucide-react';

import { db } from "../firebase"; 
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

const News = () => {
  // Estados para el doble filtrado
  const [activeUserType, setActiveUserType] = useState('padres'); // Filtro principal (Pestañas)
  const [activeCategory, setActiveCategory] = useState('Todas'); // Sub-filtro (Burbujas)
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Configuración de Pestañas Principales (UserType)
  const userTypes = [
    { id: 'padres', label: 'Padres y Familias', icon: <Users size={16} />, color: 'bg-fupagua-azul' },
    { id: 'especialistas', label: 'Especialistas', icon: <GraduationCap size={16} />, color: 'bg-fupagua-rojo' },
    { id: 'comunidad', label: 'Comunidad / PCD', icon: <Heart size={16} />, color: 'bg-fupagua-verde' },
  ];

  // Configuración de Sub-Categorías (Content Category)
  const categories = ['Todas', 'Noticias', 'Talleres Educativos', 'Blogs', 'Cursos'];

  useEffect(() => {
    const q = query(collection(db, "publicaciones"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setNewsItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // --- LÓGICA DE FILTRADO DOBLE ---
  const filteredNews = newsItems.filter(item => {
    const matchUser = item.userType === activeUserType;
    const matchCategory = activeCategory === 'Todas' || item.category === activeCategory;
    return matchUser && matchCategory;
  });

  return (
    <section id="noticias" className="pt-32 pb-24 bg-white overflow-hidden relative">
      
      {/* NEWS Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[20vw] font-black uppercase italic leading-none text-right -mr-20">NEWS</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabecera y Selector de Usuario (Pestañas) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-10">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-fupagua-amarillo/20 rounded-lg">
                <Sparkles size={16} className="text-fupagua-amarillo" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-fupagua-azul">Centro de Recursos</span>
            </motion.div>

            <h2 className="text-5xl md:text-8xl font-black text-slate-900 uppercase italic leading-[0.85] tracking-tighter">
              Contenido <br /> 
              <span className="relative text-fupagua-azul font-light italic ml-2 md:ml-4">Para Ti</span>
            </h2>
          </div>

          {/* Selector de Perfil (Padres, Especialistas, etc) */}
          <div className="flex flex-wrap gap-2 bg-slate-50 p-2 rounded-[25px] border border-slate-100 shadow-inner">
            {userTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => { setActiveUserType(type.id); setActiveCategory('Todas'); }}
                className={`flex items-center gap-2 px-6 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeUserType === type.id ? `${type.color} text-white shadow-xl scale-105` : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {type.icon} {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- NUEVO: SUB-FILTRO DE CATEGORÍAS (BURBUJAS) --- */}
        <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-slate-500 text-[10px] font-black uppercase">
            <Filter size={14} /> Filtrar:
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap border-2 ${
                activeCategory === cat 
                ? 'border-fupagua-azul bg-fupagua-azul text-white shadow-md' 
                : 'border-slate-100 text-slate-400 hover:border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </AnimatePresence>
        </div>

        {/* Mensaje Vacío */}
        {filteredNews.length === 0 && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-slate-50 rounded-[60px] border-2 border-dashed border-slate-200">
             <p className="text-slate-400 font-black uppercase italic tracking-widest">
               No hay {activeCategory !== 'Todas' ? activeCategory : 'publicaciones'} para esta sección todavía
             </p>
          </motion.div>
        )}

      </div>
    </section>
  );
};

// --- SUB-COMPONENTE NEWS CARD ---
const NewsCard = ({ news }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const ytLink = news.links?.find(l => l.type === 'YouTube')?.url;
  const ytID = getYouTubeID(ytLink);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-white rounded-[45px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col cursor-pointer"
    >
      <div className={`relative overflow-hidden transition-all duration-500 bg-slate-100 ${isExpanded ? 'h-80' : 'h-64'}`}>
        {ytID ? (
          <iframe className="w-full h-full pointer-events-none scale-150" src={`https://www.youtube.com/embed/${ytID}?controls=0&mute=1&autoplay=1&loop=1&playlist=${ytID}`} frameBorder="0" />
        ) : news.mediaType?.includes('video') ? (
          <video src={news.mediaUrl} className="w-full h-full object-cover" autoPlay muted loop playsInline />
        ) : (
          <img src={news.mediaUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={news.title} />
        )}
        <div className="absolute top-6 left-6">
          <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[9px] font-black uppercase text-fupagua-azul flex items-center gap-2 shadow-lg">
            <Tag size={12} className="text-fupagua-amarillo" /> {news.category}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase mb-4 tracking-widest">
          <Calendar size={12} className="text-fupagua-azul" /> 
          {news.createdAt?.seconds ? new Date(news.createdAt.seconds * 1000).toLocaleDateString() : 'Reciente'}
        </div>
        
        <h3 className="text-2xl font-black uppercase italic text-slate-900 leading-[1.1] mb-4 group-hover:text-fupagua-azul transition-colors line-clamp-2">
          {news.title}
        </h3>
        
        <p className={`text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-grow ${isExpanded ? '' : 'line-clamp-2'}`}>
          {news.description}
        </p>

        {isExpanded && news.links?.length > 0 && (
          <div className="mb-6 space-y-2 animate-in fade-in slide-in-from-bottom-2">
            {news.links.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl text-[10px] font-black uppercase text-slate-900 hover:bg-fupagua-azul hover:text-white transition-all">
                {link.type === 'YouTube' ? <Youtube size={14}/> : <ExternalLink size={14}/>} Ver {link.type} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}

        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-fupagua-rojo">
            {isExpanded ? 'Cerrar' : 'Toca para leer más'}
          </span>
          <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
            <Share2 size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default News;