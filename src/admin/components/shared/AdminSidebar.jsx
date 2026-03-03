

import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, ShoppingBag, 
  Image as GalleryIcon, LogOut, Settings, 
  Menu, X, Bell, Shield, User
} from 'lucide-react';
import LogoImg from '../../../assets/logoorigin.png';

const AdminSidebar = ({ activeModule, setActiveModule, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const menuItems = [
    { id: 'dashboard', name: 'Inicio', icon: <LayoutDashboard size={20} /> },
    { id: 'contenido', name: 'Centro de Medios', icon: <BookOpen size={20} /> },
    { id: 'tienda', name: 'Tienda', icon: <ShoppingBag size={20} /> },
    { id: 'galeria', name: 'Galería', icon: <GalleryIcon size={20} /> },
  ];

  const QuickSettings = () => (
    <div className="absolute bottom-24 left-6 right-6 bg-white rounded-[30px] shadow-2xl border border-slate-100 p-4 animate-in slide-in-from-bottom-4 duration-300 z-50">
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-2">Ajustes Rápidos</p>
      <div className="space-y-1">
        <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl text-xs font-bold text-slate-600 transition-colors">
          <User size={16} className="text-fupagua-azul" /> Perfil Admin
        </button>
        <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl text-xs font-bold text-slate-600 transition-colors">
          <Bell size={16} className="text-fupagua-amarillo" /> Notificaciones
        </button>
        <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl text-xs font-bold text-slate-600 transition-colors">
          <Shield size={16} className="text-green-500" /> Seguridad
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* BOTÓN MÓVIL */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 z-[110] p-3 bg-slate-900 text-white rounded-2xl shadow-xl"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-[100]
        w-72 h-screen bg-white border-r border-slate-100
        flex flex-col p-6 transition-all duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* LOGO */}
        <div className="flex items-center gap-3 px-2 mb-10">
          <img src={LogoImg} alt="FUPAGUA" className="h-10 w-auto" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900 leading-none tracking-tighter uppercase italic">FUPAGUA</span>
            <span className="text-[8px] font-black text-fupagua-azul uppercase tracking-widest">Admin Panel</span>
          </div>
        </div>

        {/* NAVEGACIÓN */}
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">Gestión</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveModule(item.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                activeModule === item.id 
                ? 'bg-slate-900 text-white shadow-xl translate-x-1' 
                : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <span className={activeModule === item.id ? 'text-fupagua-amarillo' : 'text-slate-400'}>
                {item.icon}
              </span>
              {item.name}
            </button>
          ))}
        </nav>

        {/* CONFIGURACIÓN Y LOGOUT */}
        <div className="mt-auto relative border-t border-slate-50 pt-6">
          {showSettings && <QuickSettings />}
          
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${showSettings ? 'bg-slate-100 text-fupagua-azul' : 'text-slate-400 hover:text-fupagua-azul'}`}
          >
            <Settings size={18} /> Configuración
          </button>

          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 font-bold text-sm hover:bg-red-50 rounded-2xl transition-all mt-2"
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;