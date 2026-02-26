import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Activity, HeartPulse, Brain, Music, 
  MessageCircle, Stethoscope, ChevronRight, 
  Star, ClipboardCheck, Clock, 
  Smile, Waves, Library, GraduationCap, School, Users,
  User, Send
} from 'lucide-react';

// ==========================================
// 1. COMPONENTE: FORMULARIO DE EVALUACIÓN
// ==========================================
const EvaluationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    representante: '', niño: '', edad: '', cedula: '', motivo: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('URL_DE_TU_SISTEMA_DE_CITAS/api/citas/pendientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, fecha_solicitud: new Date().toISOString(), origen: "Web Oficial Fupagua" })
      });
      if (response.ok) {
        alert("¡Registro Exitoso! Su solicitud ha sido enviada.");
        onSuccess();
      } else { throw new Error('Error'); }
    } catch (error) {
      alert("Hubo un problema de conexión. Por favor, intente vía WhatsApp.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900 p-8 md:p-10 rounded-[35px] text-white shadow-2xl border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-fupagua-azul/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      
      <div className="text-left mb-6">
        <span className="bg-fupagua-azul/20 text-fupagua-azul px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
          Paso 1: Triaje Digital
        </span>
        <h5 className="text-2xl font-black uppercase italic mt-3">Ficha de Ingreso</h5>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Representante</label>
          <div className="relative">
            <User className="absolute left-4 top-4 text-fupagua-azul" size={18} />
            <input required placeholder="Nombre completo" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none transition-all"
              onChange={e => setFormData({...formData, representante: e.target.value})} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Paciente</label>
            <input required placeholder="Nombre niño/a" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none"
              onChange={e => setFormData({...formData, niño: e.target.value})} />
          </div>
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Edad</label>
            <input required type="number" placeholder="Años" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none"
              onChange={e => setFormData({...formData, edad: e.target.value})} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Cédula</label>
          <input required placeholder="V-00.000.000" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none"
            onChange={e => setFormData({...formData, cedula: e.target.value})} />
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Motivo de Consulta</label>
          <textarea required placeholder="Breve descripción..." className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-xs h-24 resize-none focus:ring-2 focus:ring-fupagua-azul outline-none"
            onChange={e => setFormData({...formData, motivo: e.target.value})} />
        </div>
      </div>

      <button type="submit" className="w-full bg-fupagua-azul hover:bg-white hover:text-slate-900 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 mt-2">
        <Send size={16} /> Enviar Departamento Médico
      </button>
    </form>
  );
};

// ==========================================
// 2. COMPONENTE PRINCIPAL: SERVICES
// ==========================================
const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { id: "evaluacion", title: "Evaluación Integral", isPremium: true, icon: <ClipboardCheck size={28} className="text-fupagua-azul" />, color: "shadow-fupagua-azul/20", glowColor: "group-hover:border-fupagua-azul", description: "Proceso diagnóstico multidisciplinario a partir de los 6 años.", details: { objective: "Establecer antecedentes, conducta, perfil de desarrollo, test proyectivos/estandarizados, diagnóstico e interconsultas.", logistics: "Incluye: Pediatría, TO, Fisioterapia, Psicopedagogía, Psicología, Fonoaudiología y Visita escolar.", booking: "Reserva con mínimo 1 semana de antelación.", phone: "584243390902" } },
    { id: 1, title: "Psicopedagogía", icon: <Brain size={24} />, color: "shadow-fupagua-amarillo/10", glowColor: "group-hover:border-fupagua-amarillo", description: "Optimización de los procesos de aprendizaje y NEE.", specialists: [{ name: "MSc. Marioxis C. León C.", role: "Prof. Educación Especial", bio: "Evaluación e intervención en aprendizaje. Estimulación temprana (0-6 años), autismo y déficit cognitivo.", image: "https://images.unsplash.com/photo-1544717297-fa95b3ee51f3?q=80&w=400&auto=format&fit=crop", phone: "584163497750" }] },
    { id: 2, title: "Psicología", icon: <HeartPulse size={24} />, color: "shadow-fupagua-rojo/10", glowColor: "group-hover:border-fupagua-rojo", description: "Evaluación, diagnóstico y psicoeducación emocional.", specialists: [{ name: "Lcda. Albanys López", role: "Psicóloga (FPV 15.127)", bio: "Atención individual y grupal. Acompañamiento psicológico y orientación a padres.", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop", phone: "584143444535" }, { name: "Lcda. Amelia Vegas", role: "Psicóloga (FPV 18.285)", bio: "Prevención, evaluación integral y psicoeducación conductual para familias y docentes.", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop", phone: "584143444535" }] },
    { id: 3, title: "Fisioterapia", icon: <Activity size={24} />, color: "shadow-fupagua-verde/10", glowColor: "group-hover:border-fupagua-verde", description: "Rehabilitación funcional y desarrollo motor óptimo.", specialists: [{ name: "Lcda. Ana G. García G.", role: "Fisioterapeuta (SACS 3.825)", bio: "Especialista en déficit motor, lesiones neurológicas y parálisis cerebral infantil.", image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop", phone: "584123411072" }, { name: "TSU Glennys A. Abreu Y.", role: "Fisioterapeuta (SACS 4.751)", bio: "Estimulación temprana y prevención de lesiones musculoesqueléticas.", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop", phone: "584124016328" }] },
    { id: 4, title: "Terapia Ocupacional", icon: <Activity size={24} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Habilidades motoras finas y autonomía diaria.", specialists: [{ name: "Lcda. Nélida Parra de Gil", role: "Terapeuta Ocupacional", bio: "MPPS: 4.772. Desempeño ocupacional, juego e intervención en actividad grafomotora.", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop", phone: "584121312748" }] },
    { id: 5, title: "Pediatría", icon: <Stethoscope size={24} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Control de niño sano, vacunas y lactancia materna.", specialists: [{ name: "Dra. Hetmys Mendoza", role: "Pediatra Puericultor", bio: "MPPS: 114865. Control de crecimiento, manejo de patologías y asesoría alimentaria.", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop", phone: "584243111585" }] },
    { id: 6, title: "Bienestar Humano", icon: <Smile size={24} />, color: "shadow-fupagua-verde/10", glowColor: "group-hover:border-fupagua-verde", description: "Yoga, naturopatía y alimentación natural.", specialists: [{ name: "Lcda. Tibisay Vargas R.", role: "Especialista en Yoga", bio: "Técnicas de respiración y asesoramiento en alimentación naturista.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop", phone: "584121722439" }] },
    { id: 7, title: "Apoyo Pedagógico", icon: <GraduationCap size={24} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Alfabetización y reforzamiento académico individual.", specialists: [{ name: "Yenny Delgado", role: "Docente Integral", bio: "Alfabetización y diagnóstico inicial con planes individualizados.", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=400&auto=format&fit=crop", phone: "584162412353" }, { name: "Rosmely González", role: "Docente Integral", bio: "Reforzamiento académico y asesoría interdisciplinar en grupos pequeños.", image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop", phone: "584243050741" }] },
    { id: 8, title: "Arte y Cultura", icon: <Music size={24} />, color: "shadow-fupagua-amarillo/10", glowColor: "group-hover:border-fupagua-amarillo", description: "Iniciación musical, cuatro y expresión creadora.", specialists: [{ name: "Xiomairy Figueredo", role: "Gestora Cultural", bio: "Organización e impulso de la cultura local y potencialidades creadoras.", image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=400&auto=format&fit=crop", phone: "584124778928" }, { name: "Yaneiski Hernández", role: "Instructor Orquestal", bio: "Clases de trompeta, iniciación en el cuatro y lenguaje musical.", image: "https://images.unsplash.com/photo-1573871666457-7c7329118cf9?q=80&w=400&auto=format&fit=crop", phone: "584263752961" }] },
    { id: 9, title: "Aula Integral", icon: <School size={24} />, color: "shadow-fupagua-verde/10", glowColor: "group-hover:border-fupagua-verde", description: "Atención pedagógica y plan individualizado por equipo.", isSpecialGroup: true, team: [{ name: "Yessika O. Camero", role: "Docente Integral" }, { name: "Génesis del C. Azuaje", role: "Bachiller Técnico" }], details: "Diagnóstico inicial, atención en grupos pequeños y orientación a padres.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop", phone: "584243390902" },
    { id: 10, title: "Comunicación", icon: <MessageCircle size={24} />, color: "shadow-fupagua-rojo/10", glowColor: "group-hover:border-fupagua-rojo", description: "Terapia del lenguaje, arteterapia y masajes.", isSpecialGroup: true, team: [{ name: "Carmen Yarisma Molina", role: "Terapista del Lenguaje" }], details: "Arteterapia con mandalas, masaje infantil y trastornos de comunicación.", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop", phone: "584243390902" },
    { id: 11, title: "Hidroterapia", icon: <Waves size={24} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Rehabilitación física en piscina termal.", isSpecialGroup: true, team: [{ name: "Guillermo Garcés", role: "Medicina de Rehabilitación" }, { name: "Lcda. Andrea Figueroa", role: "Fisioterapeuta" }], details: "Plan individualizado de rehabilitación física en ambiente acuático.", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop", phone: "584243390902" },
    { id: 12, title: "Biblioteca Juana Milano", icon: <Library size={24} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Préstamo de material bibliográfico y audiovisual.", isSpecialGroup: true, team: [{ name: "Prof. Jeroh Montilla", role: "Bibliotecario" }, { name: "Melisa Farfán", role: "Auxiliar" }], details: "Recolección, organización y actividades de expansión cultural.", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop", phone: "584243390902" }
  ];

  const RatingStars = () => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={8} fill="#fbbf24" className="text-yellow-400" />
      ))}
    </div>
  );

  return (
    <section id="servicios" className="relative py-20 bg-slate-50/50 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic leading-none tracking-tighter">
            Nuestros <span className="text-fupagua-azul">Servicios</span>
          </h2>
        </div>

        {/* Grid de 4 columnas para que quepan los 13 servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedService(service)}
              className={`group p-8 rounded-[35px] bg-white border border-slate-100 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl ${service.color} ${service.glowColor} ${service.isPremium ? 'border-fupagua-azul/20 bg-blue-50/30' : ''}`}
            >
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-fupagua-azul group-hover:text-white transition-all">
                {service.icon}
              </div>
              <h3 className="text-lg font-black uppercase italic text-slate-800 mb-2 leading-tight">{service.title}</h3>
              <p className="text-slate-500 font-medium text-xs leading-relaxed mb-4 line-clamp-2">{service.description}</p>
              <div className="flex items-center gap-2 text-[9px] font-black uppercase text-fupagua-azul tracking-widest">
                Detalles <ChevronRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40">
            <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} exit={{ scale: 0.98 }}
              className={`bg-white w-full ${selectedService.isPremium ? 'max-w-5xl' : 'max-w-xl'} rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col p-6 md:p-10 max-h-[90vh]`}
            >
              <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 z-50 p-2 bg-slate-100 rounded-full hover:bg-fupagua-rojo hover:text-white transition-all">
                <X size={20} />
              </button>

              <div className="mb-8 text-center">
                  <h4 className="text-3xl md:text-4xl font-black text-slate-900 uppercase italic leading-tight">{selectedService.title}</h4>
                  <p className="text-fupagua-azul font-bold text-[9px] tracking-[0.3em] uppercase mt-2">Fundación Fupagua • Est. 1997</p>
              </div>

              <div className="flex-grow overflow-y-auto px-2">
                {selectedService.isPremium ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start py-2">
                    <div className="space-y-6">
                        <div className="space-y-3">
                          <h5 className="text-xl font-black text-slate-900 uppercase italic">Protocolo</h5>
                          <p className="text-slate-600 text-sm leading-relaxed italic border-l-4 border-fupagua-amarillo pl-4">
                            "{selectedService.details.objective}"
                          </p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-[30px] space-y-4">
                            <div className="flex items-start gap-3">
                              <Activity className="text-fupagua-azul shrink-0" size={20}/>
                              <div>
                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Especialidades</p>
                                <p className="text-[11px] font-bold text-slate-600 uppercase">{selectedService.details.logistics}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="text-fupagua-amarillo shrink-0" size={20}/>
                              <div>
                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Disponibilidad</p>
                                <p className="text-[11px] font-bold text-slate-600 uppercase">{selectedService.details.booking}</p>
                              </div>
                            </div>
                        </div>
                    </div>
                    <EvaluationForm onSuccess={() => setSelectedService(null)} />
                  </div>
                ) : selectedService.isSpecialGroup ? (
                  <div className="space-y-6">
                      <div className="h-48 rounded-[30px] overflow-hidden">
                        <img src={selectedService.image} className="w-full h-full object-cover" alt={selectedService.title} />
                      </div>
                      <div className="space-y-4">
                          <div className="flex items-center gap-2 text-fupagua-azul font-black uppercase text-[9px] tracking-widest">
                            <Users size={14} /> Equipo Técnico
                          </div>
                          <div className="grid gap-2">
                            {selectedService.team.map((member, i) => (
                               <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                  <span className="text-[11px] font-black text-slate-800 uppercase italic">{member.name}</span>
                                  <span className="text-[9px] font-bold text-fupagua-amarillo uppercase">{member.role}</span>
                               </div>
                            ))}
                          </div>
                          <p className="text-slate-500 text-[10px] leading-relaxed font-medium italic">"{selectedService.details}"</p>
                          <button onClick={() => window.open(`https://wa.me/${selectedService.phone}`)} className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-fupagua-azul transition-all flex items-center justify-center gap-3">
                            <MessageCircle size={16} fill="currentColor" className="text-green-500" /> WhatsApp {selectedService.title}
                          </button>
                      </div>
                  </div>
                ) : (
                  <div className={`grid gap-5 py-2 ${selectedService.specialists.length > 1 ? 'md:grid-cols-2' : ''}`}>
                    {selectedService.specialists.map((spec, index) => (
                      <div key={index} className="bg-slate-50 rounded-[35px] overflow-hidden flex flex-col border border-slate-100">
                        <div className="h-48 bg-slate-200">
                           <img src={spec.image} className="w-full h-full object-cover" alt={spec.name} />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                               <h5 className="text-md font-black uppercase italic text-slate-900">{spec.name}</h5>
                               <p className="text-fupagua-amarillo font-bold uppercase text-[8px] tracking-widest">{spec.role}</p>
                            </div>
                            <RatingStars />
                          </div>
                          <p className="text-slate-500 text-[10px] leading-relaxed font-medium italic mb-4 flex-grow">"{spec.bio}"</p>
                          <button onClick={() => window.open(`https://wa.me/${spec.phone}`)} className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-fupagua-azul transition-all flex items-center justify-center gap-2">
                            <MessageCircle size={14} fill="currentColor" className="text-green-500" /> WhatsApp Especialista
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
      </AnimatePresence>
    </section>
  );
};

export default Services;
