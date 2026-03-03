import React, { useState } from 'react';
// IMPORTAMOS LOS COMPONENTES DE ESTRUCTURA
import Login from './components/Login';
import AdminSidebar from './components/shared/AdminSidebar';
import WelcomeView from '../admin/components/dashboard/WelcomeView';

// IMPORTAMOS LOS FORMULARIOS (Estadísticas ahora vive dentro de WelcomeView)
import ContenidoForm from './components/Contenido/ContenidoForm';
import TiendaForm from './components/TiendaForm';
import GaleriaForm from './components/galeria/GaleriaForm';

const AdminPanel = () => {
  // Estado para la autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Estado para la navegación entre módulos
  const [activeModule, setActiveModule] = useState('dashboard');

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveModule('dashboard'); 
  };

  // 1. CONTROL DE ACCESO (GUARD)
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

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
          
          {/* CABECERA DINÁMICA CON HISTORIA */}
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
            
            {/* 1. DASHBOARD INTEGRADO (Welcome + Análisis en un solo archivo) */}
            {activeModule === 'dashboard' && (
              <div className="animate-in fade-in zoom-in-95 duration-700">
                <WelcomeView setActiveModule={setActiveModule} />
              </div>
            )}

            {/* 2. CONTENIDO: Biblioteca (Noticias/PDFs) */}
            {activeModule === 'contenido' && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <ContenidoForm />
              </div>
            )}

            {/* 3. TIENDA: Inventario Pro */}
            {activeModule === 'tienda' && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <TiendaForm />
              </div>
            )}

            {/* 4. GALERÍA: Fupagua en Acción */}
            {activeModule === 'galeria' && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <GaleriaForm />
              </div>
            )}
            
          </section>

          {/* FOOTER DEL SISTEMA ACTUALIZADO */}
          <footer className="mt-20 pt-8 border-t border-slate-50 flex justify-between items-center text-slate-300">
              <p className="text-[9px] font-black uppercase tracking-[0.3em]">
                © 2026 FUPAGUA - FUNDACIÓN DE PERSONAS AUTISTAS DEL GUARICO
              </p>
              <div className="flex gap-4">
                 <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-[8px] font-black text-slate-300 border border-slate-100 italic">28</div>
              </div>
          </footer>

        </div>
      </main>
    </div>
  );
};

export default AdminPanel;