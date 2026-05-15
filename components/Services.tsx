import React from 'react';
import { Link } from 'react-router-dom';
import { RevealOnScroll } from './RevealOnScroll';
import { servicesData } from '../data/services';

export const Services: React.FC = () => {
  return (
    <section id="servicios" className="py-24 bg-secondary relative">
      <div className="container mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-accent font-bold tracking-widest uppercase text-xs mb-3">SERVICIOS</h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Tecnología para tu Negocio</h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Herramientas profesionales pensadas para escalar. Desde tu primera web hasta sistemas complejos de gestión.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => (
            <RevealOnScroll key={service.id} delay={index * 100} className="h-full">
              <div className="group relative bg-tertiary/50 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] h-full flex flex-col">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-accent-dark rounded-xl opacity-0 group-hover:opacity-20 transition duration-500 blur"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="text-4xl mb-6 p-3 bg-secondary w-fit rounded-lg text-accent group-hover:scale-110 transition-transform duration-300 border border-white/5 shadow-inner">
                    {service.icon}
                  </div>

                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{service.title}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">{service.shortDescription}</p>

                  <ul className="space-y-3 mb-8">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start text-xs text-text-secondary/80">
                        <svg className="w-4 h-4 text-accent mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-3">
                    <Link
                      to={`/servicio/${service.id}`}
                      className="w-full py-2 rounded-lg border border-white/10 text-white text-sm font-medium hover:bg-white hover:text-primary transition-colors text-center"
                    >
                      Ver Detalles
                    </Link>
                    <Link
                      to={`/?service=${service.id}#contacto`}
                      className="w-full py-2 rounded-lg bg-accent text-primary text-sm font-bold hover:bg-accent-light transition-colors text-center shadow-[0_0_10px_rgba(0,224,145,0.2)]"
                    >
                      Consultar
                    </Link>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};