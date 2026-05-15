import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';

export const Projects: React.FC = () => {
    return (
        <section id="proyectos" className="py-24 bg-[#0a0a0a] relative border-t border-white/5">
            <div className="container mx-auto px-6 max-w-7xl">
                <RevealOnScroll>
                    <div className="mb-16">
                        <h2 className="text-[#00ff87] font-bold tracking-widest uppercase text-xs mb-3">TRABAJO REAL</h2>
                        <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Resultados que hablan por nosotros</h3>
                        <p className="text-text-secondary max-w-2xl text-lg">
                            Cada proyecto es una solución real para un problema concreto.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* CARD 1 — Juan Güenumil */}
                    <RevealOnScroll delay={0} className="h-full">
                        <div className="group relative bg-[#111111] rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full motion-safe:transition-all motion-safe:duration-250 ease-in-out hover:scale-[1.02] motion-reduce:hover:scale-100 hover:border-[rgba(0,255,135,0.4)] hover:shadow-[0_8px_32px_rgba(0,255,135,0.08)]">
                            <div className="w-full h-[200px] md:h-[240px] lg:h-[260px] overflow-hidden relative bg-[#111111]">
                                {/*
                                // ─────────────────────────────────────────────────────
                                // PROJECT IMAGE — GUENUMIL
                                // Place image file at: /public/images/proyectos/guenumil-hero.png
                                // Recommended: 1280x720px min — .jpg, .png or .webp
                                // ─────────────────────────────────────────────────────
                                */}
                                <img 
                                    src="/images/proyectos/guenumil-hero.png" 
                                    alt="Juan Güenumil Inmobiliaria" 
                                    className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-250 ease-in-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                                />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <span className="text-[#00ff87] text-xs font-bold uppercase tracking-wider mb-4 block">Inmobiliaria / Web App</span>
                                <h4 className="text-2xl font-bold text-white mb-4">Juan Güenumil Inmobiliaria</h4>
                                <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-grow">
                                    Sistema completo de gestión de propiedades con búsqueda en tiempo real, listados con fotos y contacto integrado para inmobiliaria de la Patagonia.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {["Next.js", "Supabase", "React", "Tailwind CSS"].map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <a 
                                    href="https://juanguenumil.com.ar/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label="Ver sitio de Juan Güenumil Inmobiliaria (abre en nueva pestaña)" 
                                    className="inline-flex items-center text-white font-medium hover:text-[#00ff87] motion-safe:transition-colors mt-auto w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87] rounded"
                                >
                                    Ver sitio <span className="ml-2 group-hover:translate-x-1 motion-safe:transition-transform motion-reduce:group-hover:translate-x-0">→</span>
                                </a>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* CARD 2 — RC Play */}
                    <RevealOnScroll delay={150} className="h-full">
                        <div className="group relative bg-[#111111] rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full motion-safe:transition-all motion-safe:duration-250 ease-in-out hover:scale-[1.02] motion-reduce:hover:scale-100 hover:border-[rgba(0,255,135,0.4)] hover:shadow-[0_8px_32px_rgba(0,255,135,0.08)]">
                            <div className="w-full h-[200px] md:h-[240px] lg:h-[260px] overflow-hidden relative bg-[#111111]">
                                {/*
                                // ─────────────────────────────────────────────────────
                                // PROJECT IMAGE — RC PLAY
                                // Place image file at: /public/images/proyectos/rcplay-hero.png
                                // Recommended: 1280x720px min — .jpg, .png or .webp
                                // ─────────────────────────────────────────────────────
                                */}
                                <img 
                                    src="/images/proyectos/rcplay-hero.png" 
                                    alt="RC Play" 
                                    className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-250 ease-in-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                                />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <span className="text-[#00ff87] text-xs font-bold uppercase tracking-wider mb-4 block">Entretenimiento / Web App</span>
                                <h4 className="text-2xl font-bold text-white mb-4">RC Play</h4>
                                <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-grow">
                                    Plataforma de entretenimiento digital para el mercado de Río Negro. Diseño y desarrollo completo desde cero.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {["Next.js", "React", "Tailwind CSS"].map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <a 
                                    href="https://rcplay.com.ar/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label="Ver sitio de RC Play (abre en nueva pestaña)" 
                                    className="inline-flex items-center text-white font-medium hover:text-[#00ff87] motion-safe:transition-colors mt-auto w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87] rounded"
                                >
                                    Ver sitio <span className="ml-2 group-hover:translate-x-1 motion-safe:transition-transform motion-reduce:group-hover:translate-x-0">→</span>
                                </a>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};
