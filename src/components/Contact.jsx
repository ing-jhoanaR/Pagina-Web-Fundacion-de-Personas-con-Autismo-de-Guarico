

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MessageCircle, 
  Instagram, 
  Twitter, 
  Facebook, 
  Send, 
  MapPin, 
  Mail,
  Puzzle
} from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías integrar con EmailJS o enviar a WhatsApp
    const text = `Hola Fupagua, mi nombre es ${formState.name}. ${formState.message}`;
    window.open(`https://wa.me/584243390902?text=${encodeURIComponent(text)}`, "_blank");
  };

  const socialLinks = [
    { icon: <Instagram size={20} />, link: "https://instagram.com/fupagua", color: "hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600", label: "@fupagua" },
    { icon: <Twitter size={20} />, link: "https://twitter.com/fupaguasjm", color: "hover:bg-sky-400", label: "@fupaguasjm" },
    { icon: <Facebook size={20} />, link: "https://facebook.com/fupagua", color: "hover:bg-blue-600", label: "fupagua" },
  ];

  return (
    <section id="contacto" className="py-24 bg-white relative overflow-hidden">
      {/* PIEZA DE ROMPECABEZAS DECORATIVA (COLORES FUPAGUA) */}
      <motion.div 
        animate={{ 
          rotate: [0, 10, -10, 0],
          y: [0, -20, 0] 
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 top-20 opacity-10 lg:opacity-20 pointer-events-none"
      >
        <Puzzle size={400} strokeWidth={1} className="text-fupagua-azul" />
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* COLUMNA INFO (4 ESPACIOS) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-fupagua-rojo font-black uppercase text-[10px] tracking-[0.5em]"
              >
                Estamos para ti
              </motion.span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase italic leading-none tracking-tighter mt-4">
                Hablemos <br /> <span className="text-fupagua-azul">Hoy</span>
              </h2>
            </div>

            <div className="space-y-6">
              {/* Bloque Teléfonos */}
              <div className="flex gap-6 items-start p-6 bg-slate-50 rounded-[30px] border border-slate-100 hover:shadow-xl transition-all group">
                <div className="bg-fupagua-azul p-4 rounded-2xl text-white shadow-lg">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Líneas Directas</p>
                  <p className="text-lg font-black text-slate-900">0246-4313552</p>
                  <p className="text-lg font-black text-slate-900">0424-3390902</p>
                </div>
              </div>

              {/* Bloque Redes */}
              <div className="p-6 bg-slate-50 rounded-[30px] border border-slate-100">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest text-center lg:text-left">Nuestras Redes Sociales</p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {socialLinks.map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      whileHover={{ y: -5 }}
                      className={`p-4 bg-white rounded-2xl shadow-sm text-slate-900 ${social.color} hover:text-white transition-all duration-300`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Pequeña Pieza de Rompecabezas en Color */}
            <div className="flex items-center gap-4 p-6 bg-fupagua-amarillo/10 rounded-3xl border border-fupagua-amarillo/20">
              <Puzzle className="text-fupagua-rojo fill-fupagua-rojo" size={32} />
              <p className="text-xs font-bold text-slate-700 leading-tight">
                Cada pieza es única, <br />
                <span className="uppercase font-black text-fupagua-azul">juntos formamos el todo.</span>
              </p>
            </div>
          </div>

          {/* COLUMNA FORMULARIO (7 ESPACIOS) */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-slate-900 p-8 md:p-12 rounded-[50px] shadow-2xl relative overflow-hidden"
            >
              {/* Círculos de luz de fondo */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-fupagua-azul/20 rounded-full blur-[80px]" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-fupagua-rojo/10 rounded-full blur-[80px]" />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Nombre Completo</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Ej. Juan Pérez"
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-fupagua-amarillo focus:bg-white/10 transition-all"
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Correo Electrónico</label>
                    <input 
                      required
                      type="email" 
                      placeholder="juan@ejemplo.com"
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-fupagua-amarillo focus:bg-white/10 transition-all"
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">¿En qué podemos ayudarte?</label>
                  <textarea 
                    required
                    rows="4"
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-fupagua-amarillo focus:bg-white/10 transition-all resize-none"
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-fupagua-azul hover:bg-fupagua-amarillo hover:text-slate-900 text-white py-6 rounded-[25px] font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-xl group"
                >
                  Enviar Mensaje <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                </button>

                <p className="text-center text-[9px] text-slate-500 uppercase tracking-widest pt-4">
                  También puedes escribirnos directamente a nuestro <span className="text-white">WhatsApp 24/7</span>
                </p>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;