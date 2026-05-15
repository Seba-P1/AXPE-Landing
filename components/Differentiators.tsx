import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';

const BoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[28px] h-[28px] text-[#00ff87]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const LockClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[28px] h-[28px] text-[#00ff87]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const ChatBubbleLeftRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[28px] h-[28px] text-[#00ff87]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
  </svg>
);

const ArrowTrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[28px] h-[28px] text-[#00ff87]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

const cards = [
  {
    title: "Entrega sin demoras",
    desc: "Usamos herramientas modernas que aceleran el desarrollo sin sacrificar calidad ni seguridad.",
    icon: <BoltIcon />
  },
  {
    title: "El código es 100% tuyo",
    desc: "Sin plataformas cerradas ni dependencias de terceros. Lo que construimos te pertenece completamente.",
    icon: <LockClosedIcon />
  },
  {
    title: "Atención directa, siempre",
    desc: "Trabajás con quien desarrolla. Sin tickets, sin intermediarios, sin esperar 48hs por una respuesta.",
    icon: <ChatBubbleLeftRightIcon />
  },
  {
    title: "Tecnología que escala",
    desc: "No construimos parches. Construimos sistemas que crecen con tu negocio a largo plazo.",
    icon: <ArrowTrendingUpIcon />
  }
];

export const Differentiators: React.FC = () => {
    return (
        <section id="diferenciadores" className="py-24 bg-[#050505] relative border-b border-white/5">
            <div className="container mx-auto px-6 max-w-7xl">
                <RevealOnScroll>
                    <div className="mb-16">
                        <h2 className="text-[#00ff87] font-bold tracking-widest uppercase text-xs mb-3">POR QUÉ AXPE</h2>
                        <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Tecnología seria, trato directo</h3>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    {cards.map((card, index) => (
                        <RevealOnScroll key={index} delay={index * 100} className="h-full">
                            <div className="bg-[#111111] rounded-2xl p-8 flex flex-col h-full border border-white/5 motion-safe:transition-all motion-safe:duration-200 ease-in-out hover:border-[rgba(0,255,135,0.35)] hover:shadow-[0_0_20px_rgba(0,255,135,0.1)] group">
                                <div className="w-14 h-14 rounded-lg bg-[rgba(0,255,135,0.1)] flex items-center justify-center mb-6 motion-safe:transition-transform motion-safe:duration-150 ease-in-out group-hover:scale-110 motion-reduce:group-hover:scale-100">
                                    {card.icon}
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3">{card.title}</h4>
                                <p className="text-text-secondary text-sm leading-relaxed">{card.desc}</p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};
