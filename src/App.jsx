import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

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

// --- NUEVA IMPORTACIÓN: EL VISOR DE REELS Y FOTOS ---
import GaleriaPublica from './components/GaleriaPublica';

// Componentes Independientes
import Services from './components/Services';
import News from './components/News'; 
import Store from './components/Store';
import Contact from "./components/Contact";
import Testimonials from './components/Testimonials';

// --- NUEVA IMPORTACIÓN: EL CEREBRO ADMINISTRATIVO ---
import AdminPanel from './admin/AdminPanel'; 

// Componente Wrapper para manejar la visibilidad de elementos globales
const AppContent = () => {
  const location = useLocation();
  
  // Verificamos si estamos en la ruta de administración
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="relative min-h-screen bg-white">
      {/* Solo mostramos Navbar y SocialFloat si NO estamos en el Admin */}
      {!isAdminPath && <Navbar />}
      {!isAdminPath && <SocialFloat />}

      <main>
        <Routes>
          {/* --- RUTA DE ADMINISTRACIÓN (DIRECCIÓN SECRETA) --- */}
          <Route path="/admin/*" element={<AdminPanel />} />

          {/* RUTA PRINCIPAL PÚBLICA (HOME) */}
          <Route path="/" element={
            <>
              <Hero />
              <Presentation /> 
              <AboutUs />
              
              {/* --- AQUÍ APARECERÁ TU GALERÍA EN TIEMPO REAL --- */}
              <GaleriaPublica /> 

              <JoinUs />
              <Donation />
            </>
          } />

          {/* RUTAS INDEPENDIENTES PÚBLICAS */}
          <Route path="/servicios" element={<Services />} />
          <Route path="/noticias" element={<News />} />
          <Route path="/tienda" element={<Store />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/testimonios" element={<Testimonials />} />
        </Routes>
      </main>

      {/* Solo mostramos el Footer si NO estamos en el Admin */}
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