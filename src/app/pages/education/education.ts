import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface EducationItem {
  type: string;
  title: string;
  institution: string;
  period: string;
  status: string;
  description: string;
  highlights: string[];
  featured?: boolean;
}

interface LearningArea {
  number: string;
  title: string;
  description: string;
  technologies: string[];
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class Education {
  readonly educationItems: EducationItem[] = [
    {
      type: 'Formación universitaria',
      title: 'Ingeniería de Sistemas',
      institution: 'Universidad Americana',
      period: 'Formación universitaria finalizada',
      status: 'Completada',
      description:
        'Formación enfocada en el análisis, diseño y desarrollo de soluciones tecnológicas, programación, bases de datos, redes y administración de sistemas de información.',
      highlights: [
        'Programación orientada a objetos y desarrollo de software.',
        'Diseño y administración de bases de datos relacionales.',
        'Análisis y levantamiento de requerimientos.',
        'Desarrollo de aplicaciones web y servicios API.',
        'Fundamentos de redes, seguridad y soporte técnico.',
        'Diseño de soluciones orientadas a procesos empresariales.'
      ],
      featured: true
    },
    {
      type: 'Formación en redes',
      title: 'CCNA 1: Introducción a Redes',
      institution: 'Cisco Networking Academy',
      period: 'Formación complementaria',
      status: 'Completada',
      description:
        'Estudio de los fundamentos de redes, comunicación entre dispositivos, direccionamiento, protocolos y configuración básica de infraestructura.',
      highlights: [
        'Modelos OSI y TCP/IP.',
        'Direccionamiento IPv4 e IPv6.',
        'ARP, DHCP e ICMP.',
        'Fundamentos de switches y routers.',
        'Configuración y pruebas mediante Packet Tracer.',
        'Diagnóstico básico de conectividad.'
      ]
    },
    {
      type: 'Aprendizaje aplicado',
      title: 'Desarrollo web Full Stack',
      institution: 'Proyectos académicos y personales',
      period: 'Formación continua',
      status: 'En desarrollo',
      description:
        'Aplicación práctica de conocimientos mediante la creación de sistemas web completos, desde la interfaz y la lógica de negocio hasta la base de datos y publicación.',
      highlights: [
        'Angular y TypeScript para interfaces web.',
        'ASP.NET Core MVC y Web API.',
        'Autenticación mediante roles, permisos y JWT.',
        'Entity Framework Core y SQL Server.',
        'Integración y consumo de servicios REST.',
        'Publicación de aplicaciones mediante IIS.'
      ]
    },
    {
      type: 'Especialización práctica',
      title: 'Integraciones y automatización de procesos',
      institution: 'Experiencia profesional y proyectos',
      period: 'Formación continua',
      status: 'En desarrollo',
      description:
        'Desarrollo de conocimientos relacionados con la integración de sistemas, automatización de tareas y procesamiento de información empresarial.',
      highlights: [
        'Integración con Aranda ASMS.',
        'Creación y validación de payloads JSON.',
        'Procesamiento masivo de archivos CSV.',
        'Automatización mediante SQL Server Jobs.',
        'Registro de errores y trazabilidad con Serilog.',
        'Manejo de reintentos y errores en servicios externos.'
      ]
    }
  ];

  readonly learningAreas: LearningArea[] = [
    {
      number: '01',
      title: 'Desarrollo de software',
      description:
        'Construcción de aplicaciones organizadas, mantenibles y orientadas a resolver necesidades reales.',
      technologies: [
        'C#',
        '.NET',
        'Angular',
        'TypeScript'
      ]
    },
    {
      number: '02',
      title: 'Datos y persistencia',
      description:
        'Diseño de estructuras de datos, consultas y procesos para almacenar información de forma consistente.',
      technologies: [
        'SQL Server',
        'T-SQL',
        'Entity Framework Core'
      ]
    },
    {
      number: '03',
      title: 'Redes e infraestructura',
      description:
        'Comprensión de conectividad, servicios de red, publicación y diagnóstico de aplicaciones.',
      technologies: [
        'CCNA 1',
        'IIS',
        'Windows Server',
        'PRTG'
      ]
    },
    {
      number: '04',
      title: 'Integración de sistemas',
      description:
        'Comunicación entre aplicaciones mediante APIs, estructuras JSON y servicios empresariales.',
      technologies: [
        'REST API',
        'Swagger',
        'HttpClient',
        'Aranda ASMS'
      ]
    }
  ];

  readonly educationCount = this.educationItems.length;
  readonly completedCount = this.educationItems.filter(
    item => item.status === 'Completada'
  ).length;
}