

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, HandHelping, Globe, CreditCard, ArrowRight, CheckCircle2, User, Hash, Camera, MessageCircle, ArrowLeft, Copy } from 'lucide-react';

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
    alert("Copiado al portapapeles");
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
    // AJUSTE: py-32 a py-20
    <section id="donar" className="py-16 md:py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-fupagua-azul/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fupagua-amarillo/5 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* LADO IZQUIERDO */}
          <div className="text-center lg:text-left space-y-6">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <Heart size={14} className="text-fupagua-rojo fill-fupagua-rojo" />
              <span className="text-white text-[9px] font-black uppercase tracking-[0.2em]">Transformando vidas desde 1997</span>
            </motion.div>
            
            {/* AJUSTE: Título de 8xl a 5xl */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase italic leading-[0.95] tracking-tighter">
              Sembrando <br /> <span className="text-fupagua-amarillo">Esperanza</span>
            </h2>
            
            <p className="text-slate-400 text-sm md:text-base font-medium max-w-md mx-auto lg:mx-0 leading-relaxed">
              Tu aporte permite financiar **Evaluaciones Integrales** y el sostenimiento de nuestra misión con más de 28 años de trayectoria.
            </p>

            {/* TABLA DE DATOS BANCARIOS */}
            <AnimatePresence>
              {step === 2 && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 border border-white/10 p-5 rounded-[30px] backdrop-blur-xl max-w-sm mx-auto lg:mx-0">
                  <div className="flex gap-2 mb-4">
                    <button onClick={() => setPaymentMethod('pago_movil')} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase ${paymentMethod === 'pago_movil' ? 'bg-fupagua-amarillo text-slate-900' : 'bg-white/10 text-white'}`}>Pago Móvil</button>
                    <button onClick={() => setPaymentMethod('transferencia')} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase ${paymentMethod === 'transferencia' ? 'bg-fupagua-azul text-white' : 'bg-white/10 text-white'}`}>Transferencia</button>
                  </div>

                  <div className="text-white text-[10px] space-y-2 uppercase tracking-wider text-left">
                    <p className="text-fupagua-amarillo font-black">FUPAGUA (J-50295476-8)</p>
                    <p className="flex justify-between border-b border-white/5 pb-1"><span>Banco:</span> <b>Mercantil (0105)</b></p>
                    {paymentMethod === 'pago_movil' ? (
                      <p className="flex justify-between italic"><span>Telf:</span> <b className="flex items-center gap-2">04243390902 <Copy size={12} className="cursor-pointer" onClick={() => handleCopy('04243390902')}/></b></p>
                    ) : (
                      <div className="pt-1">
                        <b className="text-[10px] bg-black/40 p-2 rounded block text-center flex items-center justify-center gap-2">
                          0105 0076 1710 7624 6885 <Copy size={12} className="cursor-pointer" onClick={() => handleCopy('01050076171076246885')}/>
                        </b>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LADO DERECHO: TARJETA BLANCA */}
          <motion.div className="bg-white rounded-[35px] md:rounded-[45px] p-6 md:p-10 shadow-2xl relative min-h-[480px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="mb-6 text-center lg:text-left">
                    <h4 className="text-slate-900 font-black text-xl md:text-2xl uppercase italic">Selecciona un monto</h4>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">¿Cuánto deseas aportar hoy?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {amounts.map((amt) => (
                      <button key={amt.value} onClick={() => { setSelectedAmount(amt.value); setCustomAmount(""); }} className={`py-4 rounded-[20px] font-black text-xl md:text-2xl transition-all border-2 ${selectedAmount === amt.value ? 'bg-fupagua-azul border-fupagua-azul text-white' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100'}`}>
                        {amt.label}
                      </button>
                    ))}
                  </div>
                  <input type="number" placeholder="Otro monto..." value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }} className="w-full bg-slate-50 border-2 border-transparent focus:border-fupagua-azul rounded-[20px] p-4 font-black text-lg outline-none mb-6 text-center" />
                  
                  <button onClick={() => setStep(2)} disabled={!selectedAmount && !customAmount} className="w-full bg-slate-900 text-white py-4 md:py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-fupagua-azul transition-all disabled:opacity-20 group">
                    Continuar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-fupagua-amarillo" />
                  </button>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase mb-4"><ArrowLeft size={12}/> Volver</button>
                  <h4 className="text-xl font-black text-slate-900 mb-5 uppercase italic">Confirmar Pago</h4>
                  
                  <div className="space-y-3 mb-6">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input type="text" placeholder="Tu nombre" className="w-full bg-slate-50 p-4 pl-12 rounded-xl text-sm font-bold outline-none border-2 border-transparent focus:border-fupagua-azul" onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
                    </div>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input type="text" placeholder="Nro de Referencia" className="w-full bg-slate-50 p-4 pl-12 rounded-xl text-sm font-bold outline-none border-2 border-transparent focus:border-fupagua-azul" onChange={(e) => setFormData({...formData, referencia: e.target.value})} />
                    </div>
                    <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center cursor-pointer hover:bg-slate-50 group">
                      <input type="file" hidden ref={fileInputRef} onChange={(e) => setFormData({...formData, fileName: e.target.files[0]?.name})} accept="image/*" />
                      <Camera size={20} className="text-slate-300 mb-1" />
                      <span className="text-[9px] font-black uppercase text-slate-400">{formData.fileName || "Subir Capture"}</span>
                    </div>
                  </div>

                  <button onClick={handleWhatsAppSend} className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-slate-900 transition-all">
                    Enviar a WhatsApp <MessageCircle size={18} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Donation;