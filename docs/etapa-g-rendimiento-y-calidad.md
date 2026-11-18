# G: rendimiento, imágenes y calidad final

Fecha: 27 de octubre de 2026. Etapa autorizada e implementada localmente. Sin push ni despliegue.

## Resultado

Se optimizó la entrega de las imágenes realmente utilizadas por el portafolio, se mantuvo su contenido y se verificaron rutas, SEO, navegación, respaldo de imágenes y accesibilidad básica. No se agregaron dependencias npm ni se sustituyó la arquitectura Angular.

### Imágenes

- Trece imágenes públicas producen 46 variantes WebP: versiones adaptadas a distintos anchos y una versión completa de cada original. No se amplían imágenes pequeñas ni se recorta su contenido.
- Compresión con `cwebp 1.6.0`, opciones `lossless`, `exact`, método 6 y calidad de esfuerzo 100. No son imágenes generadas ni reconstrucciones de las aplicaciones.
- Las trece versiones de resolución completa se compararon con los PNG originales mediante SHA256 de sus píxeles RGBA decodificados en Chrome. Todas coinciden. Los trece PNG originales también conservan su SHA256 de archivo.
- Los archivos completos pasan de 3.567.895 a 1.829.342 bytes: reducción del 48,7 %. Esto suma el inventario de trece imágenes; no representa la descarga inicial de una página.
- Tarjetas, portadas y miniaturas incorporan `srcset`, `sizes` y dimensiones. El navegador selecciona una variante adecuada al espacio y la densidad de pantalla. La galería ampliada utiliza la versión completa para mantener la legibilidad.
- La primera imagen del catálogo y la portada de cada ficha se cargan con prioridad. Las demás tarjetas y miniaturas mantienen carga diferida. La medición previa identificó imágenes como LCP en catálogo y Ventas.
- Si falla WebP, se intenta el PNG original. Si también falla, aparece el respaldo genérico rotulado. Se retira `srcset` durante el respaldo para evitar que siga imponiendo la variante fallida; se conserva la protección contra bucles.
- Los proyectos institucionales continúan con la representación genérica en HTML/SVG. No se procesaron capturas institucionales ni se añadieron imágenes a esas fichas.

Los nombres de las variantes incluyen un hash de su contenido para permitir caché prolongada sin reutilizar una imagen antigua tras modificarla. Se conservan los originales como respaldo y fuente de edición. Por ello aumenta el inventario almacenado en el repositorio, mientras que disminuye la descarga que necesita cada visitante.

### Tipografía

Inter se sirve desde el propio sitio, con los subconjuntos Latin y Latin Extended y pesos variables 400–700. Se incluyen licencia OFL y procedencia; los archivos no se modificaron. Desaparece la petición a Google Fonts durante la navegación normal.

Se utiliza `font-display: optional`, con la pila de fuentes del sistema ya existente. En una primera visita lenta el navegador puede conservar esa tipografía del sistema para evitar una sustitución tardía. La precarga de fuente se ensayó y se retiró al observar un coste en el primer pintado. El experimento está conservado como evidencia, separado de la comparación final.

### Caché y cabeceras

- Variantes con hash y bundles compilados: caché de un año con `immutable`.
- Fuentes locales: caché de una semana, sin marcar como inmutables sus nombres estables.
- HTML del servidor local: `no-cache`. Errores de servidor: `no-store`.
- `X-Content-Type-Options: nosniff` y `Referrer-Policy: strict-origin-when-cross-origin` en recursos estáticos y respuestas SSR.
- `public/_headers` se copia a la salida para los archivos estáticos de Netlify. El manejador SSR devuelve sus propias cabeceras, porque las reglas de archivos estáticos no cubren una Edge Function. Se mantuvo el manejador compatible de F.

No se añadieron cachés de documento inmutables, bibliotecas de compresión, analítica ni instrumentación de visitantes. Los observadores de rendimiento pertenecen exclusivamente a los scripts de revisión.

## Medición de laboratorio

Chrome local, viewport 390 × 1100, escala de dispositivo 1, CPU ralentizada 4 veces, latencia simulada de 80 ms, descarga de 500.000 bytes/s y caché HTTP desactivada. Tres ejecuciones por ruta y versión, con ventana de observación de ocho segundos. Se utilizó el build de producción servido por Express, con recursos sin compresión de transporte.

Estos resultados corresponden a ese entorno local y esas muestras. No son resultados de Lighthouse, PageSpeed, CrUX ni del CDN de Netlify. La serie final se conserva completa, incluidos los resultados menos favorables.

| Ruta | LCP mediano antes | LCP mediano final | Bytes de imágenes antes → final |
| --- | ---: | ---: | ---: |
| Inicio | 236 ms | 536 ms | 428.520 → 39.110 |
| Catálogo | 4.104 ms | 1.036 ms | 1.594.061 → 80.896 |
| Ventas | 1.620 ms | 636 ms | 259.122 → 21.490 |

Los bytes son la mediana de cuerpos de imágenes registrados durante la ventana de observación, no el tamaño completo del sitio ni una medición del tráfico comprimido en producción. La reducción observada es del 90,9 %, 94,9 % y 91,7 % respectivamente.

El catálogo y Ventas muestran una mejora clara en estas muestras. **Inicio no presenta una mejora consistente de LCP**: la última serie aumenta unos 300 ms respecto a la referencia, mientras que otras series previas fueron próximas a la referencia. Se registra esa variación y no se atribuye una mejora uniforme a todas las páginas ni una causa concluyente a la diferencia de Inicio.

| Ruta | CLS máximo observado antes | CLS máximo final |
| --- | ---: | ---: |
| Inicio | 0,02736 | 0,02692 |
| Catálogo | 0,01526 | 0,00309 |
| Ventas | 0,01592 | 0,01576 |

Se presenta el máximo de las tres ejecuciones, sin afirmar que el CLS sea cero. Tampoco se extrapolan estas muestras a un percentil de usuarios reales.

### Interacciones

Se abrió una sesión nueva de Chrome, sin la carga de comparación de píxeles, para medir menú y filtros a CPU 4×. Se observaron veinte grupos de interacción mediante Event Timing, con mediana de 80 ms y máximo de 168 ms. El umbral de captura fue de 16 ms.

Son ejemplos controlados de latencia de interacción. **No se presentan como INP de campo ni como garantía de INP del sitio.** Las entradas registradas durante la comprobación masiva de imágenes se mantienen en el informe funcional, pero la medición aislada está en `interacciones.json`.

### Tamaño de código

La compilación final mantiene carga diferida y los presupuestos existentes, sin advertencias: aproximadamente 302,36 kB iniciales y 84,39 kB de transferencia estimada por Angular. El CSS global pasa de unos 13,20 a 5,48 kB al sustituir las múltiples declaraciones externas de fuente. El manifiesto compartido de imágenes se entrega con los componentes que lo necesitan. Los tamaños de bundles no se presentan como Core Web Vitals.

## Validación final

- `npm run build`: correcto, 17 páginas prerenderizadas y sitemap/robots regenerados, sin advertencias.
- `npm test -- --watch=false --reporters=dot`: 46 pruebas correctas en 15 archivos. Se añadió una prueba de dimensiones, variantes y prioridad; se ampliaron las pruebas de respaldo WebP/PNG y ausencia de bucles.
- Diecisiete páginas HTTP 200, cuatro rutas HTTP 404, sitemap con 17 canonical y metadatos conservados, utilizando la revisión ampliada de F.
- Sesenta y ocho combinaciones de ruta/ancho, sin desbordamiento y con un único main y h1. La revisión cubre 320, 390, 768 y 1440 px.
- Trece comparaciones de píxeles completas y comprobación de dimensiones/proporciones de las 46 variantes.
- Navegación real entre proyectos, filtros, menú, cotización tras hidratación y recuperación desde 404.
- Galería abierta con foco en Cerrar, cambio mediante flecha, cierre con Escape y devolución del foco a la portada. Se inspeccionaron capturas reales de catálogo, ficha y galería.
- Preferencia de movimiento reducido: desplazamiento automático y transiciones desactivadas comprobados en navegador.
- Contraste de cuatro combinaciones principales: texto sobre botón azul 4,72:1; texto secundario sobre superficie 9,14:1; enlace azul sobre superficie 8,08:1; borde de control sobre superficie 3,13:1. Son verificaciones de la paleta probada, no una certificación completa de accesibilidad.
- Fuentes locales disponibles con Google Fonts bloqueado; sin recursos externos en el recorrido comprobado de Inicio.
- Cabeceras y caché verificadas en el servidor local para HTML, WebP, fuentes y 404. La aplicación real de `_headers` en Netlify queda pendiente de un despliegue autorizado.
- Sin errores inesperados de consola en la revisión. Se distingue el aviso de red intencional de la página 404.
- `npm audit --json`: cero vulnerabilidades reportadas. No se ejecutó `audit fix` ni se cambiaron dependencias.
- Búsqueda heurística de patrones de claves privadas, AWS, GitHub y OpenAI en código/configuraciones: sin archivos coincidentes. No se imprimieron posibles valores sensibles; no sustituye una revisión exhaustiva de secretos.
- CV con HTTP 200 y SHA256 conservado: `90afb7f14c0b121bc5caa67333ae468275a909e728f00c0c00ea4f28ded781ad`.
- `git diff --check`: correcto.

## Archivos de esta etapa

- `scripts/optimize-project-images.cjs`: preparación opcional con el codificador oficial cwebp.
- `src/assets/images/optimized/`: 46 archivos WebP con hash.
- `src/app/data/optimized-images.ts` y `src/app/data/project-image.ts`: manifiesto, dimensiones y tamaños de presentación.
- `src/app/shared/project-card/project-card.ts`, `.html` y `.spec.ts`: variantes, prioridad, dimensiones y respaldo.
- `src/app/pages/projects/projects.html`: prioridad de la primera tarjeta.
- `src/app/pages/project-detail/project-detail.ts`, `.html` y `.spec.ts`: imágenes adaptables, ampliación completa y respaldo.
- `src/styles.css` y `src/assets/fonts/`: fuente local, política de carga, licencia y procedencia.
- `src/server.ts` y `public/_headers`: caché y cabeceras estáticas/SSR.
- Este informe y `docs/revision-g/`: mediciones, inventario, auditoría, scripts reproducibles y capturas.

El resto del árbol de trabajo conserva cambios de etapas previas. No se alteraron contenido profesional, planes, precios, contactos ni CV durante G.

## Reproducción y mantenimiento

1. `npm run build` y `npm test -- --watch=false --reporters=dot`.
2. `node docs/revision-g/verificar.cjs` para revisión funcional y de recursos.
3. `node docs/revision-g/medir.cjs nombre-de-serie` para tres muestras por ruta. Ejecutar sin otras pruebas simultáneas para reducir interferencias.
4. `node docs/revision-g/interacciones.cjs` para la sesión aislada de menú/filtros.

Los scripts de navegador requieren Chrome en la ruta indicada, Node con fetch/WebSocket y el puerto 4198 libre. Inician y cierran sus procesos propios.

Al agregar o cambiar imágenes públicas, se pueden regenerar variantes con `node scripts/optimize-project-images.cjs "ruta/al/cwebp"`, revisar el inventario y recompilar. Se utilizó la descarga oficial de libwebp 1.6.0 para Windows en una carpeta temporal; no se instala ni se ejecuta durante el build normal. El archivo ZIP descargado tuvo SHA256 `48886f506b21f62e4661f0f4cbfca19800897c385128e8902542d29a950c93f1`.

## Estado de cierre

G queda implementada y validada localmente. No se publicaron cambios ni se enviaron mensajes. La validación del despliegue real, caché/CDN, dispositivos físicos y datos de usuarios —especialmente INP— requiere el siguiente paso autorizado en Netlify. La variación de Inicio observada en laboratorio queda documentada para contrastarla en ese entorno; no se oculta ni se transforma en una garantía de rendimiento.

## Referencias

- [Chrome/web.dev: optimización de LCP](https://web.dev/articles/optimize-lcp).
- [Chrome/web.dev: alcance de la medición de INP](https://web.dev/articles/inp).
- [Google: herramientas oficiales WebP](https://developers.google.com/speed/webp/download).
- [Netlify: cabeceras para archivos estáticos y limitaciones en SSR](https://docs.netlify.com/manage/routing/headers/).
- [Inter y licencia de la distribución utilizada](https://github.com/google/fonts/tree/main/ofl/inter).
