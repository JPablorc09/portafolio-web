# Etapa B: perfil, experiencia y formación

## Presentación profesional

Ingeniero de Sistemas | Desarrollador Full Stack .NET y Angular.

El perfil identifica el grado de Bachiller en Ingeniería de Sistemas de la
Universidad Americana (UAM), obtenido en 2024. Distingue las actividades
profesionales de desarrollo e integración de sistemas de los proyectos
personales con Angular. Codex se presenta como formación y práctica con
validación humana, sin certificaciones ni dominio experto de IA.

## Experiencia

Periodo: agosto de 2025 a julio de 2026. Empresa contratante: Grupo Alega
Costa Rica. Institución donde se prestaron los servicios: Poder Judicial
de Costa Rica. Se describen desarrollo y mantenimiento de aplicaciones,
APIs REST, SQL Server, Entity Framework Core, Aranda ASMS, información de
PRTG, registro y envío de incidencias, publicación en IIS y documentación.

Se sustituyeron las referencias a atención generalizada de usuarios y los
contadores de antigüedad por información confirmada. En la página de
Experiencia se eliminaron las afirmaciones cuantitativas sobre millones
de registros. El catálogo de proyectos se revisará en la etapa C.

## Archivos de esta etapa

- `src/app/pages/home/home.ts` y `home.html`.
- `src/app/pages/about/about.ts` y `about.html`.
- `src/app/pages/experience/experience.ts` y `experience.html`.
- `src/app/pages/education/education.ts` y `education.html`.
- `src/app/pages/skills/skills.ts` y `skills.html`: coherencia del perfil;
  la clasificación completa por contexto de uso queda para otra etapa.
- `src/app/pages/contact/contact.ts`.
- `src/app/shared/navbar/navbar.html`.
- `src/app/shared/footer/footer.html`.
- Este informe.

## Validación

- `npm run build`: aprobado, con ocho rutas prerenderizadas.
- `npm test -- --watch=false`: nueve archivos y once pruebas aprobados.
- Se inspeccionó el HTML generado de las ocho páginas generales y se
  comprobaron las referencias actualizadas a Grupo Alega, fechas, UAM,
  graduación en 2024 y aprendizaje de Codex donde corresponde.
- El PDF del CV mantiene su SHA256:
  `90afb7f14c0b121bc5caa67333ae468275a909e728f00c0c00ea4f28ded781ad`.
- No se modificaron rutas, estilos, dependencias ni el repositorio remoto
  durante esta etapa. No se desplegó.

## Pendientes

- Confirmación del curso CCNA 1 que ya figuraba como completado. Se conserva
  el contenido previo hasta recibir respuesta; no se ha verificado su respaldo.
- Advertencia previa de CSS de Contacto: 15,90 kB frente a 14 kB.
- Revisión visual responsive del texto más extenso en la etapa de diseño.
- Validación del catálogo y de sus afirmaciones técnicas en la etapa C.
