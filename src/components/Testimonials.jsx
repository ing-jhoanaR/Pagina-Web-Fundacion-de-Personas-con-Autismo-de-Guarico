

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Heart, Send, Quote } from 'lucide-react';

const Testimonials = () => {
  const [userReview, setUserReview] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [reviewsRow1, setReviewsRow1] = useState([
    { id: 1, name: "Familia Rodríguez", service: "Evaluación Integral", text: "El diagnóstico fue muy preciso. Por fin tenemos una hoja de ruta clara.", color: "bg-blue-50" },
    { id: 2, name: "María G. Pérez", service: "Psicopedagogía", text: "La Lcda. Marioxis es increíble. Los avances en lectura son notorios.", color: "bg-yellow-50" },
    { id: 3, name: "Juan Castillo", service: "Fisioterapia", text: "Excelente atención y dedicación. Se nota el amor por lo que hacen.", color: "bg-green-50" },
    { id: 4, name: "Elena de Sosa", service: "Aula Integral", text: "Mi hijo va feliz a sus clases. Gracias por crear un ambiente tan seguro.", color: "bg-red-50" },
  ]);

  const reviewsRow2 = [
    { id: 5, name: "Pedro Méndez", service: "Pediatría", text: "La Dra. Hetmys es muy profesional. El control de niño sano es excepcional.", color: "bg-purple-50" },
    { id: 6, name: "Ana Lucía R.", service: "Terapia Ocupacional", text: "Gracias a la Lcda. Nélida, mi hija ha ganado mucha autonomía.", color: "bg-orange-50" },
    { id: 7, name: "Familia Vargas", service: "Música y Cultura", text: "La música abrió un canal de comunicación maravilloso.", color: "bg-pink-50" },
    { id: 8, name: "Sra. Carmen", service: "Hidroterapia", text: "La rehabilitación en la piscina ha sido clave. Altamente recomendados.", color: "bg-cyan-50" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userReview || !userName) return alert("Por favor, escribe tu nombre y tu mensaje.");
    setIsSubmitting(true);

    setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        name: userName,
        service: "Familia Fupagua",
        text: userReview,
        color: "bg-slate-900 text-white",
        isNew: true
      };
      setReviewsRow1([newEntry, ...reviewsRow1]);
      setUserReview("");
      setUserName("");
      setIsSubmitting(false);
    }, 1000);
  };

  const ReviewRow = ({ items, direction = 1 }) => (
    <div className="flex overflow-hidden py-3 md:py-4">
      <motion.div 
        animate={{ x: direction === 1 ? [0, -1200] : [-1200, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="flex flex-nowrap gap-4 md:gap-5 min-w-full"
      >
        {[...items, ...items].map((review, idx) => (
          <div 
            key={idx} 
            // AJUSTE: Ancho de tarjeta normalizado (320px) y padding suavizado
            className={`flex-shrink-0 w-[260px] md:w-[320px] p-5 md:p-6 rounded-[25px] md:rounded-[30px] border border-slate-100 shadow-sm ${review.color} transition-all`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={8} fill={review.isNew ? "#fff" : "#fbbf24"} className={review.isNew ? "text-white" : "text-yellow-400"} />)}
              </div>
              <Quote size={14} className={review.isNew ? "text-white/20" : "text-slate-300"} />
            </div>
            <p className={`text-[11px] md:text-[12.5px] font-medium italic mb-4 leading-relaxed ${review.isNew ? "text-white" : "text-slate-700"}`}>"{review.text}"</p>
            <div className={`flex items-center gap-2.5 border-t pt-3 ${review.isNew ? "border-white/10" : "border-slate-200/50"}`}>
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-black italic ${review.isNew ? "bg-white text-slate-900" : "bg-slate-900 text-white"}`}>
                {review.name.charAt(0)}
              </div>
              <div>
                <h4 className={`text-[9px] md:text-[10px] font-black uppercase italic ${review.isNew ? "text-white" : "text-slate-900"}`}>{review.name}</h4>
                <p className={`text-[7.5px] md:text-[8px] font-bold uppercase ${review.isNew ? "text-fupagua-amarillo" : "text-fupagua-azul"}`}>{review.service}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    // AJUSTE: Padding vertical normalizado de py-32 a py-20
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
          
          {/* COLUMNA FORMULARIO (4 de 12 columnas) */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="text-center lg:text-left">
              <h3 className="text-fupagua-azul font-black uppercase text-[9px] md:text-[10px] tracking-[0.3em] mb-3 flex items-center justify-center lg:justify-start gap-2">
                <Heart size={14} className="fill-fupagua-azul" /> Comunidad Fupagua
              </h3>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic leading-tight tracking-tighter">
                Lo que dicen <br /> 
                <span className="text-slate-400 font-light italic">las familias</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-50 p-6 md:p-7 rounded-[30px] border border-slate-100 shadow-inner space-y-4">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 bg-fupagua-amarillo rounded-lg flex items-center justify-center shadow-sm">
                  <MessageSquare size={16} className="text-slate-900" />
                </div>
                <h4 className="font-black text-slate-900 uppercase italic text-[11px] md:text-xs">Tu opinión importa</h4>
              </div>

              <input 
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Nombre de la familia..."
                className="w-full bg-white border border-slate-100 rounded-xl p-3.5 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none"
              />
              
              <textarea 
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                placeholder="Escribe aquí tu experiencia..."
                className="w-full bg-white border border-slate-100 rounded-xl p-3.5 text-xs h-24 resize-none focus:ring-2 focus:ring-fupagua-azul outline-none"
              />
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-slate-900 text-white py-3.5 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-fupagua-azul transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50' : ''}`}
              >
                {isSubmitting ? "Enviando..." : <><Send size={12} /> Publicar Reseña</>}
              </button>
            </form>
          </div>

          {/* COLUMNA SCROLL (8 de 12 columnas) */}
          <div className="lg:col-span-8 relative order-1 lg:order-2">
            <div className="hidden md:block absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="hidden md:block absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="space-y-2 md:space-y-4">
              <ReviewRow items={reviewsRow1} direction={1} />
              <ReviewRow items={reviewsRow2} direction={-1} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;