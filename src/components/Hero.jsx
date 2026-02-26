
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      img: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000",
      tag: "Neurodiversidad Guárico",
      title: "Santuario Sensorial",
      desc: "Bienestar neuroinclusivo e integración sensorial en San Juan de los Morros.",
      color: "border-fupagua-amarillo"
    },
    {
      img: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d9d?q=80&w=2000",
      tag: "Compromiso Social",
      title: "Cimiento de Sueños",
      desc: "Transformando realidades con amor y ciencia. Bienvenidos a la gran familia FUPAGUA.",
      color: "border-fupagua-verde"
    },
    {
      img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000",
      tag: "Excelencia Profesional",
      title: "Ciencia con Corazón",
      desc: "Atención especializada con los más altos estándares éticos y profesionales para el desarrollo integral.",
      color: "border-fupagua-rojo"
    },
    {
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000",
      tag: "Terapias Integrales",
      title: "Pasos Firmes",
      desc: "Acompañamos cada etapa del desarrollo con terapias ocupacionales y psicopedagogía de vanguardia.",
      color: "border-fupagua-azul"
    },
    {
      img: "https://images.unsplash.com/photo-1536640712247-c755313928fb?q=80&w=2000",
      tag: "Inclusión Real",
      title: "Mundo de Colores",
      desc: "Fomentamos la autonomía y la participación social efectiva de cada uno de nuestros niños.",
      color: "border-fupagua-amarillo"
    },
    {
      img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000",
      tag: "Formación Familiar",
      title: "Unidos por Ellos",
      desc: "Capacitamos a las familias para ser el mejor apoyo en el hogar, creando una red de amor incondicional.",
      color: "border-fupagua-verde"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-fupagua-azul pt-[180px] md:pt-0 flex items-start md:items-center">
      
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-60 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img 
            src={slide.img} 
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${
              index === current ? 'scale-110' : 'scale-100'
            }`} 
            alt="Fupagua" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-fupagua-azul/90 via-fupagua-azul/60 to-transparent" />
        </div>
      ))}

      <div className="relative z-20 w-full px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl space-y-4 md:space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
          
          <div>
            <span className={`inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border-l-4 ${slides[current].color} text-white text-[9px] md:text-xs font-black uppercase tracking-[0.2em]`}>
              {slides[current].tag}
            </span>
          </div>

          <h1 className="text-white text-4xl md:text-7xl lg:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter drop-shadow-2xl">
            {slides[current].title.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? 'text-fupagua-amarillo block' : 'block'}>
                {word}
              </span>
            ))}
          </h1>

          <p className="text-white/90 text-sm md:text-xl font-medium max-w-[300px] md:max-w-xl leading-snug drop-shadow-md border-l-2 border-white/20 pl-4 md:pl-6">
            {slides[current].desc}
          </p>

          <div className="pt-4 md:pt-6 flex flex-col sm:flex-row gap-4">
            <a href="#servicios" className="bg-fupagua-verde hover:bg-white hover:text-fupagua-azul text-white px-10 py-4 rounded-xl font-black text-xs tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 group uppercase">
              Nuestros Servicios 
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#donar" className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-xl font-black text-xs tracking-widest transition-all text-center uppercase">
              Quiero Apoyar
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-30 flex">
        {slides.map((_, i) => (
          <div key={i} className="flex-1 h-2 bg-white/10 cursor-pointer relative" onClick={() => setCurrent(i)}>
            <div className={`absolute top-0 left-0 h-full bg-fupagua-amarillo transition-all duration-[8000ms] ease-linear ${current === i ? 'w-full' : 'w-0'}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;