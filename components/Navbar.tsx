import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When using HashRouter, standard anchors for same-page scroll need careful handling
  // but react-router-dom Link handles internal routes properly.
  // For scrolling to ID on home page from another page, we usually need more logic,
  // but for simplicity, we route to Home then user clicks again or we use a library.
  // Here we keep it simple: internal links use Link, anchors use a href.

  const navLinks = [
    { name: 'Inicio', path: '/', isAnchor: false },
    { name: 'Servicios', path: isHome ? '#servicios' : '/', isAnchor: isHome },
    { name: 'Proceso', path: isHome ? '#proceso' : '/', isAnchor: isHome },
  ];

  const handleNavClick = (path: string, isAnchor: boolean) => {
    setMobileMenuOpen(false);
    // If it's an anchor on home page, we might need to manually scroll if behavior:smooth doesn't catch it
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-secondary/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,224,145,0.05)] py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-display font-bold text-white tracking-tighter flex items-center gap-1 group">
          AXPE<span className="text-accent group-hover:animate-pulse">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
             link.isAnchor ? (
                <a 
                    key={link.name}
                    href={link.path}
                    className="text-text-secondary hover:text-white hover:text-accent transition-colors font-medium text-sm uppercase tracking-wider"
                >
                    {link.name}
                </a>
             ) : (
                <Link
                    key={link.name}
                    to={link.path}
                    className="text-text-secondary hover:text-white hover:text-accent transition-colors font-medium text-sm uppercase tracking-wider"
                >
                    {link.name}
                </Link>
             )
          ))}
          <a 
            href="#contacto" 
            className="px-6 py-2 rounded-full border border-accent/50 text-accent hover:bg-accent hover:text-black hover:font-bold transition-all duration-300 font-medium shadow-[0_0_15px_rgba(0,224,145,0.2)] hover:shadow-[0_0_25px_rgba(0,224,145,0.6)]"
          >
            Consultar
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white hover:text-accent transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-secondary border-t border-white/10 p-6 flex flex-col space-y-6 shadow-2xl h-screen">
          {navLinks.map((link) => (
             link.isAnchor ? (
                <a 
                    key={link.name}
                    href={link.path}
                    className="text-2xl text-white font-medium block"
                    onClick={() => handleNavClick(link.path, link.isAnchor)}
                >
                    {link.name}
                </a>
             ) : (
                <Link
                    key={link.name}
                    to={link.path}
                    className="text-2xl text-white font-medium block"
                    onClick={() => handleNavClick(link.path, link.isAnchor)}
                >
                    {link.name}
                </Link>
             )
          ))}
          <a 
            href="#contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl text-accent font-bold block"
          >
            Contacto
          </a>
        </div>
      )}
    </nav>
  );
};