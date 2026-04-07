import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Activity, HeartPulse, Brain, Music, 
  MessageCircle, Stethoscope, ChevronRight, 
  ClipboardCheck, Clock, 
  Smile, Waves, Library, GraduationCap, School, Users,
  User, Send, Puzzle
} from 'lucide-react';

// ==========================================
// 1. COMPONENTE: FORMULARIO DE SALA DE ESPERA
// ==========================================
const WaitingListForm = ({ serviceName, onSuccess }) => {
  const [formData, setFormData] = useState({
    representante: '', niño: '', edad: '', cedula: '', telefono: '', motivo: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('URL_DE_TU_SISTEMA_INTERNO/api/sala-espera', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          servicio: serviceName,
          fecha_solicitud: new Date().toISOString()
        })
      });

      if (response.ok) {
        alert("¡Registro Exitoso! Su solicitud ha sido enviada.");
        onSuccess();
      } else { throw new Error('Error'); }   
    } catch (error) {
      alert("Error de conexión. Intente vía WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit} 
      className="space-y-4 bg-slate-900 p-6 md:p-8 rounded-[40px] text-white shadow-2xl border border-white/10 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-fupagua-azul/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      <div className="text-left mb-4">
        <span className="bg-fupagua-azul/20 text-fupagua-azul px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Ingreso Digital</span>
        <h5 className="text-xl font-black uppercase italic mt-2">Ficha de Recepción</h5>
        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Área: {serviceName}</p>
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Representante</label>
          <div className="relative">
            <User className="absolute left-4 top-3.5 text-fupagua-azul" size={16} />
            <input required placeholder="Nombre del adulto" className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none"
              onChange={e => setFormData({...formData, representante: e.target.value})} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input required placeholder="Nombre niño/a" className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none"
            onChange={e => setFormData({...formData, niño: e.target.value})} />
          <input required type="number" placeholder="Edad" className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none"
            onChange={e => setFormData({...formData, edad: e.target.value})} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input required placeholder="Cédula" className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none"
            onChange={e => setFormData({...formData, cedula: e.target.value})} />
          <input required placeholder="Teléfono" className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-xs focus:ring-2 focus:ring-fupagua-azul outline-none"
            onChange={e => setFormData({...formData, telefono: e.target.value})} />
        </div>
        <textarea required placeholder="Motivo de consulta..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-xs h-20 resize-none focus:ring-2 focus:ring-fupagua-azul outline-none"
          onChange={e => setFormData({...formData, motivo: e.target.value})} />
      </div>
      <button disabled={loading} type="submit" className="w-full bg-fupagua-azul hover:bg-white hover:text-slate-900 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 mt-2 shadow-xl shadow-fupagua-azul/20">
        {loading ? "Procesando..." : <><Send size={16} /> Enviar a Sala de Espera</>}
      </button>
    </motion.form>
  );
};

// ==========================================
// 2. COMPONENTE PRINCIPAL: SERVICES
// ==========================================
const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { id: "evaluacion", title: "Evaluación Integral", isPremium: true, icon: <ClipboardCheck size={28} className="text-fupagua-azul" />, color: "shadow-fupagua-azul/20", glowColor: "group-hover:border-fupagua-azul", description: "Proceso diagnóstico multidisciplinario para establecer antecedentes, conducta, perfil de desarrollo, test estandarizados, diagnóstico e interconsultas.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800" },
    { id: 4, title: "Terapia Ocupacional", specialist: "Doriannys Parra", icon: <Activity size={24} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Enfoque en habilidades motoras finas, integración sensorial y autonomía diaria del paciente.", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400" },
    { id: 10, title: "Fonoaudiología", specialist: "Cadida Magallanez", icon: <MessageCircle size={24} />, color: "shadow-fupagua-rojo/10", glowColor: "group-hover:border-fupagua-rojo", description: "Atención especializada en comunicación, lenguaje y procesos de deglución por Licenciada en Fonoaudiología.", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800" },
    { id: 6, title: "Bienestar y Yoga", specialist: "Carmen Yarisma Molina", icon: <Smile size={24} />, color: "shadow-fupagua-verde/10", glowColor: "group-hover:border-fupagua-verde", description: "Clases de yoga, masaje infantil, formación para padres y arte terapia para el equilibrio familiar.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400" },
    { id: 1, title: "Psicopedagogía", icon: <Brain size={24} />, color: "shadow-fupagua-amarillo/10", glowColor: "group-hover:border-fupagua-amarillo", description: "Optimización de procesos de aprendizaje y Necesidades Educativas Especiales (NEE).", image: "https://images.unsplash.com/photo-1544717297-fa95b3ee51f3?q=80&w=400" },
    { id: 2, title: "Psicología", icon: <HeartPulse size={24} />, color: "shadow-fupagua-rojo/10", glowColor: "group-hover:border-fupagua-rojo", description: "Evaluación, diagnóstico y acompañamiento emocional con enfoque clínico y familiar.", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400" },
    { id: 3, title: "Fisioterapia", icon: <Activity size={24} />, color: "shadow-fupagua-verde/10", glowColor: "group-hover:border-fupagua-verde", description: "Rehabilitación funcional y estimulación del desarrollo motor óptimo.", image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400" },
    { id: 5, title: "Pediatría", icon: <Stethoscope size={24} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Control de niño sano, seguimiento nutricional, vacunas y lactancia materna.", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400" },
    { id: 7, title: "Apoyo Pedagógico", icon: <GraduationCap size={24} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Alfabetización, nivelación y reforzamiento académico individualizado.", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=400" },
    { id: 8, title: "Arte y Cultura", icon: <Music size={24} />, color: "shadow-fupagua-amarillo/10", glowColor: "group-hover:border-fupagua-amarillo", description: "Iniciación musical, ejecución de instrumentos y expresión plástica creadora.", image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=400" },
    { id: 9, title: "Aula Integral", icon: <School size={24} />, color: "shadow-fupagua-verde/10", glowColor: "group-hover:border-fupagua-verde", description: "Atención pedagógica grupal con plan de abordaje individualizado.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800" },
    { id: 11, title: "Hidroterapia", icon: <Waves size={24} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Rehabilitación física y estimulación sensorial en piscina termal.", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800" },
    { id: 12, title: "Biblioteca Juana Milano", icon: <Library size={24} />, color: "shadow-fupagua-azul/10", glowColor: "group-hover:border-fupagua-azul", description: "Préstamo de material bibliográfico especializado y espacio de lectura.", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800" }
  ];

  return (
    <section id="servicios" className="relative pt-32 pb-20 bg-slate-50/50 overflow-hidden min-h-screen">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-4">
            <span className="h-1 w-12 bg-fupagua-amarillo rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-fupagua-azul">Catálogo de Especialidades</span>
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 uppercase italic leading-none tracking-tighter">Nuestros <span className="text-fupagua-azul">Servicios</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service) => (
            <motion.div key={service.id} whileHover={{ y: -8 }} onClick={() => setSelectedService(service)} className={`group p-8 rounded-[40px] bg-white border border-slate-100 cursor-pointer transition-all shadow-sm hover:shadow-2xl ${service.color} ${service.glowColor}`}>
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-fupagua-azul group-hover:text-white transition-all">{service.icon}</div>
              <h3 className="text-lg font-black uppercase italic text-slate-800 mb-2 leading-tight">{service.title}</h3>
              {service.specialist && <p className="text-[9px] font-black text-fupagua-azul uppercase mb-2 tracking-widest">{service.specialist}</p>}
              <p className="text-slate-500 font-medium text-xs leading-relaxed mb-6 line-clamp-2">{service.description}</p>
              <div className="flex items-center gap-2 text-[9px] font-black uppercase text-fupagua-azul tracking-widest">Ver Detalles <ChevronRight size={12} /></div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-xl bg-slate-900/60">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-5xl rounded-[50px] overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[95vh]">
              <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 z-50 p-2 bg-slate-100 rounded-full hover:bg-fupagua-rojo hover:text-white transition-all"><X size={20} /></button>
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-slate-50">
                <div className="mb-8">
                  <h4 className="text-4xl font-black text-slate-900 uppercase italic leading-tight">{selectedService.title}</h4>
                  <div className="h-1.5 w-16 bg-fupagua-amarillo mt-3 rounded-full"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-56 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-slate-100"><img src={selectedService.image} className="w-full h-full object-cover" alt={selectedService.title} /></div>
                  <p className="text-slate-600 text-[13px] leading-relaxed font-semibold italic border-l-4 border-fupagua-azul pl-4">{selectedService.description}</p>
                  <div className="flex items-center gap-4 bg-white p-5 rounded-3xl border border-slate-100">
                    <div className="p-3 bg-fupagua-azul/10 rounded-2xl text-fupagua-azul"><Users size={24} /></div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">Responsable / Equipo</p>
                      <p className="text-[11px] font-bold text-slate-800 uppercase">{selectedService.specialist || "Personal Multidisciplinario"}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4 md:p-8 bg-white flex flex-col justify-center border-l border-slate-100 overflow-y-auto">
                <WaitingListForm serviceName={selectedService.title} onSuccess={() => setSelectedService(null)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;