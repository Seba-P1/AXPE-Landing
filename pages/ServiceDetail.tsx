import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { generateAssetImage } from '../services/geminiService';
import { RevealOnScroll } from '../components/RevealOnScroll';

export const ServiceDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const service = servicesData.find(s => s.id === id);
    const [headerImage, setHeaderImage] = useState<string | null>(null);
    const [useCaseImages, setUseCaseImages] = useState<Record<number, string>>({});

    useEffect(() => {
        // Ensure we start at the top when mounting this page
        window.scrollTo(0, 0);

        let isMounted = true;

        // Generate images for the service and its use cases
        const loadImages = async () => {
            if (service) {
                try {
                    // Header image
                    const mainImg = await generateAssetImage(service.imagePrompt);
                    if (isMounted && mainImg) setHeaderImage(mainImg);

                    // Use case images
                    if (service.useCases) {
                        service.useCases.forEach(async (uc, index) => {
                            const ucImg = await generateAssetImage(uc.imagePrompt);
                            if (isMounted && ucImg) {
                                setUseCaseImages(prev => ({ ...prev, [index]: ucImg }));
                            }
                        });
                    }
                } catch (e) {
                    console.log("Could not generate image", e);
                }
            }
        };

        loadImages();

        return () => { isMounted = false; };
    }, [service]);

    if (!service) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center text-white px-4">
                <div className="text-center bg-secondary p-8 rounded-xl border border-white/5">
                    <h2 className="text-2xl font-bold mb-4 text-red-400">Servicio no encontrado</h2>
                    <p className="text-text-secondary mb-6">El servicio que buscas no está disponible o la URL es incorrecta.</p>
                    <Link to="/" className="inline-block px-6 py-2 bg-accent text-primary font-bold rounded-lg hover:bg-white transition-colors">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-primary min-h-screen pt-20 animate-fade-in">
            {/* Service Hero */}
            <div className="relative min-h-[60vh] md:h-[60vh] flex items-start md:items-center overflow-hidden pb-10 md:pb-0">
                <div className="absolute inset-0 bg-secondary">
                    {/* Fallback pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#181b21_1px,transparent_1px),linear-gradient(to_bottom,#181b21_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

                    {/* Dynamic AI Image */}
                    {headerImage && (
                        <img
                            src={headerImage}
                            alt={service.title}
                            className="w-full h-full object-cover opacity-30 animate-pulse-slow transition-opacity duration-1000"
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 mt-10 w-full">
                    <Link to="/" className="inline-flex items-center text-accent mb-6 hover:text-white transition-colors group text-sm font-medium">
                        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Volver al Inicio
                    </Link>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
                        {service.title} <span className="text-accent">.</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed font-light">
                        {service.longDescription}
                    </p>
                </div>
            </div>

            {/* Use Cases Section */}
            {service.useCases && service.useCases.length > 0 && (
                <section className="py-24 bg-secondary/30 relative overflow-hidden">
                    <div className="container mx-auto px-6">
                        <RevealOnScroll>
                            <div className="text-center mb-16">
                                <h2 className="text-accent font-bold tracking-widest uppercase text-xs mb-3">Ideas y Ejemplos</h2>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">¿Qué podemos hacer por vos?</h3>
                                <p className="text-text-secondary max-w-2xl mx-auto">
                                    Cada negocio es único. Aquí tenés algunas ideas de cómo aplicamos esta tecnología para resolver problemas reales.
                                </p>
                            </div>
                        </RevealOnScroll>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {service.useCases.map((uc, index) => (
                                <RevealOnScroll key={index} delay={index * 200}>
                                    <div className="group relative bg-tertiary/20 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-500">
                                        <div className="aspect-video relative overflow-hidden">
                                            <div className="absolute inset-0 bg-tertiary animate-pulse z-0"></div>
                                            {/* Priority: Static Image -> Dynamic Generated Image -> Placeholder */}
                                            {uc.staticImage ? (
                                                <img
                                                    src={uc.staticImage}
                                                    alt={uc.title}
                                                    className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-110"
                                                    onError={(e) => {
                                                        // Fallback to dynamic generation if static fails
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                        uc.staticImage = undefined; // This will trigger the next condition on re-render
                                                    }}
                                                />
                                            ) : useCaseImages[index] ? (
                                                <img
                                                    src={useCaseImages[index]}
                                                    alt={uc.title}
                                                    className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center relative z-10">
                                                    <span className="text-accent/50 text-sm animate-pulse">Generando demo visual...</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-tertiary via-transparent to-transparent z-20"></div>
                                        </div>
                                        <div className="p-8 relative z-30">
                                            <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors">{uc.title}</h4>
                                            <p className="text-text-secondary leading-relaxed mb-6 font-light">
                                                {uc.description}
                                            </p>
                                            <div className="w-10 h-1 bg-accent/30 rounded-full group-hover:w-20 transition-all duration-500"></div>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Details Section */}
            <section className="py-20 relative border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <RevealOnScroll>
                            <div className="bg-secondary/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 md:p-10 hover:border-accent/20 transition-colors">
                                <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Características Técnicas</h3>
                                <ul className="space-y-6">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start group">
                                            <div className="bg-tertiary p-2 rounded-lg text-accent mr-4 group-hover:bg-accent group-hover:text-primary transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                            <span className="text-text-secondary text-lg pt-1 group-hover:text-white transition-colors">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={200}>
                            <div className="h-full flex flex-col">
                                <h3 className="text-2xl font-bold text-white mb-8">¿Por qué elegir este servicio?</h3>
                                <div className="grid grid-cols-1 gap-4 mb-10">
                                    {service.benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-center p-5 rounded-xl bg-tertiary/40 border-l-4 border-accent hover:bg-tertiary transition-colors">
                                            <span className="text-white font-medium">{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto bg-gradient-to-br from-accent to-accent-dark p-0.5 rounded-2xl shadow-[0_0_20px_rgba(0,224,145,0.1)]">
                                    <div className="bg-secondary rounded-[14px] p-8 text-center h-full">
                                        <h4 className="text-white font-bold text-xl mb-2">Tiempo estimado de entrega</h4>
                                        <p className="text-accent text-3xl font-display font-bold mb-6">{service.deliveryTime}</p>
                                        <a href={`/#contacto?service=${service.id}`} className="block w-full py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-200 transition-colors transform hover:-translate-y-1">
                                            Solicitar Presupuesto
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* CTA Bottom */}
            <section className="py-20 bg-tertiary border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">¿Listo para empezar?</h2>
                    <p className="text-text-secondary mb-8 text-lg">Escribime y contame sobre tu proyecto.</p>
                    <a href="/#contacto" className="inline-block px-10 py-4 bg-accent text-primary rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(0,224,145,0.4)] transition-all hover:bg-white transform hover:scale-105">
                        Contactar a Sebastián
                    </a>
                </div>
            </section>
        </div>
    );
};