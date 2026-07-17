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
    'Asp.net Core',
    'C#',
    'SQL Server',
    'Rest API',
    'IIS',
    'Git'
  ];
  readonly statistics = [
    {value: '+5', 
      label: 'Proyectos desarrollados'
    },
    {value: '1 año', 
      label: 'Experiencia en soporte'
    },
    {value: 'Full Stack', 
      label: 'Desarrollo web'
    },
  ];
}
