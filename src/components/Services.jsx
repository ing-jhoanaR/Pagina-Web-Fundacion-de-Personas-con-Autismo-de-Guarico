

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"; 
import { 
  X, Activity, HeartPulse, Brain, Music, BookOpen, 
  MessageCircle, Stethoscope, ChevronRight, Phone, 
  Star, Quote, ClipboardCheck, Calendar, Clock, 
  Smile, Waves, Library, GraduationCap, School, Users, Palette,
  User, Baby, CreditCard, ClipboardList, Send
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
    
    // Estado de carga (opcional, para feedback visual)
    console.log("Enviando a módulo de citas externo...");

    try {
      // Reemplaza 'URL_DE_TU_SISTEMA_DE_CITAS' por el endpoint real de tu API
      const response = await fetch('URL_DE_TU_SISTEMA_DE_CITAS/api/citas/pendientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer TU_TOKEN_SI_ES_NECESARIO' 
        },
        body: JSON.stringify({
          ...formData,
          fecha_solicitud: new Date().toISOString(),
          origen: "Web Oficial Fupagua"
        })
      });

      if (response.ok) {
        alert("¡Registro Exitoso! Su solicitud ha sido enviada al módulo de citas en espera de confirmación.");
        onSuccess();
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Hubo un problema al conectar con el sistema de citas. Por favor, intente más tarde o contáctenos por WhatsApp.");
    }
  };
  return (
    /* Contenedor principal del formulario: Ahora más ancho y con padding extra */
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 p-10 md:p-14 rounded-[50px] text-white shadow-2xl border border-white/5 relative overflow-hidden">
      {/* Decoración sutil de fondo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-fupagua-azul/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      
      <div className="text-left mb-8">
        <span className="bg-fupagua-azul/20 text-fupagua-azul px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
          Paso 1: Triaje Digital
        </span>
        <h5 className="text-3xl font-black uppercase italic leading-none mt-4">Ficha de Ingreso</h5>
      </div>
      
      <div className="space-y-5">
        {/* Input: Representante - Ahora más alto (py-5) y con fuente más clara */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nombre del Representante</label>
          <div className="relative">
            <User className="absolute left-5 top-5 text-fupagua-azul" size={20} />
            <input required placeholder="Ej. Juan Pérez" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:ring-2 focus:ring-fupagua-azul focus:bg-white/10 transition-all outline-none" 
              onChange={e => setFormData({...formData, representante: e.target.value})} />
          </div>
        </div>

        {/* Fila Doble: Niño y Edad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nombre del Paciente</label>
            <input required placeholder="Nombre del niño/a" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm focus:ring-2 focus:ring-fupagua-azul outline-none" 
              onChange={e => setFormData({...formData, niño: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Edad</label>
            <input required type="number" placeholder="Años" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm focus:ring-2 focus:ring-fupagua-azul outline-none" 
              onChange={e => setFormData({...formData, edad: e.target.value})} />
          </div>
        </div>

        {/* Input: Cédula */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Cédula de Identidad</label>
          <input required placeholder="V-00.000.000" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm focus:ring-2 focus:ring-fupagua-azul outline-none" 
            onChange={e => setFormData({...formData, cedula: e.target.value})} />
        </div>

        {/* Textarea: Motivo - Más espacioso */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Motivo de Consulta</label>
          <textarea required placeholder="Describa brevemente la situación del niño/a..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm h-32 resize-none focus:ring-2 focus:ring-fupagua-azul outline-none" 
            onChange={e => setFormData({...formData, motivo: e.target.value})} />
        </div>
      </div>

      {/* Botón de envío: Gigante y llamativo */}
      <button type="submit" className="w-full bg-fupagua-azul hover:bg-white hover:text-slate-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl mt-4">
        <Send size={20} /> Enviar al Departamento Médico
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
    {
      id: "evaluacion",
      title: "Evaluación Integral",
      isPremium: true, 
      icon: <ClipboardCheck size={36} className="text-fupagua-azul" />,
      color: "shadow-fupagua-azul/20",
      glowColor: "group-hover:border-fupagua-azul",
      description: "Proceso diagnóstico multidisciplinario a partir de los 6 años.",
      details: {
        objective: "Establecer antecedentes, conducta, perfil de desarrollo, test proyectivos/estandarizados, diagnóstico e interconsultas.",
        logistics: "Incluye: Pediatría, TO, Fisioterapia, Psicopedagogía, Psicología, Fonoaudiología y Visita escolar.",
        booking: "Reserva con mínimo 1 semana de antelación.",
        phone: "584243390902"
      }
    },

    { id: 1, title: "Psicopedagogía", icon: <Brain size={32} />, color: "shadow-fupagua-amarillo/10", glowColor: "group-hover:border-fupagua-amarillo", description: "Optimización de los procesos de aprendizaje y NEE.", specialists: [{ name: "MSc. Marioxis C. León C.", role: "Prof. Educación Especial", bio: "Evaluación e intervención en aprendizaje. Estimulación temprana (0-6 años), autismo y déficit cognitivo.", image: "https://images.unsplash.com/photo-1544717297-fa95b3ee51f3?q=80&w=400&auto=format&fit=crop", phone: "584163497750" }] },
    { id: 2, title: "Psicología", icon: <HeartPulse size={32} />, color: "shadow-fupagua-rojo/10", glowColor: "group-hover:border-fupagua-rojo", description: "Evaluación, diagnóstico y psicoeducación emocional.", specialists: [{ name: "Lcda. Albanys López", role: "Psicóloga (FPV 15.127)", bio: "Atención individual y grupal. Acompañamiento psicológico y orientación a padres.", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop", phone: "584143444535" }, { name: "Lcda. Amelia Vegas", role: "Psicóloga (FPV 18.285)", bio: "Prevención, evaluación integral y psicoeducación conductual para familias y docentes.", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop", phone: "584143444535" }] },
    { id: 3, title: "Fisioterapia", icon: <Activity size={32} />, color: "shadow-fupagua-verde/10", glowColor: "group-hover:border-fupagua-verde", description: "Rehabilitación funcional y desarrollo motor óptimo.", specialists: [{ name: "Lcda. Ana G. García G.", role: "Fisioterapeuta (SACS 3.825)", bio: "Especialista en déficit motor, lesiones neurológicas y parálisis cerebral infantil.", image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop", phone: "584123411072" }, { name: "TSU Glennys A. Abreu Y.", role: "Fisioterapeuta (SACS 4.751)", bio: "Estimulación temprana y prevención de lesiones musculoesqueléticas.", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop", phone: "584124016328" }] },
    { id: 4, title: "Terapia Ocupacional", icon: <Activity size={32} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Habilidades motoras finas y autonomía diaria.", specialists: [{ name: "Lcda. Nélida Parra de Gil", role: "Terapeuta Ocupacional", bio: "MPPS: 4.772. Desempeño ocupacional, juego e intervención en actividad grafomotora.", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop", phone: "584121312748" }] },
    { id: 5, title: "Pediatría", icon: <Stethoscope size={32} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Control de niño sano, vacunas y lactancia materna.", specialists: [{ name: "Dra. Hetmys Mendoza", role: "Pediatra Puericultor", bio: "MPPS: 114865. Control de crecimiento, manejo de patologías y asesoría alimentaria.", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop", phone: "584243111585" }] },
    { id: 6, title: "Bienestar Humano", icon: <Smile size={32} />, color: "shadow-fupagua-verde/10", glowColor: "group-hover:border-fupagua-verde", description: "Yoga, naturopatía y alimentación natural.", specialists: [{ name: "Lcda. Tibisay Vargas R.", role: "Especialista en Yoga", bio: "Técnicas de respiración y asesoramiento en alimentación naturista.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop", phone: "584121722439" }] },
    { id: 7, title: "Apoyo Pedagógico", icon: <GraduationCap size={32} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Alfabetización y reforzamiento académico individual.", specialists: [{ name: "Yenny Delgado", role: "Docente Integral", bio: "Alfabetización y diagnóstico inicial con planes individualizados.", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=400&auto=format&fit=crop", phone: "584162412353" }, { name: "Rosmely González", role: "Docente Integral", bio: "Reforzamiento académico y asesoría interdisciplinar en grupos pequeños.", image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop", phone: "584243050741" }] },
    { id: 8, title: "Arte y Cultura", icon: <Music size={32} />, color: "shadow-fupagua-amarillo/10", glowColor: "group-hover:border-fupagua-amarillo", description: "Iniciación musical, cuatro y expresión creadora.", specialists: [{ name: "Xiomairy Figueredo", role: "Gestora Cultural", bio: "Organización e impulso de la cultura local y potencialidades creadoras.", image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=400&auto=format&fit=crop", phone: "584124778928" }, { name: "Yaneiski Hernández", role: "Instructor Orquestal", bio: "Clases de trompeta, iniciación en el cuatro y lenguaje musical.", image: "https://images.unsplash.com/photo-1573871666457-7c7329118cf9?q=80&w=400&auto=format&fit=crop", phone: "584263752961" }] },
    { id: 9, title: "Aula Integral", icon: <School size={32} />, color: "shadow-fupagua-verde/10", glowColor: "group-hover:border-fupagua-verde", description: "Atención pedagógica y plan individualizado por equipo.", isSpecialGroup: true, team: [{ name: "Yessika O. Camero", role: "Docente Integral" }, { name: "Génesis del C. Azuaje", role: "Bachiller Técnico" }], details: "Diagnóstico inicial, atención en grupos pequeños y orientación a padres.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop", phone: "584243390902" },
    { id: 10, title: "Comunicación", icon: <MessageCircle size={32} />, color: "shadow-fupagua-rojo/10", glowColor: "group-hover:border-fupagua-rojo", description: "Terapia del lenguaje, arteterapia y masajes.", isSpecialGroup: true, team: [{ name: "Carmen Yarisma Molina", role: "Terapista del Lenguaje" }], details: "Arteterapia con mandalas, masaje infantil y trastornos de comunicación.", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop", phone: "584243390902" },
    { id: 11, title: "Hidroterapia", icon: <Waves size={32} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Rehabilitación física en piscina termal.", isSpecialGroup: true, team: [{ name: "Guillermo Garcés", role: "Medicina de Rehabilitación" }, { name: "Lcda. Andrea Figueroa", role: "Fisioterapeuta" }], details: "Plan individualizado de rehabilitación física en ambiente acuático.", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop", phone: "584243390902" },
    { id: 12, title: "Biblioteca Juana Milano", icon: <Library size={32} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Préstamo de material bibliográfico y audiovisual.", isSpecialGroup: true, team: [{ name: "Prof. Jeroh Montilla", role: "Bibliotecario" }, { name: "Melisa Farfán", role: "Auxiliar" }], details: "Recolección, organización y actividades de expansión cultural.", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop", phone: "584243390902" }
  ];

  const RatingStars = () => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={10} fill="#fbbf24" className="text-yellow-400" />
      ))}
    </div>
  );

  return (
    <section id="servicios" className="relative py-32 bg-slate-50/50 overflow-hidden">
      {/* GRID DE SERVICIOS - VISTA PRINCIPAL */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-5xl md:text-8xl font-black text-slate-900 uppercase italic leading-none tracking-tighter">
            Nuestros <span className="text-fupagua-azul">Servicios</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div 
              key={service.id}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedService(service)}
              className={`group p-10 rounded-[45px] bg-white/70 backdrop-blur-md border border-white/50 cursor-pointer transition-all duration-500 shadow-sm hover:shadow-xl ${service.color} ${service.glowColor} ${service.isPremium ? 'border-fupagua-azul/30 bg-blue-50/40' : ''}`}
            >
              <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-slate-400 group-hover:bg-fupagua-azul group-hover:text-white transition-all shadow-sm">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black uppercase italic text-slate-800 mb-3 leading-tight">{service.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 line-clamp-2">{service.description}</p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-fupagua-azul tracking-widest">
                Ver Detalles <ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL DETALLADO */}
      <AnimatePresence>
        {selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-xl bg-slate-900/60">
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} 
              /* Cambiamos el tamaño del modal a max-w-6xl cuando es Evaluación */
              className={`bg-white w-full ${selectedService.isPremium || selectedService.specialists?.length > 1 ? 'max-w-6xl' : 'max-w-2xl'} rounded-[60px] overflow-hidden shadow-2xl relative flex flex-col p-8 md:p-14 max-h-[95vh]`}
            >
              <button onClick={() => setSelectedService(null)} className="absolute top-8 right-8 z-50 p-3 bg-slate-100 rounded-full hover:bg-fupagua-rojo hover:text-white transition-all shadow-md">
                <X size={24} />
              </button>

              <div className="mb-10 text-center">
                  <h4 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic leading-none">{selectedService.title}</h4>
                  <p className="text-fupagua-azul font-bold text-[10px] tracking-[0.4em] uppercase mt-4">Fundación Fupagua • Est. 1997</p>
              </div>

              <div className="flex-grow overflow-y-auto px-4">
                {selectedService.isPremium ? (
                  /* ==========================================
                     VISTA: EVALUACIÓN INTEGRAL (AGRANDADA)
                     ========================================== */
                  <div className="grid lg:grid-cols-12 gap-12 items-start py-6">
                    {/* Info a la Izquierda (5 columnas) */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                          <h5 className="text-2xl font-black text-slate-900 uppercase italic">Protocolo</h5>
                          <p className="text-slate-600 text-lg leading-relaxed italic border-l-4 border-fupagua-amarillo pl-6">
                            "{selectedService.details.objective}"
                          </p>
                        </div>
                        
                        <div className="bg-slate-50 p-8 rounded-[40px] space-y-6">
                            <div className="flex items-start gap-4">
                              <Activity className="text-fupagua-azul shrink-0" size={24}/>
                              <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Especialidades</p>
                                <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase">{selectedService.details.logistics}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <Clock className="text-fupagua-amarillo shrink-0" size={24}/>
                              <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Disponibilidad</p>
                                <p className="text-xs font-bold text-slate-600 uppercase">{selectedService.details.booking}</p>
                              </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Formulario a la Derecha (7 columnas) */}
                    <div className="lg:col-span-7">
                      <EvaluationForm onSuccess={() => setSelectedService(null)} />
                    </div>
                  </div>
                ) : selectedService.isSpecialGroup ? (
                  /* VISTA: EQUIPOS (Aula, Biblioteca, etc.) */
                  <div className="max-w-xl mx-auto py-4">
                    <div className="bg-slate-50 rounded-[45px] border border-slate-100 overflow-hidden shadow-lg">
                       <div className="h-64 bg-slate-200">
                          <img src={selectedService.image} className="w-full h-full object-cover" alt={selectedService.title} />
                       </div>
                       <div className="p-10 space-y-6">
                          <div className="space-y-4">
                             <div className="flex items-center gap-2 text-fupagua-azul font-black uppercase text-[10px] tracking-widest">
                                <Users size={16} /> Equipo de Trabajo
                             </div>
                             <div className="grid grid-cols-1 gap-2">
                                {selectedService.team.map((member, i) => (
                                   <div key={i} className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100">
                                      <span className="text-[12px] font-black text-slate-800 uppercase italic">{member.name}</span>
                                      <span className="text-[10px] font-bold text-fupagua-amarillo uppercase">{member.role}</span>
                                   </div>
                                ))}
                             </div>
                             <p className="text-slate-500 text-[11px] leading-relaxed font-medium italic pt-2">"{selectedService.details}"</p>
                          </div>
                          <button onClick={() => window.open(`https://wa.me/${selectedService.phone}`)} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-fupagua-azul transition-all flex items-center justify-center gap-3">
                            <MessageCircle size={18} fill="currentColor" className="text-green-500" /> WhatsApp {selectedService.title}
                          </button>
                       </div>
                    </div>
                  </div>
                ) : (
                  /* VISTA: ESPECIALISTAS INDIVIDUALES */
                  <div className={`grid gap-8 py-4 ${selectedService.specialists.length > 1 ? 'md:grid-cols-2' : 'max-w-xl mx-auto'}`}>
                    {selectedService.specialists.map((spec, index) => (
                      <div key={index} className="flex flex-col bg-slate-50 rounded-[45px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all h-full">
                        <div className="h-72 bg-slate-200 shrink-0">
                           <img src={spec.image} className="w-full h-full object-cover" alt={spec.name} />
                        </div>
                        <div className="p-8 flex flex-col flex-grow space-y-6">
                          <div className="flex-grow space-y-4">
                             <div className="flex justify-between items-start">
                                <div>
                                   <h5 className="text-xl font-black uppercase italic text-slate-900 leading-tight">{spec.name}</h5>
                                   <p className="text-fupagua-amarillo font-bold uppercase text-[9px] tracking-widest mt-1">{spec.role}</p>
                                </div>
                                <RatingStars />
                             </div>
                             <p className="text-slate-500 text-[11px] leading-relaxed font-medium italic">"{spec.bio}"</p>
                          </div>
                          <button onClick={() => window.open(`https://wa.me/${spec.phone}`)} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-fupagua-azul transition-all flex items-center justify-center gap-3 shadow-lg">
                            <MessageCircle size={18} fill="currentColor" className="text-green-500" /> WhatsApp {spec.name.split(' ')[1] || spec.name}
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