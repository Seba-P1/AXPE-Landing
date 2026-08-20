import React, { useState, useRef, useEffect } from 'react';
import { RevealOnScroll } from './RevealOnScroll';

interface ProjectData {
    id: string;
    rubro: string;
    name: string;
    description: string;
    tech: string[];
    desktopImage: string;
    mobileImage: string;
    link: string;
    linkAriaLabel: string;
    initials: string;
}

const projects: ProjectData[] = [
    {
        id: 'ypfelpuente',
        rubro: 'Estación de Servicio / Menú Digital',
        name: 'YPF El Puente',
        description: 'Menú digital con carrito de compra, catálogo de combustibles premium y boxes de servicio para la estación YPF de Río Colorado, con ubicación y WhatsApp integrados.',
        tech: ['Next.js', 'React', 'Tailwind CSS'],
        desktopImage: '/images/proyectos/ypfelpuente-hero.png',
        mobileImage: '/images/proyectos/ypfelpuente-mobile.png',
        link: 'https://ypfelpuente.netlify.app/',
        linkAriaLabel: 'Ver sitio de YPF El Puente (abre en nueva pestaña)',
        initials: 'YPF'
    },
    {
        id: 'guenumil',
        rubro: 'Inmobiliaria / Web App',
        name: 'Juan Güenumil Inmobiliaria',
        description: 'Sistema completo de gestión de propiedades con búsqueda en tiempo real, listados con fotos y contacto integrado para inmobiliaria de la Patagonia.',
        tech: ['Next.js', 'Supabase', 'React', 'Tailwind CSS'],
        desktopImage: '/images/proyectos/guenumil-hero.png',
        mobileImage: '/images/proyectos/guenumil-mobile.png',
        link: 'https://juanguenumil.com.ar/',
        linkAriaLabel: 'Ver sitio de Juan Güenumil Inmobiliaria (abre en nueva pestaña)',
        initials: 'JG'
    },
    {
        id: 'rcplay',
        rubro: 'Entretenimiento / Web App',
        name: 'RC Play',
        description: 'Plataforma de entretenimiento digital para el mercado de Río Negro. Diseño y desarrollo completo desde cero.',
        tech: ['Next.js', 'React', 'Tailwind CSS'],
        desktopImage: '/images/proyectos/rcplay-hero.png',
        mobileImage: '/images/proyectos/rcplay-mobile.png',
        link: 'https://rcplay.com.ar/',
        linkAriaLabel: 'Ver sitio de RC Play (abre en nueva pestaña)',
        initials: 'RC'
    }
];

// Placeholder component
const Placeholder: React.FC<{ initials: string }> = ({ initials }) => (
    <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
        <span className="text-[#00ff87]/30 text-4xl font-bold font-display tracking-wider">{initials}</span>
    </div>
);

// Imagen con fallback a placeholder
const ProjectImage: React.FC<{
    src: string;
    alt: string;
    initials: string;
    className?: string;
}> = ({ src, alt, initials, className = '' }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return <Placeholder initials={initials} />;
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setHasError(true)}
        />
    );
};

// Individual project card - solo imagen de fondo + info
const ProjectCard: React.FC<{ project: ProjectData }> = ({ project }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (cardRef.current) observer.observe(cardRef.current);
        return () => {
            if (cardRef.current) observer.unobserve(cardRef.current);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`flex-shrink-0 w-[85vw] md:w-[400px] lg:w-[460px] scroll-snap-align-start transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            <div className="group relative rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full hover:border-[rgba(0,255,135,0.4)] hover:shadow-[0_8px_32px_rgba(0,255,135,0.08)] transition-all duration-300">
                {/* Imagen de fondo */}
                <div className="relative h-56 overflow-hidden">
                    <ProjectImage
                        src={project.desktopImage}
                        alt={`${project.name} — vista de escritorio`}
                        initials={project.initials}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6">
                        <span className="text-[#00ff87] text-xs font-bold uppercase tracking-wider">{project.rubro}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow bg-[#111111]">
                    <h4 className="text-2xl font-bold text-white mb-3">{project.name}</h4>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map(tech => (
                            <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={project.linkAriaLabel}
                        className="inline-flex items-center text-white font-medium hover:text-[#00ff87] transition-colors mt-auto w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded"
                    >
                        Ver sitio <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

// Real mockup components using PNG images with overlay
const DesktopMockup: React.FC<{ imageSrc: string; alt: string; initials: string }> = ({ imageSrc, alt, initials }) => {
    const [hasError, setHasError] = useState(false);
    
    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Container with exact aspect ratio of hollow mockup (2636:1619) */}
            <div className="relative w-full" style={{ aspectRatio: '2636 / 1619' }}>
                {/* Project image BEHIND the mockup — covers the screen hole area */}
                {/* Hole bbox: left=8.4977% top=1.9148% w=82.9666% h=86.7820% (with margin to fully cover) */}
                <div
                    className="absolute overflow-hidden"
                    style={{
                        top: '1.4%',
                        left: '7.9%',
                        width: '84.1%',
                        height: '87.9%',
                        zIndex: 1,
                    }}
                >
                    {hasError ? (
                        <Placeholder initials={initials} />
                    ) : (
                        <img
                            src={imageSrc}
                            alt={alt}
                            className="w-full h-full object-cover"
                            onError={() => setHasError(true)}
                        />
                    )}
                </div>
                
                {/* Hollow mockup ON TOP — transparent screen hole clips the image perfectly */}
                <img
                    src="/images/mockups/mockup-mac-hollow.png"
                    alt="MacBook mockup"
                    className="absolute inset-0 w-full h-full"
                    style={{ zIndex: 2 }}
                />
            </div>
        </div>
    );
};

const MobileMockup: React.FC<{ images: Array<{ src: string; alt: string; initials: string }>; }> = ({ images }) => {
    return (
        <div className="relative w-full max-w-3xl mx-auto h-[520px] flex items-center justify-center">
            {/* Back left phone (perspective) */}
            <div className="absolute left-[16%] top-1/2 -translate-y-1/2 w-[200px] h-[420px] transform -rotate-12 opacity-45">
                <div className="relative h-full rounded-[2.8rem] bg-gradient-to-b from-[#555] via-[#3a3a3a] to-[#2a2a2a] p-[3px] shadow-2xl">
                    <div className="relative h-full rounded-[2.6rem] bg-[#111] p-[2px] overflow-hidden">
                        <div className="absolute top-[6px] left-1/2 -translate-x-1/2 z-20 w-[70px] h-[18px] bg-[#000] rounded-full"></div>
                        <div className="relative h-full w-full rounded-[2.4rem] overflow-hidden bg-[#0a0a0a]">
                            {images[1]?.src ? (
                                <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover" />
                            ) : (
                                <Placeholder initials={images[1]?.initials || '??'} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Back right phone (perspective) */}
            <div className="absolute right-[16%] top-1/2 -translate-y-1/2 w-[200px] h-[420px] transform rotate-12 opacity-45">
                <div className="relative h-full rounded-[2.8rem] bg-gradient-to-b from-[#555] via-[#3a3a3a] to-[#2a2a2a] p-[3px] shadow-2xl">
                    <div className="relative h-full rounded-[2.6rem] bg-[#111] p-[2px] overflow-hidden">
                        <div className="absolute top-[6px] left-1/2 -translate-x-1/2 z-20 w-[70px] h-[18px] bg-[#000] rounded-full"></div>
                        <div className="relative h-full w-full rounded-[2.4rem] overflow-hidden bg-[#0a0a0a]">
                            {images[2]?.src ? (
                                <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover" />
                            ) : (
                                <Placeholder initials={images[2]?.initials || '??'} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Front phone (center, full opacity) */}
            <div className="relative w-[240px] h-[480px] z-10">
                <div className="relative h-full rounded-[3rem] bg-gradient-to-b from-[#666] via-[#444] to-[#333] p-[3px] shadow-2xl">
                    <div className="relative h-full rounded-[2.8rem] bg-[#111] p-[2px] overflow-hidden">
                        <div className="absolute top-[8px] left-1/2 -translate-x-1/2 z-20 w-[80px] h-[20px] bg-[#000] rounded-full"></div>
                        <div className="relative h-full w-full rounded-[2.6rem] overflow-hidden bg-[#0a0a0a]">
                            {images[0]?.src ? (
                                <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" />
                            ) : (
                                <Placeholder initials={images[0]?.initials || '??'} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Mockup section with rotating images
const MockupShowcase: React.FC<{
    type: 'mobile' | 'desktop';
}> = ({ type }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex(prev => {
                    const next = Math.floor(Math.random() * projects.length);
                    return next === prev ? (prev + 1) % projects.length : next;
                });
                setIsTransitioning(false);
            }, 500);
        }, 4000);

        return () => clearInterval(interval);
    }, [isVisible]);

    const currentProject = projects[currentIndex];
    const imageSrc = type === 'mobile' ? currentProject.mobileImage : currentProject.desktopImage;

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <RevealOnScroll>
                    <div className="text-center mb-12">
                        <h2 className="text-[#00ff87] font-bold tracking-widest uppercase text-xs mb-3">
                            {type === 'mobile' ? 'VISTA MOBILE' : 'VISTA ESCRITORIO'}
                        </h2>
                        <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            {type === 'mobile' ? 'Experiencia en tu mano' : 'Diseño en pantalla grande'}
                        </h3>
                    </div>
                </RevealOnScroll>

                {/* Mockup CSS puro */}
                <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    {type === 'desktop' ? (
                        <DesktopMockup
                            imageSrc={imageSrc}
                            alt={`${currentProject.name} — vista escritorio`}
                            initials={currentProject.initials}
                        />
                    ) : (
                        <MobileMockup
                            images={[
                                { src: currentProject.desktopImage, alt: `${currentProject.name} — vista mobile`, initials: currentProject.initials },
                                { src: projects[(currentIndex + 1) % projects.length].desktopImage, alt: 'Proyecto mobile', initials: projects[(currentIndex + 1) % projects.length].initials },
                                { src: projects[(currentIndex + 2) % projects.length].desktopImage, alt: 'Proyecto mobile', initials: projects[(currentIndex + 2) % projects.length].initials },
                            ]}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export const Projects: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollButtons = () => {
        if (!carouselRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        checkScrollButtons();
        carousel.addEventListener('scroll', checkScrollButtons);
        window.addEventListener('resize', checkScrollButtons);

        return () => {
            carousel.removeEventListener('scroll', checkScrollButtons);
            window.removeEventListener('resize', checkScrollButtons);
        };
    }, []);

    const scrollByCard = (direction: 'left' | 'right') => {
        if (!carouselRef.current) return;
        const cardWidth = carouselRef.current.querySelector('.scroll-snap-align-start')?.clientWidth || 460;
        const gap = 32;
        const scrollAmount = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <section id="proyectos" className="bg-[#0a0a0a] relative border-t border-white/5">
            <style>
                {`
                .carousel-container {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .carousel-container::-webkit-scrollbar {
                    display: none;
                }
                .scroll-snap-align-start {
                    scroll-snap-align: start;
                }
                `}
            </style>

            <div className="container mx-auto px-6 max-w-7xl">
                {/* Section Header */}
                <div className="py-24 mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                    <RevealOnScroll>
                        <div>
                            <h2 className="text-[#00ff87] font-bold tracking-widest uppercase text-xs mb-3">TRABAJO REAL</h2>
                            <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Resultados que hablan por nosotros</h3>
                            <p className="text-text-secondary max-w-2xl text-lg mb-2">
                                Cada proyecto es una solución real para un problema concreto.
                            </p>
                            <p className="text-text-secondary/60 text-xs">
                                Deslizá para ver los proyectos →
                            </p>
                        </div>
                    </RevealOnScroll>

                    {/* Navigation arrows */}
                    <div className="hidden lg:flex items-center gap-3">
                        <button
                            onClick={() => scrollByCard('left')}
                            disabled={!canScrollLeft}
                            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                                canScrollLeft
                                    ? 'border-[#00ff87]/50 text-[#00ff87] hover:bg-[#00ff87]/10 hover:border-[#00ff87]'
                                    : 'border-white/10 text-white/20 cursor-not-allowed'
                            }`}
                            aria-label="Proyecto anterior"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scrollByCard('right')}
                            disabled={!canScrollRight}
                            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                                canScrollRight
                                    ? 'border-[#00ff87]/50 text-[#00ff87] hover:bg-[#00ff87]/10 hover:border-[#00ff87]'
                                    : 'border-white/10 text-white/20 cursor-not-allowed'
                            }`}
                            aria-label="Proyecto siguiente"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Carousel de tarjetas */}
                <div className="relative mb-24">
                    <div
                        ref={carouselRef}
                        className="flex gap-6 lg:gap-8 overflow-x-auto carousel-container scroll-snap-x scroll-snap-mandatory pb-4"
                        role="region"
                        aria-label="Proyectos"
                        tabIndex={0}
                    >
                        {projects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                    {/* Right edge fade */}
                    {canScrollRight && (
                        <div
                            className="absolute top-0 right-0 w-16 h-full pointer-events-none bg-gradient-to-l from-[#0a0a0a] to-transparent"
                            aria-hidden="true"
                        />
                    )}
                </div>
            </div>

            {/* Sección Mockup iPhone */}
            <MockupShowcase type="mobile" />

            {/* Sección Mockup MacBook */}
            <MockupShowcase type="desktop" />
        </section>
    );
};
