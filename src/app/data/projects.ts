
import { Project } from '../models/project';

export const PROJECTS: Project[] = [

  // ============================================================
  // BRASA & OLIVA - DEMO COMERCIAL PARA RESTAURANTE
  // ============================================================
  {
    id: 'brasa-oliva',
    title: 'Brasa & Oliva | Sitio Web para Restaurante',
    category: 'Demo comercial · Sitio web',
    type: 'web-comercial',

    shortDescription:
      'Sitio web responsive para un restaurante ficticio, con menú interactivo, carrito de compras, preparación de pedidos por WhatsApp y formulario de reservaciones.',

    fullDescription:
      'Brasa & Oliva es un proyecto demostrativo de una página web comercial para un restaurante ficticio. Fue desarrollado con Angular y TypeScript para ofrecer una experiencia moderna, intuitiva y adaptable a diferentes dispositivos. Incluye una página principal con presentación del restaurante, catálogo gastronómico con filtros por categoría, carrito de compras interactivo, preparación de pedidos para compartir por WhatsApp y formulario de solicitud de reservaciones. También incorpora optimizaciones de accesibilidad, rendimiento y SEO. El proyecto funciona del lado del cliente y no cuenta con backend ni base de datos para almacenar pedidos o reservaciones reales.',

    // Coloque una captura real de la página en esta ruta.
    image: '/assets/images/projects/brasaOliva/portadaBrasa-oliva.png',

    technologies: [
      'Angular',
      'TypeScript',
      'HTML5',
      'CSS3',
      'Bootstrap Icons',
      'Vercel'
    ],

    features: [
      'Diseño responsive para computadoras, tabletas y celulares.',
      'Página de inicio con presentación del restaurante.',
      'Catálogo gastronómico con fotografías y precios.',
      'Filtrado de productos por categorías.',
      'Carrito de compras interactivo.',
      'Actualización de cantidades y resumen del pedido.',
      'Preparación de mensajes de pedidos para WhatsApp.',
      'Formulario de solicitud de reservaciones.',
      'Navegación intuitiva y mejoras de accesibilidad.',
      'Metadatos SEO y previsualización Open Graph.',
      'Optimización de imágenes y recursos.',
      'Publicación en Vercel con despliegue desde GitHub.'
    ],

    architecture: [
      'Visitante / navegador',
      'Aplicación Angular standalone',
      'Componentes y servicios de interfaz',
      'Catálogo de productos y carrito de compras',
      'Preparación de pedido para WhatsApp',
      'Formulario de solicitud de reservaciones',
      'Sitio web desplegado en Vercel'
    ],

    challenges: [
      'Diseñar una identidad visual atractiva para un restaurante.',
      'Adaptar el diseño a pantallas de diferentes tamaños.',
      'Implementar filtros y navegación del catálogo.',
      'Mantener actualizado el estado del carrito de compras.',
      'Preparar correctamente la información de los pedidos para WhatsApp.',
      'Crear formularios con validaciones y una experiencia intuitiva.',
      'Optimizar rendimiento, accesibilidad y posicionamiento técnico SEO.',
      'Configurar el despliegue de producción en Vercel.'
    ],

    learnings: [
      'Desarrollo de aplicaciones web con Angular y TypeScript.',
      'Organización de componentes standalone.',
      'Gestión de estado para interacciones del carrito.',
      'Diseño responsive orientado a negocios comerciales.',
      'Integración de flujos de contacto mediante WhatsApp.',
      'Mejoras de accesibilidad y experiencia de usuario.',
      'Optimización de recursos y metadatos SEO.',
      'Despliegue continuo mediante GitHub y Vercel.'
    ],

    // Agregue estas imágenes cuando tenga las capturas reales.
    gallery: [
        '/assets/images/projects/brasaOliva/MenuOliva.png',
        '/assets/images/projects/brasaOliva/CarritoOliva.png',
        '/assets/images/projects/brasaOliva/ReservaOliva.png',

    ],

    github: 'https://github.com/JPablorc09/brasa-oliva',
    demo: 'https://brasa-oliva-nine.vercel.app/',

    confidential: false,
    professional: false
  },

  // ============================================================
  // URBANCUT BARBER STUDIO - DEMO COMERCIAL
  // ============================================================
  {
    id: 'urbancut',
    title: 'UrbanCut Barber Studio',
    category: 'Demo comercial · Sitio web',
    type: 'web-comercial',

    shortDescription:
      'Sitio web responsive para una barbería ficticia, con galería interactiva y simulador de solicitudes de citas.',

    fullDescription:
      'Proyecto demostrativo de un sitio web comercial para una barbería ficticia. Desarrollado con Angular y TypeScript, presenta servicios, galería de estilos, horarios, ubicación ilustrativa y un formulario que valida los datos y prepara un mensaje de solicitud de cita. No registra reservas reales ni consulta disponibilidad en tiempo real.',

    image: '/assets/images/projects/urbancut/portada.png',

    technologies: [
      'Angular',
      'TypeScript',
      'HTML5',
      'CSS3',
      'WebP',
      'Netlify'
    ],

    features: [
      'Diseño responsive para escritorio, tabletas y móviles.',
      'Presentación de servicios y precios demostrativos.',
      'Galería interactiva con lightbox y navegación por teclado.',
      'Formulario de solicitud de citas con validaciones.',
      'Selección de servicio, fecha y horario según días de atención.',
      'Vista previa del mensaje de reserva, sin envío real.',
      'Animaciones de entrada con Intersection Observer.',
      'Imágenes WebP, mejoras de accesibilidad y metadatos SEO.'
    ],

    architecture: [
      'Visitante / navegador',
      'Aplicación Angular standalone',
      'Componentes de interfaz y formulario',
      'Validación y preparación de solicitud (cliente)',
      'Sitio estático desplegado en Netlify'
    ],

    challenges: [
      'Diseñar una interfaz consistente y adaptable a diferentes tamaños de pantalla.',
      'Construir un lightbox accesible y navegable por teclado.',
      'Validar fechas y horarios sin simular disponibilidad real.',
      'Optimizar fotografías para reducir el peso de descarga.',
      'Resolver conflictos entre animaciones de entrada y estilos de componentes.'
    ],

    learnings: [
      'Organización de una aplicación Angular con componentes standalone.',
      'Diseño responsive y microinteracciones en CSS.',
      'Accesibilidad en navegación, formularios y ventanas modales.',
      'Optimización de imágenes y compilación de producción.',
      'Publicación y mantenimiento de sitios estáticos en Netlify.'
    ],

    gallery: [],
    demo: 'https://urbancut-barber-studio.netlify.app/',
    confidential: false,
    professional: false
  },

  // ============================================================
  // SISTEMA DE GESTIÓN DE INCIDENTES
  // ============================================================
  {
    id: 'incidentes',
    title: 'Sistema de Gestión de Incidentes',
    category: 'Aplicación empresarial',
    type: 'empresarial',

    shortDescription:
      'Sistema web para gestionar incidentes, mantenimientos, estados, usuarios y permisos.',

    fullDescription:
      'Aplicación desarrollada con ASP.NET Core MVC para centralizar el registro, seguimiento y administración de incidentes técnicos. El sistema permite gestionar usuarios, roles, categorías, servicios, estados, mantenimientos e historial de cambios.',

    image: '/assets/images/projects/confidencial.png',

    technologies: [
      'ASP.NET Core MVC',
      'C#',
      'SQL Server',
      'Entity Framework Core',
      'Bootstrap',
      'HTML',
      'CSS'
    ],

    features: [
      'Inicio de sesión y autenticación de usuarios.',
      'Administración de roles y permisos.',
      'Creación y seguimiento de incidentes.',
      'Cambio de estado mediante historial.',
      'Gestión de categorías y servicios.',
      'Registro de mantenimientos.',
      'Operaciones CRUD.',
      'Validación de formularios.'
    ],

    architecture: [
      'Usuario',
      'Aplicación ASP.NET Core MVC',
      'Entity Framework Core',
      'SQL Server'
    ],

    challenges: [
      'Implementar permisos mediante claims.',
      'Mantener sincronizado el estado actual con el historial.',
      'Gestionar relaciones entre incidentes, usuarios y servicios.',
      'Proteger las funcionalidades según el rol del usuario.'
    ],

    learnings: [
      'Autenticación y autorización en ASP.NET Core.',
      'Diseño de bases de datos relacionales.',
      'Uso de Entity Framework Core.',
      'Creación de módulos administrativos.',
      'Validación y manejo de errores.'
    ],

    gallery: [],
    confidential: true,
    professional: true
  },

  // ============================================================
  // FALLAPP
  // ============================================================
  {
    id: 'fallapp',
    title: 'FallApp',
    category: 'Aplicación institucional',
    type: 'empresarial',

    shortDescription:
      'Portal web para registrar fallas y crear casos automáticamente en Aranda Service Management.',

    fullDescription:
      'FallApp permite que los usuarios registren fallas relacionadas con aplicaciones institucionales. Cada reporte se almacena localmente y posteriormente se envía hacia una API encargada de crear el caso en Aranda Service Management.',

    image: '/assets/images/projects/confidencial.png',

    technologies: [
      'ASP.NET Core MVC',
      'C#',
      'SQL Server',
      'Entity Framework Core',
      'Bootstrap',
      'Serilog',
      'IIS',
      'REST API'
    ],

    features: [
      'Registro de reportes de fallas.',
      'Selección de aplicación y tipo de problema.',
      'Almacenamiento local de reportes.',
      'Envío de casos hacia Aranda.',
      'Reintento de reportes no enviados.',
      'Panel administrativo.',
      'Gestión de usuarios y aplicaciones.',
      'Registro de errores mediante Serilog.'
    ],

    architecture: [
      'Usuario',
      'FallApp MVC',
      'Base de datos SQL Server',
      'API de integración',
      'Aranda ASMS'
    ],

    challenges: [
      'Garantizar que los reportes no se pierdan cuando la API falle.',
      'Implementar reintentos de envío.',
      'Registrar respuestas y errores de Aranda.',
      'Publicar correctamente la aplicación en IIS.'
    ],

    learnings: [
      'Integración entre aplicaciones.',
      'Manejo de errores externos.',
      'Registro de logs con Serilog.',
      'Publicación en IIS.',
      'Diseño de flujos con tolerancia a fallos.'
    ],

    gallery: [],
    confidential: true,
    professional: true
  },

  // ============================================================
  // INTEGRACIÓN ARANDA ASMS
  // ============================================================
  {
    id: 'asms',
    title: 'Integración Aranda ASMS',
    category: 'Integración de sistemas',
    type: 'integracion',

    shortDescription:
      'Servicio encargado de crear casos automáticamente en Aranda Service Management v9.',

    fullDescription:
      'Integración desarrollada mediante ASP.NET Core Web API para enviar información desde aplicaciones internas hacia Aranda Service Management. El servicio construye payloads JSON, valida información y procesa las respuestas de la plataforma.',

    image: '/assets/images/projects/confidencial.png',

    technologies: [
      'ASP.NET Core Web API',
      'C#',
      'HttpClient',
      'REST API',
      'JSON',
      'Swagger',
      'Aranda ASMS'
    ],

    features: [
      'Creación automática de casos.',
      'Consulta de datos del solicitante.',
      'Envío de unidad y grupo responsable.',
      'Envío de campos adicionales.',
      'Procesamiento de respuestas HTTP.',
      'Validación de errores de negocio.',
      'Pruebas desde Swagger.'
    ],

    architecture: [
      'Aplicación cliente',
      'API de integración',
      'HttpClient',
      'API Aranda ASMS',
      'Caso creado'
    ],

    challenges: [
      'Construir correctamente el payload requerido por Aranda.',
      'Resolver errores de especialistas y usuarios.',
      'Relacionar catálogos y campos adicionales.',
      'Interpretar respuestas HTTP y mensajes de negocio.'
    ],

    learnings: [
      'Consumo avanzado de APIs REST.',
      'Construcción de payloads JSON.',
      'Uso de HttpClient.',
      'Pruebas de servicios con Swagger.',
      'Diagnóstico de integraciones empresariales.'
    ],

    gallery: [],
    confidential: true,
    professional: true
  },

  // ============================================================
  // SISTEMA DE VENTAS E INVENTARIO
  // ============================================================
  {
    id: 'ventas',
    title: 'Sistema de Ventas e Inventario',
    category: 'Aplicación Full Stack',
    type: 'full-stack',

    shortDescription:
      'Sistema web para gestionar ventas, compras, inventario, productos, clientes y proveedores.',

    fullDescription:
      'Aplicación Full Stack desarrollada con Angular y ASP.NET Core Web API. El sistema permite administrar procesos de ventas, compras, inventario, clientes, productos, proveedores y métodos de pago.',

    image: '/assets/images/ventas/ImagenPrincipalVentas.png',

    technologies: [
      'Angular',
      'TypeScript',
      'ASP.NET Core Web API',
      'C#',
      'SQL Server',
      'JWT',
      'Bootstrap'
    ],

    features: [
      'Inicio de sesión con JWT.',
      'Administración de usuarios y roles.',
      'Gestión de productos y categorías.',
      'Registro de clientes y proveedores.',
      'Proceso de compras.',
      'Proceso de ventas.',
      'Movimientos de inventario.',
      'Ajustes de existencias.',
      'Panel principal con indicadores.'
    ],

    architecture: [
      'Frontend Angular',
      'ASP.NET Core Web API',
      'Autenticación JWT',
      'SQL Server'
    ],

    challenges: [
      'Implementar autenticación JWT.',
      'Sincronizar frontend y backend.',
      'Gestionar movimientos de inventario.',
      'Manejar errores HTTP y autorización.',
      'Configurar rutas y navegación en Angular.'
    ],

    learnings: [
      'Desarrollo Full Stack.',
      'Angular y componentes standalone.',
      'APIs REST con ASP.NET Core.',
      'Autenticación con JWT.',
      'Gestión de inventario.'
    ],

    gallery: [
      '/assets/images/ventas/ImagenUsuarios.png',
      '/assets/images/ventas/ImagenCategoria.png',
      '/assets/images/ventas/ImagenVendedor.png',
      '/assets/images/ventas/ImagenCajasArqueo.png'
    ],

    confidential: false,
    professional: false
  },

  // ============================================================
  // MONITOR DE EVENTOS PRTG
  // ============================================================
  {
    id: 'prtg',
    title: 'Monitor de Eventos PRTG',
    category: 'Monitoreo y procesamiento de datos',
    type: 'datos',

    shortDescription:
      'Aplicación para importar, consultar y administrar grandes volúmenes de eventos generados por PRTG.',

    fullDescription:
      'Sistema web desarrollado para procesar archivos CSV provenientes de diferentes servidores PRTG. La solución permite importar registros, consultar eventos, revisar historiales de carga y eliminar información por lote.',

    image: '/assets/images/fallapp/confidencial.png',

    technologies: [
      'ASP.NET Core MVC',
      'C#',
      'SQL Server',
      'CsvHelper',
      'PRTG',
      'Power BI',
      'SQL Server Jobs'
    ],

    features: [
      'Carga de archivos CSV.',
      'Procesamiento de grandes volúmenes de datos.',
      'Separación de registros por origen.',
      'Historial de cargas.',
      'Paginación de eventos.',
      'Eliminación por BatchId.',
      'Preparación de datos para Power BI.',
      'Automatización con SQL Server Jobs.'
    ],

    architecture: [
      'Archivos CSV de PRTG',
      'Aplicación ASP.NET Core MVC',
      'Procesamiento con CsvHelper',
      'SQL Server',
      'Power BI'
    ],

    challenges: [
      'Procesar archivos de gran tamaño.',
      'Evitar bloqueos durante la carga.',
      'Manejar diferentes delimitadores y formatos.',
      'Optimizar consultas sobre millones de registros.',
      'Automatizar procesos diarios.'
    ],

    learnings: [
      'Procesamiento de archivos CSV.',
      'Optimización de consultas SQL.',
      'Manejo de grandes volúmenes de información.',
      'Uso de SQL Server Jobs.',
      'Integración con Power BI.'
    ],

    gallery: [],
    confidential: true,
    professional: true
  }

];
