import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Presentation from './components/Presentation';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import JoinUs from './components/JoinUs';
import News from './components/News'; 
import Store from './components/Store';
import SocialFloat from "./components/SocialFloat";
import Donation from './components/Donation';
import Contact from "./components/Contact";
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      
      <main>
        <Hero />
        <Presentation /> 
        <AboutUs />      
        <Services />
        <Testimonials />
        
        <News /> 

        <JoinUs /> 
        <Store />
        <SocialFloat />
        <Donation />
        <Contact />
        <Footer />
      </main>

      
    </div>
  );
}

export default App;