import React, { useState } from 'react';
// IMPORTAMOS LOS COMPONENTES DE ESTRUCTURA
import AdminSidebar from './components/shared/AdminSidebar';
import WelcomeView from '../admin/components/dashboard/WelcomeView';

// FIREBASE (Para el logout real)
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

// IMPORTAMOS LOS FORMULARIOS
import ContenidoForm from './components/Contenido/ContenidoForm';
import TiendaForm from './components/TiendaForm';
import GaleriaForm from './components/galeria/GaleriaForm';

const AdminPanel = () => {
  // Ya no necesitamos isAuthenticated aquí porque App.jsx ya lo validó
  
  // Estado para la navegación entre módulos
  const [activeModule, setActiveModule] = useState('dashboard');

  // Función para cerrar sesión real en Firebase
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Al cerrar sesión, App.jsx detectará que user es null y te sacará solo
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans selection:bg-fupagua-azul selection:text-white">
      
      {/* NAVEGACIÓN LATERAL (SIDEBAR) */}
      <AdminSidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule} 
        onLogout={handleLogout} 
      />

      {/* ÁREA DE TRABAJO PRINCIPAL */}
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="max-w-7xl mx-auto px-6 py-10 md:px-12">
          
          {/* CABECERA DINÁMICA */}
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-10">
            <div className="animate-in fade-in slide-in-from-left-6 duration-700">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[2px] bg-fupagua-azul" />
                <p className="text-fupagua-azul font-black uppercase text-[10px] tracking-[0.4em] drop-shadow-sm">
                  Fupagua OS v3.0
                </p>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 italic uppercase tracking-tighter leading-none">
                {activeModule === 'dashboard' && "Panel Central"}
                {activeModule === 'contenido' && "Biblioteca Digital"}
                {activeModule === 'tienda' && "Tienda & Stocks"}
                {activeModule === 'galeria' && "Archivo Visual"}
              </h1>
            </div>

            <div className="text-right border-l-2 border-fupagua-amarillo/30 pl-8 animate-in fade-in duration-1000">
              <span className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                Legado Institucional
              </span>
              <span className="text-2xl font-black text-slate-900 italic">
                Est. 1997 <span className="text-fupagua-azul">•</span> +28 Años
              </span>
              <div className="flex items-center justify-end gap-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Servidor Activo</span>
              </div>
            </div>
          </header>

          {/* RENDERIZADO DINÁMICO DE MÓDULOS */}
          <section className="relative min-h-[60vh]">
            {activeModule === 'dashboard' && (
              <div className="animate-in fade-in zoom-in-95 duration-700">
                <WelcomeView setActiveModule={setActiveModule} />
              </div>
            )}

            {activeModule === 'contenido' && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <ContenidoForm />
              </div>
            )}

            {activeModule === 'tienda' && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <TiendaForm />
              </div>
            )}

            {activeModule === 'galeria' && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <GaleriaForm />
              </div>
            )}
          </section>

          {/* FOOTER */}
          <footer className="mt-20 pt-8 border-t border-slate-50 flex justify-between items-center text-slate-300">
              <p className="text-[9px] font-black uppercase tracking-[0.3em]">
                © 2026 FUPAGUA - FUNDACIÓN DE PERSONAS AUTISTAS DEL GUARICO
              </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;