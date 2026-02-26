
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
    <div className="flex overflow-hidden py-2 md:py-4">
      <motion.div 
        animate={{ x: direction === 1 ? [0, -1200] : [-1200, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex flex-nowrap gap-4 md:gap-6 min-w-full"
      >
        {[...items, ...items].map((review, idx) => (
          <div 
            key={idx} 
            className={`flex-shrink-0 w-[280px] md:w-[350px] p-6 md:p-8 rounded-[30px] md:rounded-[35px] border border-slate-100 shadow-sm ${review.color} transition-all`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={review.isNew ? "#fff" : "#fbbf24"} className={review.isNew ? "text-white" : "text-yellow-400"} />)}
              </div>
              <Quote size={18} className={review.isNew ? "text-white/20" : "text-slate-300"} />
            </div>
            <p className={`text-xs md:text-sm font-medium italic mb-6 leading-relaxed ${review.isNew ? "text-white" : "text-slate-700"}`}>"{review.text}"</p>
            <div className={`flex items-center gap-3 border-t pt-4 ${review.isNew ? "border-white/10" : "border-slate-200/50"}`}>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black italic ${review.isNew ? "bg-white text-slate-900" : "bg-slate-900 text-white"}`}>
                {review.name.charAt(0)}
              </div>
              <div>
                <h4 className={`text-[10px] md:text-[11px] font-black uppercase italic ${review.isNew ? "text-white" : "text-slate-900"}`}>{review.name}</h4>
                <p className={`text-[8px] md:text-[9px] font-bold uppercase ${review.isNew ? "text-fupagua-amarillo" : "text-fupagua-azul"}`}>{review.service}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-center">
          
          {/* FORMULARIO RESPONSIVO */}
          <div className="lg:col-span-1 space-y-8 md:space-y-10 order-2 lg:order-1">
            <div className="text-center lg:text-left">
              <h3 className="text-fupagua-azul font-black uppercase text-[10px] md:text-[12px] tracking-[0.4em] mb-4 flex items-center justify-center lg:justify-start gap-2">
                <Heart size={16} className="fill-fupagua-azul" /> Comunidad Fupagua
              </h3>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic leading-[0.9] tracking-tighter">
                Lo que dicen <br /> 
                <span className="text-slate-400 font-light">las familias</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-50 p-6 md:p-8 rounded-[35px] md:rounded-[40px] border border-slate-100 shadow-inner space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-fupagua-amarillo rounded-xl flex items-center justify-center shadow-sm">
                  <MessageSquare size={18} className="text-slate-900" />
                </div>
                <h4 className="font-black text-slate-900 uppercase italic text-xs md:text-sm">Tu opinión importa</h4>
              </div>

              <input 
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Nombre de la familia..."
                className="w-full bg-white border-none rounded-xl p-4 text-xs md:text-sm focus:ring-2 focus:ring-fupagua-azul shadow-sm outline-none"
              />
              
              <textarea 
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                placeholder="Escribe aquí tu experiencia..."
                className="w-full bg-white border-none rounded-xl p-4 text-xs md:text-sm focus:ring-2 focus:ring-fupagua-azul h-24 md:h-28 resize-none shadow-sm outline-none"
              />
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-fupagua-azul transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50' : ''}`}
              >
                {isSubmitting ? "Enviando..." : <><Send size={14} /> Publicar Reseña</>}
              </button>
            </form>
          </div>

          {/* SCROLL INFINITO RESPONSIVO */}
          <div className="lg:col-span-2 relative order-1 lg:order-2">
            {/* Gradientes laterales (solo visibles en desktop para no tapar en móvil) */}
            <div className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="space-y-4 md:space-y-6">
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