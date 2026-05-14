import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-display font-bold text-white mb-6">
          AXPE<span className="text-accent">.</span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-8 mb-10 text-text-secondary">
          <a href="/" className="hover:text-accent transition-colors">Inicio</a>
          <a href="/#servicios" className="hover:text-accent transition-colors">Servicios</a>
          <a href="/#proceso" className="hover:text-accent transition-colors">Cómo trabajo</a>
          <a href="/#contacto" className="hover:text-accent transition-colors">Contacto</a>
        </div>

        <div className="text-sm text-text-secondary/60">
          <p className="mb-2">© {new Date().getFullYear()} AXPE Soluciones Digitales. Todos los derechos reservados.</p>
          <p>Desarrollado en Río Colorado, Argentina 🇦🇷</p>
        </div>
      </div>
    </footer>
  );
};