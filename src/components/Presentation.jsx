

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Globe, Handshake, Landmark } from 'lucide-react';

const Presentation = () => {
  return (
    <section id="presentacion" className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* LADO IZQUIERDO: TEXTO DE PODER */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-3/5 space-y-6 md:space-y-8"
          >
            <div className="space-y-3">
              <motion.span className="text-fupagua-azul font-black uppercase tracking-widest text-[10px] md:text-xs">
                Quiénes Somos
              </motion.span>
              {/* AJUSTE: Bajamos de text-7xl a text-4xl/text-5xl */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 uppercase italic leading-[0.95] tracking-tight">
                Atención <span className="text-fupagua-amarillo">Integral</span> <br />
                Sin Límites
              </h2>
            </div>

            {/* AJUSTE: Bajamos de text-xl a text-lg y borde más fino */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium italic border-l-4 md:border-l-8 border-fupagua-azul pl-6 md:pl-8">
              "FUPAGUA es una organización sin fines de lucro dedicada a transformar la vida de niños y adolescentes con condiciones del espectro autista y otras discapacidades."
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-500 leading-relaxed">
              <p>
                Desde nuestra fundación hace más de 28 años, trabajamos codo a codo con las familias para promover una inclusión social y educativa real. No solo ofrecemos terapias; creamos puentes hacia un desarrollo óptimo mediante programas de arte, cultura y especialidades médicas.
              </p>
              <p>
                A pesar de los retos, hemos avanzado gracias al apoyo del Estado y la comunidad. Nuestra meta es la actualización constante, capacitándonos a nivel nacional e internacional para ofrecer lo mejor.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 pt-2">
               <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <Globe size={14} className="text-fupagua-verde" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase">Alcance Internacional</span>
               </div>
               <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <Handshake size={14} className="text-fupagua-azul" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase">Apoyo Comunitario</span>
               </div>
            </div>
          </motion.div>

          {/* LADO DERECHO: COMPOSICIÓN DE IMAGEN ELEGANTE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-2/5 relative mt-10 lg:mt-0"
          >
            {/* AJUSTE: Reducción del grosor del borde y altura de imagen para que no ocupe tanto */}
            <div className="relative rounded-[60px] md:rounded-[80px] overflow-hidden shadow-2xl border-[10px] md:border-[15px] border-slate-50">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop" 
                alt="Capacitación Fupagua" 
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-fupagua-azul/10 hover:bg-transparent transition-colors duration-500"></div>
            </div>
            
            {/* Badge Flotante - AJUSTE: Padding reducido */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 bg-slate-900 text-white p-5 md:p-8 rounded-[30px] md:rounded-[40px] shadow-2xl max-w-[160px] md:max-w-[200px]"
            >
              <Landmark className="text-fupagua-amarillo mb-3 md:mb-4" size={24} md:size={32} />
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-tighter italic">Comprometidos con la justicia y la solidaridad social.</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Presentation;