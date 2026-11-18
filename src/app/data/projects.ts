import { Project } from '../models/project';

// Solo contenido autorizado para publicacion. Nunca agregar datos o codigo institucional.
export const PROJECTS: Project[] = [
  {
    "id": "brasa-oliva",
    "title": "Brasa & Oliva | Sitio Web para Restaurante",
    "category": "Demo comercial · Sitio web",
    "type": "web-comercial",
    "shortDescription": "Sitio web responsive para un restaurante ficticio, con menú interactivo, carrito de compras, preparación de pedidos por WhatsApp y formulario de reservaciones.",
    "fullDescription": "Brasa & Oliva es un proyecto demostrativo de una página web comercial para un restaurante ficticio. Fue desarrollado con Angular y TypeScript para ofrecer una experiencia moderna, intuitiva y adaptable a diferentes dispositivos. Incluye una página principal con presentación del restaurante, catálogo gastronómico con filtros por categoría, carrito de compras interactivo, preparación de pedidos para compartir por WhatsApp y formulario de solicitud de reservaciones. También incorpora optimizaciones de accesibilidad, rendimiento y SEO. El proyecto funciona del lado del cliente y no cuenta con backend ni base de datos para almacenar pedidos o reservaciones reales.",
    "image": "/assets/images/projects/brasaOliva/portadaBrasa-oliva.png",
    "technologies": [
      "Angular",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Bootstrap Icons",
      "Vercel"
    ],
    "features": [
      "Catálogo gastronómico con filtros por categoría.",
      "Carrito con cantidades y resumen del pedido.",
      "Preparación de mensajes para WhatsApp.",
      "Formulario de solicitud de reservaciones con validaciones."
    ],
    "architecture": [
      "Visitante / navegador",
      "Aplicación Angular standalone",
      "Componentes y servicios de interfaz",
      "Catálogo de productos y carrito de compras",
      "Preparación de pedido para WhatsApp",
      "Formulario de solicitud de reservaciones",
      "Sitio web desplegado en Vercel"
    ],
    "challenges": [
      "Diseñar una identidad visual atractiva para un restaurante.",
      "Adaptar el diseño a pantallas de diferentes tamaños.",
      "Implementar filtros y navegación del catálogo.",
      "Mantener actualizado el estado del carrito de compras.",
      "Preparar correctamente la información de los pedidos para WhatsApp.",
      "Crear formularios con validaciones y una experiencia intuitiva.",
      "Optimizar rendimiento, accesibilidad y posicionamiento técnico SEO.",
      "Configurar el despliegue de producción en Vercel."
    ],
    "learnings": [
      "Desarrollo de aplicaciones web con Angular y TypeScript.",
      "Organización de componentes standalone.",
      "Gestión de estado para interacciones del carrito.",
      "Diseño responsive orientado a negocios comerciales.",
      "Integración de flujos de contacto mediante WhatsApp.",
      "Mejoras de accesibilidad y experiencia de usuario.",
      "Optimización de recursos y metadatos SEO.",
      "Despliegue continuo mediante GitHub y Vercel."
    ],
    "gallery": [
      "/assets/images/projects/brasaOliva/MenuOliva.png",
      "/assets/images/projects/brasaOliva/CarritoOliva.png",
      "/assets/images/projects/brasaOliva/ReservaOliva.png"
    ],
    "github": "https://github.com/JPablorc09/brasa-oliva",
    "demo": "https://brasa-oliva-nine.vercel.app/",
    "confidential": false,
    "professional": false,
    "context": "demo",
    "status": "published",
    "problem": "Mostrar cómo un restaurante puede presentar su menú y preparar solicitudes de pedidos y reservaciones desde una web.",
    "imageKind": "capture",
    "pendingFeatures": [],
    "featuresHeading": "Funciones contrastadas con el código frontend",
    "verificationNote": "Funciones contrastadas con el código local y disponibilidad HTTP de la demo. No se realizó una prueba completa de todos los flujos."
  },
  {
    "id": "urbancut",
    "title": "UrbanCut Barber Studio",
    "category": "Demo comercial · Sitio web",
    "type": "web-comercial",
    "shortDescription": "Sitio web responsive para una barbería ficticia, con galería interactiva y simulador de solicitudes de citas.",
    "fullDescription": "Proyecto demostrativo de un sitio web comercial para una barbería ficticia. Desarrollado con Angular y TypeScript, presenta servicios, galería de estilos, horarios, ubicación ilustrativa y un formulario que valida los datos y prepara un mensaje de solicitud de cita. No registra reservas reales ni consulta disponibilidad en tiempo real.",
    "image": "/assets/images/projects/urbancut/portada.png",
    "technologies": [
      "Angular",
      "TypeScript",
      "HTML5",
      "CSS3",
      "WebP",
      "Netlify"
    ],
    "features": [
      "Presentación de servicios y precios demostrativos.",
      "Galería con visor de imágenes y controles de teclado.",
      "Formulario de solicitud de citas con validaciones.",
      "Vista previa de la solicitud sin registro de una reserva real."
    ],
    "architecture": [
      "Visitante / navegador",
      "Aplicación Angular standalone",
      "Componentes de interfaz y formulario",
      "Validación y preparación de solicitud (cliente)",
      "Sitio estático desplegado en Netlify"
    ],
    "challenges": [
      "Diseñar una interfaz consistente y adaptable a diferentes tamaños de pantalla.",
      "Construir un lightbox accesible y navegable por teclado.",
      "Validar fechas y horarios sin simular disponibilidad real.",
      "Optimizar fotografías para reducir el peso de descarga.",
      "Resolver conflictos entre animaciones de entrada y estilos de componentes."
    ],
    "learnings": [
      "Organización de una aplicación Angular con componentes standalone.",
      "Diseño responsive y microinteracciones en CSS.",
      "Accesibilidad en navegación, formularios y ventanas modales.",
      "Optimización de imágenes y compilación de producción.",
      "Publicación y mantenimiento de sitios estáticos en Netlify."
    ],
    "gallery": [],
    "demo": "https://urbancut-barber-studio.netlify.app/",
    "confidential": false,
    "professional": false,
    "context": "demo",
    "status": "published",
    "problem": "Presentar los servicios de una barbería y facilitar una solicitud de cita sin simular reservas confirmadas.",
    "imageKind": "capture",
    "pendingFeatures": [],
    "featuresHeading": "Funciones contrastadas con el código frontend",
    "verificationNote": "Funciones contrastadas con el código local y disponibilidad HTTP de la demo. No se realizó una prueba completa de todos los flujos."
  },
  {
    "id": "incidentes",
    "title": "Sistema de Gestión de Incidentes",
    "category": "Institucional · Gestión de incidentes",
    "type": "empresarial",
    "shortDescription": "Sistema web para gestionar incidentes, mantenimientos, estados, usuarios y permisos.",
    "fullDescription": "Participación en el desarrollo y mantenimiento de un sistema de gestión de incidentes con C#, ASP.NET Core MVC, SQL Server y Entity Framework Core. La ficha presenta únicamente funciones generales y aprendizajes profesionales.",
    "image": "/assets/images/projects/confidencial.png",
    "technologies": [
      "ASP.NET Core MVC",
      "C#",
      "SQL Server",
      "Entity Framework Core"
    ],
    "features": [
      "Gestión de incidentes.",
      "Usuarios y permisos.",
      "Estados y categorías.",
      "Mantenimiento de información.",
      "Historial y seguimiento."
    ],
    "architecture": [],
    "challenges": [
      "Organizar el seguimiento de incidentes.",
      "Validar información y mantener la coherencia de los registros."
    ],
    "learnings": [
      "Desarrollo y mantenimiento de aplicaciones MVC.",
      "Persistencia con Entity Framework Core.",
      "Análisis de incidencias de sistemas."
    ],
    "gallery": [],
    "confidential": true,
    "professional": true,
    "context": "institutional",
    "status": "professional",
    "problem": "Organizar el registro y seguimiento de incidentes y el mantenimiento de información relacionada.",
    "imageKind": "confidential-mockup",
    "pendingFeatures": [],
    "featuresHeading": "Funciones generales descritas por el autor",
    "verificationNote": "Resumen basado en las actividades confirmadas por el autor. Acceso restringido; no se divulgan capturas reales, código ni configuraciones internas."
  },
  {
    "id": "fallapp",
    "title": "FallApp",
    "category": "Institucional · Reportes de fallas",
    "type": "empresarial",
    "shortDescription": "Aplicación para registrar fallas, gestionar reportes e integrar su envío con Aranda ASMS.",
    "fullDescription": "Participación en una aplicación de registro y administración de fallas con ASP.NET Core MVC. El trabajo incluyó integración con Aranda ASMS, seguimiento de reportes y manejo de operaciones pendientes. Se omiten los flujos y configuraciones internas.",
    "image": "/assets/images/projects/confidencial.png",
    "technologies": [
      "ASP.NET Core MVC",
      "C#",
      "SQL Server",
      "APIs REST"
    ],
    "features": [
      "Registro de fallas.",
      "Integración con Aranda ASMS.",
      "Gestión de reportes.",
      "Reintentos de operaciones.",
      "Administración y seguimiento."
    ],
    "architecture": [],
    "challenges": [
      "Gestionar errores de integración y operaciones pendientes.",
      "Facilitar el seguimiento de los reportes."
    ],
    "learnings": [
      "Integración entre aplicaciones.",
      "Manejo de errores y reintentos.",
      "Mantenimiento de aplicaciones empresariales."
    ],
    "gallery": [],
    "confidential": true,
    "professional": true,
    "context": "institutional",
    "status": "professional",
    "problem": "Facilitar el registro de fallas y el seguimiento de reportes mediante integración entre aplicaciones.",
    "imageKind": "confidential-mockup",
    "pendingFeatures": [],
    "featuresHeading": "Funciones generales descritas por el autor",
    "verificationNote": "Resumen basado en las actividades confirmadas por el autor. Acceso restringido; no se divulgan capturas reales, código ni configuraciones internas."
  },
  {
    "id": "asms",
    "title": "Integración Aranda ASMS",
    "category": "Institucional · Integración de sistemas",
    "type": "integracion",
    "shortDescription": "Integración mediante APIs REST para intercambiar información con Aranda ASMS.",
    "fullDescription": "Desarrollo de integración entre aplicaciones y Aranda ASMS mediante C# y ASP.NET Core Web API. Se describen capacidades generales de envío, validación y gestión de errores, sin publicar contratos internos, campos, configuraciones ni código propietario.",
    "image": "/assets/images/projects/confidencial.png",
    "technologies": [
      "C#",
      "ASP.NET Core Web API",
      "APIs REST"
    ],
    "features": [
      "Integración entre aplicaciones.",
      "Envío de información.",
      "Validaciones.",
      "Gestión de errores.",
      "Procesamiento de solicitudes."
    ],
    "architecture": [],
    "challenges": [
      "Validar solicitudes y manejar respuestas de servicios externos.",
      "Documentar el comportamiento de la integración."
    ],
    "learnings": [
      "Desarrollo e integración de APIs REST.",
      "Validación de información.",
      "Diagnóstico de errores de comunicación entre sistemas."
    ],
    "gallery": [],
    "confidential": true,
    "professional": true,
    "context": "institutional",
    "status": "professional",
    "problem": "Facilitar el intercambio validado de información entre aplicaciones y una plataforma de gestión de servicios.",
    "imageKind": "confidential-mockup",
    "pendingFeatures": [],
    "featuresHeading": "Funciones generales descritas por el autor",
    "verificationNote": "Resumen basado en las actividades confirmadas por el autor. Acceso restringido; no se divulgan capturas reales, código ni configuraciones internas."
  },
  {
    "id": "vendetico",
    "title": "VendeTico — Sistema de Punto de Venta y Gestión Comercial",
    "category": "Personal · Punto de venta y gestión comercial",
    "type": "full-stack",
    "context": "personal",
    "status": "published",
    "statusNote": "Versión beta · Módulos internos con autenticación",
    "aiAssisted": true,
    "demoLabel": "Explorar sistema",
    "shortDescription": "Sistema web para pymes y comercios de Costa Rica, desarrollado mediante prompts estructurados y asistencia de agentes de inteligencia artificial.",
    "fullDescription": "VendeTico reúne interfaces de punto de venta, caja, productos, inventario, clientes, proveedores y resumen comercial. Es un proyecto personal en versión beta, publicado en Cloudflare Pages y orientado a pequeños negocios de Costa Rica. Su desarrollo combinó la definición de requerimientos y reglas de negocio del autor con asistencia de IA para el código y la interfaz. No sustituye la facturación electrónica de Hacienda.",
    "problem": "Centralizar la operación comercial de pequeños negocios: catálogo, existencias, caja y seguimiento de ventas, fiados y compras.",
    "image": "/assets/images/vendetico/vendetico-principal.webp",
    "imageKind": "capture",
    "technologies": [
      "Angular",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Cloudflare Pages"
    ],
    "features": [
      "Consulta del catálogo de productos y existencias desde el punto de venta.",
      "Resumen comercial con indicadores, gráfico de ventas y alertas de productos por agotarse.",
      "Pantallas de productos y categorías, inventario y movimientos.",
      "Consulta de clientes, fiados y proveedores.",
      "Vista del turno de caja y reporte de compras por trimestre.",
      "Interfaces de cobro, compras y administración de equipo contrastadas con el código; operaciones de escritura no ejecutadas."
    ],
    "featuresHeading": "Vistas verificadas y alcance funcional",
    "pendingFeatures": [
      "Cobros, devoluciones, cierres de caja y cambios de existencias no ejecutados durante la inspección.",
      "Invitaciones, permisos, suscripciones y exportaciones requieren validación integral; su presencia en el código no acredita una auditoría de seguridad."
    ],
    "architecture": [
      "Frontend Angular con componentes standalone y rutas cargadas bajo demanda.",
      "Cliente Supabase para autenticación y acceso a datos.",
      "Esquemas PostgreSQL, funciones SQL y políticas de seguridad a nivel de fila definidos en el código local.",
      "Aplicación web publicada en Cloudflare Pages."
    ],
    "challenges": [
      "Definir reglas de negocio para pymes costarricenses y traducirlas en prompts técnicos y de experiencia de usuario.",
      "Coordinar la evolución de interfaz, datos y validaciones con asistencia de IA.",
      "Validar los módulos y preparar su despliegue sin presentar la IA como sustituto de la revisión técnica."
    ],
    "learnings": [
      "Aplicación práctica de prompts estructurados y agentes de programación.",
      "Definición de producto, validación funcional y despliegue de una aplicación comercial.",
      "Revisión de propuestas de código, esquemas de datos e interfaces generados con asistencia de IA."
    ],
    "methodology": [
      "Mi participación: definición de requerimientos, reglas de negocio para pymes de Costa Rica y prompts técnicos y de UX/UI; pruebas, validación y despliegue de los módulos, según lo confirmado por el autor.",
      "Gemini apoyó la estructuración de prompts de arquitectura y UX/UI; Claude asistió en la generación de código frontend, consultas y esquemas de datos, validaciones e interfaz siguiendo esas especificaciones.",
      "El alcance definido incluye caja, fiados, SINPE Móvil, Régimen Simplificado y un modelo de suscripción con prueba de 15 días. Esto describe decisiones de producto; no constituye una certificación tributaria ni de seguridad.",
      "Actualmente en formación y práctica. Las propuestas de IA requieren revisión humana, pruebas y cuidado de credenciales y datos."
    ],
    "gallery": [
      "/assets/images/vendetico/vendetico-dashboard.webp",
      "/assets/images/vendetico/vendetico-productos.webp",
      "/assets/images/vendetico/vendetico-inventario.webp",
      "/assets/images/vendetico/vendetico-clientes.webp",
      "/assets/images/vendetico/vendetico-caja.webp",
      "/assets/images/vendetico/vendetico-reportes.webp",
      "/assets/images/vendetico/vendetico-login.webp",
      "/assets/images/vendetico/vendetico-mobile.webp",
      "/assets/images/vendetico/vendetico-resumen-mobile.webp"
    ],
    "imageTitles": {
      "/assets/images/vendetico/vendetico-principal.webp": "Punto de venta con catálogo y venta actual",
      "/assets/images/vendetico/vendetico-dashboard.webp": "Resumen del negocio",
      "/assets/images/vendetico/vendetico-productos.webp": "Catálogo de productos y categorías",
      "/assets/images/vendetico/vendetico-inventario.webp": "Existencias y alertas de inventario",
      "/assets/images/vendetico/vendetico-clientes.webp": "Clientes y consulta de fiados",
      "/assets/images/vendetico/vendetico-caja.webp": "Consulta del turno de caja",
      "/assets/images/vendetico/vendetico-reportes.webp": "Reporte de compras por trimestre",
      "/assets/images/vendetico/vendetico-login.webp": "Interfaz de autenticación",
      "/assets/images/vendetico/vendetico-mobile.webp": "Punto de venta en móvil",
      "/assets/images/vendetico/vendetico-resumen-mobile.webp": "Resumen del negocio en móvil"
    },
    "demo": "https://vendetico.pages.dev/ingresar",
    "confidential": false,
    "professional": false,
    "verificationNote": "Vistas de consulta inspeccionadas en el sistema publicado con una sesión autorizada y datos ficticios. Capturas reales con el correo de la cuenta oculto. Tecnologías y organización contrastadas con el código local. No se realizaron ventas ni cambios de datos; los flujos de escritura no se presentan como probados de extremo a extremo. La metodología se basa en la participación confirmada por el autor."
  },
  {
    "id": "prtg",
    "title": "Monitor de Eventos PRTG",
    "category": "Institucional · Monitoreo y datos",
    "type": "datos",
    "shortDescription": "Aplicación para importar, consultar y administrar información de monitoreo procedente de PRTG.",
    "fullDescription": "Participación en una aplicación ASP.NET Core MVC para procesar reportes CSV de PRTG y consultar su información en SQL Server. La presentación se limita a funciones generales de importación, historial y administración.",
    "image": "/assets/images/projects/confidencial.png",
    "technologies": [
      "ASP.NET Core MVC",
      "C#",
      "SQL Server",
      "Procesamiento de CSV"
    ],
    "features": [
      "Importación de reportes.",
      "Procesamiento de datos de monitoreo.",
      "Historial de registros.",
      "Consulta y administración de información."
    ],
    "architecture": [],
    "challenges": [
      "Validar y procesar archivos CSV.",
      "Organizar la consulta y el historial de información de monitoreo."
    ],
    "learnings": [
      "Procesamiento de archivos CSV.",
      "Consultas SQL.",
      "Mantenimiento de herramientas de monitoreo y reportes."
    ],
    "gallery": [],
    "confidential": true,
    "professional": true,
    "context": "institutional",
    "status": "professional",
    "problem": "Convertir información de monitoreo en registros consultables con historial de importación.",
    "imageKind": "confidential-mockup",
    "pendingFeatures": [],
    "featuresHeading": "Funciones generales descritas por el autor",
    "verificationNote": "Resumen basado en las actividades confirmadas por el autor. Acceso restringido; no se divulgan capturas reales, código ni configuraciones internas."
  },
  {
    "context": "personal",
    "confidential": false,
    "professional": false,
    "image": "/assets/images/projects/escaneatodo/Screenshot 2026-10-22 181653.png",
    "imageKind": "capture",
    "gallery": [
      "/assets/images/projects/escaneatodo/Screenshot 2026-10-22 181832.png"
    ],
    "architecture": [],
    "featuresHeading": "Herramientas visibles en la versión publicada",
    "pendingFeatures": [
      "Resultados del escaneo y corrección de perspectiva con archivos de prueba.",
      "Precisión del OCR y compatibilidad de formatos.",
      "Resultados de mejora de documentos antiguos; no se garantiza recuperar contenido ilegible.",
      "Exportación y edición de PDF y documentos con archivos de prueba."
    ],
    "id": "escaneatodo",
    "title": "EscaneaTodo",
    "category": "Personal · Herramientas para documentos",
    "type": "herramienta-web",
    "status": "published",
    "shortDescription": "Aplicación web publicada para trabajar con documentos; incluye interfaces de escaneo, OCR, PDF y edición.",
    "fullDescription": "Proyecto personal publicado en Cloudflare Pages. La interfaz pública presenta herramientas para digitalizar y trabajar con documentos. Se comprobó la disponibilidad del sitio y de sus herramientas; los resultados de procesamiento de archivos requieren validación funcional adicional.",
    "problem": "Reunir herramientas de digitalización y trabajo con documentos en una aplicación accesible desde el navegador.",
    "technologies": [
      "Angular",
      "Cloudflare Pages"
    ],
    "features": [
      "Acceso a escaneo de documentos e imagen a PDF.",
      "Interfaz de extracción de texto mediante OCR.",
      "Herramientas de unión, división y edición de PDF.",
      "Interfaz para documentos antiguos y edición de imágenes."
    ],
    "challenges": [
      "Validar resultados de procesamiento en distintos formatos y dispositivos."
    ],
    "learnings": [
      "Aprendizaje aplicado al desarrollo de herramientas web para documentos."
    ],
    "verificationNote": "Sitio público y herramientas visibles verificados. No se han ejecutado pruebas completas de procesamiento; las capacidades por validar se indican por separado.",
    "demo": "https://escaneatodo.pages.dev/"
  },
  {
    "context": "personal",
    "confidential": false,
    "professional": false,
    "image": "/assets/images/projects/radiomusicalapp/RadioMusicalApp_GraficoFunciones_1024x500.png",
    "imageKind": "promotional",
    "gallery": [],
    "architecture": [],
    "featuresHeading": "Funciones descritas por el autor",
    "pendingFeatures": [],
    "id": "radiomusicalapp",
    "title": "RadioMusicalApp",
    "category": "Personal · Aplicación móvil",
    "type": "movil",
    "status": "testing",
    "shortDescription": "Aplicación móvil de radios internacionales, en desarrollo y pruebas de publicación.",
    "fullDescription": "Proyecto personal con React Native, Expo y TypeScript para consultar emisoras, reproducir audio y gestionar favoritos mediante integración con Radio Browser API. No se presenta como publicada en tiendas.",
    "problem": "Consultar emisoras y acceder a sus transmisiones desde una aplicación móvil.",
    "technologies": [
      "React Native",
      "Expo",
      "TypeScript",
      "Radio Browser API"
    ],
    "features": [
      "Consulta de emisoras internacionales.",
      "Reproducción de audio.",
      "Favoritos.",
      "Navegación móvil.",
      "Integración con Radio Browser API."
    ],
    "challenges": [
      "Retos de desarrollo: gestionar la reproducción y la disponibilidad de transmisiones externas."
    ],
    "learnings": [
      "Práctica de desarrollo móvil, integración de APIs y reproducción de audio."
    ],
    "verificationNote": "Funciones y estado descritos por el autor. El repositorio público localizado contiene un catálogo de emisoras, no el código completo de la app. Publicación en tiendas no verificada."
  }
];
