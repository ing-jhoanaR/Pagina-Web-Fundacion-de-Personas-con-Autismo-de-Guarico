import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Eye, ShieldCheck, Calendar, Users, 
  Heart, Sparkles, Handshake, Image as ImageIcon,
  UserCheck, Award, Star, Quote
} from 'lucide-react';

const AboutUs = () => {
  const [periodoActivo, setPeriodoActivo] = useState("2013-Actualidad");
  const [valorActivo, setValorActivo] = useState(null);

  const consejos = [
    {
      periodo: "2013-Actualidad",
      miembros: [
        { nombre: "Carmen Yarisma Molina", cargo: "Presidenta", desc: "Liderazgo comprometido con la excelencia y la inclusión social." },
        { nombre: "Zaida Cortéz", cargo: "Vice Presidenta", desc: "Fortalecimiento de la estructura operativa." },
        { nombre: "Sonia Castellanos", cargo: "Secretaria", desc: "Gestión administrativa y enlace institucional." },
        { nombre: "Hidalia Alfonso", cargo: "Secretaria", desc: "Apoyo constante en la coordinación comunitaria." },
        { nombre: "Egleé Lara", cargo: "Vocal", desc: "Participación activa en proyectos sociales." }
      ]
    },
    {
      periodo: "2008-2012",
      miembros: [
        { nombre: "Carmen Yarisma Molina", cargo: "Presidenta" },
        { nombre: "Isabel Peña", cargo: "Vice Presidenta" },
        { nombre: "Marlene Mora", cargo: "Secretaria" },
        { nombre: "Hidalia Alfonso", cargo: "Secretaria" },
        { nombre: "Ma. Rosario Mirabal", cargo: "Vocal" },
        { nombre: "Lina Lozano", cargo: "Vocal" }
      ]
    },
    {
      periodo: "2006-2007",
      miembros: [
        { nombre: "Carmen Yarisma Molina", cargo: "Presidenta" },
        { nombre: "María Carolina Maldonado", cargo: "Vice Presidenta" },
        { nombre: "Hidalia Alfonso", cargo: "Secretaria" },
        { nombre: "Ma. Rosario Mirabal", cargo: "Vocal" }
      ]
    },
    {
      periodo: "2001-2005",
      miembros: [
        { nombre: "Carmen Yarisma Molina", cargo: "Presidenta" },
        { nombre: "Pedro Mirabal", cargo: "Vice Presidente" },
        { nombre: "Ma. Rosario Mirabal", cargo: "Secretaria" },
        { nombre: "Lina Lozano", cargo: "Secretaria" }
      ]
    },
    {
      periodo: "1997-2000",
      miembros: [
        { nombre: "Haydee Lozano / M. Antonieta Nuzzo", cargo: "Presidencia" },
        { nombre: "María Bretaña", cargo: "Vice Presidente" },
        { nombre: "Dina Barrios", cargo: "Vice Presidente" },
        { nombre: "Ma. Rosario Mirabal", cargo: "Tesorero" }
      ]
    }
  ];

  const valores = [
    { title: "Compromiso", color: "bg-fupagua-azul", textColor: "text-fupagua-azul", icon: <Heart size={24} />, desc: "Dedicación total." },
    { title: "Justicia", color: "bg-fupagua-amarillo", textColor: "text-fupagua-amarillo", icon: <ShieldCheck size={24} />, desc: "Defensa de derechos." },
    { title: "Empatía", color: "bg-fupagua-verde", textColor: "text-fupagua-verde", icon: <Sparkles size={24} />, desc: "Desde el corazón." },
    { title: "Equidad", color: "bg-fupagua-rojo", textColor: "text-fupagua-rojo", icon: <Users size={24} />, desc: "Oportunidades reales." },
    { title: "Cooperación", color: "bg-fupagua-azul", textColor: "text-fupagua-azul", icon: <Handshake size={24} />, desc: "Trabajo unido." },
    { title: "Solidaridad", color: "bg-fupagua-verde", textColor: "text-fupagua-verde", icon: <Users size={24} />, desc: "Apoyo mutuo." },
    { title: "Responsabilidad", color: "bg-fupagua-amarillo", textColor: "text-fupagua-amarillo", icon: <Target size={24} />, desc: "Ética profesional." },
    { title: "Tolerancia", color: "bg-fupagua-rojo", textColor: "text-fupagua-rojo", icon: <Heart size={24} />, desc: "Respeto profundo." }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="nosotros" className="relative pt-32 pb-24 bg-white overflow-hidden">
      
      {/* TEXTO DECORATIVO DE FONDO GIGANTE */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <h2 className="text-[15vw] font-black uppercase italic leading-none whitespace-nowrap -ml-10 text-slate-900">
          HISTORY • MISSION • VISION • VALUES
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- 1. CABECERA EDITORIAL --- */}
        <div className="grid lg:grid-cols-12 gap-12 mb-32 items-end">
          <div className="lg:col-span-7 space-y-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
              <span className="h-[2px] w-12 bg-fupagua-verde rounded-full"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-fupagua-verde">Desde 1997</span>
            </motion.div>
            
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 uppercase italic leading-[0.85] tracking-tighter">
              Nuestra <br /> 
              <span className="relative text-fupagua-azul font-light italic ml-2 md:ml-4">
                Esencia
                <svg className="absolute -bottom-2 left-0 w-full h-4 text-fupagua-verde/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>
            </h2>
            
            <p className="text-slate-600 text-xl font-medium leading-relaxed max-w-xl">
              Somos una entidad con espíritu social consolidado, dedicada a reconocer, respetar y defender los derechos de personas con <span className="text-fupagua-azul font-bold">TEA</span> y otras discapacidades.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 bg-slate-900 p-10 rounded-[60px] text-white relative shadow-2xl overflow-hidden group"
          >
            <Quote className="absolute -top-4 -right-4 text-fupagua-verde opacity-20 group-hover:rotate-12 transition-transform duration-700" size={120} />
            
            <div className="relative z-10">
              <Users className="text-fupagua-amarillo mb-6" size={40} />
              <h3 className="text-2xl font-black uppercase italic mb-4">Compromiso Familiar</h3>
              <p className="text-slate-400 text-sm leading-relaxed italic mb-8">
                "No solo atendemos individuos, integramos familias. Promovemos la participación activa y responsable de cada hogar."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-fupagua-verde rounded-full flex items-center justify-center shadow-lg shadow-fupagua-verde/20">
                   <Heart className="text-white fill-white" size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-fupagua-verde">Impacto Real</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- 2. MISIÓN Y VISIÓN --- */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          <motion.div 
            whileHover={{ y: -10 }} 
            className="group bg-white p-12 rounded-[50px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 bg-fupagua-azul/10 text-fupagua-azul rounded-[20px] flex items-center justify-center shadow-inner group-hover:bg-fupagua-azul group-hover:text-white transition-colors">
                <Target size={32} />
              </div>
              <h3 className="text-4xl font-black uppercase italic text-slate-900 tracking-tighter">Misión</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg border-l-4 border-slate-100 pl-6 group-hover:border-fupagua-azul transition-colors">
              Promover que personas con TEA participen como miembros activos de sus comunidades mediante educación e investigación.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }} 
            className="group bg-fupagua-verde p-12 rounded-[50px] text-white shadow-2xl shadow-fupagua-verde/20 transition-all duration-500"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 bg-white/10 text-white rounded-[20px] flex items-center justify-center shadow-inner group-hover:bg-white group-hover:text-fupagua-verde transition-colors">
                <Eye size={32} />
              </div>
              <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter">Visión</h3>
            </div>
            <p className="text-white leading-relaxed text-lg border-l-4 border-white/10 pl-6 group-hover:border-white transition-colors opacity-90">
              Ser la fundación referente donde se reconozcan y defiendan los derechos para una integración efectiva.
            </p>
          </motion.div>
        </div>

        {/* --- 3. CONSEJO DIRECTIVO (ID: consejo) --- */}
        <div id="consejo" className="mb-32 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-fupagua-azul font-black uppercase text-[10px] tracking-[0.4em]">Liderazgo y Gobernanza</span>
              <h2 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter">
                Consejo <span className="text-fupagua-verde font-light">Directivo</span>
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-2 bg-slate-100 p-2 rounded-[20px] shadow-inner">
              {consejos.map((c) => (
                <button
                  key={c.periodo}
                  onClick={() => setPeriodoActivo(c.periodo)}
                  className={`px-5 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all duration-500 ${
                    periodoActivo === c.periodo ? 'bg-white text-fupagua-azul shadow-md scale-105' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {c.periodo}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='wait'>
              {consejos.find(c => c.periodo === periodoActivo).miembros.map((m, idx) => (
                <motion.div
                  key={`${periodoActivo}-${m.nombre}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative bg-white rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 hover:border-fupagua-verde transition-all"
                >
                  <div className="absolute top-8 right-8 text-slate-100 group-hover:text-fupagua-verde/20 transition-colors">
                    <UserCheck size={40} />
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-fupagua-verde font-black text-[9px] uppercase tracking-[0.2em] mb-2">{m.cargo}</p>
                    <h4 className="text-2xl font-black text-slate-900 uppercase italic mb-4 leading-tight group-hover:text-fupagua-azul transition-colors">{m.nombre}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed italic mb-6 flex-grow">{m.desc || "Miembro fundamental en la historia de Fupagua."}</p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                       <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Gestión {periodoActivo}</span>
                       <Star size={14} className="text-fupagua-amarillo fill-fupagua-amarillo" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* --- 4. VALORES (ID: valores) --- */}
        <div id="valores" className="mb-32 relative scroll-mt-24">
          <div className="bg-slate-900 rounded-[60px] p-12 md:p-20 text-center relative overflow-hidden mb-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-fupagua-verde/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <div className="relative z-10 space-y-4">
              <span className="inline-block bg-white/10 text-fupagua-amarillo px-5 py-2 rounded-full font-black uppercase tracking-[0.3em] text-[10px]">Cultura Organizacional</span>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">Valores que <br/> <span className="text-fupagua-verde">nos definen</span></h2>
            </div>
          </div>

          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {valores.map((val, idx) => {
              const isActivo = valorActivo === idx;
              return (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setValorActivo(idx)}
                  onMouseLeave={() => setValorActivo(null)}
                  onClick={() => setValorActivo(isActivo ? null : idx)}
                  className="relative h-72 rounded-[45px] cursor-help overflow-hidden border border-slate-100 shadow-sm"
                >
                  <div className={`absolute inset-0 transition-all duration-700 ease-out ${val.color} ${
                    isActivo ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                  }`} />
                  
                  <div className={`absolute inset-0 p-8 flex flex-col items-center justify-center text-center transition-all duration-500 ${
                    isActivo ? 'bg-transparent' : 'bg-white'
                  }`}>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 shadow-inner ${
                      isActivo ? 'bg-white/20' : 'bg-slate-50'
                    }`}>
                      <div className={`transition-colors duration-500 ${isActivo ? 'text-white' : val.textColor}`}>
                        {val.icon}
                      </div>
                    </div>
                    
                    <span className={`font-black uppercase italic tracking-tighter text-xl md:text-2xl mb-3 leading-none transition-colors duration-500 ${
                      isActivo ? 'text-white' : 'text-slate-900'
                    }`}>
                      {val.title}
                    </span>
                    
                    <p className={`font-bold text-xs transition-all duration-500 px-2 leading-relaxed ${
                      isActivo ? 'opacity-100 text-white translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      "{val.desc}"
                    </p>
                    <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full transition-all duration-500 lg:hidden ${
                        isActivo ? 'bg-white/50' : 'bg-slate-100'
                    }`}></div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* --- 5. GALERÍA (ID: galeria) --- */}
        <div id="galeria" className="mt-32 scroll-mt-24">
          <div className="flex items-center gap-4 mb-12 border-b border-slate-100 pb-8">
            <ImageIcon size={30} className="text-fupagua-verde" />
            <h3 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">Fupagua <span className="text-fupagua-verde font-light">en Acción</span></h3>
          </div>
          
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              { size: "h-60", title: "Terapia Grupal" },
              { size: "h-80", title: "Actividad al Aire Libre" },
              { size: "h-64", title: "Talleres para Padres" },
              { size: "h-80", title: "Aprendizaje Lúdico" },
              { size: "h-60", title: "Integración Social" },
              { size: "h-72", title: "Celebraciones" }
            ].map((img, idx) => (
              <motion.div key={idx} variants={itemVariants} className={`relative ${img.size} rounded-[35px] overflow-hidden group cursor-pointer shadow-lg bg-slate-100 border border-slate-200`}>
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50/50 group-hover:bg-transparent transition-colors duration-500">
                  <ImageIcon size={40} className="text-slate-300 opacity-70 group-hover:opacity-0 transition-opacity" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-fupagua-verde/80 via-fupagua-verde/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0">
                  <span className="bg-white/20 backdrop-blur-sm inline-block self-start px-3 py-1 rounded-full text-white font-black uppercase italic text-xs mb-2">Galería</span>
                  <h5 className="text-white font-black uppercase italic text-lg leading-tight">{img.title}</h5>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;