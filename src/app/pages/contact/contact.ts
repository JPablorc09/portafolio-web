import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ContactCard {
  icon: string;
  title: string;
  value: string;
  description: string;
  action?: string;
  actionLabel?: string;
  external?: boolean;
}

interface SocialLink {
  name: string;
  username: string;
  icon: string;
  url: string;
}

interface Contribution {
  number: string;
  title: string;
  description: string;
  technologies: string[];
}

interface AvailabilityItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  /*
   * Reemplace estos enlaces con sus datos reales.
   */
  readonly email = 'juanparojasc1999@gmail.com';

  readonly linkedinUrl =
    'https://www.linkedin.com/in/juan-pablo-rojas-contreras-15ab09345/';

  readonly githubUrl =
    'https://github.com/JPablorc09';

  readonly cvUrl =
    'assets/documents/cv-juan-pablo-rojas.pdf';

  readonly contactCards: ContactCard[] = [
    {
      icon: '@',
      title: 'Correo electrónico',
      value: this.email,
      description:
        'El medio principal para oportunidades laborales, proyectos y consultas profesionales.',
      action: `mailto:${this.email}`,
      actionLabel: 'Enviar correo'
    },
    {
      icon: 'CR',
      title: 'Ubicación',
      value: 'Costa Rica',
      description:
        'Disponible para oportunidades presenciales, híbridas o remotas.',
      actionLabel: 'Ubicación'
    },
    {
      icon: 'TI',
      title: 'Área profesional',
      value: 'Tecnología y desarrollo',
      description:
        'Interés en desarrollo web, soporte técnico, integraciones y sistemas empresariales.',
      actionLabel: 'Perfil profesional'
    },
    {
      icon: 'OK',
      title: 'Disponibilidad',
      value: 'Abierto a oportunidades',
      description:
        'Disponible para conversar sobre puestos, proyectos y colaboraciones profesionales.',
      action: `mailto:${this.email}?subject=Oportunidad%20profesional`,
      actionLabel: 'Contactar'
    }
  ];

  readonly socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      username: 'Conectar profesionalmente',
      icon: 'in',
      url: this.linkedinUrl
    },
    {
      name: 'GitHub',
      username: 'Ver repositorios y código',
      icon: 'GH',
      url: this.githubUrl
    },
    {
      name: 'Correo',
      username: this.email,
      icon: '@',
      url: `mailto:${this.email}`
    }
  ];

  readonly contributions: Contribution[] = [
    {
      number: '01',
      title: 'Desarrollo Full Stack',
      description:
        'Construcción de aplicaciones web completas, desde la interfaz hasta la lógica de negocio y la persistencia de datos.',
      technologies: [
        'Angular',
        'TypeScript',
        'ASP.NET Core',
        'SQL Server'
      ]
    },
    {
      number: '02',
      title: 'Integración de sistemas',
      description:
        'Conexión de aplicaciones mediante APIs REST, procesamiento JSON y servicios empresariales.',
      technologies: [
        'REST API',
        'HttpClient',
        'Swagger',
        'Aranda ASMS'
      ]
    },
    {
      number: '03',
      title: 'Soporte e infraestructura',
      description:
        'Diagnóstico de incidentes, publicación de aplicaciones y atención de necesidades técnicas.',
      technologies: [
        'Soporte técnico',
        'IIS',
        'Windows Server',
        'PRTG'
      ]
    },
    {
      number: '04',
      title: 'Bases de datos',
      description:
        'Diseño de modelos relacionales, consultas, procedimientos y persistencia para aplicaciones empresariales.',
      technologies: [
        'SQL Server',
        'T-SQL',
        'Entity Framework Core'
      ]
    }
  ];

  readonly availability: AvailabilityItem[] = [
    {
      label: 'Modalidad',
      value: 'Presencial, híbrida o remota'
    },
    {
      label: 'Ubicación',
      value: 'Costa Rica'
    },
    {
      label: 'Intereses',
      value: 'Desarrollo, soporte e integraciones'
    },
    {
      label: 'Respuesta',
      value: 'Por correo electrónico'
    }
  ];

  downloadCv(): void {
    const link = document.createElement('a');

    link.href = this.cvUrl;
    link.download = 'CV-Juan-Pablo-Rojas.pdf';
    link.click();
  }
}