import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Componentes que ahora son Páginas Independientes
import Services from './components/Services';
import News from './components/News'; 
import Store from './components/Store';
import Contact from "./components/Contact";
import Testimonials from './components/Testimonials';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-white">
        <Navbar />
        
        {/* El componente SocialFloat suele estar en todas las vistas */}
        <SocialFloat />

        <main>
          <Routes>
            {/* RUTA PRINCIPAL: Solo lo esencial */}
            <Route path="/" element={
              <>
                <Hero />
                <Presentation /> 
                <AboutUs />
                <JoinUs />
                <Donation />
              </>
            } />

            {/* RUTAS INDEPENDIENTES: Cada una es una "ventana" nueva */}
            <Route path="/servicios" element={<Services />} />
            <Route path="/noticias" element={<News />} />
            <Route path="/tienda" element={<Store />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/testimonios" element={<Testimonials />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;