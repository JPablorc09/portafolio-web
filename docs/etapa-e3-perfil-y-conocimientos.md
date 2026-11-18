# E3: perfil, formación, experiencia y conocimientos

Fecha: 26 de octubre de 2026. Implementación local de la etapa autorizada; sin publicación ni cambios remotos.

## Resultado

- About: presentación profesional, formación UAM 2024, experiencia mediante Grupo Alega, acceso al CV y objetivos laborales. Diseño editorial con ficha lateral que pasa a una columna en móvil.
- Education: trayectoria académica separada del aprendizaje aplicado. CCNA 1: Introducción a Redes figura como curso introductorio completado de Cisco Networking Academy, confirmado expresamente por el propietario durante E3. No se atribuye la certificación CCNA completa ni se inventa fecha de finalización.
- Experience: un único periodo contractual agosto de 2025–julio de 2026. Grupo Alega Costa Rica aparece como empresa contratante y Poder Judicial como institución donde se prestaron los servicios. Responsabilidades generales de desarrollo, integraciones, datos, publicación y documentación; cuatro enlaces a resúmenes institucionales ya existentes. Sin métricas inventadas ni soporte generalizado a usuarios.
- Skills: siete áreas con etiquetas de uso profesional, proyectos y práctica, o aprendizaje. Las etiquetas indican contexto, no una medición del dominio. Los detalles nativos permiten ampliar el alcance de cada conocimiento con teclado.
- IA: sección con el estado «Actualmente en formación y práctica», tareas de aprendizaje con Codex CLI, revisión humana, pruebas y protección de información confidencial. Acceso directo desde Inicio y las páginas de perfil.
- Anclas: navegación a secciones mediante RouterLink y desplazamiento a fragmentos con la opción nativa del router Angular. Se conserva la arquitectura standalone, las rutas y la carga diferida.

## Decisiones editoriales

El uso profesional se reserva a tecnologías y actividades confirmadas en la experiencia suministrada. Herramientas generales, frontend y desarrollo móvil se agrupan como proyectos y práctica cuando no está confirmado su uso profesional. Clean Architecture y MVVM se presentan como fundamentos en aprendizaje. La exploración móvil con Angular se describe de forma general hasta precisar el framework; no se reincorporan los proyectos retirados de control financiero ni incidentes personales.

Se agruparon tecnologías relacionadas para reducir la saturación. No se añadieron certificaciones, porcentajes de dominio, servicios comerciales de agentes autónomos, bibliotecas ni imágenes nuevas. Se mantienen los límites de confidencialidad institucional.

## Archivos de esta etapa

- `src/app/data/professional-profile.ts`: datos compartidos de identidad y contrato.
- `src/app/pages/about/about.ts`, `about.html`, `about.css`, `about.spec.ts`.
- `src/app/pages/education/education.ts`, `education.html`, `education.css`, `education.spec.ts`.
- `src/app/pages/experience/experience.ts`, `experience.html`, `experience.css`, `experience.spec.ts`.
- `src/app/pages/skills/skills.ts`, `skills.html`, `skills.css`, `skills.spec.ts`.
- `src/styles.css`: patrones compartidos limitados a las páginas de perfil.
- `src/app/app.config.ts`: desplazamiento a fragmentos.
- `src/app/pages/home/home.html`: acceso directo al aprendizaje de IA.
- Este informe y `docs/revision-e3/`: evidencia de revisión local.

Los demás cambios que aparecen en el árbol de trabajo pertenecen a etapas previas; no se han revertido ni publicado.

## Validación realizada

- `npm run build`: correcto; ocho rutas prerenderizadas. Bundle inicial estimado de transferencia: 81,82 kB. No constituye una medición de Core Web Vitals.
- `npm test -- --watch=false --reporters=dot`: 36 pruebas correctas en 13 archivos. Incluye nuevas comprobaciones del curso completado, la empresa contratante y los contextos de conocimientos.
- Chrome local sobre el build de producción: cuatro rutas (`/sobre-mi`, `/formacion`, `/experiencia`, `/habilidades`) a 320, 390, 768, 1024 y 1440 px. Veinte combinaciones sin desbordamiento horizontal; un main y un h1 por página.
- Apertura y cierre de detalles mediante Enter, foco real en summary y desplazamiento al fragmento de IA: correctos.
- Enlace de descarga del CV: HTTP 200. SHA256 conservado: `90afb7f14c0b121bc5caa67333ae468275a909e728f00c0c00ea4f28ded781ad`.
- Sin excepciones de ejecución ni entradas de error de consola registradas en el recorrido probado. Capturas y resultados en `docs/revision-e3/`.
- `git diff --check`: correcto; Git muestra avisos de normalización LF/CRLF, sin errores de espacios.

## Pendientes y límites

Persiste el aviso anterior del CSS de Contacto: 15,90 kB frente al presupuesto de 14 kB. Su rediseño corresponde a E4 y no se aumentó el presupuesto para ocultarlo. La revisión realizada no equivale a una auditoría completa de WCAG, dispositivos reales o Core Web Vitals. El SEO, la estrategia de rutas de detalle y las optimizaciones generales permanecen en sus etapas previstas.

El CV no se modificó. No se ejecutaron push, despliegues ni cambios en Netlify. E4 (servicios y contacto) queda pendiente de autorización del propietario conforme al plan aprobado.
