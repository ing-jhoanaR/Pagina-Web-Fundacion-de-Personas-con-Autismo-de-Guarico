
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Eye, ShieldCheck, Calendar, Users, 
  Heart, Sparkles, Handshake, Camera, Image as ImageIcon,
  UserCheck, Award, ChevronRight, Star
} from 'lucide-react';

const AboutUs = () => {
  // --- ESTADO PARA EL FILTRO DEL CONSEJO ---
  const [periodoActivo, setPeriodoActivo] = useState("2013-Actualidad");

  // --- DATOS DEL CONSEJO ---
  const consejos = [
    {
      periodo: "2013-Actualidad",
      miembros: [
        { nombre: "Carmen Yarisma Molina", cargo: "Presidenta", desc: "Liderazgo comprometido con la excelencia y la inclusión social.", color: "bg-fupagua-azul" },
        { nombre: "Zaida Cortéz", cargo: "Vice Presidenta", desc: "Fortalecimiento de la estructura operativa.", color: "bg-fupagua-verde" },
        { nombre: "Sonia Castellanos", cargo: "Secretaria", desc: "Gestión administrativa y enlace institucional.", color: "bg-fupagua-amarillo" },
        { nombre: "Hidalia Alfonso", cargo: "Secretaria", desc: "Apoyo constante en la coordinación comunitaria.", color: "bg-fupagua-rojo" },
        { nombre: "Egleé Lara", cargo: "Vocal", desc: "Participación activa en proyectos sociales.", color: "bg-fupagua-azul" }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="nosotros" className="relative py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- 1. CABECERA CON HISTORIA --- */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-fupagua-azul/10 px-4 py-2 rounded-full">
              <Calendar size={16} className="text-fupagua-azul" />
              <span className="text-[10px] font-black uppercase tracking-widest text-fupagua-azul">Trayectoria desde 1997</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic leading-none">
              Nuestra <span className="text-fupagua-azul">Esencia</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Somos una entidad con espíritu social consolidado, dedicada a reconocer, respetar y defender los derechos de niños, adolescentes y adultos con TEA y otras discapacidades.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-slate-900 p-10 rounded-[60px] text-white relative shadow-2xl">
            <Users className="text-fupagua-amarillo mb-6" size={48} />
            <h3 className="text-2xl font-black uppercase italic mb-4">Compromiso Familiar</h3>
            <p className="text-slate-400 text-sm leading-relaxed italic">
              "No solo atendemos individuos, integramos familias. Promovemos la participación activa y responsable de cada hogar."
            </p>
            <div className="absolute -bottom-4 -right-4 bg-fupagua-verde w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
               <Heart className="text-white" size={32} />
            </div>
          </motion.div>
        </div>

        {/* --- 2. MISIÓN Y VISIÓN --- */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          <motion.div whileHover={{ y: -10 }} className="bg-white p-12 rounded-[50px] shadow-sm border border-slate-100">
            <div className="w-16 h-16 bg-fupagua-azul/10 rounded-2xl flex items-center justify-center mb-8">
              <Target className="text-fupagua-azul" size={32} />
            </div>
            <h3 className="text-3xl font-black uppercase italic text-slate-900 mb-6">Misión</h3>
            <p className="text-slate-600 leading-relaxed text-sm">Promover que personas con TEA participen como miembros activos de sus comunidades mediante educación e investigación.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-white p-12 rounded-[50px] shadow-sm border border-slate-100">
            <div className="w-16 h-16 bg-fupagua-verde/10 rounded-2xl flex items-center justify-center mb-8">
              <Eye className="text-fupagua-verde" size={32} />
            </div>
            <h3 className="text-3xl font-black uppercase italic text-slate-900 mb-6">Visión</h3>
            <p className="text-slate-600 leading-relaxed text-sm">Ser la fundación referente donde se reconozcan y defiendan los derechos para una integración efectiva.</p>
          </motion.div>
        </div>

        {/* --- 3. NUEVO: CONSEJO DIRECTIVO --- */}
        <div className="mb-40">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-full font-black uppercase tracking-[0.3em] text-[10px]">
              <Award size={14} className="text-fupagua-amarillo" /> Liderazgo con Propósito
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic">
              Consejo <span className="text-fupagua-azul">Directivo</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-3xl mx-auto italic">
              Presentamos al equipo que lidera y guía nuestra fundación con compromiso y responsabilidad, asegurando la excelencia desde 1997.
            </p>
          </div>

          {/* Filtros de Periodos */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {consejos.map((c) => (
              <button
                key={c.periodo}
                onClick={() => setPeriodoActivo(c.periodo)}
                className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                  periodoActivo === c.periodo 
                  ? 'bg-fupagua-azul text-white shadow-xl shadow-fupagua-azul/30 scale-105' 
                  : 'bg-white text-slate-400 hover:bg-slate-100'
                }`}
              >
                {c.periodo}
              </button>
            ))}
          </div>

          {/* Grid de Miembros Dinámico */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='wait'>
              {consejos.find(c => c.periodo === periodoActivo).miembros.map((m, idx) => (
                <motion.div
                  key={`${periodoActivo}-${m.nombre}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="group relative bg-white rounded-[40px] p-8 shadow-sm hover:shadow-2xl border border-slate-100 transition-all duration-500"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-fupagua-azul group-hover:text-white transition-all duration-500">
                      <UserCheck size={28} />
                    </div>
                    <h4 className="text-xl font-black text-slate-900 uppercase italic mb-1 leading-none">{m.nombre}</h4>
                    <p className="text-fupagua-azul font-black text-[10px] uppercase tracking-widest mb-4">{m.cargo}</p>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 italic group-hover:text-slate-700 transition-colors">
                      {m.desc || "Miembro fundamental en la trayectoria de FUPAGUA durante este periodo institucional."}
                    </p>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                       <span className="text-[9px] font-black text-slate-400 uppercase">Periodo {periodoActivo}</span>
                       <Star size={14} className="text-fupagua-amarillo" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Comités de Apoyo */}
          <div className="mt-20 p-8 bg-white/50 rounded-[40px] border border-dashed border-slate-300">
            <h4 className="text-center font-black uppercase italic text-slate-900 mb-8 flex items-center justify-center gap-3">
               <Handshake className="text-fupagua-verde" /> Comités de Apoyo
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              {["Relaciones Públicas", "Finanzas", "Investigación", "Educación", "Deporte", "Cultura"].map((comite) => (
                <span key={comite} className="bg-white px-5 py-2 rounded-full text-[11px] font-bold text-slate-600 shadow-sm border border-slate-100">
                  {comite}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- 4. SECCIÓN DE VALORES --- */}
        <div className="relative mb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-slate-900 rounded-[50px] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-fupagua-azul/10 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-6">
              <span className="inline-block bg-fupagua-azul text-white px-6 py-2 rounded-full font-black uppercase tracking-[0.4em] text-[11px] shadow-lg">Nuestros Pilares Especiales</span>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic">Valores que <span className="text-fupagua-amarillo">nos definen</span></h2>
              <p className="text-slate-300 font-bold text-lg max-w-3xl mx-auto italic">"En FUPAGUA, cada acción está guiada por principios éticos que aseguran una atención humana."</p>
            </div>
          </motion.div>
        </div>

        {/* GRID DE VALORES */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
          {[
            { title: "Compromiso", color: "bg-fupagua-azul", textColor: "text-fupagua-azul", icon: <Heart size={30} />, desc: "Dedicación total a cada familia atendida." },
            { title: "Justicia", color: "bg-fupagua-amarillo", textColor: "text-fupagua-amarillo", icon: <ShieldCheck size={30} />, desc: "Defensa firme de los derechos de todos." },
            { title: "Empatía", color: "bg-fupagua-verde", textColor: "text-fupagua-verde", icon: <Sparkles size={30} />, desc: "Comprender y sentir desde el corazón." },
            { title: "Equidad", color: "bg-fupagua-rojo", textColor: "text-fupagua-rojo", icon: <Users size={30} />, desc: "Oportunidades reales sin distinciones." },
            { title: "Cooperación", color: "bg-fupagua-azul", textColor: "text-fupagua-azul", icon: <Handshake size={30} />, desc: "Trabajo unido por el bienestar social." },
            { title: "Solidaridad", color: "bg-fupagua-verde", textColor: "text-fupagua-verde", icon: <Users size={30} />, desc: "Apoyo mutuo constante para avanzar." },
            { title: "Responsabilidad", color: "bg-fupagua-amarillo", textColor: "text-fupagua-amarillo", icon: <Target size={30} />, desc: "Cumplimiento ético de nuestra misión." },
            { title: "Tolerancia", color: "bg-fupagua-rojo", textColor: "text-fupagua-rojo", icon: <Heart size={30} />, desc: "Respeto profundo a la diversidad humana." }
          ].map((val, idx) => (
            <motion.div key={idx} variants={itemVariants} whileHover={{ y: -12 }} className="relative h-72 group cursor-pointer">
              <div className={`absolute inset-0 ${val.color} rounded-[45px] transition-all duration-500 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 shadow-2xl`} />
              <div className="absolute inset-0 bg-white border-2 border-slate-200 rounded-[45px] p-8 flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:bg-transparent group-hover:border-transparent">
                <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-white/20">
                  <div className={`${val.textColor} group-hover:text-white transition-colors duration-500`}>{val.icon}</div>
                </div>
                <span className="text-slate-900 font-black uppercase italic tracking-tighter text-2xl mb-3 group-hover:text-white leading-none">{val.title}</span>
                <p className="text-slate-800 font-black text-sm leading-tight opacity-0 group-hover:opacity-100 group-hover:text-white translate-y-3 group-hover:translate-y-0 px-4">"{val.desc}"</p>
                <div className={`w-12 h-1.5 rounded-full ${val.color} mt-6 group-hover:bg-white`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- 5. GALERÍA DE ACTIVIDADES --- */}
        <div className="mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-fupagua-verde/10 px-4 py-2 rounded-full">
                <Camera size={16} className="text-fupagua-verde" />
                <span className="text-[10px] font-black uppercase tracking-widest text-fupagua-verde">Nuestra labor</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic">Fupagua <span className="text-fupagua-verde">en Acción</span></h3>
            </div>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              { size: "h-64", title: "Terapia Grupal", color: "bg-fupagua-azul" },
              { size: "h-96", title: "Actividad al Aire Libre", color: "bg-fupagua-amarillo" },
              { size: "h-72", title: "Talleres para Padres", color: "bg-fupagua-verde" },
              { size: "h-96", title: "Aprendizaje Lúdico", color: "bg-fupagua-rojo" },
              { size: "h-64", title: "Integración Social", color: "bg-fupagua-azul" },
              { size: "h-80", title: "Celebraciones", color: "bg-fupagua-amarillo" }
            ].map((img, idx) => (
              <motion.div key={idx} variants={itemVariants} className={`relative ${img.size} rounded-[40px] overflow-hidden group cursor-pointer shadow-lg`}>
                <div className={`w-full h-full ${img.color}/20 flex items-center justify-center bg-slate-200 transition-transform duration-700 group-hover:scale-110`}>
                  <ImageIcon size={48} className="text-slate-400 opacity-50" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-white font-black uppercase italic tracking-wider text-lg">{img.title}</span>
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