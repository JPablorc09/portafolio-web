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

  // ============================================================
  // DATOS DE CONTACTO
  // ============================================================

  readonly email = 'juanparojasc1999@gmail.com';

  readonly phone = '6279-4709';

  readonly whatsappNumber = '50662794709';

  readonly linkedinUrl =
    'https://www.linkedin.com/in/juan-pablo-rojas-contreras-15ab09345/';

  readonly githubUrl =
    'https://github.com/JPablorc09';

  readonly cvUrl =
    '/assets/documents/CV_Juan_Pablo_Rojas_Contreras.pdf';


  // ============================================================
  // WHATSAPP
  // ============================================================

  readonly whatsappMessage =
    'Hola Juan Pablo. Vi su portafolio y estoy interesado(a) en cotizar un proyecto. Me gustaría recibir más información.';

  readonly whatsappUrl =
    `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(
      this.whatsappMessage
    )}`;


  // ============================================================
  // TARJETAS DE CONTACTO
  // ============================================================

  readonly contactCards: ContactCard[] = [

    {
      icon: '@',
      title: 'Correo electrónico',
      value: this.email,
      description:
        'Medio principal para oportunidades laborales, propuestas profesionales y consultas.',
      action: `mailto:${this.email}?subject=Contacto%20desde%20el%20portafolio`,
      actionLabel: 'Enviar correo'
    },

    {
      icon: 'WA',
      title: 'WhatsApp',
      value: this.phone,
      description:
        'Contacto directo para cotizaciones de páginas web, sistemas, integraciones y proyectos.',
      action: this.whatsappUrl,
      actionLabel: 'Escribir por WhatsApp',
      external: true
    },

    {
      icon: 'CR',
      title: 'Ubicación',
      value: 'Costa Rica',
      description:
        'Disponible para oportunidades presenciales, híbridas o remotas.',
      actionLabel: 'Costa Rica'
    },

    {
      icon: 'TI',
      title: 'Área profesional',
      value: 'Tecnología y desarrollo',
      description:
        'Desarrollo web, sistemas empresariales, bases de datos, integraciones y soluciones tecnológicas.',
      action: '/servicios',
      actionLabel: 'Ver servicios'
    }

  ];


  // ============================================================
  // REDES PROFESIONALES
  // ============================================================

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


  // ============================================================
  // APORTE PROFESIONAL
  // ============================================================

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
        'Conexión de aplicaciones mediante APIs REST, intercambio de información y servicios empresariales.',
      technologies: [
        'REST API',
        'HttpClient',
        'Swagger',
        'Aranda ASMS'
      ]
    },

    {
      number: '03',
      title: 'Monitoreo y gestión de incidentes',
      description:
        'Monitoreo de infraestructura mediante PRTG, identificación de afectaciones y gestión de reportes e incidencias mediante integraciones con Aranda.',
      technologies: [
        'PRTG',
        'Aranda',
        'Monitoreo',
        'Gestión de incidentes'
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


  // ============================================================
  // DISPONIBILIDAD
  // ============================================================

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
      label: 'Servicios',
      value: 'Desarrollo web y sistemas'
    },

    {
      label: 'Contacto',
      value: 'Correo o WhatsApp'
    }

  ];


  // ============================================================
  // DESCARGAR CV
  // ============================================================

  downloadCv(): void {

    const link = document.createElement('a');

    link.href = this.cvUrl;

    link.download = 'CV-Juan-Pablo-Rojas-Contreras.pdf';

    link.click();
  }

}