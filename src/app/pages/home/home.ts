import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {

  readonly technologies = [
    'Angular',
    'TypeScript',
    'ASP.NET Core',
    'C#',
    'SQL Server',
    'REST API',
    'IIS',
    'Git'
  ];

  readonly statistics = [
    {
      value: '+5',
      label: 'Proyectos desarrollados'
    },
    {
      value: '+1 año',
      label: 'Experiencia profesional'
    },
    {
      value: 'Full Stack',
      label: 'Desarrollo web'
    }
  ];

  readonly services = [
    {
      number: '01',
      title: 'Páginas web',
      description:
        'Sitios modernos, profesionales y adaptados a celulares, tablets y computadoras.',
      technologies: [
        'Responsive',
        'WhatsApp',
        'SEO'
      ]
    },
    {
      number: '02',
      title: 'Sistemas web',
      description:
        'Aplicaciones personalizadas para administrar información y digitalizar procesos.',
      technologies: [
        'Angular',
        'ASP.NET Core',
        'SQL Server'
      ]
    },
    {
      number: '03',
      title: 'APIs e integraciones',
      description:
        'Integración entre aplicaciones, servicios y plataformas para automatizar procesos.',
      technologies: [
        'REST API',
        '.NET',
        'Integraciones'
      ]
    }
  ];
}