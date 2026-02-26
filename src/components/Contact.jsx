import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Instagram, 
  Twitter, 
  Facebook, 
  Send, 
  Puzzle
} from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hola Fupagua, mi nombre es ${formState.name}. ${formState.message}`;
    window.open(`https://wa.me/584243390902?text=${encodeURIComponent(text)}`, "_blank");
  };

  const socialLinks = [
    { icon: <Instagram size={18} />, link: "https://instagram.com/fupagua", color: "hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600" },
    { icon: <Twitter size={18} />, link: "https://twitter.com/fupaguasjm", color: "hover:bg-sky-400" },
    { icon: <Facebook size={18} />, link: "https://facebook.com/fupagua", color: "hover:bg-blue-600" },
  ];

  return (
    /* py-16 en lugar de py-24 para reducir altura */
    <section id="contacto" className="py-16 bg-white relative overflow-hidden">
      
      {/* PIEZA DECORATIVA MÁS PEQUEÑA */}
      <motion.div 
        animate={{ rotate: [0, 10, -10, 0], y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-16 top-10 opacity-10 pointer-events-none"
      >
        <Puzzle size={250} strokeWidth={1} className="text-fupagua-azul" />
      </motion.div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* COLUMNA INFO */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-fupagua-rojo font-black uppercase text-[9px] tracking-[0.4em]"
              >
                Estamos para ti
              </motion.span>
              {/* Título reducido de text-7xl a text-5xl */}
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic leading-none tracking-tighter mt-2">
                Hablemos <br /> <span className="text-fupagua-azul">Hoy</span>
              </h2>
            </div>

            <div className="space-y-4">
              {/* Bloque Teléfonos compacto */}
              <div className="flex gap-4 items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="bg-fupagua-azul p-3 rounded-xl text-white shadow-md">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-400">Líneas Directas</p>
                  <p className="text-md font-black text-slate-900 leading-tight">0246-4313552 / 0424-3390902</p>
                </div>
              </div>

              {/* Bloque Redes compacto */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">SÍGUENOS:</span>
                <div className="flex gap-2">
                  {socialLinks.map((social, idx) => (
                    <a key={idx} href={social.link} target="_blank" rel="noreferrer"
                      className={`p-2.5 bg-white rounded-lg shadow-sm text-slate-900 ${social.color} hover:text-white transition-all`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Frase motivacional pequeña */}
            <div className="flex items-center gap-3 p-4 bg-fupagua-amarillo/10 rounded-2xl border border-fupagua-amarillo/20">
              <Puzzle className="text-fupagua-rojo fill-fupagua-rojo" size={24} />
              <p className="text-[11px] font-bold text-slate-700 leading-tight">
                Cada pieza es única, <span className="uppercase font-black text-fupagua-azul">juntos formamos el todo.</span>
              </p>
            </div>
          </div>

          {/* COLUMNA FORMULARIO */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-slate-900 p-6 md:p-8 rounded-[35px] shadow-xl relative overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Nombre</label>
                    <input 
                      required type="text" placeholder="Ej. Juan Pérez"
                      className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-white text-sm outline-none focus:border-fupagua-amarillo transition-all"
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Correo</label>
                    <input 
                      required type="email" placeholder="juan@ejemplo.com"
                      className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-white text-sm outline-none focus:border-fupagua-amarillo transition-all"
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Mensaje</label>
                  <textarea 
                    required rows="3" placeholder="¿En qué podemos ayudarte?"
                    className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-white text-sm outline-none focus:border-fupagua-amarillo transition-all resize-none"
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-fupagua-azul hover:bg-fupagua-amarillo hover:text-slate-900 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg group"
                >
                  Enviar Mensaje <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-[8px] text-slate-500 uppercase tracking-widest">
                  Respuesta inmediata vía <span className="text-white">WhatsApp 24/7</span>
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