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

// Placeholder for missing images
const ImagePlaceholder: React.FC<{ initials: string; alt: string }> = ({ initials, alt }) => (
    <div className="w-full h-full bg-[#111111] flex items-center justify-center border border-[rgba(0,255,135,0.15)]" aria-label={alt}>
        <span className="text-[#00ff87]/40 text-4xl font-bold font-display">{initials}</span>
    </div>
);

// Video component with lazy loading and fallback to image
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
                        videoRef.current.play().catch(() => {
                            // Autoplay blocked, video will show poster
                        });
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

// Device mockup composition
const DeviceMockup: React.FC<{ project: ProjectData; isVisible: boolean }> = ({ project, isVisible }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
    };

    // 3D tilt calculation (max ±4deg)
    const rotateX = isHovered ? mousePos.y * -4 : 0;
    const rotateY = isHovered ? mousePos.x * 4 : 0;
    const scale = isHovered ? 1.02 : 1;

    const hasDesktopVideo = !!project.desktopVideo;
    const hasMobileVideo = !!project.mobileVideo;

    return (
        <div
            ref={cardRef}
            className="relative w-full aspect-[4/3] mb-6"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
                transition: 'transform 300ms ease-out',
            }}
        >
            {/* MacBook Frame */}
            <div
                className={`absolute left-0 top-0 w-[68%] h-full transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[30px] scale-[0.96]'}`}
                style={{ transitionDelay: '0ms' }}
            >
                {/* Screen */}
                <div className="relative w-full h-[96%] rounded-t-xl border-[3px] border-[#1a1a1a] bg-black overflow-hidden">
                    {/* Camera dot */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[2px] h-[2px] rounded-full bg-[#333] z-10" aria-hidden="true" />
                    {/* Screenshot or Video */}
                    <div className="w-full h-full p-[10px]">
                        {hasDesktopVideo ? (
                            <LazyVideo
                                src={project.desktopVideo!}
                                poster={project.desktopImage}
                                alt={`${project.name} — vista de escritorio`}
                                className="w-full h-full object-cover rounded-sm"
                            />
                        ) : (
                            <img
                                src={project.desktopImage}
                                alt={`${project.name} — vista de escritorio`}
                                className="w-full h-full object-cover rounded-sm"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const parent = e.currentTarget.parentElement;
                                    if (parent && !parent.querySelector('.placeholder')) {
                                        const placeholder = document.createElement('div');
                                        placeholder.className = 'placeholder w-full h-full bg-[#111111] flex items-center justify-center border border-[rgba(0,255,135,0.15)] rounded-sm';
                                        placeholder.innerHTML = `<span class="text-[#00ff87]/40 text-2xl font-bold">${project.initials}</span>`;
                                        parent.appendChild(placeholder);
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>
                {/* Base/keyboard bar */}
                <div
                    className="w-[104%] h-[4%] -ml-[2%] rounded-b-lg bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]"
                    aria-hidden="true"
                />
            </div>

            {/* Phone Frame */}
            <div
                className={`absolute bottom-[15%] right-[-10%] w-[30%] aspect-[9/19] z-10 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[30px] scale-[0.96]'}`}
                style={{
                    transitionDelay: '200ms',
                    filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.4))',
                }}
            >
                {/* Phone body */}
                <div className="relative w-full h-full rounded-[2.5rem] border-[8px] border-[#1a1a1a] bg-black overflow-hidden">
                    {/* Dynamic island */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[40%] h-[5%] bg-black rounded-full z-10" aria-hidden="true" />
                    {/* Screenshot or Video */}
                    {hasMobileVideo ? (
                        <LazyVideo
                            src={project.mobileVideo!}
                            poster={project.mobileImage}
                            alt={`${project.name} — vista mobile`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src={project.mobileImage}
                            alt={`${project.name} — vista mobile`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent && !parent.querySelector('.placeholder')) {
                                    const placeholder = document.createElement('div');
                                    placeholder.className = 'placeholder w-full h-full bg-[#111111] flex items-center justify-center border border-[rgba(0,255,135,0.15)] rounded-lg';
                                    placeholder.innerHTML = `<span class="text-[#00ff87]/40 text-xl font-bold">${project.initials}</span>`;
                                    parent.appendChild(placeholder);
                                }
                            }}
                        />
                    )}
                    {/* Side buttons */}
                    <div className="absolute top-[20%] right-[-2px] w-[2px] h-[8%] bg-[#1a1a1a] rounded-l" aria-hidden="true" />
                    <div className="absolute top-[32%] right-[-2px] w-[2px] h-[12%] bg-[#1a1a1a] rounded-l" aria-hidden="true" />
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
            <div className="group relative bg-[#111111] rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full motion-safe:transition-all motion-safe:duration-250 ease-in-out hover:border-[rgba(0,255,135,0.4)] hover:shadow-[0_8px_32px_rgba(0,255,135,0.08)]">
                {/* Device Mockup */}
                <div className="p-6 pb-0">
                    <DeviceMockup project={project} isVisible={isVisible} />
                </div>

                {/* Content */}
                <div className="p-6 pt-0 flex flex-col flex-grow">
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
                        className="inline-flex items-center text-white font-medium hover:text-[#00ff87] motion-safe:transition-colors mt-auto w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded"
                    >
                        Ver sitio <span className="ml-2 group-hover:translate-x-1 motion-safe:transition-transform motion-reduce:group-hover:translate-x-0">→</span>
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
            {/* Custom styles for carousel */}
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
                @media (prefers-reduced-motion: reduce) {
                    .motion-reduce-transition-none * {
                        transition: none !important;
                        transform: none !important;
                    }
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

                    {/* Navigation arrows — desktop only */}
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

                {/* Carousel Container */}
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

                    {/* Right edge fade mask */}
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
