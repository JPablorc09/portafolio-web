import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
type Context = 'professional' | 'practice' | 'learning';
interface Skill { name: string; context: Context; description: string; }
interface Category { id: string; title: string; skills: Skill[]; }
const items = (context: Context, names: string[], description: string): Skill[] => names.map(name => ({ name, context, description }));
@Component({ selector: 'app-skills', standalone: true, imports: [RouterLink], templateUrl: './skills.html', styleUrl: './skills.css' })
export class Skills {
  readonly labels: Record<Context, string> = { professional: 'Uso profesional', practice: 'Proyectos y práctica', learning: 'En aprendizaje' };
  readonly categories: Category[] = [
    { id: 'frontend', title: 'Frontend', skills: items('practice', ['Angular y componentes standalone', 'TypeScript y JavaScript', 'HTML5 y CSS3', 'Bootstrap y diseño responsive', 'Integración con APIs REST'], 'Aplicación en proyectos personales, interfaces web y práctica de desarrollo.') },
    { id: 'backend', title: 'Backend', skills: [...items('professional', ['C# y ASP.NET Core MVC', 'ASP.NET Core Web API', 'Entity Framework Core', 'APIs REST e integración entre sistemas'], 'Utilizado en desarrollo y mantenimiento de aplicaciones empresariales e integraciones.'), ...items('practice', ['Autenticación JWT', 'Swagger / OpenAPI'], 'Aplicación y práctica en proyectos de desarrollo de APIs.')] },
    { id: 'datos', title: 'Bases de datos', skills: [...items('professional', ['SQL Server', 'T-SQL y consultas SQL', 'Persistencia con Entity Framework Core'], 'Trabajo con información de aplicaciones, consultas y mantenimiento de datos.'), ...items('practice', ['Procedimientos almacenados', 'Diseño de tablas y relaciones', 'SQLite local'], 'Práctica en proyectos personales, formación y aplicaciones con persistencia de datos.')] },
    { id: 'arquitectura', title: 'Arquitectura y desarrollo', skills: [...items('professional', ['Patrón MVC', 'Programación orientada a objetos', 'Manejo de errores y validaciones', 'Integración de servicios'], 'Aplicado al desarrollo, mantenimiento e integración de aplicaciones.'), ...items('practice', ['Arquitectura por capas'], 'Organización de responsabilidades en proyectos y ejercicios.'), ...items('learning', ['Fundamentos de Clean Architecture', 'Fundamentos de MVVM'], 'Estudio y práctica de fundamentos; aprendizaje en curso.')] },
    { id: 'movil', title: 'Desarrollo móvil', skills: [...items('practice', ['React Native y Expo', 'TypeScript y Expo Router', 'SQLite e integración de APIs', 'Reproducción de audio'], 'Proyectos personales y pruebas de desarrollo móvil, incluida RadioMusicalApp.'), ...items('learning', ['Exploración móvil con Angular'], 'Aprendizaje y experimentación; sin atribuir experiencia profesional.')] },
    { id: 'herramientas', title: 'Herramientas e infraestructura', skills: [...items('professional', ['IIS'], 'Publicación y configuración de aplicaciones ASP.NET Core.'), ...items('practice', ['Visual Studio y Visual Studio Code', 'Git y GitHub', 'Netlify y Cloudflare Pages', 'Postman y Swagger', 'SQL Server Management Studio'], 'Herramientas utilizadas en proyectos, documentación, publicación y práctica técnica.')] },
    { id: 'integraciones', title: 'Monitoreo e integraciones', skills: items('professional', ['Información procedente de PRTG', 'Aranda ASMS y APIs empresariales', 'Procesamiento de archivos CSV', 'Automatización de reportes'], 'Trabajo con datos de monitoreo, registro de incidencias e integración entre aplicaciones.') },
  ];
  readonly aiTasks = ['Análisis de proyectos existentes', 'Planificación de funcionalidades', 'Generación y revisión de código asistida', 'Identificación de errores y depuración', 'Refactorización y documentación técnica', 'Pruebas, validación y exploración de automatizaciones'];
}
