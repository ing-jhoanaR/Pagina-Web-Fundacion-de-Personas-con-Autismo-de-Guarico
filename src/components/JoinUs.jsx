
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, HeartHandshake, GraduationCap, Gift, Users, MessageCircle } from 'lucide-react';

const JoinUs = () => {
  const whatsappNumber = "584243390902";

  const options = [
    {
      title: "Ofertas de Empleo",
      icon: <Briefcase size={24} />,
      description: "Forma parte de nuestro equipo multidisciplinario. Buscamos especialistas comprometidos.",
      color: "border-fupagua-azul",
      textColor: "text-fupagua-azul",
      bg: "bg-blue-50/30",
      message: "Hola FUPAGUA! Me gustaría recibir información sobre las ofertas de empleo disponibles."
    },
    {
      title: "Voluntariado",
      icon: <HeartHandshake size={24} />,
      description: "Dona tu tiempo y talento para apoyar nuestras actividades culturales y sociales.",
      color: "border-fupagua-rojo",
      textColor: "text-fupagua-rojo",
      bg: "bg-red-50/30",
      message: "Hola! Estoy interesado en formar parte del equipo de voluntarios de FUPAGUA."
    },
    {
      title: "Pasantías",
      icon: <GraduationCap size={24} />,
      description: "Inicia tu camino profesional con nosotros. Convenios para estudiantes de diversas áreas.",
      color: "border-fupagua-amarillo",
      textColor: "text-fupagua-amarillo",
      bg: "bg-yellow-50/30",
      message: "Hola FUPAGUA, soy estudiante y me gustaría realizar mis pasantías con ustedes."
    },
    {
      title: "Donaciones",
      icon: <Gift size={24} />,
      description: "Desde donaciones hasta apadrinamientos. Cada granito de arena cuenta para transformar vidas.",
      color: "border-fupagua-verde",
      textColor: "text-fupagua-verde",
      bg: "bg-green-50/30",
      message: "Hola! Me gustaría conocer las diferentes formas en las que puedo colaborar con la fundación."
    }
  ];

  const openWhatsApp = (msg) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    // AJUSTE: py-24 a py-16
    <section id="unite" className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabecera - AJUSTE: Márgenes y tamaños de fuente */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4"
          >
            <Users size={12} /> Comunidad Fupagua
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic leading-tight tracking-tighter">
            Únete a nuestra <span className="text-fupagua-azul">Misión</span>
          </h2>
          <p className="mt-4 text-slate-500 font-medium max-w-xl mx-auto text-sm leading-relaxed">
            Desde 1997, nuestra labor de más de 28 años se fortalece con personas como tú. Elige cómo quieres impactar hoy.
          </p>
        </div>

        {/* Grid de Opciones - AJUSTE: Altura de tarjeta h-420 a h-340 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {options.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => openWhatsApp(item.message)}
              className={`group p-6 rounded-[30px] border-2 cursor-pointer ${item.color} ${item.bg} flex flex-col justify-between h-[340px] transition-all duration-300 hover:shadow-xl`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center ${item.textColor} mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-black uppercase italic text-slate-900 mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-[13px] font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className={`flex items-center gap-2.5 font-black uppercase text-[9px] tracking-widest ${item.textColor}`}>
                <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <MessageCircle size={14} fill="currentColor" className="text-green-500" />
                </div>
                Contactar Ahora
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner de Cierre - AJUSTE: Padding p-10 a p-7 y fuentes */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-14 p-7 md:p-9 rounded-[35px] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl"
        >
          <div className="relative z-10 text-center md:text-left">
            <h4 className="text-xl md:text-2xl font-black uppercase italic leading-tight mb-2">
              ¿Tienes otra idea para colaborar?
            </h4>
            <p className="text-slate-400 font-medium text-xs">
              Estamos abiertos a nuevas alianzas y proyectos de bienestar humano.
            </p>
          </div>
          <button 
            onClick={() => openWhatsApp("Hola! Tengo una propuesta de colaboración o proyecto para FUPAGUA.")}
            className="relative z-10 bg-fupagua-amarillo text-slate-900 px-8 py-3.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all active:scale-95 shadow-lg shadow-fupagua-amarillo/20"
          >
            Hablemos Directo
          </button>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-fupagua-azul/10 rounded-full blur-[60px]" />
        </motion.div>
        
      </div>
    </section>
  );
};

export default JoinUs;