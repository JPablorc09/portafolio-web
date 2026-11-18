import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFESSIONAL_CONTACT } from '../../data/professional-contact';
import { PROFESSIONAL_PROFILE } from '../../data/professional-profile';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly profile = PROFESSIONAL_PROFILE;
  readonly contact = PROFESSIONAL_CONTACT;
  readonly strengths = [
    { title: 'Aplicaciones empresariales', context: 'Experiencia profesional', description: 'Desarrollo y mantenimiento de sistemas con C#, ASP.NET Core y SQL Server.' },
    { title: 'Integración de sistemas', context: 'Experiencia profesional', description: 'APIs REST, validaciones y manejo de errores para conectar aplicaciones.' },
    { title: 'Desarrollo Full Stack', context: 'Proyectos personales', description: 'Interfaces con Angular y TypeScript, conectadas a servicios ASP.NET Core Web API.' },
    { title: 'Datos y mantenimiento', context: 'Experiencia profesional', description: 'Consultas, persistencia y procesamiento de información de monitoreo y reportes.' },
  ];
}
