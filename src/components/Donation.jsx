

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, CreditCard, ArrowRight, User, Hash, 
  Camera, MessageCircle, ArrowLeft, Copy, Sparkles, 
  ShieldCheck, Banknote
} from 'lucide-react';

const Donation = () => {
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState('pago_movil');
  const [formData, setFormData] = useState({ nombre: "", referencia: "", fileName: "" });
  const fileInputRef = useRef(null);

  const amounts = [
    { value: 10, label: "$10" },
    { value: 25, label: "$25" },
    { value: 50, label: "$50" },
    { value: 100, label: "$100" },
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleWhatsAppSend = () => {
    if (!formData.nombre || !formData.referencia) return alert("Por favor, ingresa tu nombre y nro de referencia.");
    const finalAmount = customAmount || selectedAmount;
    const phone = "584243390902"; 
    const message = `*NUEVA DONACIÓN / EVALUACIÓN - FUPAGUA*%0A%0A` +
                    `*Nombre:* ${formData.nombre}%0A` +
                    `*Monto:* $${finalAmount}%0A` +
                    `*Método:* ${paymentMethod.toUpperCase()}%0A` +
                    `*Referencia:* ${formData.referencia}%0A%0A` +
                    `_Adjunto capture de pantalla para validación._`;
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    /* CAMBIO CLAVE: id="donacion" para coincidir con el Navbar 
       y scroll-mt-32 para que el header no tape el contenido
    */
    <section id="donacion" className="pt-32 pb-24 bg-slate-900 relative overflow-hidden scroll-mt-32">
      
      {/* TEXTO DE FONDO GIGANTE */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <h2 className="text-[18vw] font-black uppercase italic leading-none whitespace-nowrap -ml-20 text-white">
          DONAR • IMPACTO • SOLIDARIDAD
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* LADO IZQUIERDO: TEXTO E INFO BANCARIA */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-6">
                <span className="h-1 w-12 bg-fupagua-amarillo rounded-full"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-fupagua-amarillo">Impacto Social</span>
              </motion.div>
              
              <h2 className="text-6xl md:text-8xl font-black text-white uppercase italic leading-[0.85] tracking-tighter mb-8">
                Sembrando <br /> 
                <span className="relative text-fupagua-azul font-light italic ml-2 md:ml-4">
                  Esperanza
                  <svg className="absolute -bottom-2 left-0 w-full h-4 text-fupagua-amarillo/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
                  </svg>
                </span>
              </h2>
              
              <p className="text-slate-400 text-lg font-medium max-w-md leading-relaxed">
                Tu aporte financia <b>Evaluaciones Integrales</b> y garantiza la continuidad de nuestra misión con más de 28 años de trayectoria en Venezuela.
              </p>
            </div>

            {/* DATOS BANCARIOS */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-2xl shadow-2xl"
            >
              <div className="flex gap-3 mb-8 bg-black/20 p-2 rounded-2xl">
                <button onClick={() => setPaymentMethod('pago_movil')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'pago_movil' ? 'bg-fupagua-amarillo text-slate-900 shadow-lg' : 'text-white/40 hover:text-white'}`}>Pago Móvil</button>
                <button onClick={() => setPaymentMethod('transferencia')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'transferencia' ? 'bg-fupagua-azul text-white shadow-lg' : 'text-white/40 hover:text-white'}`}>Transferencia</button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between group">
                  <div>
                    <p className="text-[9px] font-black text-fupagua-amarillo uppercase tracking-widest mb-1">Beneficiario</p>
                    <p className="text-white font-black text-lg">FUPAGUA</p>
                  </div>
                  <ShieldCheck className="text-white/10 group-hover:text-fupagua-amarillo transition-colors" size={32} />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">RIF</p>
                    <p className="text-white font-bold text-sm">J-50295476-8</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Banco</p>
                    <p className="text-white font-bold text-sm">Mercantil (0105)</p>
                  </div>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl flex items-center justify-between border border-white/5 group hover:border-fupagua-azul/50 transition-all">
                  <div className="overflow-hidden">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
                      {paymentMethod === 'pago_movil' ? 'Teléfono Destino' : 'Cuenta Corriente'}
                    </p>
                    <p className="text-white font-mono text-sm tracking-tighter">
                      {paymentMethod === 'pago_movil' ? '0424 3390902' : '0105 0076 1710 7624 6885'}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleCopy(paymentMethod === 'pago_movil' ? '04243390902' : '01050076171076246885')}
                    className="p-3 bg-white/5 rounded-xl text-white hover:bg-fupagua-azul transition-all active:scale-90"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* LADO DERECHO: FORMULARIO */}
          <div className="lg:col-span-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[50px] p-8 md:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="mb-10">
                      <span className="text-fupagua-azul font-black uppercase text-[10px] tracking-[0.3em]">Paso 01</span>
                      <h4 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mt-2">Monto del Aporte</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {amounts.map((amt) => (
                        <button 
                          key={amt.value} 
                          onClick={() => { setSelectedAmount(amt.value); setCustomAmount(""); }} 
                          className={`group relative overflow-hidden py-6 rounded-[25px] font-black text-2xl transition-all border-2 ${selectedAmount === amt.value ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100'}`}
                        >
                          {amt.label}
                          {selectedAmount === amt.value && (
                            <Sparkles className="absolute top-2 right-2 text-fupagua-amarillo" size={14} />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="relative mb-10">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-black text-xl">$</span>
                      <input 
                        type="number" 
                        placeholder="Otro monto..." 
                        value={customAmount} 
                        onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }} 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-fupagua-azul rounded-[25px] p-6 pl-12 font-black text-xl outline-none transition-all" 
                      />
                    </div>
                    
                    <button 
                      onClick={() => setStep(2)} 
                      disabled={!selectedAmount && !customAmount} 
                      className="w-full bg-slate-900 text-white py-6 rounded-[25px] font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-fupagua-azul transition-all disabled:opacity-20 group shadow-xl"
                    >
                      Continuar <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform text-fupagua-amarillo" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase mb-8 hover:text-slate-900 transition-colors">
                      <ArrowLeft size={14}/> Volver a Montos
                    </button>

                    <div className="mb-8">
                      <span className="text-fupagua-azul font-black uppercase text-[10px] tracking-[0.3em]">Paso 02</span>
                      <h4 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mt-2">Reportar Pago</h4>
                    </div>
                    
                    <div className="space-y-4 mb-10">
                      <div className="relative">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <input type="text" placeholder="Nombre completo" className="w-full bg-slate-50 p-5 pl-14 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-fupagua-azul transition-all" onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
                      </div>

                      <div className="relative">
                        <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <input type="text" placeholder="Nro de Referencia (Últimos 4)" className="w-full bg-slate-50 p-5 pl-14 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-fupagua-azul transition-all" onChange={(e) => setFormData({...formData, referencia: e.target.value})} />
                      </div>

                      <div 
                        onClick={() => fileInputRef.current.click()} 
                        className="group border-2 border-dashed border-slate-200 rounded-[25px] p-8 flex flex-col items-center cursor-pointer hover:bg-slate-50 hover:border-fupagua-azul transition-all"
                      >
                        <input type="file" hidden ref={fileInputRef} onChange={(e) => setFormData({...formData, fileName: e.target.files[0]?.name})} accept="image/*" />
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Camera size={24} className="text-slate-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">
                          {formData.fileName || "Adjuntar Capture del Pago"}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={handleWhatsAppSend} 
                      className="w-full bg-[#25D366] text-white py-6 rounded-[25px] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-4 hover:shadow-[0_20px_40px_rgba(37,211,102,0.3)] hover:-translate-y-1 transition-all"
                    >
                      Validar Donación <MessageCircle size={20} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Donation;