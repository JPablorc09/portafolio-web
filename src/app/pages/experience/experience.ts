import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ExperienceItem {
  period: string;
  position: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  type: 'laboral' | 'proyecto';
}

interface Highlight {
  value: string;
  label: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience {

  readonly highlights: Highlight[] = [
    {
      value: '1 Año',
      label: 'Experiencia profesional'
    },
    {
      value: '5+',
      label: 'Proyectos desarrollados'
    },
    {
      value: 'Full Stack',
      label: 'Desarrollo Web'
    },
    {
      value: 'SQL + IIS',
      label: 'Infraestructura'
    }
  ];

  readonly experiences: ExperienceItem[] = [

    {
      period: 'Enero 2026 - Julio 2026',
      position: 'Soporte Técnico y Desarrollo de Sistemas',
      company: 'Grupo Alega Costa Rica',
      location: 'Costa Rica',

      description:
        'Responsable del soporte técnico a usuarios, desarrollo de aplicaciones internas, automatización de procesos e integración de sistemas.',

      responsibilities: [

        'Atención y resolución de incidentes técnicos.',

        'Soporte a usuarios y aplicaciones corporativas.',

        'Desarrollo de aplicaciones con ASP.NET Core MVC.',

        'Creación y mantenimiento de APIs REST.',

        'Administración de bases de datos SQL Server.',

        'Publicación de aplicaciones utilizando IIS.',

        'Integración con plataformas empresariales.',

        'Documentación técnica y manuales de usuario.',

        'Automatización de procesos internos.'

      ],

      technologies: [

        'ASP.NET Core',
        'C#',
        'SQL Server',
        'Entity Framework Core',
        'REST API',
        'Swagger',
        'IIS',
        'Git'

      ],

      type: 'laboral'
    },

    {
      period: '2026',

      position: 'FallApp',

      company: 'Proyecto Empresarial',

      location: 'Costa Rica',

      description:
        'Sistema desarrollado para registrar reportes de fallas y crear automáticamente casos en Aranda Service Management.',

      responsibilities: [

        'Diseño de la arquitectura.',

        'Panel administrativo.',

        'Reintentos automáticos.',

        'Integración con API.',

        'Registro mediante Serilog.',

        'Publicación en IIS.'

      ],

      technologies: [

        'ASP.NET Core MVC',

        'SQL Server',

        'Bootstrap',

        'Serilog',

        'Aranda ASMS',

        'IIS'

      ],

      type: 'proyecto'
    },

    {
      period: '2026',

      position: 'Integración Aranda ASMS',

      company: 'Proyecto Empresarial',

      location: 'Costa Rica',

      description:
        'Desarrollo de integración para la creación automática de casos utilizando la API de Aranda Service Management.',

      responsibilities: [

        'Consumo de API REST.',

        'HttpClient.',

        'JSON.',

        'Validaciones.',

        'Swagger.',

        'Manejo de errores.'

      ],

      technologies: [

        'ASP.NET Core',

        'REST API',

        'JSON',

        'Swagger',

        'HttpClient'

      ],

      type: 'proyecto'
    },

    {
      period: '2026',

      position: 'Sistema Monitor PRTG',

      company: 'Proyecto Empresarial',

      location: 'Costa Rica',

      description:
        'Aplicación para importar millones de registros provenientes de PRTG y administrarlos desde SQL Server.',

      responsibilities: [

        'Carga masiva de CSV.',

        'Historial de cargas.',

        'Procesamiento de millones de registros.',

        'Automatización mediante SQL Jobs.',

        'Visualización para Power BI.'

      ],

      technologies: [

        'ASP.NET Core',

        'SQL Server',

        'Power BI',

        'CsvHelper',

        'PRTG'

      ],

      type: 'proyecto'
    }

  ];

}