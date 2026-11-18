import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WEB_PLANS } from '../../data/service-offering';
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  readonly plans = WEB_PLANS;
  readonly services = [
    {
      title: 'Páginas web profesionales',
      description: 'Presencia digital para negocios, comercios y profesionales independientes.',
      scope:
        'Sitios responsive, información de contacto, galerías y catálogos digitales de productos o servicios.',
    },
    {
      title: 'Aplicaciones web',
      description: 'Herramientas para consultar y gestionar información desde el navegador.',
      scope: 'Interfaces Angular, formularios y funcionalidades acordadas para cada proceso.',
    },
    {
      title: 'Sistemas de administración',
      description: 'Aplicaciones internas adaptadas a las tareas de su negocio.',
      scope: 'Usuarios, permisos, registros, consultas y reportes según los requerimientos.',
    },
    {
      title: 'APIs REST con ASP.NET Core',
      description: 'Servicios para comunicar aplicaciones e intercambiar información.',
      scope: 'Endpoints, validaciones, documentación y manejo de errores.',
    },
    {
      title: 'Integración entre aplicaciones',
      description: 'Conexión de sistemas que necesitan compartir datos.',
      scope: 'Consumo de APIs y procesamiento de solicitudes conforme a los accesos disponibles.',
    },
    {
      title: 'Bases de datos SQL Server',
      description: 'Organización y consulta de información para aplicaciones.',
      scope: 'Tablas, relaciones, consultas y procedimientos según el alcance del proyecto.',
    },
    {
      title: 'Mantenimiento y mejoras',
      description: 'Revisión y evolución de aplicaciones existentes.',
      scope: 'Análisis del código disponible, corrección de errores y mejoras acordadas.',
    },
    {
      title: 'Digitalización y automatización',
      description: 'Software para facilitar tareas de registro y procesamiento de información.',
      scope: 'Flujos administrativos, procesamiento de archivos y generación de reportes.',
    },
  ];
  readonly process = [
    {
      title: 'Conversamos sobre la necesidad',
      description:
        'Revisamos el proceso actual, los objetivos y las personas que utilizarán la solución.',
    },
    {
      title: 'Definimos el alcance',
      description:
        'Acordamos funcionalidades, entregables, precio y tiempo estimado antes de iniciar.',
    },
    {
      title: 'Desarrollamos y revisamos',
      description:
        'Construyo la solución y validamos su comportamiento mediante revisiones y pruebas.',
    },
    {
      title: 'Aprobamos y publicamos',
      description:
        'Tras la aprobación, se realiza la configuración y publicación acordada para el proyecto.',
    },
  ];
}
