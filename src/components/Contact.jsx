import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Instagram, 
  Twitter, 
  Facebook, 
  Send, 
  Puzzle,
  Mail,
  MapPin,
  MessageCircle
} from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hola Fupagua, mi nombre es ${formState.name}. ${formState.message}`;
    window.open(`https://wa.me/584243390902?text=${encodeURIComponent(text)}`, "_blank");
  };

  const socialLinks = [
    { icon: <Instagram size={20} />, link: "https://instagram.com/fupagua", color: "hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600" },
    { icon: <Twitter size={20} />, link: "https://twitter.com/fupaguasjm", color: "hover:bg-sky-400" },
    { icon: <Facebook size={20} />, link: "https://facebook.com/fupagua", color: "hover:bg-blue-600" },
  ];

  return (
    <section id="contacto" className="pt-32 pb-24 bg-white relative overflow-hidden">
      
      {/* TEXTO DE FONDO DECORATIVO */}
      <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <h2 className="text-[15vw] font-black uppercase italic leading-none whitespace-nowrap -ml-20">
          CONTACTO • FUPAGUA
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TITULO PREMIUM */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-1 w-12 bg-fupagua-rojo rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-fupagua-azul">Atención Prioritaria</span>
          </motion.div>

          <div className="relative inline-block">
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 uppercase italic leading-[0.85] tracking-tighter">
              Hablemos <br /> 
              <span className="relative text-fupagua-azul font-light italic ml-2 md:ml-4">
                Hoy
                <svg className="absolute -bottom-2 left-0 w-full h-4 text-fupagua-amarillo/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* COLUMNA INFO: Estilo Minimalista */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <div className="flex gap-5 items-start">
                <div className="bg-slate-900 p-4 rounded-2xl text-white shadow-xl shadow-slate-200">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Llamadas y WhatsApp</p>
                  <p className="text-xl font-black text-slate-900 italic">0246-4313552</p>
                  <p className="text-xl font-black text-fupagua-azul italic">0424-3390902</p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="bg-slate-50 p-4 rounded-2xl text-slate-400 border border-slate-100">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Ubicación</p>
                  <p className="text-sm font-bold text-slate-700 leading-snug">
                    San Juan de los Morros, <br /> Edo. Guárico, Venezuela.
                  </p>
                </div>
              </div>
            </div>

            {/* Redes Sociales con estilo de la Store */}
            <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-6">Nuestra Comunidad</p>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <a key={idx} href={social.link} target="_blank" rel="noreferrer"
                    className={`p-4 bg-white rounded-2xl shadow-sm text-slate-900 ${social.color} hover:text-white hover:scale-110 transition-all duration-300`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Banner de trayectoria */}
            <div className="flex items-center gap-4 p-6 bg-fupagua-azul/5 rounded-[30px] border border-fupagua-azul/10">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Puzzle className="text-fupagua-rojo" size={20} />
              </div>
              <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                28 años siendo la pieza fundamental <br/> 
                <span className="text-fupagua-azul font-black">en el desarrollo de Guárico.</span>
              </p>
            </div>
          </div>

          {/* COLUMNA FORMULARIO: Estilo "Dark Boutique" */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-slate-900 p-8 md:p-12 rounded-[60px] shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
                <MessageCircle size={150} />
              </div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/40 ml-2 tracking-widest">Tu Nombre</label>
                    <input 
                      required type="text" placeholder="Ej. Familia Pérez"
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white text-sm outline-none focus:border-fupagua-amarillo focus:bg-white/10 transition-all"
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/40 ml-2 tracking-widest">Email de contacto</label>
                    <input 
                      required type="email" placeholder="correo@ejemplo.com"
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white text-sm outline-none focus:border-fupagua-amarillo focus:bg-white/10 transition-all"
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-white/40 ml-2 tracking-widest">¿En qué podemos apoyarte?</label>
                  <textarea 
                    required rows="4" placeholder="Escribe tu mensaje aquí..."
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white text-sm outline-none focus:border-fupagua-amarillo focus:bg-white/10 transition-all resize-none"
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white hover:bg-fupagua-amarillo text-slate-900 py-6 rounded-[25px] font-black uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-xl group/btn"
                >
                  Enviar Mensaje <Send size={18} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 pt-4 opacity-50">
                  <span className="h-[1px] w-10 bg-white/20"></span>
                  <p className="text-[8px] text-white uppercase tracking-[0.4em]">Respuesta vía WhatsApp</p>
                  <span className="h-[1px] w-10 bg-white/20"></span>
                </div>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;