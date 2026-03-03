import React, { useEffect, useState, useRef } from 'react';
import { db } from '../firebase'; 
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Play, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

const GaleriaPublica = () => {
  const [medios, setMedios] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);

  // 1. CARGA DE DATOS (FIREBASE)
  useEffect(() => {
    const q = query(collection(db, "galeria"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.archivos && data.archivos.length > 0) {
          data.archivos.forEach((archivo, index) => {
            docs.push({ 
              id: `${doc.id}-${index}`,
              titulo: data.titulo, 
              categoria: data.categoria,
              ...archivo 
            });
          });
        }
      });
      setMedios(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. LÓGICA DE NAVEGACIÓN (SIN TRANSICIÓN DE DESPLAZAMIENTO)
  const nextSlide = () => {
    setMedios(prev => {
      const newArr = [...prev];
      const first = newArr.shift();
      newArr.push(first);
      return newArr;
    });
  };

  const prevSlide = () => {
    setMedios(prev => {
      const newArr = [...prev];
      const last = newArr.pop();
      newArr.unshift(last);
      return newArr;
    });
  };

  // 3. AUTOPLAY DEL VIDEO
  // Esta función asegura que si el archivo es video, intente reproducirse al aparecer
  useEffect(() => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.play().catch(error => console.log("Autoplay bloqueado o cargando"));
      }
    });
  }, [medios]);

  if (loading) return null;

  return (
    <section id="galeria" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* CABECERA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-4">
            <ImageIcon size={30} className="text-fupagua-verde" />
            <h3 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
              Fupagua <span className="text-fupagua-verde font-light">en Acción</span>
            </h3>
          </div>

          {/* FLECHAS SIN TRANSICIÓN DE MOVIMIENTO */}
          <div className="flex gap-3">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center hover:bg-fupagua-azul hover:text-white transition-colors shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center hover:bg-fupagua-azul hover:text-white transition-colors shadow-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        {/* CONTENEDOR DE 3 ELEMENTOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {medios.slice(0, 3).map((item, idx) => (
            <div 
              key={item.id} 
              className={`relative aspect-[3/4] rounded-[40px] overflow-hidden group shadow-xl bg-slate-900 border border-slate-100 transition-transform duration-300 ${
                idx === 1 ? 'md:scale-105 z-10' : 'scale-100'
              }`}
            >
              {/* LÓGICA DE VIDEO CORREGIDA */}
              {item.type === 'video' ? (
                <video 
                  ref={el => videoRefs.current[idx] = el}
                  src={item.url} 
                  className="w-full h-full object-cover"
                  loop 
                  muted 
                  playsInline
                  autoPlay
                />
              ) : (
                <img 
                  src={item.url} 
                  alt={item.titulo} 
                  className="w-full h-full object-cover"
                />
              )}

              {/* OVERLAY ESTILO FUPAGUA */}
              <div className="absolute inset-0 bg-gradient-to-t from-fupagua-verde/95 via-fupagua-verde/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                <span className="bg-white/20 backdrop-blur-sm inline-block self-start px-3 py-1.5 rounded-full text-white font-black uppercase italic text-[10px] mb-2">
                  {item.categoria || 'Actividad'}
                </span>
                <div className="flex justify-between items-center gap-4">
                  <h5 className="text-white font-black uppercase italic text-xl leading-tight line-clamp-2">
                    {item.titulo}
                  </h5>
                  <div className="text-white/70 p-2 rounded-xl">
                    <Maximize2 size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GaleriaPublica;