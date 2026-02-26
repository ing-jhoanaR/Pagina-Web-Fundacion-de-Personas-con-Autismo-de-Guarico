import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Eye, ShieldCheck, Calendar, Users, 
  Heart, Sparkles, Handshake, Camera, Image as ImageIcon,
  UserCheck, Award, Star
} from 'lucide-react';

const AboutUs = () => {
  const [periodoActivo, setPeriodoActivo] = useState("2013-Actualidad");
  // Estado crucial para que el móvil no se quede en blanco
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
    <section id="nosotros" className="relative py-16 md:py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- 1. CABECERA --- */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 mb-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
            <div className="inline-flex items-center gap-2 bg-fupagua-azul/10 px-3 py-1.5 rounded-full">
              <Calendar size={14} className="text-fupagua-azul" />
              <span className="text-[9px] font-black uppercase tracking-widest text-fupagua-azul">Trayectoria desde 1997</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 uppercase italic leading-none">
              Nuestra <span className="text-fupagua-azul">Esencia</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Somos una entidad con espíritu social consolidado, dedicada a reconocer, respetar y defender los derechos de personas con TEA y otras discapacidades.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-slate-900 p-8 md:p-10 rounded-[40px] md:rounded-[60px] text-white relative shadow-2xl">
            <Users className="text-fupagua-amarillo mb-4 md:mb-6" size={40} />
            <h3 className="text-xl md:text-2xl font-black uppercase italic mb-3">Compromiso Familiar</h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed italic">
              "No solo atendemos individuos, integramos familias. Promovemos la participación activa y responsable de cada hogar."
            </p>
            <div className="absolute -bottom-3 -right-3 bg-fupagua-verde w-16 h-16 rounded-full flex items-center justify-center shadow-xl">
               <Heart className="text-white" size={28} />
            </div>
          </motion.div>
        </div>

        {/* --- 2. MISIÓN Y VISIÓN --- */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-24">
          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-100">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-fupagua-azul/10 rounded-2xl flex items-center justify-center mb-6">
              <Target className="text-fupagua-azul" size={28} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase italic text-slate-900 mb-4">Misión</h3>
            <p className="text-slate-600 leading-relaxed text-sm">Promover que personas con TEA participen como miembros activos de sus comunidades mediante educación e investigación.</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-100">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-fupagua-verde/10 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="text-fupagua-verde" size={28} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase italic text-slate-900 mb-4">Visión</h3>
            <p className="text-slate-600 leading-relaxed text-sm">Ser la fundación referente donde se reconozcan y defiendan los derechos para una integración efectiva.</p>
          </motion.div>
        </div>

        {/* --- 3. CONSEJO DIRECTIVO --- */}
        <div className="mb-24">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-1.5 rounded-full font-black uppercase tracking-[0.2em] text-[9px]">
              <Award size={12} className="text-fupagua-amarillo" /> Liderazgo con Propósito
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic">
              Consejo <span className="text-fupagua-azul">Directivo</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {consejos.map((c) => (
              <button
                key={c.periodo}
                onClick={() => setPeriodoActivo(c.periodo)}
                className={`px-4 md:px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
                  periodoActivo === c.periodo ? 'bg-fupagua-azul text-white shadow-lg' : 'bg-white text-slate-400'
                }`}
              >
                {c.periodo}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='wait'>
              {consejos.find(c => c.periodo === periodoActivo).miembros.map((m, idx) => (
                <motion.div
                  key={`${periodoActivo}-${m.nombre}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  className="group relative bg-white rounded-[30px] p-6 shadow-sm border border-slate-100"
                >
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-fupagua-azul group-hover:text-white transition-all">
                      <UserCheck size={24} />
                    </div>
                    <h4 className="text-lg font-black text-slate-900 uppercase italic mb-1 leading-none">{m.nombre}</h4>
                    <p className="text-fupagua-azul font-black text-[9px] uppercase tracking-widest mb-3">{m.cargo}</p>
                    <p className="text-slate-500 text-xs leading-relaxed italic">{m.desc || "Miembro fundamental."}</p>
                    <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between">
                       <span className="text-[8px] font-black text-slate-400 uppercase">Periodo {periodoActivo}</span>
                       <Star size={12} className="text-fupagua-amarillo" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* --- 4. VALORES (CORREGIDO PARA MÓVIL) --- */}
        <div className="relative mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-slate-900 rounded-[40px] p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <span className="inline-block bg-fupagua-azul text-white px-5 py-1.5 rounded-full font-black uppercase tracking-[0.3em] text-[10px]">Nuestros Pilares</span>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic">Valores que <span className="text-fupagua-amarillo">nos definen</span></h2>
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-24"
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
                className="relative h-56 md:h-64 cursor-pointer overflow-hidden rounded-[35px]"
              >
                {/* FONDO DE COLOR DINÁMICO */}
                <div className={`absolute inset-0 transition-all duration-500 ${val.color} ${
                  isActivo ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                }`} />
                
                {/* CONTENIDO QUE CAMBIA DE BLANCO A TRANSPARENTE */}
                <div className={`absolute inset-0 border border-slate-200 rounded-[35px] p-6 flex flex-col items-center justify-center text-center transition-all duration-500 ${
                  isActivo ? 'bg-transparent border-transparent' : 'bg-white'
                }`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                    isActivo ? 'bg-white/20' : 'bg-slate-50'
                  }`}>
                    <div className={`transition-colors duration-500 ${isActivo ? 'text-white' : val.textColor}`}>
                      {val.icon}
                    </div>
                  </div>
                  <span className={`font-black uppercase italic tracking-tighter text-sm md:text-xl mb-2 leading-none transition-colors duration-500 ${
                    isActivo ? 'text-white' : 'text-slate-900'
                  }`}>
                    {val.title}
                  </span>
                  <p className={`font-bold text-[10px] md:text-xs transition-all duration-500 px-2 ${
                    isActivo ? 'opacity-100 text-white translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    "{val.desc}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* --- 5. GALERÍA --- */}
        <div className="mt-20">
          <div className="mb-10">
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 uppercase italic">Fupagua <span className="text-fupagua-verde">en Acción</span></h3>
          </div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {[
              { size: "h-56", title: "Terapia Grupal" },
              { size: "h-80", title: "Actividad al Aire Libre" },
              { size: "h-64", title: "Talleres para Padres" },
              { size: "h-80", title: "Aprendizaje Lúdico" },
              { size: "h-56", title: "Integración Social" },
              { size: "h-72", title: "Celebraciones" }
            ].map((img, idx) => (
              <motion.div key={idx} variants={itemVariants} className={`relative ${img.size} rounded-[30px] overflow-hidden group cursor-pointer shadow-md bg-slate-200`}>
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={40} className="text-slate-400 opacity-50" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <span className="text-white font-black uppercase italic text-sm">{img.title}</span>
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