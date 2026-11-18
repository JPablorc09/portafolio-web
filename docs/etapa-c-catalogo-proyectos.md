# Etapa C: catálogo y confidencialidad

## Resultado

El catálogo conserva los siete IDs anteriores y añade cuatro proyectos
personales. Incluye contexto, estado, necesidad que aborda, alcance de la
verificación y pendientes. Los filtros combinan contexto y categoría y
permiten restaurar el catálogo completo desde el estado vacío.

| Proyecto | Contexto | Estado mostrado |
| --- | --- | --- |
| Brasa & Oliva | Demo comercial | Publicado |
| UrbanCut Barber Studio | Demo comercial | Publicado |
| Sistema de Gestión de Incidentes | Institucional | Experiencia profesional; acceso restringido |
| FallApp | Institucional | Experiencia profesional; acceso restringido |
| Integración Aranda ASMS | Institucional | Experiencia profesional; acceso restringido |
| Sistema de Ventas e Inventario | Personal | Desarrollado; sin demo pública |
| Monitor de Eventos PRTG | Institucional | Experiencia profesional; acceso restringido |
| EscaneaTodo | Personal | Publicado; procesamiento pendiente de validación funcional |
| RadioMusicalApp | Personal | En desarrollo y pruebas de publicación |
| controlFinanciero | Personal | En desarrollo |
| Incidentes con Clean Architecture | Personal | En desarrollo; separado del institucional |

No se incorporaron IPTV, ejercicios WPF, recursos humanos ni ejercicios
introductorios: quedan fuera de esta selección hasta tener evidencia de su
valor como casos de estudio. No se elimina ninguna funcionalidad existente.

## Evidencia y límites

- Datos y funciones institucionales: confirmaciones del autor en la solicitud
  original. Se describen únicamente capacidades generales. No se inspeccionó
  ni publicó código institucional.
- Demos comerciales: lectura del frontend local de `brasa-oliva` y
  `urban-cut-demo`, y respuesta HTTP 200 de sus demos públicas. No se ejecutó
  una prueba completa de todos sus flujos ni se enviaron solicitudes.
- Ventas: módulos, rutas, guardas y servicios visibles en el frontend local
  `sistema-ventas-front`; backend y SQL Server descritos por el autor. No se
  añadió URL de demo ni repositorio que no estuviera autorizado.
- [EscaneaTodo](https://escaneatodo.pages.dev/): portada y pantallas públicas
  de escaneo, OCR, documentos antiguos y edición PDF verificadas por HTTP y
  HTML, con Angular identificado en el documento. No se procesaron archivos:
  se diferencia disponibilidad de las interfaces de resultados funcionales.
- [Perfil público de GitHub](https://github.com/JPablorc09): se revisaron los
  metadatos de repositorios públicos. `RadioMusicalApp-Emisoras` es un catálogo
  JSON, no la aplicación móvil completa; no se presenta como su código fuente.
- RadioMusicalApp, controlFinanciero y Clean Architecture: funciones y estados
  descritos por el autor. No se verificó publicación en tiendas ni código
  completo. Falta precisar el framework denominado «Angular Native» y su
  relación con Expo; no se muestra esa combinación como stack validado.

## Imágenes

- Se reutiliza un único mockup institucional del catálogo, rotulado como
  genérico y sin presentarlo como captura real. No abre un visor institucional.
- Las dos imágenes de EscaneaTodo aparecieron durante esta sesión en su carpeta
  de recursos. Se inspeccionaron visualmente y corresponden a la portada y al
  listado de herramientas del sitio público. Se conectaron sin modificarlas.
- Para RadioMusicalApp se utiliza el gráfico `RadioMusicalApp_GraficoFunciones_1024x500.png`,
  inspeccionado visualmente, como material promocional rotulado. No representa
  una captura real ni demuestra publicación en Google Play. Se conservaron
  intactos los demás recursos que aparecieron durante el trabajo.
- El PNG de respaldo anterior tiene cero bytes. Se añadió un SVG de 858 bytes
  identificado como ilustración genérica. Los proyectos sin capturas no abren
  galerías ficticias. No se eliminó el archivo previo.

## Protección y navegación

La restricción se aplica si el contexto es institucional o el flag de
confidencialidad está activo. Las tarjetas bloquean la demo y sustituyen la
imagen por el mockup; el detalle bloquea enlaces externos, galerías y sección
de arquitectura. Además, se retiraron esos datos del catálogo, porque ocultar
elementos de interfaz no protege información que llega al navegador.

Se retiraron versiones de plataformas, campos y flujos internos, identificadores
de lotes y cifras de volumen no confirmadas. No se publicaron repositorios
institucionales.

Las pruebas detectaron dos problemas de navegación existentes: falta de
notificación de cambios al reutilizar el detalle en modo zoneless y título
dinámico sobrescrito por el router. Se corrigieron con `markForCheck` y un
resolutor de título que carga el catálogo de forma diferida. No cambia la
estrategia de renderizado ni la arquitectura del proyecto.

## Archivos de esta etapa

- `src/app/models/project.ts` y `src/app/data/projects.ts`.
- `src/app/app.routes.ts`.
- `src/app/shared/project-card/project-card.ts`, `.html` y `.css`.
- `src/app/pages/projects/projects.ts`, `.html` y `.css`.
- `src/app/pages/project-detail/project-detail.ts`, `.html` y `.css`.
- `src/assets/images/projects/project-placeholder.svg`.
- Nuevas pruebas: `data/projects.spec.ts`, `shared/project-card/project-card.spec.ts`,
  `pages/projects/projects.spec.ts` y `pages/project-detail/project-detail.spec.ts`.
- Este informe. Las imágenes originales nuevas no se editaron.

## Validación y pendientes

- Suite completa: trece archivos y diecinueve pruebas aprobados. Comprueba
  todos los IDs, títulos y navegación anterior/siguiente, cierre de galería al
  cambiar de proyecto, ID inexistente, filtros combinados y bloqueo de datos
  institucionales incluso con flags incoherentes.
- Compilación de producción con ocho rutas prerenderizadas. El detalle de
  proyectos sigue siendo CSR; su prerender y HTTP 404 pertenecen a la etapa F.
- Pendiente: revisión visual responsive e interacción real en navegador en
  la etapa de diseño. Las pruebas con jsdom no sustituyen esa revisión.
- Pendiente: pruebas de procesamiento de EscaneaTodo y confirmación del estado
  de RadioMusicalApp y del framework de controlFinanciero.
- Se conserva la advertencia previa del CSS de Contacto; no se amplía ningún
  presupuesto para ocultar advertencias.
- No se modificó el CV, no se añadieron dependencias y no se hizo push ni despliegue.
