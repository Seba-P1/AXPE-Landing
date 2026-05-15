import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ServiceDetail } from './pages/ServiceDetail';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ScrollToTop } from './components/ScrollToTop';

import { Differentiators } from './components/Differentiators';

// Componente Home que agrupa las secciones de una página
const Home = () => (
  <>
    <Hero />
    <Differentiators />
    <Services />
    <Projects />
    
    <Process />

    <Testimonials />
    <Contact />
  </>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="bg-primary text-text-primary min-h-screen font-sans selection:bg-accent selection:text-primary">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicio/:id" element={<ServiceDetail />} />
            <Route path="*" element={<Home />} />
          </Routes>

          <Footer />
          
          {/* Floating WhatsApp Button */}
          <a 
            href="https://wa.me/5492931454805?text=Hola%20Sebastián!%20Vengo%20de%20tu%20web%20AXPE."
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-8 right-8 z-50 bg-[#25D366] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)]"
            aria-label="Contactar por WhatsApp"
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-9.667-.272-.984-.47-.149-.669.05-.198.199-.744.744-1.139 1.14-.396.396-.793.892-.099 2.084.694 1.192 2.478 3.687 5.963 5.163 2.724 1.153 3.696 1.054 4.394.954.745-.1 2.378-.968 2.724-1.93.348-.968.348-1.782.248-1.957z"/>
            </svg>
          </a>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;