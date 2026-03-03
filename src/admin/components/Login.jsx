
import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, UserPlus, RefreshCcw, ChevronLeft } from 'lucide-react';
import LogoImg from '../../assets/logoorigin.png';

const Login = ({ onLogin }) => {
  // Estados para controlar qué vista mostrar: 'login' | 'register' | 'recover'
  const [view, setView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  
  // Animación de entrada según el estado
  const transitionClass = "animate-in fade-in slide-in-from-bottom-4 duration-500";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden font-sans">
      
      {/* DECORACIÓN DE FONDO */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-fupagua-azul/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fupagua-amarillo/15 rounded-full blur-[120px]" />

      <div className="w-full max-w-[480px] p-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-2xl rounded-[45px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.08)] border border-white p-8 md:p-12 transition-all">
          
          {/* LOGO DINÁMICO */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="bg-white p-4 rounded-3xl shadow-sm mb-4 border border-slate-50 transform hover:rotate-3 transition-transform duration-500">
               <img src={LogoImg} alt="FUPAGUA" className="h-14 w-auto object-contain" />
            </div>
            
            {/* Títulos dinámicos según la vista */}
            {view === 'login' && (
              <div className={transitionClass}>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Panel <span className="text-fupagua-azul">Admin</span></h1>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Bienvenido de nuevo</p>
              </div>
            )}
            {view === 'register' && (
              <div className={transitionClass}>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic text-fupagua-azul">Registro</h1>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Crea una nueva cuenta de staff</p>
              </div>
            )}
            {view === 'recover' && (
              <div className={transitionClass}>
                <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Recuperar <span className="text-fupagua-amarillo">Acceso</span></h1>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Enviaremos un enlace a tu correo</p>
              </div>
            )}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-5">
            
            {/* Campo de Nombre (Solo en Registro) */}
            {view === 'register' && (
              <div className={transitionClass}>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Nombre Completo</label>
                <div className="relative mt-1">
                  <input type="text" className="w-full bg-white border border-slate-100 py-4 px-6 rounded-2xl outline-none focus:ring-2 focus:ring-fupagua-azul/20 focus:border-fupagua-azul transition-all" placeholder="Juan Pérez" />
                </div>
              </div>
            )}

            {/* EMAIL (En todas las vistas) */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Correo Institucional</label>
              <div className="relative group mt-1">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-300 group-focus-within:text-fupagua-azul transition-colors" />
                </div>
                <input 
                  type="email" 
                  className="w-full bg-white border border-slate-100 py-4 pl-12 pr-5 rounded-2xl outline-none focus:ring-2 focus:ring-fupagua-azul/20 focus:border-fupagua-azul transition-all font-medium text-slate-700"
                  placeholder="admin@fupagua.org"
                  required
                />
              </div>
            </div>

            {/* PASSWORD (Solo en Login y Registro) */}
            {view !== 'recover' && (
              <div className={transitionClass}>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Contraseña</label>
                <div className="relative group mt-1">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-300 group-focus-within:text-fupagua-azul transition-colors" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-white border border-slate-100 py-4 pl-12 pr-14 rounded-2xl outline-none focus:ring-2 focus:ring-fupagua-azul/20 focus:border-fupagua-azul transition-all font-medium text-slate-700"
                    placeholder="••••••••"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-300 hover:text-slate-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {/* BOTÓN PRINCIPAL */}
            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-[22px] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-fupagua-azul hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              {view === 'login' && 'Entrar al sistema'}
              {view === 'register' && 'Crear cuenta staff'}
              {view === 'recover' && 'Enviar instrucciones'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* ACCIONES SECUNDARIAS (Dinámicas) */}
          <div className="mt-8 flex flex-col gap-4 items-center">
            
            {view === 'login' && (
              <>
                <button onClick={() => setView('recover')} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-fupagua-amarillo transition-colors flex items-center gap-2">
                  <RefreshCcw size={12} /> ¿Olvidaste tu contraseña?
                </button>
                <button onClick={() => setView('register')} className="text-[10px] font-black text-fupagua-azul uppercase tracking-widest hover:underline flex items-center gap-2">
                  <UserPlus size={12} /> Solicitar nuevo registro
                </button>
              </>
            )}

            {(view === 'register' || view === 'recover') && (
              <button onClick={() => setView('login')} className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-fupagua-azul transition-colors flex items-center gap-2">
                <ChevronLeft size={14} /> Volver al inicio de sesión
              </button>
            )}
          </div>

          {/* FOOTER SEGURO */}
          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <div className="flex items-center justify-center gap-2 text-slate-300">
              <ShieldCheck size={14} />
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">FUPAGUA Segure Core • +28 Años</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;