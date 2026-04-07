
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Activity, HeartPulse, Brain, Music, 
  MessageCircle, Stethoscope, Send, Sparkles, 
  ClipboardCheck, Clock, Smile, Waves, BookOpen,
  GraduationCap, School, Baby, User, CheckCircle2
} from 'lucide-react';

// ==========================================
// 1. COMPONENTE: FORMULARIO DE SALA DE ESPERA (MODAL PANTALLA COMPLETA)
// ==========================================
const WaitingListForm = ({ serviceName, specialistName, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de envío a Firebase/Backend
    setTimeout(() => {
      alert(`Registro exitoso. El equipo de FUPAGUA procesará la solicitud para ${serviceName}.`);
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[600] flex items-center justify-center bg-slate-900/98 backdrop-blur-2xl p-4 md:p-0"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="bg-white w-full max-w-xl md:rounded-[60px] p-8 md:p-14 shadow-2xl relative max-h-[95vh] overflow-y-auto"
      >
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 p-3 bg-slate-100 rounded-full hover:bg-fupagua-rojo hover:text-white transition-all shadow-sm"
        >
          <X size={20} />
        </button>
        
        <div className="mb-10">
          <span className="bg-fupagua-azul/10 text-fupagua-azul px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] italic border border-fupagua-azul/20">
            Formulario de Ingreso
          </span>
          <h5 className="text-4xl font-black uppercase italic mt-4 text-slate-900 leading-none tracking-tighter">
            Sala de Espera
          </h5>
          <p className="text-[11px] text-slate-400 font-bold uppercase mt-2 tracking-widest italic">
            Especialista: <span className="text-fupagua-azul">{specialistName}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-4 tracking-widest italic">Nombre del Representante</label>
            <input required type="text" placeholder="Ej. Juan Pérez" className="w-full bg-slate-50 border border-slate-100 rounded-[25px] py-5 px-8 text-xs outline-none focus:ring-2 focus:ring-fupagua-azul transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase ml-4 tracking-widest italic">Nombre del Paciente</label>
              <input required type="text" placeholder="Nombre del niño/a" className="w-full bg-slate-50 border border-slate-100 rounded-[25px] py-5 px-8 text-xs outline-none focus:ring-2 focus:ring-fupagua-azul transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase ml-4 tracking-widest italic">Edad</label>
              <input required type="number" placeholder="Años" className="w-full bg-slate-50 border border-slate-100 rounded-[25px] py-5 px-8 text-xs outline-none focus:ring-2 focus:ring-fupagua-azul transition-all" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-4 tracking-widest italic">Cédula de Identidad</label>
            <input required type="text" placeholder="V-00.000.000" className="w-full bg-slate-50 border border-slate-100 rounded-[25px] py-5 px-8 text-xs outline-none focus:ring-2 focus:ring-fupagua-azul transition-all" />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-4 tracking-widest italic">Motivo de la Consulta</label>
            <textarea required placeholder="Describa brevemente la situación..." className="w-full bg-slate-50 border border-slate-100 rounded-[30px] py-5 px-8 text-xs h-32 resize-none outline-none focus:ring-2 focus:ring-fupagua-azul transition-all" />
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-fupagua-azul text-white py-6 rounded-[30px] font-black uppercase text-[11px] tracking-[0.3em] shadow-2xl shadow-fupagua-azul/30 hover:bg-slate-900 transition-all flex items-center justify-center gap-4 mt-2"
          >
            {loading ? "Registrando..." : <><Send size={18} /> Confirmar Solicitud</>}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// 2. COMPONENTE PRINCIPAL: SERVICES (13 SERVICIOS)
// ==========================================
const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [activeWaitingList, setActiveWaitingList] = useState(null);

  const services = [
    { 
      id: "eval", 
      title: "Evaluación Integral", 
      isPremium: true, 
      icon: <ClipboardCheck size={28} />, 
      description: "Protocolo diagnóstico de ingreso obligatorio para nuevos pacientes.",
      specifications: [
        "Establecer antecedentes del desarrollo del niño.",
        "Valorar conducta y perfil de desarrollo actual.",
        "Aplicación de pruebas y test estandarizados.",
        "Interconsultas con Pediatría, Psicología y T.O.",
        "Evaluación de Fisioterapia y Psicopedagogía.",
        "Visita Escolar (cuando se requiera diagnósticamente).",
        "Discusión clínica del caso y plan terapéutico."
      ],
      details: "Un equipo multidisciplinario evalúa de forma simultánea todas las áreas del desarrollo para garantizar un abordaje preciso y personalizado.",
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=800" 
    },
    { 
      id: 1, 
      title: "Psicopedagogía", 
      icon: <Brain size={24} />, 
      specialists: [
        { 
          name: "MSc. Marioxis C. León C.", 
          role: "Prof. Educación Especial", 
          bio: "Evaluación e intervención en aprendizaje. Estimulación temprana (0-6 años), autismo y déficit cognitivo.", 
          image: "https://images.unsplash.com/photo-1544717297-fa95b3ee51f3?q=80&w=400" 
        }
      ] 
    },
    { 
      id: 2, 
      title: "Psicología", 
      icon: <HeartPulse size={24} />, 
      specialists: [
        { 
          name: "Lcda. Albanys López", 
          role: "Psicóloga (FPV 15.127)", 
          bio: "Atención individual y grupal. Acompañamiento psicológico y orientación a padres.", 
          image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400" 
        },
        { 
          name: "Lcda. Amelia Vegas", 
          role: "Psicóloga (FPV 18.285)", 
          bio: "Prevención, evaluación integral y psicoeducación conductual para familias.", 
          image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400" 
        }
      ] 
    },
    { 
      id: 3, 
      title: "Fisioterapia", 
      icon: <Activity size={24} />, 
      specialists: [
        { 
          name: "Lcda. Ana G. García G.", 
          role: "Fisioterapeuta (SACS 3.825)", 
          bio: "Especialista en déficit motor, lesiones neurológicas y parálisis cerebral infantil.", 
          image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400" 
        },
        { 
          name: "TSU Glennys A. Abreu Y.", 
          role: "Fisioterapeuta (SACS 4.751)", 
          bio: "Estimulación temprana y prevención de lesiones musculoesqueléticas.", 
          image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400" 
        }
      ] 
    },
    { 
      id: 4, 
      title: "Terapia Ocupacional", 
      icon: <Activity size={24} />, 
      specialists: [
        { 
          name: "Lcda. Nélida Parra de Gil", 
          role: "Terapeuta Ocupacional (MPPS: 4.772)", 
          bio: "Desempeño ocupacional, juego e intervención en actividad grafomotora.", 
          image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400" 
        },
        { 
          name: "Doriannys Parra", 
          role: "Terapeuta Ocupacional (T.O)", 
          bio: "Especialista en integración sensorial, motricidad fina y autonomía diaria.", 
          image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400" 
        }
      ] 
    },
    { 
      id: 5, 
      title: "Pediatría", 
      icon: <Stethoscope size={24} />, 
      specialists: [
        { 
          name: "Dra. Hetmys Mendoza", 
          role: "Pediatra Puericultor (MPPS: 114865)", 
          bio: "Control de crecimiento, vacunas, manejo de patologías y asesoría alimentaria.", 
          image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400" 
        }
      ] 
    },
    { 
      id: 6, 
      title: "Yoga", 
      icon: <Smile size={24} />, 
      specialists: [
        { 
          name: "Lcda. Tibisay Vargas R.", 
          role: "Especialista en Yoga", 
          bio: "Técnicas de respiración, equilibrio físico-mental y asesoramiento naturista.", 
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400" 
        }
      ] 
    },
    { 
      id: 7, 
      title: "Bienestar Humano", 
      isWhatsApp: true,
      whatsapp: "584124357774",
      message: "Hola, deseo información sobre las clases de Bienestar Humano y Masaje Infantil.",
      icon: <Baby size={24} />, 
      specialists: [
        { 
          name: "Carmen Yarisma Molina", 
          role: "Especialista en Masaje Infantil", 
          bio: "Clases para padres, arte terapia con mandalas y estimulación sensorial.", 
          image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400" 
        }
      ] 
    },
    { 
      id: 8, 
      title: "Apoyo Pedagógico", 
      isWhatsApp: true,
      whatsapp: "584124357774",
      message: "Hola, necesito información sobre el Reforzamiento Académico y Apoyo Pedagógico.",
      icon: <GraduationCap size={24} />, 
      specialists: [
        { 
          name: "Yenny Delgado", 
          role: "Docente Integral", 
          bio: "Alfabetización y diagnóstico inicial con planes individualizados.", 
          image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=400" 
        },
        { 
          name: "Rosmely González", 
          role: "Docente Integral", 
          bio: "Reforzamiento académico y asesoría interdisciplinar.", 
          image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400" 
        }
      ] 
    },
    { 
      id: 9, 
      title: "Arte y Cultura", 
      isWhatsApp: true,
      whatsapp: "584124357774",
      message: "Hola, quisiera saber sobre las clases de música e instrumentos en FUPAGUA.",
      icon: <Music size={24} />, 
      specialists: [
        { 
          name: "Xiomairy Figueredo", 
          role: "Gestora Cultural", 
          bio: "Organización e impulso de la cultura local y potencialidades creadoras.", 
          image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=400" 
        },
        { 
          name: "Yaneiski Hernández", 
          role: "Instructor Orquestal", 
          bio: "Clases de trompeta, iniciación en el cuatro y lenguaje musical.", 
          image: "https://images.unsplash.com/photo-1573871666457-7c7329118cf9?q=80&w=400" 
        }
      ] 
    },
    { 
      id: 10, 
      title: "Aula Integral", 
      isWhatsApp: true,
      whatsapp: "584124357774",
      message: "Hola, me interesa el servicio de Aula Integral para atención pedagógica grupal.",
      icon: <School size={24} />, 
      specialists: [
        { 
          name: "Yessika O. Camero", 
          role: "Docente Integral", 
          bio: "Atención pedagógica grupal y plan individualizado por equipo.", 
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400" 
        }
      ] 
    },
    { 
      id: 11, 
      title: "Fonoaudiología", 
      icon: <MessageCircle size={24} />, 
      specialists: [
        { 
          name: "Cadida Magallanez", 
          role: "Licenciada en Fonoaudiología", 
          bio: "Especialista en comunicación, lenguaje y procesos de deglución.", 
          image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800" 
        }
      ] 
    },
    { 
      id: 12, 
      title: "Hidroterapia", 
      isWhatsApp: true,
      whatsapp: "584124357774",
      message: "Hola, deseo información sobre la rehabilitación en piscina (Hidroterapia).",
      icon: <Waves size={24} />, 
      specialists: [
        { 
          name: "Lcda. Andrea Figueroa", 
          role: "Fisioterapeuta", 
          bio: "Rehabilitación física y estimulación sensorial en piscina termal.", 
          image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800" 
        }
      ] 
    },
    { 
      id: 13, 
      title: "Biblioteca", 
      icon: <BookOpen size={24} />, 
      specialists: [
        { 
          name: "Prof. Jeroh Montilla", 
          role: "Bibliotecario", 
          bio: "Gestión de material bibliográfico y actividades de expansión cultural.", 
          image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800" 
        }
      ] 
    }
  ];

  const handleAction = (service, specialistName) => {
    if (service.isWhatsApp) {
      const url = `https://wa.me/${service.whatsapp}?text=${encodeURIComponent(service.message)}`;
      window.open(url, '_blank');
    } else {
      setActiveWaitingList({ service: service.title, spec: specialistName });
    }
  };

  return (
    <section id="servicios" className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-7xl font-black text-slate-900 uppercase italic mb-16 tracking-tighter leading-none">
          Nuestros <span className="text-fupagua-azul">Servicios</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <motion.div 
              key={s.id} 
              whileHover={{ y: -5 }} 
              onClick={() => setSelectedService(s)} 
              className={`group p-10 rounded-[50px] bg-white border border-slate-100 cursor-pointer shadow-sm hover:shadow-2xl transition-all ${s.isPremium ? 'border-fupagua-azul/30 bg-gradient-to-br from-white to-fupagua-azul/5' : ''}`}
            >
              <div className={`${s.isPremium ? 'text-fupagua-azul animate-pulse' : 'text-slate-400 group-hover:text-fupagua-azul'} mb-6 transition-colors`}>
                {s.icon}
              </div>
              <h3 className="text-xl font-black uppercase italic text-slate-800 leading-tight mb-3">{s.title}</h3>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 group-hover:text-fupagua-azul">
                Ver detalles <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 backdrop-blur-3xl bg-slate-900/80 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} 
              className="bg-white w-full max-w-6xl rounded-[60px] overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              <button onClick={() => setSelectedService(null)} className="absolute top-8 right-8 z-[510] p-3 bg-slate-100 rounded-full hover:bg-fupagua-rojo hover:text-white transition-all shadow-lg">
                <X size={24} />
              </button>

              <div className="p-8 md:p-20 overflow-y-auto">
                {selectedService.isPremium ? (
                  <div className="grid md:grid-cols-2 gap-16 items-start">
                    <div>
                      <span className="bg-fupagua-azul text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] italic mb-6 inline-block">Protocolo Institucional</span>
                      <h4 className="text-5xl md:text-6xl font-black text-slate-900 uppercase italic leading-none mb-8 tracking-tighter">{selectedService.title}</h4>
                      <p className="text-slate-500 text-lg italic mb-10 leading-relaxed border-l-4 border-fupagua-amarillo pl-6">"{selectedService.details}"</p>
                      <div className="space-y-4 mb-12">
                        {selectedService.specifications.map((spec, i) => (
                          <div key={i} className="flex items-center gap-4 group">
                            <div className="h-6 w-6 rounded-full bg-fupagua-azul/10 flex items-center justify-center text-fupagua-azul group-hover:bg-fupagua-azul group-hover:text-white transition-colors"><CheckCircle2 size={14} /></div>
                            <span className="text-[11px] font-black uppercase text-slate-700 tracking-wider leading-none">{spec}</span>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => handleAction(selectedService, "Equipo Técnico")} className="w-full bg-fupagua-azul text-white py-6 rounded-[30px] font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:shadow-fupagua-azul/40 transition-all flex items-center justify-center gap-4">
                        <Sparkles size={20} /> Solicitar Evaluación de Ingreso
                      </button>
                    </div>
                    <div className="hidden md:block"><img src={selectedService.image} className="w-full h-[600px] object-cover rounded-[50px] shadow-2xl rotate-1 group-hover:rotate-0 transition-transform duration-700" alt="Evaluación Institucional" /></div>
                  </div>
                ) : (
                  <div>
                    <div className="text-center mb-16">
                      <h4 className="text-5xl font-black text-slate-900 uppercase italic leading-none tracking-tighter">{selectedService.title}</h4>
                      <div className="h-2 w-20 bg-fupagua-amarillo mx-auto mt-6 rounded-full"></div>
                    </div>
                    <div className={`grid gap-8 ${selectedService.specialists?.length > 1 ? 'md:grid-cols-2' : 'max-w-xl mx-auto'}`}>
                      {selectedService.specialists?.map((spec, i) => (
                        <div key={i} className="bg-slate-50 rounded-[50px] border border-slate-100 overflow-hidden flex flex-col group shadow-sm hover:shadow-md transition-all">
                          <div className="h-64 overflow-hidden relative">
                            <img src={spec.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={spec.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                          </div>
                          <div className="p-10 flex flex-col flex-grow">
                            <h5 className="text-2xl font-black uppercase italic text-slate-900 mb-1 leading-none tracking-tight">{spec.name}</h5>
                            <p className="text-fupagua-azul font-black text-[10px] uppercase tracking-[0.2em] mb-6">{spec.role}</p>
                            <p className="text-slate-500 text-[13px] italic mb-10 leading-relaxed flex-grow">"{spec.bio}"</p>
                            <button 
                              onClick={() => handleAction(selectedService, spec.name)}
                              className={`w-full py-5 rounded-[25px] font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-3 ${selectedService.isWhatsApp ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-slate-900 text-white hover:bg-fupagua-azul'}`}
                            >
                              {selectedService.isWhatsApp ? <><MessageCircle size={16} /> Contactar WhatsApp</> : <><User size={16} /> Entrar en Sala de Espera</>}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeWaitingList && (
          <WaitingListForm serviceName={activeWaitingList.service} specialistName={activeWaitingList.spec} onClose={() => setActiveWaitingList(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;