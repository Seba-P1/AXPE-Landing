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
    desktopVideo?: string;
    mobileVideo?: string;
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
        desktopImage: '/images/proyectos/ypfelpuente-hero.jpg',
        mobileImage: '/images/proyectos/ypfelpuente-mobile.jpg',
        desktopVideo: '/images/proyectos/ypfelpuente-hero.webm',
        mobileVideo: '/images/proyectos/ypfelpuente-mobile.webm',
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
        desktopImage: '/images/proyectos/guenumil-hero.jpg',
        mobileImage: '/images/proyectos/guenumil-mobile.jpg',
        desktopVideo: '/images/proyectos/guenumil-hero.webm',
        mobileVideo: '/images/proyectos/guenumil-mobile.webm',
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
        desktopImage: '/images/proyectos/rcplay-hero.jpg',
        mobileImage: '/images/proyectos/rcplay-mobile.jpg',
        desktopVideo: '/images/proyectos/rcplay-hero.webm',
        mobileVideo: '/images/proyectos/rcplay-mobile.webm',
        link: 'https://rcplay.com.ar/',
        linkAriaLabel: 'Ver sitio de RC Play (abre en nueva pestaña)',
        initials: 'RC'
    }
];

// Placeholder component
const Placeholder: React.FC<{ initials: string }> = ({ initials }) => (
    <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center border border-[rgba(0,255,135,0.2)]">
        <span className="text-[#00ff87]/30 text-5xl font-bold font-display tracking-wider">{initials}</span>
    </div>
);

// Video component with lazy loading
const LazyVideo: React.FC<{
    src: string;
    poster: string;
    alt: string;
    className?: string;
}> = ({ src, poster, alt, className = '' }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (videoRef.current) {
                        videoRef.current.play().catch(() => {});
                    }
                } else {
                    setIsVisible(false);
                    if (videoRef.current) {
                        videoRef.current.pause();
                    }
                }
            },
            { threshold: 0.3 }
        );

        if (videoRef.current) observer.observe(videoRef.current);
        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);

    if (hasError) {
        return <img src={poster} alt={alt} className={className} />;
    }

    return (
        <video
            ref={videoRef}
            className={className}
            muted
            loop
            playsInline
            preload="none"
            poster={poster}
            onError={() => setHasError(true)}
        >
            {isVisible && <source src={src} type="video/webm" />}
        </video>
    );
};

// Realistic MacBook mockup
const MacBookMockup: React.FC<{ project: ProjectData; isVisible: boolean }> = ({ project, isVisible }) => {
    const [hasDesktopError, setHasDesktopError] = useState(false);

    return (
        <div
            className={`relative w-full transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '0ms' }}
        >
            {/* MacBook Body */}
            <div className="relative">
                {/* Screen bezel */}
                <div className="relative bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-t-2xl p-3 pb-2 shadow-2xl">
                    {/* Camera notch */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-black rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-[#333]" aria-hidden="true" />
                    </div>
                    
                    {/* Screen */}
                    <div className="relative bg-black rounded-lg overflow-hidden aspect-[16/10]">
                        {project.desktopVideo && !hasDesktopError ? (
                            <LazyVideo
                                src={project.desktopVideo}
                                poster={project.desktopImage}
                                alt={`${project.name} — vista de escritorio`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <img
                                src={project.desktopImage}
                                alt={`${project.name} — vista de escritorio`}
                                className="w-full h-full object-cover"
                                onError={() => setHasDesktopError(true)}
                            />
                        )}
                        {hasDesktopError && <Placeholder initials={project.initials} />}
                    </div>
                </div>
                
                {/* Base with keyboard */}
                <div className="relative">
                    {/* Hinge */}
                    <div className="h-2 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]" aria-hidden="true" />
                    
                    {/* Keyboard deck */}
                    <div className="bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-xl p-4 shadow-2xl">
                        {/* Keyboard area */}
                        <div className="bg-[#0a0a0a] rounded-lg p-3 mb-2">
                            <div className="grid grid-cols-12 gap-1">
                                {Array.from({ length: 36 }).map((_, i) => (
                                    <div key={i} className="h-2 bg-[#1a1a1a] rounded-sm" aria-hidden="true" />
                                ))}
                            </div>
                        </div>
                        
                        {/* Trackpad */}
                        <div className="w-32 h-20 mx-auto bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-lg border border-[#2a2a2a]" aria-hidden="true" />
                    </div>
                    
                    {/* Bottom edge */}
                    <div className="h-1 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-lg" aria-hidden="true" />
                </div>
            </div>
        </div>
    );
};

// Realistic phone mockup
const PhoneMockup: React.FC<{ project: ProjectData; isVisible: boolean }> = ({ project, isVisible }) => {
    const [hasMobileError, setHasMobileError] = useState(false);

    return (
        <div
            className={`relative w-48 mx-auto transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
        >
            {/* Phone body */}
            <div className="relative bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl">
                {/* Side buttons */}
                <div className="absolute top-20 -left-[2px] w-[2px] h-8 bg-[#1a1a1a] rounded-l" aria-hidden="true" />
                <div className="absolute top-32 -left-[2px] w-[2px] h-12 bg-[#1a1a1a] rounded-l" aria-hidden="true" />
                <div className="absolute top-24 -right-[2px] w-[2px] h-10 bg-[#1a1a1a] rounded-r" aria-hidden="true" />
                
                {/* Screen */}
                <div className="relative bg-black rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                    {/* Dynamic island / notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" aria-hidden="true" />
                    
                    {/* Content */}
                    {project.mobileVideo && !hasMobileError ? (
                        <LazyVideo
                            src={project.mobileVideo}
                            poster={project.mobileImage}
                            alt={`${project.name} — vista mobile`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src={project.mobileImage}
                            alt={`${project.name} — vista mobile`}
                            className="w-full h-full object-cover"
                            onError={() => setHasMobileError(true)}
                        />
                    )}
                    {hasMobileError && <Placeholder initials={project.initials} />}
                </div>
            </div>
        </div>
    );
};

// Individual project card
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
            className="flex-shrink-0 w-[85vw] md:w-[400px] lg:w-[460px] scroll-snap-align-start"
        >
            <div className="group relative bg-[#111111] rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full hover:border-[rgba(0,255,135,0.4)] hover:shadow-[0_8px_32px_rgba(0,255,135,0.08)] transition-all duration-300">
                {/* Device Mockups */}
                <div className="p-6 pb-0 space-y-6">
                    <MacBookMockup project={project} isVisible={isVisible} />
                    <PhoneMockup project={project} isVisible={isVisible} />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[#00ff87] text-xs font-bold uppercase tracking-wider mb-3 block">{project.rubro}</span>
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
        <section id="proyectos" className="py-24 bg-[#0a0a0a] relative border-t border-white/5">
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
                <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
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

                {/* Carousel */}
                <div className="relative">
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
        </section>
    );
};
