import { Component } from '@angular/core';

interface Technology {
  name: string;
  category: string;
}

interface ProfessionalDetail {
  label: string;
  value: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly technologies: Technology[] = [
    { name: 'Angular', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'HTML5', category: 'Frontend' },
    { name: 'CSS3 / SCSS', category: 'Frontend' },
    { name: 'Bootstrap', category: 'Frontend' },

    { name: 'C#', category: 'Backend' },
    { name: 'ASP.NET Core MVC', category: 'Backend' },
    { name: 'ASP.NET Core Web API', category: 'Backend' },
    { name: 'Entity Framework Core', category: 'Backend' },
    { name: 'REST API', category: 'Backend' },
    { name: 'JWT', category: 'Backend' },

    { name: 'SQL Server', category: 'Base de datos' },
    { name: 'Stored Procedures', category: 'Base de datos' },
    { name: 'LINQ', category: 'Base de datos' },

    { name: 'IIS', category: 'Infraestructura' },
    { name: 'Git', category: 'Herramientas' },
    { name: 'GitHub', category: 'Herramientas' },
    { name: 'Swagger', category: 'Herramientas' },
    { name: 'Postman', category: 'Herramientas' },
    { name: 'Power BI', category: 'Herramientas' },
    { name: 'PRTG', category: 'Monitoreo' },
    { name: 'Aranda ASMS', category: 'Integraciones' }
  ];

  readonly professionalDetails: ProfessionalDetail[] = [
    {
      label: 'Nombre',
      value: 'Juan Pablo Rojas Contreras'
    },
    {
      label: 'Profesión',
      value: 'Ingeniero de Sistemas'
    },
    {
      label: 'Ubicación',
      value: 'Costa Rica'
    },
    {
      label: 'Experiencia',
      value: 'Soporte técnico y desarrollo web'
    },
    {
      label: 'Especialidad',
      value: 'Desarrollo Full Stack'
    },
    {
      label: 'Disponibilidad',
      value: 'Disponible para nuevas oportunidades'
    }
  ];

  readonly strengths = [
    {
      title: 'Desarrollo web',
      description:
        'Construcción de aplicaciones empresariales con Angular, ASP.NET Core y SQL Server.'
    },
    {
      title: 'Integración de sistemas',
      description:
        'Consumo y desarrollo de APIs REST, manejo de JSON, Swagger y comunicación entre aplicaciones.'
    },
    {
      title: 'Soporte técnico',
      description:
        'Diagnóstico de incidentes, atención a usuarios y resolución de problemas de software e infraestructura.'
    },
    {
      title: 'Bases de datos',
      description:
        'Diseño de tablas, consultas SQL, procedimientos almacenados, relaciones y administración de información.'
    }
  ];
}