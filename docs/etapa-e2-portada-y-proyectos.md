# Etapa E2: portada, catálogo y casos de estudio

## Resultado

Se aplica la composición «Perfil y experiencia» a Inicio, al catálogo y a los
detalles de los nueve proyectos vigentes. Se conservan los IDs, las rutas y la
distinción entre proyectos personales, institucionales y demos comerciales.

### Inicio

- Nombre completo, Costa Rica, enfoque Full Stack .NET/Angular y formación UAM 2024.
- Accesos claros a proyectos, CV y contacto.
- Resumen profesional con Grupo Alega como contratante, servicios para el Poder
  Judicial y periodo agosto de 2025 a julio de 2026.
- Ventas, EscaneaTodo e Incidentes institucionales como destacados, obtenidos del
  mismo catálogo de las fichas para evitar copias desactualizadas.
- Experiencia, servicios, aprendizaje de IA y llamada a cotizar.
- Codex continúa identificado como formación y práctica con validación humana.

La tipografía, los separadores y el espacio sustituyen a los brillos, gradientes,
tarjetas de código decorativas y animaciones de desplazamiento de la portada.
Los datos antes presentados en bloques de estadísticas quedan integrados en
el resumen: stack, periodo profesional y graduación; no se añaden métricas.

### Catálogo y tarjetas

- Filtros de contexto visibles y selector nativo de categoría, con conteos.
- Filtros combinables, resultados anunciados y restablecimiento desde el estado vacío.
- Nueve proyectos completos; la portada solo selecciona tres destacados.
- Tarjetas con contexto, estado, descripción, tres tecnologías y acceso al caso.
  El stack completo continúa disponible en el detalle.
- Tres columnas amplias, dos en anchos intermedios y una en móvil.
- Capturas con proporción reservada y `object-fit: contain`, sin zoom ni recortes.
- Respaldo CSS explícito si una imagen no carga; se reinicia al cambiar de proyecto.
- Los institucionales utilizan un mockup sencillo de confidencialidad mediante
  HTML/CSS y un icono SVG. No descargan las imágenes PNG anteriores para mostrarse.
- RadioMusicalApp conserva su gráfico como material promocional rotulado.

### Casos de estudio y galería

- Encabezado con contexto, estado, título y resumen.
- Demo y repositorio autorizado en el encabezado para facilitar el acceso en móvil.
- Contenido y ficha técnica en dos columnas; una columna en pantallas pequeñas.
- Necesidad, solución, funciones, pendientes, retos, aprendizajes y alcance de
  verificación conservan sus datos actuales y una jerarquía legible.
- Navegación anterior/siguiente y regreso al listado conservados.
- Galería de capturas reales con controles visibles, flechas, Escape y ciclo de foco.
- El contenido del detalle queda `inert` mientras está abierto el visor.
- Al cerrar se restaura el foco al botón que lo abrió y el desplazamiento previo.
  Al cambiar de ruta se libera el bloqueo sin enfocar un elemento del proyecto anterior.
- Se cancelan los temporizadores de foco pendientes para evitar acciones después
  del cierre o cambio de proyecto.
- El respaldo del detalle identifica una imagen fallida como ilustración genérica
  y evita reintentos repetidos si también fallara el archivo de respaldo.

Los proyectos institucionales mantienen únicamente resumen general y mockup
rotulado: no cargan imágenes, no ofrecen galería ni publican enlaces externos
de demo/código o arquitectura interna. Se mantiene la protección aunque el
flag de confidencialidad sea incoherente con el contexto institucional.

## Archivos de esta etapa

- `src/styles.css`: patrones compartidos de enlaces, etiquetas y retícula.
- `src/app/pages/home/home.ts`, `.html`, `.css` y `.spec.ts`.
- `src/app/pages/projects/projects.ts`, `.html`, `.css` y `.spec.ts`.
- `src/app/shared/project-card/project-card.ts`, `.html`, `.css` y `.spec.ts`.
- `src/app/pages/project-detail/project-detail.ts`, `.html`, `.css` y `.spec.ts`.
- `src/app/app.spec.ts`: expectativa de la nueva portada aprobada.
- Este informe y capturas/evidencia en `docs/revision-e2/`.

E2 conserva el catálogo de datos y las tecnologías del proyecto. No añade
dependencias. Se reutilizan componentes standalone y carga diferida.
La portada comparte ProjectCard y los datos del catálogo, sin una capa nueva de
servicios o estado global.

## Verificación

- Compilación de producción correcta; ocho rutas generales prerenderizadas.
- Suite completa: **33 pruebas aprobadas en 13 archivos**.
- Revisión en Chrome con perfil temporal y servidor de producción local:
  Inicio, catálogo y las nueve fichas, **11 rutas** en total.
- Cinco anchos por ruta: **320, 390, 768, 1024 y 1440 px**; **55 combinaciones
  sin desbordamientos horizontales** y un único `main` en cada caso.
- Filtros combinados, estado vacío, restablecimiento y selección móvil de RadioMusicalApp.
- Teclado nativo del navegador en el visor, a 390 y 1440 px: Tab/Shift+Tab,
  flechas y Escape; foco inicial, retorno al disparador, liberación del scroll
  e imagen contenida dentro del viewport.
- Cuatro fichas institucionales sin imágenes, galería ni enlaces externos.
  No se solicitaron recursos `confidencial.png` durante la revisión.
- Material promocional de RadioMusicalApp identificado y sin galería de capturas.
- Respaldo de imagen, IDs retirados y descarga del CV comprobados.
- Sin excepciones JavaScript ni errores de recursos registrados en esa ejecución.
- `git diff --check` sin errores de espacios.

La evidencia de navegador está en `docs/revision-e2/verificacion.json`. Las
capturas incluyen portada, catálogo, detalle y visor en escritorio/móvil y un
detalle institucional. Se inspeccionaron las capturas para comprobar jerarquía,
legibilidad, imágenes completas y controles del visor.

## Pendientes

- Persiste la advertencia previa de CSS de Contacto: 15,90 kB frente a 14 kB.
  Los estilos modificados en E2 quedan dentro del presupuesto existente.
- E3: aplicar el sistema visual a perfil, formación, experiencia y conocimientos/IA.
- E4: servicios y contacto.
- F: SEO por página, prerender del detalle y respuesta HTTP 404. Los IDs inválidos
  siguen regresando al listado, sin presentar esta conducta como una respuesta 404.
- G: medición de rendimiento y optimización de formatos/tamaños de las capturas.
  No se atribuyen resultados de Core Web Vitals a estas comprobaciones de diseño.
- La revisión no sustituye una auditoría completa con lector de pantalla ni una
  validación del despliegue en Netlify.

El CV permanece intacto. No se hace push ni despliegue en esta etapa.
