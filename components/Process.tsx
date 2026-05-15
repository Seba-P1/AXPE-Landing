import React, { useEffect, useRef, useState } from 'react';
import { RevealOnScroll } from './RevealOnScroll';

// Iconos (Heroicons)
const BanknotesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[28px] h-[28px] text-[#00ff87]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
  </svg>
);

const ServerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[28px] h-[28px] text-[#00ff87]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" />
  </svg>
);

const WrenchScrewdriverIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[28px] h-[28px] text-[#00ff87]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.492-3.053c.206-.253.424-.512.646-.776l1.528-1.834a3.75 3.75 0 00-5.69-4.807l-1.834 1.528c-.264.222-.523.44-.776.646l-3.053 2.492M11.42 15.17l-3.475 3.475a2.652 2.652 0 01-3.75-3.75l3.475-3.475M14.94 12.06a3.75 3.75 0 11-5.304-5.304 3.75 3.75 0 015.304 5.304z" />
  </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#00ff87] mt-1 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

export const Process: React.FC = () => {
    // Para el timeline de los pasos
    const [stepsVisible, setStepsVisible] = useState(false);
    const stepsRef = useRef<HTMLDivElement>(null);

    // Para la sección Sin Sorpresas
    const [costsVisible, setCostsVisible] = useState(false);
    const costsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

        const stepsObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setStepsVisible(true);
                stepsObserver.disconnect();
            }
        }, observerOptions);

        const costsObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setCostsVisible(true);
                costsObserver.disconnect();
            }
        }, observerOptions);

        if (stepsRef.current) stepsObserver.observe(stepsRef.current);
        if (costsRef.current) costsObserver.observe(costsRef.current);

        return () => {
            stepsObserver.disconnect();
            costsObserver.disconnect();
        };
    }, []);

    const steps = [
        { step: "01", title: "Charla Inicial", desc: "Nos contás tu idea. Definimos alcance y objetivos sin vueltas." },
        { step: "02", title: "Propuesta", desc: "Plan detallado. Maqueta previa si es necesario." },
        { step: "03", title: "Desarrollo", desc: "Manos a la obra. Avances semanales reales." },
        { step: "04", title: "Entrega", desc: "Tu sistema online. Capacitación y soporte." }
    ];

    return (
        <section id="proceso" className="py-24 bg-secondary border-y border-white/5 relative overflow-hidden">
            <style>
                {`
                @keyframes drawTimeline {
                    from { clip-path: inset(0 100% 0 0); }
                    to { clip-path: inset(0 0 0 0); }
                }
                .animate-draw-timeline {
                    animation: drawTimeline 800ms ease-out forwards;
                }
                
                @keyframes fadeInUpBlock {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up-block {
                    animation: fadeInUpBlock 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }

                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-slide-in-left {
                    animation: slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }

                @media (prefers-reduced-motion: reduce) {
                    .animate-draw-timeline {
                        animation: none !important;
                        clip-path: inset(0 0 0 0) !important;
                    }
                    .animate-fade-in-up-block, .animate-slide-in-left {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
                `}
            </style>
            
            {/* GRADIENT TOP */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
            
            {/* ========================================= */}
            {/* PARTE A - CÓMO TRABAJAMOS (METODOLOGÍA)   */}
            {/* ========================================= */}
            <div className="container mx-auto px-6 mb-24" ref={stepsRef}>
                <RevealOnScroll>
                    <div className="text-center mb-16">
                        <h2 className="text-accent font-bold tracking-wide uppercase text-xs mb-2">Metodología</h2>
                        <h3 className="font-display text-4xl text-white font-bold">Cómo Trabajamos</h3>
                    </div>
                </RevealOnScroll>
                
                <div className="relative">
                    {/* Línea conectora (sólo desktop) */}
                    <div className={`hidden lg:block absolute top-[40%] left-[10%] right-[10%] h-[1px] border-t border-dashed border-[rgba(0,255,135,0.2)] -translate-y-1/2 z-0 ${stepsVisible ? 'animate-draw-timeline' : 'opacity-0'}`}></div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
                        {steps.map((item, i) => (
                            <RevealOnScroll key={i} delay={i * 150} className="h-full">
                                <div className="h-full relative bg-tertiary/90 rounded-xl p-8 transition-all group overflow-hidden border border-white/5 hover:border-white/10 hover:bg-tertiary">
                                    {/* Top green gradient border */}
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00ff87] to-transparent opacity-70"></div>
                                    
                                    {/* Badge circular */}
                                    <div className="w-[32px] h-[32px] rounded-full border border-[#00ff87] flex items-center justify-center text-[#00ff87] text-[14px] font-bold mb-6 bg-[#0a0a0a] motion-safe:transition-transform motion-safe:duration-150 group-hover:scale-110 motion-reduce:group-hover:scale-100">
                                        {item.step}
                                    </div>

                                    <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </div>

            {/* Separador Sutil */}
            <div className="w-full h-px bg-white/5 mb-24"></div>

            {/* ========================================= */}
            {/* PARTE B - SIN SORPRESAS                   */}
            {/* ========================================= */}
            <div className="container mx-auto px-6" ref={costsRef}>
                <RevealOnScroll>
                    <div className="text-center mb-16">
                        <h2 className="text-[#00ff87] font-bold tracking-widest uppercase text-xs mb-3">TRANSPARENCIA TOTAL</h2>
                        <h3 className="font-display text-4xl text-white font-bold mb-4">Sin sorpresas, todo claro desde el inicio</h3>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                            Antes de empezar sabés exactamente qué incluye el trabajo, cómo se cobra y qué costos adicionales existen.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:max-w-[600px] md:mx-auto lg:max-w-none lg:grid-cols-3 gap-6 items-stretch mb-12">
                    
                    {/* BLOCK 1: Forma de Pago */}
                    <div className={`bg-[#111111] rounded-[12px] p-5 md:p-[28px] flex flex-col h-full border border-white/5 ${costsVisible ? 'animate-fade-in-up-block' : 'opacity-0'}`} style={{ animationDelay: '120ms' }}>
                        <div className="mb-4">
                            <BanknotesIcon />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">Forma de pago</h4>
                        <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                            El valor del proyecto se divide en dos partes iguales. El 50% se abona al inicio para confirmar y arrancar el trabajo. El 50% restante se abona una vez que el proyecto está terminado y conforme.
                        </p>
                        
                        {/* Detail block */}
                        <div className={`bg-[#0d0d0d] border-l-[3px] border-[#00ff87] rounded-r-[8px] p-3 md:p-[16px_12px] mt-auto ${costsVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '320ms' }}>
                            <span className="text-[#00ff87] text-[10px] uppercase font-bold tracking-wider block mb-2">¿Por qué este modelo?</span>
                            <p className="text-white/70 text-[13px] leading-relaxed">
                                Protege a ambas partes. Vos no pagás todo por adelantado sin ver resultados, y nosotros no trabajamos meses sin compromiso de tu parte. Funciona porque el incentivo es mutuo.
                            </p>
                        </div>
                    </div>

                    {/* BLOCK 2: Costos del cliente post-entrega */}
                    <div className={`bg-[#111111] rounded-[12px] p-5 md:p-[28px] flex flex-col h-full border border-white/5 ${costsVisible ? 'animate-fade-in-up-block' : 'opacity-0'}`} style={{ animationDelay: '240ms' }}>
                        <div className="mb-4">
                            <ServerIcon />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">Costos a cargo del cliente</h4>
                        <p className="text-text-secondary text-sm leading-relaxed mb-6">
                            Una vez entregado el proyecto, hay dos costos externos que son responsabilidad del cliente. Son independientes del trabajo de desarrollo y los abonás directamente a los proveedores.
                        </p>
                        
                        <div className="flex flex-col gap-4 mt-auto">
                            {/* Sub-item 1 */}
                            <div className="flex gap-3">
                                <CheckIcon />
                                <div>
                                    <span className="text-white font-bold text-sm block mb-1">Dominio</span>
                                    <p className="text-white/60 text-[13px] leading-relaxed">
                                        Es el nombre de tu sitio en internet (ejemplo: tunegocio.com.ar). Se registra a tu nombre y número de documento o CUIT, así queda bajo tu propiedad total. Un dominio .com.ar tiene un costo de entre $8.000 y $15.000 ARS por año, abonado directamente al proveedor de registros.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="h-px w-full bg-white/5"></div>
                            
                            {/* Sub-item 2 */}
                            <div className="flex gap-3">
                                <CheckIcon />
                                <div>
                                    <span className="text-white font-bold text-sm block mb-1">Hosting</span>
                                    <p className="text-white/60 text-[13px] leading-relaxed">
                                        Es el servicio que mantiene tu sitio o sistema disponible en internet las 24hs. El costo varía según la complejidad del proyecto: una Landing Page simple puede no tener costo de hosting. Para sitios tipo aplicación web, los valores parten desde los $5.000 ARS mensuales y pueden ser mayores según la complejidad de la lógica detrás del código. En todos los casos, lo definimos juntos antes de elegir el servicio.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BLOCK 3: Mantenimiento */}
                    <div className={`bg-[#111111] rounded-[12px] p-5 md:p-[28px] flex flex-col h-full border border-white/5 ${costsVisible ? 'animate-fade-in-up-block' : 'opacity-0'}`} style={{ animationDelay: '360ms' }}>
                        <div className="mb-4">
                            <WrenchScrewdriverIcon />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">Mantenimiento y actualizaciones</h4>
                        <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                            Una vez entregado el proyecto, si necesitás cambios, nuevas funciones o actualizaciones, trabajamos con un costo mensual acordado entre ambos según el tipo y volumen de trabajo.
                        </p>
                        
                        {/* Detail block */}
                        <div className={`bg-[#0d0d0d] border-l-[3px] border-[#00ff87] rounded-r-[8px] p-3 md:p-[16px_12px] mt-auto ${costsVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '560ms' }}>
                            <span className="text-[#00ff87] text-[10px] uppercase font-bold tracking-wider block mb-3">¿Qué incluye?</span>
                            <ul className="space-y-2 mb-4">
                                {['Corrección de errores o ajustes menores', 'Actualizaciones de contenido (textos, imágenes, precios)', 'Nuevas secciones o funcionalidades', 'Soporte técnico ante cualquier problema'].map((item, idx) => (
                                    <li key={idx} className="flex gap-2 text-white/70 text-[13px] leading-relaxed">
                                        <span className="text-[#00ff87] opacity-60">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-white/50 text-[12px] leading-relaxed italic border-t border-white/5 pt-3">
                                El costo mensual se define antes de arrancar el mantenimiento, sin compromisos fijos de largo plazo. Podés pausar cuando lo necesites.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Closing Banner */}
                <div className={`w-full bg-[#050505] border border-[#00ff87]/30 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 ${costsVisible ? 'animate-fade-in-up-block' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
                    <p className="text-white font-medium text-lg text-center md:text-left">
                        ¿Tenés dudas sobre alguno de estos puntos?
                    </p>
                    <a href="#contacto" className="px-6 py-3 bg-transparent border border-[#00ff87] text-[#00ff87] hover:bg-[#00ff87] hover:text-[#050505] transition-colors rounded-lg font-bold text-sm text-center w-full md:w-auto">
                        Consultanos sin compromiso
                    </a>
                </div>

            </div>
        </section>
    );
};
