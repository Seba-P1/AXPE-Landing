import React, { useEffect, useRef, useState } from 'react';
import { RevealOnScroll } from './RevealOnScroll';

// Componente interno para manejar la animación específica de fade-in-scale
const RevealScale: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`w-full max-w-[700px] transition-all duration-1000 ease-out transform group ${
                isVisible ? "opacity-100 scale-100 is-visible" : "opacity-0 scale-[0.97]"
            } motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100`}
        >
            {children}
        </div>
    );
};

export const Testimonials: React.FC = () => {
    return (
        <section id="testimonios" className="py-24 bg-[#0a0a0a] relative border-t border-white/5">
            {/* Estilos para la animación de pulso customizada */}
            <style>
                {`
                @keyframes customPulse {
                  0%, 100% { opacity: 0.4; }
                  50% { opacity: 0.7; }
                }
                .animate-custom-pulse {
                  animation: customPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                  .animate-custom-pulse {
                    animation: none;
                    opacity: 0.5;
                  }
                }
                `}
            </style>
            
            <div className="container mx-auto px-6 max-w-7xl">
                <RevealOnScroll>
                    <div className="mb-16 text-center">
                        <h2 className="text-[#00ff87] font-bold tracking-widest uppercase text-xs mb-3">CLIENTES</h2>
                        <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                            Lo que dicen quienes trabajaron con nosotros
                        </h3>
                    </div>
                </RevealOnScroll>

                <div className="flex flex-col items-center">
                    {/* Tarjeta Destacada */}
                    <RevealScale>
                        <div className="relative bg-[#111111] border border-white/5 rounded-2xl p-8 md:p-12 mb-8 flex flex-col items-center text-center">
                            {/* Comilla Decorativa */}
                            <div className="absolute top-4 left-6 md:top-8 md:left-8 text-[#00ff87] text-[80px] leading-none font-serif opacity-80 transition-transform duration-1000 ease-out transform group-[.is-visible]:-rotate-3 motion-reduce:transform-none">
                                "
                            </div>
                            
                            {/* Texto de la cita */}
                            <p className="text-[18px] text-white italic leading-[1.8] relative z-10 max-w-[500px] mt-8 mb-8">
                                "Texto del testimonio — pendiente de confirmar con el cliente."
                            </p>
                            
                            {/* Separador */}
                            <div className="w-[40px] h-[2px] bg-[#00ff87] mb-8"></div>
                            
                            {/* Autor */}
                            <div className="flex flex-col items-center">
                                <div className="w-[48px] h-[48px] rounded-full bg-[#1a1a1a] flex items-center justify-center text-white font-bold mb-4 border border-white/10">
                                    JG
                                </div>
                                <h4 className="text-white font-bold text-lg mb-1">Juan Güenumil</h4>
                                <p className="text-text-secondary text-sm mb-3">
                                    Propietario · Juan Güenumil Inmobiliaria
                                </p>
                                <span className="text-[#00ff87] text-[10px] uppercase tracking-wider px-2 py-1 border border-[#00ff87]/30 rounded-full">
                                    Inmobiliaria
                                </span>
                            </div>
                        </div>
                    </RevealScale>

                    {/* Tarjetas Placeholder */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[700px]">
                        {[1, 2].map((item) => (
                            <RevealOnScroll key={item} delay={item * 100} className="w-full">
                                <div className="min-h-[120px] w-full border border-dashed border-[rgba(0,255,135,0.25)] rounded-2xl flex flex-col items-center justify-center bg-transparent animate-custom-pulse p-6 text-center">
                                    <span className="text-white/40 text-[14px] font-medium mb-1">Próximo testimonio</span>
                                    <span className="text-white/20 text-[12px]">En camino...</span>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
