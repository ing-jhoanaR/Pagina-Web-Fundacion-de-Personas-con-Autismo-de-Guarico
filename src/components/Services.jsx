import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Activity, HeartPulse, Brain, Music, 
  MessageCircle, Stethoscope, ChevronRight, 
  Star, ClipboardCheck, Clock, 
  Smile, Waves, Library, GraduationCap, School, Users,
  User, Send, Puzzle, Sparkles, Baby
} from 'lucide-react';

// ==========================================
// 1. COMPONENTE: FORMULARIO DE SALA DE ESPERA (VISTA INDEPENDIENTE)
// ==========================================
const WaitingListForm = ({ serviceName, specialistName, onClose }) => {
  const [formData, setFormData] = useState({
    representante: '', niño: '', edad: '', cedula: '', motivo: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de envío al sistema FUPAGUA
    setTimeout(() => {
      alert(`¡Registro Exitoso! ${serviceName} con ${specialistName} ha recibido su solicitud.`);
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-0 md:p-4 bg-slate-900/95 backdrop-blur-md"
    >
      <div className="bg-white w-full max-w-lg h-full md:h-auto md:rounded-[40px] overflow-hidden relative p-8 md:p-12 flex flex-col justify-center">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-fupagua-rojo hover:text-white transition-all">
          <X size={20} />
        </button>

        <div className="mb-8">
          <span className="bg-fupagua-azul/10 text-fupagua-azul px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Formulario de Ingreso</span>
          <h5 className="text-2xl font-black uppercase italic mt-2 text-slate-900">Sala de Espera</h5>
          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Servicio: {serviceName} / {specialistName}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Representante</label>
            <input required placeholder="Nombre del adulto" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none transition-all"
              onChange={e => setFormData({...formData, representante: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Paciente</label>
              <input required placeholder="Nombre niño/a" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none"
                onChange={e => setFormData({...formData, niño: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Edad</label>
              <input required type="number" placeholder="Años" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none"
                onChange={e => setFormData({...formData, edad: e.target.value})} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Cédula</label>
            <input required placeholder="V-00.000.000" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none"
              onChange={e => setFormData({...formData, cedula: e.target.value})} />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Motivo</label>
            <textarea required placeholder="Describa brevemente..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-xs h-24 resize-none focus:ring-2 focus:ring-fupagua-azul outline-none"
              onChange={e => setFormData({...formData, motivo: e.target.value})} />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-fupagua-azul text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-fupagua-azul/20 hover:bg-slate-900 transition-all flex items-center justify-center gap-3">
            {loading ? "Procesando..." : <><Send size={16} /> Confirmar Cupo</>}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

// ==========================================
// 2. COMPONENTE PRINCIPAL: SERVICES
// ==========================================
const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [activeWaitingList, setActiveWaitingList] = useState(null); // Para el formulario

  const services = [
    { 
      id: "evaluacion", 
      title: "Evaluación Integral", 
      isPremium: true, 
      icon: <ClipboardCheck size={28} className="text-fupagua-azul" />, 
      color: "shadow-fupagua-azul/20", 
      description: "Proceso diagnóstico multidisciplinario a partir de los 6 años.", 
      details: { 
        objective: "Establecer antecedentes, conducta, perfil de desarrollo, test estandarizados, diagnóstico e interconsultas.", 
        logistics: "Incluye: Pediatría, TO, Fisioterapia, Psicopedagogía, Psicología, Fonoaudiología y Visita escolar." 
      } 
    },
    { 
      id: 4, 
      title: "Terapia Ocupacional", 
      icon: <Activity size={24} />, 
      color: "shadow-fupagua-azul/10", 
      description: "Habilidades motoras finas y autonomía diaria.", 
      specialists: [
        { name: "Lcda. Nélida Parra de Gil", role: "Terapeuta Ocupacional", bio: "MPPS: 4.772. Desempeño ocupacional, juego e intervención en actividad grafomotora.", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400" },
        { name: "Doriannys Parra", role: "Terapeuta Ocupacional (T.O)", bio: "Especialista en integración sensorial y desarrollo de habilidades adaptativas.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400" }
      ] 
    },
    { 
        id: 10, 
        title: "Fonoaudiología", 
        icon: <MessageCircle size={24} />, 
        color: "shadow-fupagua-rojo/10", 
        description: "Especialista en comunicación y lenguaje.", 
        specialists: [
          { name: "Cadida Magallanez", role: "Licenciada en Fonoaudiología", bio: "Atención especializada en trastornos de la comunicación, lenguaje y procesos de deglución.", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=400" }
        ] 
      },
    { 
      id: 6, 
      title: "Bienestar Humano", 
      icon: <Smile size={24} />, 
      color: "shadow-fupagua-verde/10", 
      description: "Yoga, masaje infantil y arte terapia.", 
      specialists: [
        { name: "Lcda. Tibisay Vargas R.", role: "Especialista en Yoga", bio: "Técnicas de respiración y equilibrio físico-mental para todas las edades.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400" },
        { name: "Carmen Yarisma Molina", role: "Especialista en Masaje Infantil", bio: "Clases para padres, arte terapia y estimulación sensorial a través del tacto.", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400" }
      ] 
    },
    { id: 1, title: "Psicopedagogía", icon: <Brain size={24} />, color: "shadow-fupagua-amarillo/10", description: "Optimización de los procesos de aprendizaje y NEE.", specialists: [{ name: "MSc. Marioxis C. León C.", role: "Prof. Educación Especial", bio: "Evaluación e intervención en aprendizaje. Estimulación temprana.", image: "https://images.unsplash.com/photo-1544717297-fa95b3ee51f3?q=80&w=400" }] },
    { id: 2, title: "Psicología", icon: <HeartPulse size={24} />, color: "shadow-fupagua-rojo/10", description: "Evaluación, diagnóstico y psicoeducación emocional.", specialists: [{ name: "Lcda. Albanys López", role: "Psicóloga", bio: "Atención individual y grupal. Acompañamiento psicológico.", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400" }] },
    { id: 3, title: "Fisioterapia", icon: <Activity size={24} />, color: "shadow-fupagua-verde/10", description: "Rehabilitación funcional y desarrollo motor óptimo.", specialists: [{ name: "Lcda. Ana G. García G.", role: "Fisioterapeuta", bio: "Especialista en déficit motor y lesiones neurológicas.", image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400" }] }
  ];

  return (
    <section id="servicios" className="relative pt-32 pb-20 bg-slate-50 min-h-screen overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-7xl font-black text-slate-900 uppercase italic mb-12 tracking-tighter">Nuestros <span className="text-fupagua-azul">Servicios</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <motion.div key={service.id} whileHover={{ y: -8 }} onClick={() => setSelectedService(service)} className={`group p-8 rounded-[40px] bg-white border border-slate-100 cursor-pointer transition-all shadow-sm hover:shadow-2xl ${service.color}`}>
              <div className="mb-4 text-fupagua-azul group-hover:scale-110 transition-transform">{service.icon}</div>
              <h3 className="text-lg font-black uppercase italic text-slate-800 leading-tight mb-2">{service.title}</h3>
              <p className="text-slate-500 text-xs line-clamp-2">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-xl bg-slate-900/60 overflow-y-auto">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white w-full max-w-5xl rounded-[50px] overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
              <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 z-[210] p-2 bg-slate-100 rounded-full hover:bg-fupagua-rojo hover:text-white transition-all"><X size={20} /></button>

              <div className="p-8 md:p-12 overflow-y-auto">
                <div className="mb-10 text-center">
                    <h4 className="text-4xl font-black text-slate-900 uppercase italic leading-tight">{selectedService.title}</h4>
                    <div className="h-1.5 w-16 bg-fupagua-amarillo mx-auto mt-3 rounded-full"></div>
                </div>

                {selectedService.id === "evaluacion" ? (
                  <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100">
                    <p className="text-slate-600 font-semibold italic border-l-4 border-fupagua-azul pl-4 mb-6">{selectedService.details.objective}</p>
                    <button 
                      onClick={() => setActiveWaitingList({ service: selectedService.title, spec: "Equipo Multidisciplinario" })}
                      className="w-full bg-fupagua-azul text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 shadow-lg"
                    >
                      <Sparkles size={18} /> Iniciar Evaluación Integral
                    </button>
                  </div>
                ) : (
                  <div className={`grid gap-6 ${selectedService.specialists?.length > 1 ? 'md:grid-cols-2' : 'max-w-md mx-auto'}`}>
                    {selectedService.specialists?.map((spec, i) => (
                      <div key={i} className="bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 flex flex-col">
                        <img src={spec.image} className="h-48 w-full object-cover" />
                        <div className="p-6 flex flex-col flex-grow">
                          <h5 className="text-lg font-black uppercase italic text-slate-900">{spec.name}</h5>
                          <p className="text-fupagua-azul font-bold text-[9px] uppercase tracking-widest mb-3">{spec.role}</p>
                          <p className="text-slate-500 text-[11px] leading-relaxed italic mb-6 flex-grow">"{spec.bio}"</p>
                          <button 
                            onClick={() => setActiveWaitingList({ service: selectedService.title, spec: spec.name })}
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-fupagua-azul transition-all flex items-center justify-center gap-2"
                          >
                            <User size={14} /> Sala de Espera
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* MODAL DEL FORMULARIO (CAPA SUPERIOR) */}
        {activeWaitingList && (
          <WaitingListForm 
            serviceName={activeWaitingList.service} 
            specialistName={activeWaitingList.spec} 
            onClose={() => setActiveWaitingList(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;