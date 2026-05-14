import React, { useState } from 'react';
import { generateAssetImage } from '../services/geminiService';
import { RevealOnScroll } from './RevealOnScroll';

export const Hero: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string>('https://picsum.photos/1920/1080?grayscale&blur=2');
  const [isGenerating, setIsGenerating] = useState(false);

  // Demonstrate the AI capability
  const handleGenerateAIImage = async () => {
    setIsGenerating(true);
    const prompt = "A futuristic minimalist coding workspace, dark aesthetic with neon green lights, matrix style data rain in background, ultra realistic, 8k, cinematic lighting";
    const imageUrl = await generateAssetImage(prompt);
    if (imageUrl) {
      setHeroImage(imageUrl);
    }
    setIsGenerating(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary pt-20">

      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/90 to-primary z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-10 mix-blend-overlay"></div>
        <img
          src={heroImage}
          alt="Background"
          className={`w-full h-full object-cover transition-all duration-1000 ${isGenerating ? 'opacity-50 blur-md scale-105' : 'opacity-40 scale-100'}`}
        />
      </div>

      {/* Animated Green Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <RevealOnScroll>
          <div className="inline-block mb-6 px-4 py-1 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm">
            <span className="text-accent text-xs font-bold tracking-widest uppercase">Río Colorado • Río Negro</span>
          </div>

          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] tracking-tight">
            <span className="text-white">AXPE</span>
            <span className="block text-3xl md:text-5xl lg:text-6xl mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600 font-normal py-2">
              Soluciones Digitales
            </span>
          </h1>

          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Digitalizo tu negocio para que <span className="text-white font-medium">ahorres tiempo y vendas más.</span> Desde webs de alto impacto hasta sistemas de gestión para PyMEs y profesionales.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a href="#servicios" className="px-8 py-4 bg-accent text-primary rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(0,224,145,0.4)] transition-all transform hover:-translate-y-1 hover:bg-white w-full sm:w-auto">
              Ver soluciones para mi rubro
            </a>
            <a href="#contacto" className="px-8 py-4 border border-white/10 hover:border-accent/50 hover:bg-accent/5 backdrop-blur-sm text-white rounded-lg font-medium text-lg transition-all w-full sm:w-auto">
              Consultar ahora
            </a>
          </div>

          {/* AI Showcase Feature */}
          <div className="mt-20 inline-block opacity-80 hover:opacity-100 transition-opacity">
            <button
              onClick={handleGenerateAIImage}
              disabled={isGenerating}
              className="flex items-center space-x-3 text-xs text-text-secondary border border-white/5 bg-black/40 px-5 py-2 rounded-full hover:bg-white/5 transition-colors disabled:opacity-50 backdrop-blur-md"
            >
              <span className={`w-2 h-2 bg-accent rounded-full ${isGenerating ? 'animate-ping' : ''}`}></span>
              <span>{isGenerating ? "Gemini está creando tu fondo..." : "Generar fondo único con IA"}</span>
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};