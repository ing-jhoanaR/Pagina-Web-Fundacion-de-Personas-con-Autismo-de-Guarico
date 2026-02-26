

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, HeartHandshake, GraduationCap, Gift, ChevronRight, Users, MessageCircle } from 'lucide-react';

const JoinUs = () => {
  const whatsappNumber = "584243390902";

  const options = [
    {
      title: "Ofertas de Empleo",
      icon: <Briefcase size={32} />,
      description: "Forma parte de nuestro equipo multidisciplinario. Buscamos especialistas comprometidos con la excelencia.",
      color: "border-fupagua-azul",
      textColor: "text-fupagua-azul",
      bg: "bg-blue-50/50",
      message: "Hola FUPAGUA! Me gustaría recibir información sobre las ofertas de empleo disponibles y cómo enviar mi CV."
    },
    {
      title: "Voluntariado",
      icon: <HeartHandshake size={32} />,
      description: "Dona tu tiempo y talento para apoyar nuestras actividades culturales, recreativas y sociales.",
      color: "border-fupagua-rojo",
      textColor: "text-fupagua-rojo",
      bg: "bg-red-50/50",
      message: "Hola! Estoy interesado en formar parte del equipo de voluntarios de FUPAGUA. ¿Cómo puedo empezar?"
    },
    {
      title: "Pasantías",
      icon: <GraduationCap size={32} />,
      description: "Inicia tu camino profesional con nosotros. Contamos con convenios para estudiantes de diversas áreas.",
      color: "border-fupagua-amarillo",
      textColor: "text-fupagua-amarillo",
      bg: "bg-yellow-50/50",
      message: "Hola FUPAGUA, soy estudiante y me gustaría realizar mis pasantías con ustedes. ¿Cuáles son los requisitos?"
    },
    {
      title: "Formas de Participar",
      icon: <Gift size={32} />,
      description: "Desde donaciones hasta apadrinamientos. Cada granito de arena cuenta para seguir transformando vidas.",
      color: "border-fupagua-verde",
      textColor: "text-fupagua-verde",
      bg: "bg-green-50/50",
      message: "Hola! Me gustaría conocer las diferentes formas en las que puedo colaborar o hacer una donación a la fundación."
    }
  ];

  const openWhatsApp = (msg) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="unite" className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Cabecera */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <Users size={14} /> Comunidad Fupagua
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase italic leading-none tracking-tighter">
            Únete a nuestra <span className="text-fupagua-azul">Misión</span>
          </h2>
          <p className="mt-6 text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            Desde 1997, nuestra labor de más de 28 años se fortalece con personas como tú. Elige cómo quieres ser parte de este impacto.
          </p>
        </div>

        {/* Grid de Opciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => openWhatsApp(item.message)}
              className={`group p-8 rounded-[40px] border-2 cursor-pointer ${item.color} ${item.bg} flex flex-col justify-between h-[420px] transition-all duration-500 hover:shadow-2xl`}
            >
              <div>
                <div className={`w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center ${item.textColor} mb-8 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black uppercase italic text-slate-900 mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className={`flex items-center gap-3 font-black uppercase text-[10px] tracking-widest ${item.textColor}`}>
                <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <MessageCircle size={16} fill="currentColor" className="text-green-500" />
                </div>
                Contactar Ahora
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner de Cierre */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 p-10 rounded-[50px] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10">
            <h4 className="text-3xl font-black uppercase italic leading-none mb-2">
              ¿Tienes otra idea para colaborar?
            </h4>
            <p className="text-slate-400 font-medium text-sm">
              Estamos siempre abiertos a nuevas alianzas y proyectos de bienestar humano.
            </p>
          </div>
          <button 
            onClick={() => openWhatsApp("Hola! Tengo una propuesta de colaboración o proyecto para FUPAGUA.")}
            className="relative z-10 bg-fupagua-amarillo text-slate-900 px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:scale-105 transition-all active:scale-95"
          >
            Hablemos Directo
          </button>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-fupagua-azul/20 rounded-full blur-[80px]" />
        </motion.div>
        
      </div>
    </section>
  );
};

export default JoinUs;