import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFESSIONAL_PROFILE } from '../../data/professional-profile';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education {
  readonly profile = PROFESSIONAL_PROFILE;
  readonly educationItems = [
    {
      type: 'Formación universitaria', title: 'Bachillerato en Ingeniería de Sistemas',
      institution: PROFESSIONAL_PROFILE.university, period: 'Graduado en 2024', status: 'Completada',
      description: 'Formación en análisis, diseño y desarrollo de sistemas de información, programación y bases de datos.',
      highlights: ['Programación orientada a objetos y desarrollo de software.', 'Diseño de bases de datos relacionales.', 'Análisis de requerimientos y soluciones orientadas a procesos.'],
    },
    {
      type: 'Formación complementaria', title: 'CCNA 1: Introducción a Redes',
      institution: 'Cisco Networking Academy', period: 'Curso introductorio', status: 'Completado',
      description: 'Curso de fundamentos de redes y conectividad, completado como formación complementaria.',
      highlights: ['Fundamentos de comunicación entre dispositivos.', 'Direccionamiento IP y protocolos de red.', 'Práctica introductoria con switches, routers y Packet Tracer.'],
    },
  ];
  readonly appliedLearning = [
    { title: 'Desarrollo Full Stack', context: 'Proyectos personales y práctica', description: 'Interfaces Angular y TypeScript, APIs ASP.NET Core y persistencia de datos.', technologies: ['Angular', 'TypeScript', 'ASP.NET Core', 'SQL Server'] },
    { title: 'Integraciones y automatización', context: 'Experiencia y aprendizaje aplicado', description: 'Comunicación entre aplicaciones, procesamiento de reportes y manejo de errores.', technologies: ['APIs REST', 'Aranda ASMS', 'CSV', 'IIS'] },
    { title: 'Desarrollo móvil', context: 'Proyectos personales y práctica', description: 'Navegación, reproducción de audio, integración de APIs y persistencia local.', technologies: ['React Native', 'Expo', 'SQLite'] },
    { title: 'Desarrollo asistido por IA', context: 'Actualmente en formación y práctica', description: 'Apoyo de Codex para analizar, planificar, programar y revisar con validación humana.', technologies: ['Codex', 'Revisión de código', 'Pruebas'] },
  ];
}
