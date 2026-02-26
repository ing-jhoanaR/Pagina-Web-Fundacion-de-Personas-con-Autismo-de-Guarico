import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Eye, ShieldCheck, Calendar, Users, 
  Heart, Sparkles, Handshake, Camera, Image as ImageIcon,
  UserCheck, Award, Star
} from 'lucide-react';

const AboutUs = () => {
  const [periodoActivo, setPeriodoActivo] = useState("2013-Actualidad");
  // Estado para controlar qué valor está "volteado" en móvil
  const [valorActivo, setValorActivo] = useState(null);

  const consejos = [
    {
      periodo: "2013-Actualidad",
      miembros: [
        { nombre: "Carmen Yarisma Molina", cargo: "Presidenta", desc: "Liderazgo comprometido con la excelencia.", color: "bg-fupagua-azul" },
        { nombre: "Zaida Cortéz", cargo: "Vice Presidenta", desc: "Fortalecimiento operativo.", color: "bg-fupagua-verde" },
        { nombre: "Sonia Castellanos", cargo: "Secretaria", desc: "Gestión administrativa.", color: "bg-fupagua-amarillo" },
        { nombre: "Hidalia Alfonso", cargo: "Secretaria", desc: "Coordinación comunitaria.", color: "bg-fupagua-rojo" },
        { nombre: "Egleé Lara", cargo: "Vocal", desc: "Proyectos sociales.", color: "bg-fupagua-azul" }
      ]
    },
    {
      periodo: "2008-2012",
      miembros: [
        { nombre: "Carmen Yarisma Molina", cargo: "Presidenta" },
        { nombre: "Isabel Peña", cargo: "Vice Presidenta" },
        { nombre: "Marlene Mora", cargo: "Secretaria" },
        { nombre: "Hidalia Alfonso", cargo: "Secretaria" },
        { nombre: "Ma. Rosario Mirabal", cargo: "Vocal" }
      ]
    },
    {
      periodo: "1997-2000",
      miembros: [
        { nombre: "Haydee Lozano", cargo: "Presidencia" },
        { nombre: "María Bretaña", cargo: "Vice Presidente" },
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

  return (
    <section id="nosotros" className="relative py-12 md:py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* CABECERA HISTORIA */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-fupagua-azul/10 px-3 py-1 rounded-full">
              <Calendar size={12} className="text-fupagua-azul" />
              <span className="text-[8px] font-black uppercase tracking-widest text-fupagua-azul">Desde 1997 (+28 años)</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic leading-none">
              Nuestra <span className="text-fupagua-azul">Esencia</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Dedicados a reconocer, respetar y defender los derechos de personas con TEA en el estado Guárico.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-slate-900 p-6 md:p-10 rounded-[30px] md:rounded-[50px] text-white relative shadow-xl">
            <Users className="text-fupagua-amarillo mb-4" size={32} />
            <h3 className="text-lg md:text-xl font-black uppercase italic mb-2">Compromiso Familiar</h3>
            <p className="text-slate-400 text-[11px] md:text-sm leading-relaxed italic">
              "No solo atendemos individuos, integramos familias."
            </p>
          </motion.div>
        </div>

        {/* MISIÓN Y VISIÓN */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-20">
          <div className="bg-white p-6 md:p-8 rounded-[30px] shadow-sm border border-slate-100">
            <Target className="text-fupagua-azul mb-4" size={24} />
            <h3 className="text-xl font-black uppercase italic text-slate-900 mb-2">Misión</h3>
            <p className="text-slate-600 text-xs md:text-sm">Promover la participación activa de personas con TEA en sus comunidades.</p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-[30px] shadow-sm border border-slate-100">
            <Eye className="text-fupagua-verde mb-4" size={24} />
            <h3 className="text-xl font-black uppercase italic text-slate-900 mb-2">Visión</h3>
            <p className="text-slate-600 text-xs md:text-sm">Ser el referente regional en defensa de derechos e integración efectiva.</p>
          </div>
        </div>

        {/* VALORES - AQUÍ ESTÁ LA CORRECCIÓN TÁCTIL */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase italic">
            Valores <span className="text-fupagua-azul">Fupagua</span>
          </h2>
          <p className="text-slate-500 text-[10px] uppercase mt-2">Toca cada tarjeta para descubrir más</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-20">
          {valores.map((val, idx) => (
            <motion.div 
              key={idx}
              onClick={() => setValorActivo(valorActivo === idx ? null : idx)}
              className="relative h-44 md:h-64 cursor-pointer"
            >
              <div className={`absolute inset-0 ${val.color} rounded-[25px] transition-opacity duration-300 ${valorActivo === idx ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100 shadow-xl'}`} />
              
              <div className={`absolute inset-0 bg-white border border-slate-200 rounded-[25px] p-4 flex flex-col items-center justify-center text-center transition-all ${valorActivo === idx ? 'bg-transparent border-transparent' : ''}`}>
                <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-3 transition-all ${valorActivo === idx ? 'bg-white/20' : ''}`}>
                  <div className={`${valorActivo === idx ? 'text-white' : val.textColor}`}>{val.icon}</div>
                </div>
                <span className={`font-black uppercase italic text-sm md:text-lg mb-1 transition-colors ${valorActivo === idx ? 'text-white' : 'text-slate-900'}`}>
                  {val.title}
                </span>
                <p className={`font-bold text-[9px] md:text-xs transition-all ${valorActivo === idx ? 'opacity-100 text-white' : 'opacity-0'}`}>
                  "{val.desc}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutUs;