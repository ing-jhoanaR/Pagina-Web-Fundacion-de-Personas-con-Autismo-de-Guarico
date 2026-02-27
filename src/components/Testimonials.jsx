import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Heart, Send, Quote, Award } from 'lucide-react';

const Testimonials = () => {
  const [userReview, setUserReview] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedService, setSelectedService] = useState("Familia Fupagua");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [reviews, setReviews] = useState([
    { id: 1, name: "Familia Rodríguez", service: "Evaluación Integral", text: "El diagnóstico fue muy preciso. Por fin tenemos una hoja de ruta clara para el desarrollo de nuestro hijo.", color: "bg-blue-50/40" },
    { id: 2, name: "María G. Pérez", service: "Psicopedagogía", text: "La Lcda. Marioxis es increíble. Los avances en lectura son notorios en muy poco tiempo.", color: "bg-slate-50" },
    { id: 3, name: "Juan Castillo", service: "Fisioterapia", text: "Excelente atención y dedicación. Se nota el compromiso y el amor por lo que hacen en cada sesión.", color: "bg-green-50/40" },
    { id: 4, name: "Elena de Sosa", service: "Aula Integral", text: "Mi hijo va feliz a sus clases. Gracias por crear un ambiente tan seguro y estimulante.", color: "bg-red-50/40" },
    { id: 5, name: "Pedro Méndez", service: "Pediatría", text: "La Dra. Hetmys es muy profesional. El control de niño sano es excepcional y muy detallado.", color: "bg-slate-50" },
    { id: 6, name: "Ana Lucía R.", service: "Terapia Ocupacional", text: "Gracias a la Lcda. Nélida, mi hija ha ganado mucha autonomía en sus actividades diarias.", color: "bg-orange-50/40" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userReview || !userName) return alert("Por favor, completa los campos.");
    setIsSubmitting(true);

    setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        name: userName,
        service: selectedService,
        text: userReview,
        color: "bg-slate-900 text-white shadow-2xl scale-105",
        isNew: true
      };
      
      setReviews([newEntry, ...reviews]);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setUserReview("");
        setUserName("");
        setShowSuccess(false);
      }, 3000);
    }, 1200);
  };

  return (
    <section id="testimonios" className="pt-32 pb-24 bg-white relative overflow-hidden">
      
      {/* TEXTO DE FONDO DECORATIVO */}
      <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <h2 className="text-[15vw] font-black uppercase italic leading-none whitespace-nowrap -ml-20">
          COMUNIDAD FUPAGUA 1997
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TITULO MEJORADO */}
        <div className="mb-20 relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-1 w-12 bg-fupagua-amarillo rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-fupagua-azul">Experiencias Reales</span>
          </motion.div>

          <div className="relative inline-block">
            <h2 className="text-5xl md:text-8xl font-black text-slate-900 uppercase italic leading-[0.85] tracking-tighter">
              Lo que dicen <br /> 
              <span className="relative text-slate-400 font-light italic ml-2 md:ml-4">
                las familias
                {/* Subrayado orgánico SVG */}
                <svg className="absolute -bottom-2 left-0 w-full h-4 text-fupagua-amarillo/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h2>
          </div>
          
          <p className="mt-8 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] max-w-md leading-relaxed border-l-2 border-slate-100 pl-6">
            Más de 28 años construyendo puentes hacia el bienestar y la inclusión.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* FORMULARIO */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-32 bg-white p-8 md:p-10 rounded-[45px] border-2 border-slate-50 shadow-xl shadow-slate-200/50">
              <div className="mb-8 flex items-center gap-4">
                <div className="p-3 bg-fupagua-azul/10 rounded-2xl text-fupagua-azul">
                   <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="text-slate-900 font-black uppercase italic text-lg leading-tight">Tu opinión <br/> es valiosa</h4>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Familia / Representante</label>
                  <input required type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Tu nombre..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-900 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none transition-all" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Servicio</label>
                  <select 
                    value={selectedService} 
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-900 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none cursor-pointer"
                  >
                    <option>Evaluación Integral</option>
                    <option>Psicopedagogía</option>
                    <option>Terapia Ocupacional</option>
                    <option>Fisioterapia</option>
                    <option>Hidroterapia</option>
                    <option>Aula Integral</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Tu Experiencia</label>
                  <textarea required value={userReview} onChange={(e) => setUserReview(e.target.value)} placeholder="Escribe aquí..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-900 text-xs h-36 resize-none focus:ring-2 focus:ring-fupagua-azul outline-none transition-all" />
                </div>
                
                <button 
                  type="submit" disabled={isSubmitting || showSuccess}
                  className={`w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg 
                    ${showSuccess ? 'bg-green-500 text-white' : 'bg-slate-900 hover:bg-fupagua-azul text-white'}`}
                >
                  {isSubmitting ? "Enviando..." : showSuccess ? "¡Publicado!" : <><Send size={14} /> Publicar</>}
                </button>
              </form>
            </div>
          </div>

          {/* MURO DE RESEÑAS */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
              <AnimatePresence>
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`break-inside-avoid p-8 rounded-[40px] border border-slate-100 shadow-sm relative group transition-all hover:shadow-xl ${review.color}`}
                  >
                    <Quote className={`absolute top-6 right-8 opacity-10 ${review.isNew ? 'text-white' : 'text-fupagua-azul'}`} size={32} />
                    
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill={review.isNew ? "white" : "#fbbf24"} className={review.isNew ? "text-white" : "text-yellow-400"} />
                      ))}
                    </div>

                    <p className={`text-[14px] font-medium italic leading-relaxed mb-8 ${review.isNew ? 'text-white/90' : 'text-slate-600'}`}>
                      "{review.text}"
                    </p>

                    <div className={`flex items-center gap-4 border-t pt-5 ${review.isNew ? 'border-white/10' : 'border-slate-100'}`}>
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xs font-black italic shadow-sm shrink-0 ${review.isNew ? 'bg-white text-slate-900' : 'bg-fupagua-azul text-white'}`}>
                        {review.name.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className={`text-[11px] font-black uppercase italic truncate ${review.isNew ? 'text-white' : 'text-slate-900'}`}>{review.name}</h4>
                        <p className={`text-[9px] font-bold uppercase tracking-tighter ${review.isNew ? 'text-fupagua-amarillo' : 'text-fupagua-azul'}`}>{review.service}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;