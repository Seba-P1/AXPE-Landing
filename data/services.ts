import { Service } from '../types';

export const servicesData: Service[] = [
  {
    id: 'web',
    title: 'Ventas y Presencia Web',
    shortDescription: 'No es solo una web, es tu mejor vendedor disponible 24/7.',
    longDescription: 'Diseño sitios web de alto impacto que no solo se ven bien, sino que están construidos para convertir visitantes en clientes reales. Ideal para negocios que buscan profesionalizar su imagen y automatizar el primer contacto. Olvidate de responder siempre lo mismo; tu web lo hace por vos.',
    icon: '🚀',
    deliveryTime: '7-10 días',
    features: ['Diseño 100% Personalizado', 'Formularios que llegan a tu Email y WhatsApp', 'Catálogos Digitales Interactivos', 'Optimización SEO para Buscadores'],
    benefits: ['Posicionamiento profesional inmediato', 'Captura de clientes en piloto automático', 'Adaptable a cualquier dispositivo móvil', 'Velocidad de carga ultrarrápida'],
    imagePrompt: 'A premium, high-converting landing page shown on a sleek smartphone and laptop, vibrant green accents on deep black, modern business aesthetic, 4k resolution, cinematic lighting',
    useCases: [
      {
        title: "Landing Page para Gastronomía",
        description: "Menú digital interactivo, fotos que enamoran y botón directo a pedidos por WhatsApp. Perfectas para hamburgueserías o servicios de catering.",
        imagePrompt: "Delicious burger on a dark plate, floating ingredients, neon green glow, high-end food photography, dark aesthetic",
        staticImage: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Web para Profesionales",
        description: "Ideal para abogados, arquitectos o contadores. Un portfolio elegante que muestra tu trayectoria y facilita que nuevos clientes te contacten.",
        imagePrompt: "Architectural blueprint on a wooden desk, digital blueprints glowing in neon green, professional minimalist office background",
        staticImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Catálogo Digital para Retail",
        description: "Mostrá tus productos con estilo. Ideal para tiendas de moda o regalería que quieren que sus clientes vean todo lo nuevo sin salir de WhatsApp.",
        imagePrompt: "High-end fashion boutique catalog on a tablet screen, glowing green 'buy now' buttons, cinematic lighting, elegant atmosphere",
        staticImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Inmobiliarias y Real Estate",
        description: "Presentá tus propiedades con galerías de alta calidad y formularios específicos por propiedad. Profesionalismo total para cerrar ventas.",
        imagePrompt: "Futuristic real estate app showing a luxury house, glowing green property markers, night view, professional interface",
        staticImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: 'turnos',
    title: 'Reservas y Turnos Online',
    shortDescription: 'Tu secretaria virtual 24/7. Dejá que tus clientes reserven solos.',
    longDescription: 'La solución definitiva para barberías, estéticas, consultorios y canchas. Tus clientes ven tu disponibilidad real y reservan sin que vos tengas que tocar el teléfono. Ahorrá horas de gestión, evitá errores en la agenda y reducí el ausentismo con recordatorios automáticos.',
    icon: '📅',
    deliveryTime: '10-15 días',
    features: ['Agenda 100% automatizada', 'Recordatorios por WhatsApp (opcional)', 'Gestión de servicios y profesionales', 'Integración con MercadoPago para señas'],
    benefits: ['Ahorro de hasta 10 horas semanales de chat', 'Reducción drástica de turnos cancelados', 'Tus clientes reservan incluso fuera de horario', 'Organización total de tu equipo de trabajo'],
    imagePrompt: 'A futuristic digital booking interface showing a barbery schedule, neon green highlights on dark theme, clean typography, floating elements, professional UI design',
    useCases: [
      {
        title: "Sistemas para Barberías",
        description: "Permite que tus clientes elijan a su barbero favorito y reserven el corte desde Instagram en 3 clicks. Chau mensajes a las 11 de la noche.",
        imagePrompt: "Professional barber shop with neon green lighting, modern chairs, futuristic hair salon concept, cinematic atmosphere",
        staticImage: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Canchas y Complejos",
        description: "Gestión de canchas de fútbol o pádel. Los usuarios reservan, pagan la seña y vos solo te ocupás de prender las luces.",
        imagePrompt: "Futuristic padel court with glowing green lines, dark environment, technological sports facility concept, high energy",
        staticImage: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Consultorios y Salud",
        description: "Ideal para psicólogos, dentistas o kinesiólogos. Gestión de pacientes y recordatorios automáticos para que nadie falte a su sesión.",
        imagePrompt: "Modern medical clinic lobby with digital screens showing appointment slots in neon green, clean minimalist style",
        staticImage: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Spa y Bienestar",
        description: "Sistemas de reserva para masajes, estética o yoga. Controlá el cupo de tus clases y permití pagos online anticipados.",
        imagePrompt: "Zen spa atmosphere with glowing green lotus icons, digital booking screen on a wooden stand, relaxing lighting",
        staticImage: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: 'gestion',
    title: 'Gestión y Procesos PyME',
    shortDescription: 'Tomá el control de tus números. Chau Excels interminables.',
    longDescription: 'Sistemas a medida para administrar stock, facturación, cuentas corrientes y dashboards de ventas. Diseñado para empresas que necesitan centralizar su operación y ver el estado real de su negocio en un solo lugar. Accesible desde tu PC o celular desde cualquier parte del mundo.',
    icon: '📊',
    deliveryTime: '15-20 días',
    features: ['Dashboards con gráficos en tiempo real', 'Control de stock y alertas inteligentes', 'Multi-usuario con roles de acceso', 'Exportación de reportes a Excel/PDF'],
    benefits: ['Llevá tu negocio en el bolsillo', 'Tomá decisiones basadas en datos reales', 'Eliminá errores humanos en planillas', 'Escalabilidad total a medida que crecés'],
    imagePrompt: 'Professional business dashboard on a large desktop monitor, complex data visualizations with clean green lines, dark mode UI, modern office atmosphere',
    useCases: [
      {
        title: "Control de Stock e Inventario",
        description: "Escaneá productos desde el celu, recibí alertas de poco stock y nunca más te quedes sin mercadería por falta de previsión.",
        imagePrompt: "Futuristic warehouse with glowing green inventory markers, high-tech handheld scanner, digital data overlay on products",
        staticImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Facturación y Cobranzas",
        description: "Administrá cuentas corrientes de clientes, enviá recordatorios de pago y centralizá todos tus movimientos de caja sin errores.",
        imagePrompt: "Digital financial report with floating green charts and coins, dark glassmorphism style, modern accounting concept",
        staticImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Dashboards para Dueños",
        description: "Visualizá tus ventas por día, mes o producto. Tomá decisiones inteligentes sabiendo exactamente qué es lo que más rinde.",
        imagePrompt: "Business owner checking a glowing green sales dashboard on a smartphone in a modern dark office setting",
        staticImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Gestión de RRHH",
        description: "Control de asistencia, roles de acceso para empleados y gestión de comisiones por venta. Todo organizado, sin papeles.",
        imagePrompt: "Holographic organizational chart with green nodes, teamwork symbols, futuristic business management concept",
        staticImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: 'mockup',
    title: 'Prototipos de Alta Fidelidad',
    shortDescription: 'Visualizá tu idea antes de programar. Minimizá riesgos.',
    longDescription: '¿Tenés una idea para una nueva App o Sistema complejo? Te entrego un prototipo interactivo (Figma) que funciona como si fuera la app real. Ideal para validar con inversores, testear con clientes o simplemente estar 100% seguro del diseño antes de invertir en el desarrollo completo.',
    icon: '🎨',
    deliveryTime: '3-5 días',
    features: ['Diseño UI/UX de nivel premium', 'Flujo de usuario interactivo', 'Paleta de colores y tipografía definida', 'Presentación lista para inversores'],
    benefits: ['Ahorrá miles de dólares en cambios futuros', 'Validación rápida de tu modelo de negocio', 'Mejor comunicación con desarrolladores', 'Presentaciones que impactan y cierran tratos'],
    imagePrompt: 'A high-fidelity mobile app mockup being designed on a glass tablet, wireframes glowing with neon green, futuristic design studio background, sharp focus',
    useCases: [
      {
        title: "Presentación para Inversores",
        description: "Llevá tu idea al siguiente nivel con una maqueta funcional que demuestre el potencial real de tu proyecto sin haber gastado en código todavía.",
        imagePrompt: "Professional presentation in a futuristic boardroom, glowing green digital charts on a holographic wall, high-tech startup atmosphere",
        staticImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Testeo de Usuarios",
        description: "Probá si tu app es fácil de usar antes de programarla. Ahorrá meses de rediseño pidiendo feedback sobre algo que ya se siente real.",
        imagePrompt: "Person testing a mobile app on a smartphone, neon green feedback loops, user experience research concept, dark studio",
        staticImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Guía para Desarrolladores",
        description: "Evitá malentendidos. Entregá un diseño pixel-perfect con todas las medidas y colores listos para que el programador trabaje rápido.",
        imagePrompt: "Screen showing UI code and design specs side by side, neon green lines, developer tools interface, technological aesthetic",
        staticImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Identidad Visual Digital",
        description: "Definimos no solo cómo se ve tu marca, sino cómo se mueve y cómo interactúa en el mundo digital. Esencia AXPE en cada click.",
        imagePrompt: "Minimalist brand identity board on a screen, glowing green logo concepts, smooth digital textures, futuristic design",
        staticImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800"
      }
    ]
  }
];