import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Skill {
  name: string;
  description: string;
  level: 'Principal' | 'Intermedio' | 'Complementario';
}

interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  skills: Skill[];
}

interface ProfessionalStrength {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills {
  readonly categories: SkillCategory[] = [
    {
      id: 'frontend',
      title: 'Frontend',
      subtitle:
        'Construcción de interfaces web modernas, responsivas y orientadas a la experiencia del usuario.',
      icon: '</>',
      skills: [
        {
          name: 'Angular',
          description:
            'Componentes standalone, rutas, formularios reactivos y consumo de APIs.',
          level: 'Principal'
        },
        {
          name: 'TypeScript',
          description:
            'Tipado estático, interfaces, modelos y lógica para aplicaciones Angular.',
          level: 'Principal'
        },
        {
          name: 'HTML5',
          description:
            'Estructuras semánticas, accesibilidad básica y organización de contenido.',
          level: 'Principal'
        },
        {
          name: 'CSS3',
          description:
            'Diseños responsivos, Grid, Flexbox, animaciones y estilos reutilizables.',
          level: 'Principal'
        },
        {
          name: 'Bootstrap',
          description:
            'Interfaces adaptables, formularios, componentes y estructuras administrativas.',
          level: 'Intermedio'
        },
        {
          name: 'JavaScript',
          description:
            'Manipulación de datos, eventos y lógica para interfaces web.',
          level: 'Intermedio'
        }
      ]
    },
    {
      id: 'backend',
      title: 'Backend',
      subtitle:
        'Desarrollo de aplicaciones, servicios y APIs utilizando el ecosistema .NET.',
      icon: '{ }',
      skills: [
        {
          name: 'C#',
          description:
            'Desarrollo orientado a objetos, servicios, controladores y lógica de negocio.',
          level: 'Principal'
        },
        {
          name: 'ASP.NET Core MVC',
          description:
            'Aplicaciones empresariales con controladores, vistas, modelos y autenticación.',
          level: 'Principal'
        },
        {
          name: 'ASP.NET Core Web API',
          description:
            'Creación de endpoints REST, validación, DTO y respuestas HTTP.',
          level: 'Principal'
        },
        {
          name: 'Entity Framework Core',
          description:
            'Acceso a datos, relaciones, consultas y persistencia en SQL Server.',
          level: 'Intermedio'
        },
        {
          name: 'REST API',
          description:
            'Diseño, integración y consumo de servicios entre aplicaciones.',
          level: 'Principal'
        },
        {
          name: 'JWT',
          description:
            'Autenticación y autorización basada en tokens y roles.',
          level: 'Intermedio'
        }
      ]
    },
    {
      id: 'database',
      title: 'Bases de datos',
      subtitle:
        'Modelado, consulta y administración de información para aplicaciones empresariales.',
      icon: 'DB',
      skills: [
        {
          name: 'SQL Server',
          description:
            'Diseño de tablas, relaciones, consultas y administración de bases de datos.',
          level: 'Principal'
        },
        {
          name: 'T-SQL',
          description:
            'Consultas, filtros, agrupaciones, procedimientos y operaciones transaccionales.',
          level: 'Principal'
        },
        {
          name: 'Procedimientos almacenados',
          description:
            'Implementación de procesos de compras, ventas e inventario.',
          level: 'Intermedio'
        },
        {
          name: 'SQL Server Jobs',
          description:
            'Automatización de procesos periódicos y cargas programadas.',
          level: 'Intermedio'
        },
        {
          name: 'Modelado relacional',
          description:
            'Diseño de entidades, claves, relaciones y normalización de datos.',
          level: 'Principal'
        },
        {
          name: 'Optimización de consultas',
          description:
            'Mejora de consultas para trabajar con volúmenes elevados de registros.',
          level: 'Intermedio'
        }
      ]
    },
    {
      id: 'integrations',
      title: 'Integraciones y APIs',
      subtitle:
        'Conexión de sistemas internos con plataformas y servicios empresariales.',
      icon: 'API',
      skills: [
        {
          name: 'HttpClient',
          description:
            'Consumo de servicios externos desde aplicaciones ASP.NET Core.',
          level: 'Principal'
        },
        {
          name: 'JSON',
          description:
            'Construcción, validación y procesamiento de payloads de integración.',
          level: 'Principal'
        },
        {
          name: 'Swagger',
          description:
            'Documentación y pruebas de endpoints en APIs REST.',
          level: 'Principal'
        },
        {
          name: 'Postman',
          description:
            'Pruebas de solicitudes, encabezados, cuerpos JSON y respuestas HTTP.',
          level: 'Intermedio'
        },
        {
          name: 'Aranda ASMS',
          description:
            'Integración para la creación automática de casos de servicio.',
          level: 'Intermedio'
        },
        {
          name: 'Manejo de errores HTTP',
          description:
            'Diagnóstico de respuestas, validación y reintentos ante fallos externos.',
          level: 'Principal'
        }
      ]
    },
    {
      id: 'infrastructure',
      title: 'Infraestructura y soporte',
      subtitle:
        'Publicación, diagnóstico y mantenimiento de aplicaciones en entornos Windows.',
      icon: 'TI',
      skills: [
        {
          name: 'IIS',
          description:
            'Publicación y configuración de aplicaciones ASP.NET Core.',
          level: 'Principal'
        },
        {
          name: 'Windows Server',
          description:
            'Configuración básica de servicios, permisos y aplicaciones web.',
          level: 'Intermedio'
        },
        {
          name: 'Soporte técnico',
          description:
            'Atención de incidentes, diagnóstico y acompañamiento a usuarios.',
          level: 'Principal'
        },
        {
          name: 'PRTG',
          description:
            'Procesamiento y consulta de eventos provenientes de herramientas de monitoreo.',
          level: 'Intermedio'
        },
        {
          name: 'Serilog',
          description:
            'Registro de eventos, errores y trazabilidad en aplicaciones .NET.',
          level: 'Intermedio'
        },
        {
          name: 'Permisos de archivos',
          description:
            'Configuración de lectura, escritura y movimiento de archivos en servidores.',
          level: 'Intermedio'
        }
      ]
    },
    {
      id: 'tools',
      title: 'Herramientas',
      subtitle:
        'Tecnologías utilizadas durante el desarrollo, prueba y documentación de soluciones.',
      icon: 'DEV',
      skills: [
        {
          name: 'Git',
          description:
            'Control de versiones y seguimiento de cambios en proyectos.',
          level: 'Intermedio'
        },
        {
          name: 'Visual Studio',
          description:
            'Desarrollo y depuración de aplicaciones ASP.NET Core y C#.',
          level: 'Principal'
        },
        {
          name: 'Visual Studio Code',
          description:
            'Desarrollo de aplicaciones Angular, TypeScript, HTML y CSS.',
          level: 'Principal'
        },
        {
          name: 'Power BI',
          description:
            'Consulta y visualización de datos procedentes de SQL Server.',
          level: 'Intermedio'
        },
        {
          name: 'CsvHelper',
          description:
            'Procesamiento de archivos CSV con diferentes formatos y delimitadores.',
          level: 'Intermedio'
        },
        {
          name: 'Microsoft Office',
          description:
            'Documentación técnica, hojas de cálculo y presentaciones.',
          level: 'Principal'
        }
      ]
    }
  ];

  readonly strengths: ProfessionalStrength[] = [
    {
      title: 'Resolución de problemas',
      description:
        'Análisis de errores técnicos y búsqueda de soluciones mediante pruebas y diagnóstico.',
      icon: '01'
    },
    {
      title: 'Aprendizaje continuo',
      description:
        'Capacidad para investigar tecnologías nuevas y aplicarlas en proyectos reales.',
      icon: '02'
    },
    {
      title: 'Trabajo organizado',
      description:
        'Estructuración de funcionalidades, documentación y seguimiento de procesos.',
      icon: '03'
    },
    {
      title: 'Orientación al usuario',
      description:
        'Comprensión de necesidades y creación de soluciones claras y funcionales.',
      icon: '04'
    }
  ];

  readonly totalSkills = this.categories.reduce(
    (total, category) => total + category.skills.length,
    0
  );

  trackCategory(
    _index: number,
    category: SkillCategory
  ): string {
    return category.id;
  }

  trackSkill(
    _index: number,
    skill: Skill
  ): string {
    return skill.name;
  }
}