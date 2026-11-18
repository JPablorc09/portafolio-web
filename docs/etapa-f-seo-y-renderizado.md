# F: SEO técnico y renderizado

Fecha: 27 de octubre de 2026. Implementación local de la etapa autorizada; sin push ni despliegue.

## Resultado y decisiones

Las ocho páginas generales y las nueve fichas vigentes se generan como HTML durante la compilación. El contenido del portafolio procede de datos locales y no requiere renderizado de cada visita: el prerender permite entregar títulos, contenido y metadatos antes de ejecutar JavaScript. Se conservan Angular standalone, las rutas, los componentes y la carga diferida.

Las direcciones desconocidas utilizan el renderizado de servidor para devolver una página 404. Se sustituye deliberadamente la conducta anterior de redirigir cualquier URL desconocida al inicio o los proyectos inexistentes al catálogo. El visitante conserva la dirección solicitada y obtiene enlaces para regresar. Las respuestas directas son HTTP 404; en navegación cliente se presenta el mismo estado sin afirmar que una navegación interna genera una nueva respuesta HTTP de documento.

### Metadatos y canonical

- Títulos únicos y descripciones para las ocho páginas generales. Los nueve proyectos utilizan su nombre y descripción autorizada.
- Open Graph y Twitter Cards coherentes con la página actual, incluida la navegación entre fichas reutilizadas.
- Una única canonical absoluta por página, en el dominio de producción confirmado. Los parámetros de cotización, filtros y fragmentos no forman parte de esa URL.
- `index, follow, max-image-preview:large` para páginas vigentes; `noindex, follow` para errores. Al volver desde un error a una página válida se restablecen los metadatos.
- Identidad completa de Juan Pablo Rojas Contreras, idioma español y temática de desarrollo Full Stack, .NET, Angular, integraciones y servicios en Costa Rica. No se añadieron etiquetas de palabras clave repetitivas ni garantías de posicionamiento.

La lógica se concentra en una `TitleStrategy` de Angular y un catálogo de metadatos. No se duplican efectos de navegación en cada componente. La descripción de los proyectos se resuelve desde el catálogo existente, sin agregar datos institucionales.

### Datos estructurados

JSON-LD con `Person`, `WebSite` y el tipo de página correspondiente (`ProfilePage`, `CollectionPage`, `ContactPage` o `WebPage`). El perfil apunta a la persona como entidad principal. Las fichas incluyen un `CreativeWork` limitado al nombre, descripción general y tecnologías ya públicas.

No se atribuye contratación directa del Poder Judicial, autoría exclusiva de sistemas institucionales, nuevas certificaciones, métricas o competencias de IA. El JSON-LD de las fichas institucionales no incorpora capturas, repositorios ni configuraciones internas. El texto se asigna con APIs DOM y los signos `<` se escapan al serializar JSON para impedir cierres de script dentro de una descripción. Hay una prueba específica de ese caso.

### Sitemap y robots

`npm run build` ejecuta automáticamente `postbuild` para generar `sitemap.xml` y `robots.txt` en `dist/portafolio-web/browser`. Se toman las rutas del manifiesto prerenderizado y sus canonical del HTML generado, en lugar de mantener una segunda lista manual de IDs. El generador comprueba correspondencia y unicidad; no inventa fechas de actualización.

El sitemap contiene 17 URL vigentes y excluye errores, proyectos retirados, consultas y fragmentos. Robots permite el rastreo y enlaza al sitemap del dominio de producción.

### Identidad al compartir

Nueva imagen PNG de 1200 × 630 con nombre completo, perfil, tecnologías y ubicación. Su fuente es un SVG tipográfico coherente con la identidad aprobada: no representa una captura de un sistema. Nuevo favicon SVG con monograma JP y respaldo ICO de la misma marca. Se conservan los recursos anteriores para no borrar archivos sin necesidad.

Los gráficos se exportaron con Chrome desde SVG, sin bibliotecas ni servicios externos de generación. Los archivos exportados están en el repositorio local; compilar no requiere Chrome. El script de exportación permite regenerarlos al modificar la marca.

### Angular y Netlify

- `getPrerenderParams` obtiene los nueve IDs del catálogo y se configura un fallback de servidor para los IDs desconocidos.
- Una guarda de coincidencia impide activar la ficha de un proyecto que no existe. El componente 404 utiliza `RESPONSE_INIT` cuando se ejecuta en servidor.
- El servidor exporta `netlifyAppEngineHandler` y `reqHandler` mediante las APIs indicadas por el adaptador instalado `@netlify/angular-runtime` 4.0.0 para Angular 21.2.9 o posterior. Se utilizan sus funciones de hosts permitidos, contexto y confianza de proxy.
- Se conserva la entrada local `node dist/portafolio-web/server/server.mjs`. Express sirve los índices HTML generados antes del fallback de Angular y evita cachear HTML durante un año. Así se corrige la diferencia anterior entre los archivos prerenderizados y la respuesta del servidor local.
- `netlify.toml` deja explícitos el comando de compilación y la carpeta publicada. No se añade un rewrite global a `index.html`, que ocultaría las respuestas de error.

La compatibilidad se preparó según la documentación y el código del adaptador instalado. No se ejecutó una compilación remota ni una vista previa desplegada en Netlify; su validación requiere autorización independiente conforme a las reglas del proyecto.

## Archivos de esta etapa

- `src/app/seo/site.ts`: dominio, identidad y catálogo de metadatos.
- `src/app/seo/seo-title-strategy.ts` y `.spec.ts`: actualización y pruebas SEO.
- `src/app/app.config.ts`: registro de la estrategia.
- `src/app/app.routes.ts` y `src/app/app.routes.server.ts`: títulos, resolución de proyectos, prerender y rutas desconocidas.
- `src/app/pages/not-found/not-found.ts`: página de error accesible desde las rutas desconocidas.
- `src/app/pages/project-detail/project-detail.spec.ts`: nueva expectativa para proyectos inexistentes y retirados; se conservan las pruebas de galería y confidencialidad.
- `src/index.html`: identidad base y favicons; se retiran metadatos globales duplicados, ahora gestionados por página.
- `src/server.ts` y `netlify.toml`: manejador compatible y entrega local de HTML.
- `package.json`: únicamente se añade el hook `postbuild` en esta etapa; no cambian dependencias ni el lockfile.
- `scripts/generate-search-assets.mjs`: generación de sitemap y robots.
- `scripts/render-brand-assets.cjs`, `public/social-preview.svg`, `public/favicon.svg`, `public/portfolio.ico` y `src/assets/images/portafolio-social.png`: marca social y favicon.
- Este informe y `docs/revision-f/`: resultados, revisión reproducible y capturas de la página 404.

El árbol de trabajo conserva cambios de etapas anteriores; no se revirtieron ni publicaron.

## Validación

- `npm run build`: correcto, sin advertencias, 17 páginas prerenderizadas y archivos de indexación generados. El bundle inicial queda en 310,08 kB sin comprimir y unos 84,70 kB de transferencia estimada; no se modificaron presupuestos.
- `npm test -- --watch=false --reporters=dot`: 45 pruebas correctas en 15 archivos. Incluye metadatos por navegación, canonical, recuperación desde errores, confidencialidad, escape seguro de JSON-LD y comportamiento existente de la galería.
- HTTP local sin ejecutar JavaScript: 17 páginas con estado 200, h1, canonical única, títulos únicos, descripciones, Open Graph, Twitter y JSON-LD verificables en su HTML. Las solicitudes utilizaron un User-Agent de rastreador para comprobar la misma entrega de contenido.
- HTTP 404, sin redirección, para una página desconocida, un ID desconocido y los dos proyectos retirados. Los cuatro documentos muestran el error y `noindex`.
- Sitemap XML válido con exactamente las 17 canonical; robots, imagen social y favicons accesibles. Dimensiones del PNG comprobadas en sus bytes.
- Chrome local: las 17 páginas a 320, 390, 768 y 1440 px, 68 combinaciones sin desbordamiento, con un único main y h1. Comprobadas navegación entre proyectos, metadatos actualizados, cotización tras hidratación y regreso desde el error.
- La revisión distingue el aviso de red esperado al solicitar una página 404 de los errores de ejecución o recursos inesperados. No se consideran fallos los códigos HTTP intencionales del estado no encontrado.
- PDF del CV con HTTP 200 y SHA256 conservado: `90afb7f14c0b121bc5caa67333ae468275a909e728f00c0c00ea4f28ded781ad`.
- `git diff --check`: correcto. Se inspeccionaron visualmente la imagen social y la página 404 en escritorio y móvil.

Reproducción desde la raíz: `npm run build`, `npm test -- --watch=false --reporters=dot` y `node docs/revision-f/verificar.cjs`. La revisión de navegador requiere Chrome en la ruta del script y el puerto 4198 libre. Los procesos propios se cierran al terminar. No se envían correos ni mensajes ni se publican archivos remotos.

## Pendientes y límites

La siguiente etapa G corresponde a medición de rendimiento, imágenes y comprobaciones finales de calidad. No se atribuyen resultados de Core Web Vitals a los tamaños de bundles ni a estas pruebas. Quedan fuera la publicación, Search Console, los validadores remotos de vistas previas y la validación del adaptador dentro de un despliegue real. No se garantizan posiciones ni resultados enriquecidos en buscadores.

Si cambia el dominio público, debe actualizarse `SITE_ORIGIN` y reconstruirse el proyecto. El CV, los precios, las prestaciones y el contenido profesional confirmado permanecen intactos. No se incorporaron dependencias ni se ejecutaron push o despliegues.

## Referencias técnicas

- [Angular: renderizado híbrido, prerender y respuestas del servidor](https://angular.dev/guide/ssr), contrastado con las declaraciones instaladas de Angular 21.2.
- [Angular: RESPONSE_INIT](https://angular.dev/api/core/RESPONSE_INIT).
- [Netlify: configuración de Angular y renderizado](https://docs.netlify.com/build/frameworks/framework-setup-guides/angular/).
- [Netlify Angular Runtime: manejador App Engine](https://github.com/netlify/angular-runtime#request-handling), contrastado con `node_modules/@netlify/angular-runtime/README.md` y sus utilidades de detección.
- [Schema.org: CreativeWork](https://schema.org/CreativeWork).
- [Google Search Central: ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page).
