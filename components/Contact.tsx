import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ContactFormData } from '../types';
import { RevealOnScroll } from './RevealOnScroll';
import { supabase } from '../lib/supabaseClient';
import emailjs from '@emailjs/browser';

export const Contact: React.FC = () => {
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        serviceInterest: 'web',
        message: ''
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const service = params.get('service');
        if (service) {
            setFormData(prev => ({ ...prev, serviceInterest: service }));

            // Scroll suave al formulario
            if (location.hash === '#contacto' || service) {
                const element = document.getElementById('contacto');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }, [location]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveToSupabase = async () => {
        try {
            const { error } = await supabase
                .from('leads')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        service_interest: formData.serviceInterest,
                        message: formData.message
                    }
                ]);
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error saving lead:', error);
            return false;
        }
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // 1. Save to Supabase first (Wait for it)
        await saveToSupabase();

        // 2. Clear state and redirect to WhatsApp
        const phoneNumber = "5492931454805";
        const text = `* Nueva Consulta desde la Web AXPE * 🚀

* Nombre:* ${formData.name}
* Rubro / Servicio:* ${getServiceLabel(formData.serviceInterest)}
* Email:* ${formData.email}
* Teléfono:* ${formData.phone || 'No especificado'}

* Mensaje:*
    ${formData.message}

---
    _Enviado desde el formulario de contacto._`;

        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

        setIsSubmitting(false);
        window.open(whatsappUrl, '_blank');
    };

    const handleEmailSubmit = async () => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        // 1. Save to Supabase
        await saveToSupabase();

        // 2. Send via EmailJS
        // Nombres de variables ajustados a la captura de pantalla del usuario
        const templateParams = {
            name: formData.name,      // {{name}}
            email: formData.email,    // {{email}}
            message: formData.message, // {{message}}
            title: getServiceLabel(formData.serviceInterest), // {{title}}
            phone: formData.phone || 'No especificado'
        };

        try {
            await emailjs.send(
                'service_8wnlref',
                'template_a7rzo45',
                templateParams,
                '7XbrIYqHycsctAl0p'
            );
            setSubmitStatus({ type: 'success', message: '¡Correo enviado con éxito! Me pondré en contacto pronto.' });
            // Reset form
            setFormData({ name: '', email: '', phone: '', serviceInterest: 'web', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus({ type: 'error', message: 'Hubo un problema al enviar el correo. Por favor, intenta por WhatsApp.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getServiceLabel = (value: string) => {
        switch (value) {
            case 'web': return 'Ventas y Presencia Web';
            case 'turnos': return 'Reservas y Turnos Online';
            case 'gestion': return 'Gestión y Procesos PyME';
            case 'mockup': return 'Maqueta / Prototipo';
            default: return 'Consulta General';
        }
    };

    return (
        <section id="contacto" className="py-24 bg-secondary relative overflow-hidden border-t border-white/5">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 skew-x-12 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <RevealOnScroll>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-accent font-bold tracking-wide uppercase text-xs mb-2">Hablemos</h2>
                            <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Impulsá tu Negocio</h3>
                            <p className="text-text-secondary mb-8 text-lg">
                                Soy Sebastián Peña. Estoy en Río Colorado, pero trabajo para donde me necesites. Contame tu idea y busquemos la forma más eficiente de hacerla realidad.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-tertiary p-3 rounded-lg text-accent border border-white/5">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Email</h4>
                                        <a href="mailto:seba.ap793@gmail.com" className="text-text-secondary hover:text-accent transition-colors">seba.ap793@gmail.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-tertiary p-3 rounded-lg text-accent border border-white/5">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Teléfono / WhatsApp</h4>
                                        <p className="text-text-secondary">+54 9 2931 454805</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-tertiary p-3 rounded-lg text-accent border border-white/5">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Ubicación</h4>
                                        <p className="text-text-secondary">Río Colorado, Río Negro</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-tertiary p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl relative">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-bl-full rounded-tr-2xl"></div>
                            <form className="space-y-6 relative z-10">
                                {submitStatus && (
                                    <div className={`p-4 rounded-lg text-sm mb-6 ${submitStatus.type === 'success' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                        {submitStatus.message}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-2">Nombre Completo</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder-white/20"
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-2">Teléfono</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder-white/20"
                                            placeholder="Tu celular"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder-white/20"
                                        placeholder="tu@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">¿Qué estás buscando?</label>
                                    <select
                                        name="serviceInterest"
                                        value={formData.serviceInterest}
                                        onChange={handleChange}
                                        className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    >
                                        <option value="web">Ventas y Presencia Web</option>
                                        <option value="turnos">Reservas y Turnos Online</option>
                                        <option value="gestion">Gestión y Procesos PyME</option>
                                        <option value="mockup">Maqueta / Prototipo</option>
                                        <option value="otro">Otra consulta</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Contame un poco más</label>
                                    <textarea
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none placeholder-white/20"
                                        placeholder="Detalles de tu proyecto..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleSubmit()}
                                        disabled={isSubmitting}
                                        className={`bg-accent text-primary font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(0,224,145,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2 hover:bg-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <span>{isSubmitting ? 'Enviando...' : 'WhatsApp'}</span>
                                        {!isSubmitting && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-9.667-.272-.984-.47-.149-.669.05-.198.199-.744.744-1.139 1.14-.396.396-.793.892-.099 2.084.694 1.192 2.478 3.687 5.963 5.163 2.724 1.153 3.696 1.054 4.394.954.745-.1 2.378-.968 2.724-1.93.348-.968.348-1.782.248-1.957z" /></svg>}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleEmailSubmit}
                                        disabled={isSubmitting}
                                        className={`bg-secondary border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-tertiary transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <span>{isSubmitting ? 'Enviando...' : 'Email'}</span>
                                        {!isSubmitting && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                                    </button>
                                </div>
                                <p className="text-xs text-center text-text-secondary mt-4">
                                    {isSubmitting ? 'Guardando tu consulta de forma segura...' : 'Elegí el medio que te sea más cómodo para enviarme tu consulta.'}
                                </p>
                            </form>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};