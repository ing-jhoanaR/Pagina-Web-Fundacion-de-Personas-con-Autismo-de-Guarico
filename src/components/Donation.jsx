
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, HandHelping, Globe, CreditCard, ArrowRight, CheckCircle2, User, Hash, Camera, MessageCircle, ArrowLeft, Copy } from 'lucide-react';

const Donation = () => {
  const [step, setStep] = useState(1); // 1: Selección, 2: Datos/Pago
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState('pago_movil');
  const [formData, setFormData] = useState({ nombre: "", referencia: "", fileName: "" });
  const fileInputRef = useRef(null);

  const amounts = [
    { value: 10, label: "$10", impact: "Cubre una sesión de fisioterapia para un niño." },
    { value: 25, label: "$25", impact: "Aporta materiales didácticos para un aula integral." },
    { value: 50, label: "$50", impact: "Cubre una evaluación médica completa con especialistas." },
    { value: 100, label: "$100", impact: "Apadrina la beca educativa total de un niño por un mes." },
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copiado al portapapeles");
  };

  const handleWhatsAppSend = () => {
    if (!formData.nombre || !formData.referencia) return alert("Por favor, ingresa tu nombre y nro de referencia.");
    const finalAmount = customAmount || selectedAmount;
    
    // NÚMERO DE WHATSAPP ACTUALIZADO
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
    <section id="donar" className="py-20 md:py-32 bg-slate-900 relative overflow-hidden">
      {/* Fondo Decorativo Original */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fupagua-azul/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fupagua-amarillo/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* LADO IZQUIERDO: TEXTO INSPIRACIONAL */}
          <div className="text-center lg:text-left space-y-8">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <Heart size={16} className="text-fupagua-rojo fill-fupagua-rojo" />
              <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Transformando vidas desde 1997</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic leading-[0.9] tracking-tighter">
              Sembrando <br /> <span className="text-fupagua-amarillo">Esperanza</span>
            </h2>
            
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Tu aporte permite financiar **Evaluaciones Integrales** y el sostenimiento de nuestra misión con niños y adultos con necesidades especiales.
            </p>

            {/* TABLA DE DATOS BANCARIOS (Se muestra en el paso 2) */}
            <AnimatePresence>
              {step === 2 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 p-6 rounded-[35px] backdrop-blur-xl max-w-md mx-auto lg:mx-0">
                  <div className="flex gap-2 mb-4">
                    <button onClick={() => setPaymentMethod('pago_movil')} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase ${paymentMethod === 'pago_movil' ? 'bg-fupagua-amarillo text-slate-900' : 'bg-white/10 text-white'}`}>Pago Móvil</button>
                    <button onClick={() => setPaymentMethod('transferencia')} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase ${paymentMethod === 'transferencia' ? 'bg-fupagua-azul text-white' : 'bg-white/10 text-white'}`}>Transferencia</button>
                  </div>

                  <div className="text-white text-[11px] space-y-2 uppercase tracking-wider text-left">
                    <p className="text-fupagua-amarillo font-black mb-1">Fundación de Pers. Autistas del Guárico</p>
                    <p className="flex justify-between border-b border-white/5 pb-1 italic"><span>Banco:</span> <b>Mercantil (0105)</b></p>
                    
                    {paymentMethod === 'pago_movil' ? (
                      <>
                        <p className="flex justify-between border-b border-white/5 pb-1 italic"><span>RIF:</span> <b className="flex items-center gap-2">J-50295476-8 <Copy size={12} className="cursor-pointer text-fupagua-amarillo" onClick={() => handleCopy('J502954768')}/></b></p>
                        <p className="flex justify-between italic"><span>Telf:</span> <b className="flex items-center gap-2">04243390902 <Copy size={12} className="cursor-pointer text-fupagua-amarillo" onClick={() => handleCopy('04243390902')}/></b></p>
                      </>
                    ) : (
                      <div className="pt-2">
                        <p className="text-[9px] text-slate-400 mb-1">Cuenta Corriente:</p>
                        <b className="text-[12px] bg-black/40 p-2 rounded block text-center flex items-center justify-center gap-2">
                          0105 0076 1710 7624 6885
                          <Copy size={14} className="cursor-pointer text-fupagua-amarillo" onClick={() => handleCopy('01050076171076246885')}/>
                        </b>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-white/50 pt-4">
              <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-fupagua-azul" /><span className="text-[10px] font-bold uppercase tracking-widest">RIF J-50295476-8</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-fupagua-azul" /><span className="text-[10px] font-bold uppercase tracking-widest">Mercantil</span></div>
            </div>
          </div>

          {/* LADO DERECHO: TARJETA BLANCA ORIGINAL */}
          <motion.div className="bg-white rounded-[40px] md:rounded-[60px] p-8 md:p-12 shadow-2xl relative min-h-[550px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="mb-8 text-center lg:text-left">
                    <h4 className="text-slate-900 font-black text-2xl md:text-3xl uppercase italic mb-2">Selecciona un monto</h4>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">¿Cuánto deseas aportar hoy?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {amounts.map((amt) => (
                      <button key={amt.value} onClick={() => { setSelectedAmount(amt.value); setCustomAmount(""); }} className={`py-6 rounded-[25px] font-black text-2xl md:text-3xl transition-all border-2 ${selectedAmount === amt.value ? 'bg-fupagua-azul border-fupagua-azul text-white scale-105 shadow-xl' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100'}`}>
                        {amt.label}
                      </button>
                    ))}
                  </div>
                  <input type="number" placeholder="Otro monto..." value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }} className="w-full bg-slate-50 border-2 border-transparent focus:border-fupagua-azul rounded-[25px] p-6 font-black text-xl outline-none mb-8 shadow-inner text-center" />
                  
                  <button onClick={() => setStep(2)} disabled={!selectedAmount && !customAmount} className="w-full bg-slate-900 text-white py-6 md:py-8 rounded-[30px] font-black uppercase text-sm tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-fupagua-azul transition-all shadow-xl disabled:opacity-20 group">
                    Continuar <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform text-fupagua-amarillo" />
                  </button>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase mb-6"><ArrowLeft size={14}/> Volver</button>
                  <h4 className="text-2xl font-black text-slate-900 mb-6 uppercase italic">Confirmar Pago</h4>
                  
                  <div className="space-y-4 mb-6">
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input type="text" placeholder="Tu nombre" className="w-full bg-slate-50 p-5 pl-14 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-fupagua-azul" onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
                    </div>
                    <div className="relative">
                      <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input type="text" placeholder="Nro de Referencia" className="w-full bg-slate-50 p-5 pl-14 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-fupagua-azul" onChange={(e) => setFormData({...formData, referencia: e.target.value})} />
                    </div>
                    <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center cursor-pointer hover:bg-slate-50 transition-all group">
                      <input type="file" hidden ref={fileInputRef} onChange={(e) => setFormData({...formData, fileName: e.target.files[0]?.name})} accept="image/*" />
                      <Camera size={24} className="text-slate-300 group-hover:text-fupagua-azul mb-2" />
                      <span className="text-[10px] font-black uppercase text-slate-400">{formData.fileName || "Subir Capture de Pago"}</span>
                    </div>
                  </div>

                  <button onClick={handleWhatsAppSend} className="w-full bg-[#25D366] text-white py-6 rounded-[30px] font-black uppercase text-sm tracking-[0.2em] flex items-center justify-center gap-4 shadow-xl hover:bg-slate-900 transition-all">
                    Enviar a WhatsApp <MessageCircle size={20} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex justify-center gap-6 opacity-30">
              <CreditCard size={24} /> <Globe size={24} /> <HandHelping size={24} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Donation;