import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// FIREBASE
import { auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

// Componentes Globales
import Navbar from './components/Navbar';
import SocialFloat from "./components/SocialFloat";
import Footer from './components/Footer';

// Secciones del Home
import Hero from './components/Hero';
import Presentation from './components/Presentation'; 
import AboutUs from './components/AboutUs';
import JoinUs from './components/JoinUs';
import Donation from './components/Donation';
import GaleriaPublica from './components/GaleriaPublica';

// Componentes Independientes
import Services from './components/Services';
import News from './components/News'; 
import Store from './components/Store';
import Contact from "./components/Contact";
import Testimonials from './components/Testimonials';

// Componentes de Admin
import AdminPanel from './admin/AdminPanel'; 
import Login from './admin/components/Login';
const AppContent = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      console.log(" Firebase Auth Status:", currentUser ? "Conectado" : "Desconectado");
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const isAdminPath = location.pathname.startsWith('/admin');

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fupagua-azul"></div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verificando Credenciales...</p>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-white">
      {!isAdminPath && <Navbar />}
      {!isAdminPath && <SocialFloat />}

      <main>
        {/* La key={user?.uid} obliga a React a refrescar las rutas cuando el usuario cambia */}
        <Routes key={user ? user.uid : 'public'}>
          
          {/* --- RUTA DE ADMINISTRACIÓN PROTEGIDA --- */}
          <Route 
            path="/admin/*" 
            element={user ? <AdminPanel /> : <Login />} 
          />

          {/* RUTA PRINCIPAL PÚBLICA */}
          <Route path="/" element={
            <>
              <Hero />
              <Presentation /> 
              <AboutUs />
              <GaleriaPublica /> 
              <JoinUs />
              <Donation />
            </>
          } />

          <Route path="/servicios" element={<Services />} />
          <Route path="/noticias" element={<News />} />
          <Route path="/tienda" element={<Store />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/testimonios" element={<Testimonials />} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;