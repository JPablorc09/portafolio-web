import { Project } from '../models/project';

export const PROJECTS: Project[] = [
  {
    id: 'incidentes',
    title: 'Sistema de Gestión de Incidentes',
    category: 'Aplicación empresarial',
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
    gallery: []
  },

  {
    id: 'fallapp',
    title: 'FallApp',
    category: 'Aplicación Institucional',
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
    gallery: []
  },

  {
    id: 'asms',
    title: 'Integración Aranda ASMS',
    category: 'Integración de sistemas',
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
    gallery: []
  },

  {
  id: 'ventas',
  title: 'Sistema de Ventas e Inventario',
  category: 'Aplicación Full Stack',
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
  ]
},

  {
    id: 'prtg',
    title: 'Monitor de Eventos PRTG',
    category: 'Monitoreo y procesamiento de datos',
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
    gallery: []
  }
];