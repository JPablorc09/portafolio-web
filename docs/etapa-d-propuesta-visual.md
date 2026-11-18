# Etapa D: propuesta visual

Estado: propuesta para revisión. El rediseño todavía no está aplicado a Angular.

## Dirección recomendada

**Perfil y experiencia.** Una portada editorial que presenta nombre, enfoque
Full Stack .NET y Angular, formación y disponibilidad. A continuación muestra
trabajo seleccionado, experiencia verificable, servicios y aprendizaje de IA.

La intención es que un reclutador identifique rápidamente el perfil y encuentre
el CV, mientras un cliente pueda consultar soluciones y solicitar una cotización.
La jerarquía se apoya en tipografía, espacio y contenido concreto.

**Proyectos primero** es la alternativa: adelanta un caso personal con captura
real al primer bloque de la portada. Favorece la exploración de trabajo visible,
conservando la presentación profesional y los accesos a CV y contacto.

Las variantes están en `docs/propuesta-visual/portafolio-direcciones.html`.
Son una propuesta interactiva aislada, con una copia del catálogo de la etapa C.
La navegación del prototipo permite explorar portada, catálogo, casos de estudio,
experiencia, perfil, formación, conocimientos, servicios y contacto.

## Cambios visuales propuestos

| Elemento actual | Propuesta | Beneficio esperado |
| --- | --- | --- |
| Gradientes, brillos y sombras repetidos | Fondo azul marino uniforme, superficies discretas y separadores finos | Facilitar la lectura y concentrar la atención en el contenido |
| Nombre con tamaño muy grande y tarjeta de código decorativa | Nombre visible, enfoque Full Stack como titular y resumen profesional lateral | Comunicar especialidad y experiencia con información defendible |
| Navegación con ocho enlaces al mismo nivel | Proyectos, Experiencia, Perfil, Servicios y Contacto; Inicio desde la marca | Reducir saturación en escritorio |
| Formación y habilidades como enlaces principales independientes | Agrupar Sobre mí, Formación y Conocimientos bajo Perfil | Mantener acceso a todas las páginas con una jerarquía más clara |
| CTAs con variaciones de estilo entre páginas | Un botón principal sólido y acciones secundarias consistentes | Distinguir la siguiente acción sin competir visualmente |
| Portadas de proyectos con recorte | Marcos de imagen con proporción estable y `object-fit: contain` | Mantener visibles las capturas completas |
| Muchas etiquetas tecnológicas al mismo nivel | Tres tecnologías en la tarjeta y stack completo en el caso de estudio | Reducir ruido sin perder información |
| Filtros de contexto y múltiples categorías en botones | Contextos visibles y selector de categoría accesible | Mejor adaptación a móvil |
| Cronología con varias tarjetas grandes | Periodo, contratante, institución y aportes en una composición más compacta | Hacer comprensible la relación contractual |

La propuesta conserva las rutas actuales, el catálogo, la descarga del CV y
las funciones disponibles. La etiqueta «Conocimientos» puede seguir apuntando
a `/habilidades`; no requiere cambiar URLs ni arquitectura.

## Identidad visual

Se mantiene una identidad oscura con acentos azules. Los colores de estado
acompañan texto: publicado, en desarrollo y acceso restringido nunca dependerán
exclusivamente del color.

| Uso | Color propuesto |
| --- | --- |
| Fondo | `#0B1220` |
| Superficie | `#111C2E` |
| Superficie activa | `#17253B` |
| Texto principal | `#F1F5FB` |
| Texto secundario | `#B0BFD3` |
| Enlaces y acento | `#83B4FF` |
| Botón principal | `#2563EB` con texto blanco |
| Separadores decorativos | `#2B3C54` |
| Límites de controles | `#506B91` |
| Disponibilidad | `#9CE6C1`, siempre con etiqueta |

Contraste calculado para pares opacos de la propuesta:

- Texto principal sobre fondo: **17,11:1**.
- Texto secundario sobre superficie: **9,14:1**.
- Acento sobre fondo: **8,86:1**.
- Texto blanco sobre botón principal: **5,17:1**.
- Borde de control sobre superficie: **3,13:1**.

Estos cálculos no equivalen a una certificación de accesibilidad. La etapa E
debe comprobar todos los estados, fondos y controles ya implementados.

## Tipografía y espaciado

- Una familia principal: Inter, con alternativas del sistema. La propuesta
  funciona sin descargar fuentes; la carga optimizada de Inter se resolverá
  al implementar y medir.
- Cuerpo: 16 px como base. Textos de lectura extensa: 16–18 px.
- Titular de portada: 38 px en móvil y hasta 62–64 px en escritorio.
- Títulos de sección: 25–34 px. Títulos de tarjetas: 17–19 px.
- Metadatos breves: 12–14 px. La información esencial mantiene tamaño de lectura.
- Pesos principales: 400, 500 y 600; reservar mayor peso para el titular.
- Escala de espacio: 4, 8, 12, 16, 24, 32, 48 y 64 px.
- Contenedor de aplicación: máximo aproximado de 1180 px, con márgenes fluidos.
- Radio: 8 px en controles y 12 px en tarjetas. Sombras solo cuando sean útiles
  para distinguir capas de navegación o diálogo.

## Composición por página

### Inicio

1. Identidad, disponibilidad y enfoque .NET/Angular.
2. Accesos a proyectos, CV y contacto.
3. Tres proyectos destacados: Ventas, EscaneaTodo e Incidentes institucional.
4. Experiencia: Grupo Alega como contratante y Poder Judicial como institución.
5. Servicios con llamada a cotizar.
6. Aprendizaje de desarrollo asistido por IA con estado explícito de formación.

La selección de portada no reduce el catálogo de once proyectos. No se añaden
contadores de productividad, valoraciones ni métricas profesionales inventadas.

### Proyectos y casos de estudio

- Contextos institucional, personal y demo identificados en tarjeta y detalle.
- Categoría y estado junto al título; descripción breve y tecnologías clave.
- Categorías filtrables, resultados y estado vacío con restablecimiento completo.
- Detalle en dos columnas: contenido y ficha técnica. En móvil pasa a una columna.
- Necesidad, solución, funciones, pendientes, retos y aprendizajes con jerarquía clara.
- Capturas completas para proyectos con material real; material promocional
  identificado como tal; representaciones institucionales genéricas.
- Para proyectos institucionales, representación CSS sencilla y aviso de acceso
  restringido. No incorpora una interfaz ficticia ni detalles internos.
- Mantener en Angular el visor existente, controles por teclado, cierre con
  Escape y restauración del foco. El prototipo visual no reproduce todo el visor.
- Mantener navegación anterior/siguiente y regreso al listado.

### Experiencia y perfil

- Periodo contractual visible y relación contratante/institución en el primer bloque.
- Responsabilidades agrupadas por desarrollo, integraciones, datos y mantenimiento.
- Formación con grado, UAM y 2024 claramente visibles.
- Disponibilidad y objetivos laborales en lenguaje directo.
- Mantener el contenido pendiente de confirmación, como CCNA 1, sujeto a revisión
  antes de cambiar sus afirmaciones; esta propuesta no resuelve esa confirmación.

### Conocimientos e IA

Presentar tres contextos de uso: profesional confirmado, proyectos personales
y formación/práctica. La clasificación se acompaña de descripciones, sin barras
porcentuales de dominio ni estrellas.

La sección de IA explica análisis, planificación, programación asistida,
depuración, refactorización, documentación y validación humana. Muestra
«Actualmente en formación y práctica». Se propone dentro de Conocimientos,
con una referencia breve desde Inicio y Sobre mí; no necesita una ruta nueva.

### Servicios y contacto

- Agrupar soluciones por necesidad del negocio y describir alcances comprensibles.
- Mantener los planes y precios actuales hasta una decisión comercial expresa;
  el prototipo conserva los tres precios de referencia existentes.
- Separar contacto para empleo y cotización de proyectos.
- Correo, WhatsApp, GitHub, LinkedIn y CV desde los datos ya existentes.
- No añadir un formulario sin definir su recepción, validación y tratamiento de datos.
- No ofrecer agentes autónomos como especialidad comercial consolidada.

## Responsive e interacción

| Ancho útil del contenido | Comportamiento propuesto |
| --- | --- |
| Más de 800 px | Cabecera completa, portada en dos columnas y tres tarjetas por fila |
| Entre 621 y 800 px | Cabecera compacta y dos tarjetas por fila |
| Hasta 620 px | Menú desplegable, una columna y controles que se ajustan al ancho |

Los puntos de adaptación responden al espacio disponible, no a un modelo
concreto de dispositivo. En la aplicación se validarán también 320, 375, 390,
768, 1024 y 1440 px y zoom al 200 %.

El menú móvil propuesto es una navegación desplegable en el flujo, no un diálogo
modal: no necesita atrapar el foco ni bloquear el desplazamiento. Debe tener
`aria-expanded`, `aria-controls`, etiqueta Abrir/Cerrar, cierre con Escape y
restauración del foco al botón. Todas las páginas permanecen disponibles.

Los botones tienen objetivo mínimo de 44 px. Estados seleccionados y foco son
visibles; los controles funcionan sin hover. Se propone movimiento de 120–160 ms
solo en color/borde y respeto de movimiento reducido, sin zoom de capturas,
parallax ni animaciones de entrada necesarias para acceder al contenido.

## Estados que deben implementarse en E

- Navegación activa, apertura y cierre del menú y submenú Perfil.
- Filtros seleccionados, conteos y estado sin resultados.
- Imagen pendiente, error de imagen e ilustración de respaldo rotulada.
- Galería abierta, cierre, foco y navegación de imágenes.
- Proyecto inexistente según la conducta actual; HTTP 404 y prerender se tratan en F.
- Estados de carga con espacio reservado para imágenes y componentes diferidos.
- Enlaces externos anunciados cuando abren otra pestaña.
- Enlace para saltar al contenido y un único `main` por página.

No se considera validada una implementación de estos estados por aparecer
dibujados en la propuesta.

## Implementación controlada propuesta

Cada subetapa requiere autorización antes de modificar Angular.

| Subetapa | Archivos previstos | Aceptación y pruebas | Riesgo principal |
| --- | --- | --- | --- |
| E1: base y navegación | `src/styles.css`, `app.html`, `app.css`, navbar y footer | Tokens coherentes, navegación completa, CV accesible, menú por teclado, compilación y suite | Cambios globales pueden afectar páginas aún sin rediseñar |
| E2: portada y catálogo | Home, Projects, ProjectCard y ProjectDetail | Jerarquía aprobada, filtros y rutas conservados, imágenes completas, protección institucional y visor verificados | Regresiones en filtros, galería o estilos del detalle |
| E3: perfil y conocimientos | About, Education, Experience y Skills | Formación y contrato legibles, contextos de conocimiento y estado de IA claros, sin nuevas afirmaciones no confirmadas | Interpretación editorial del grado de dominio |
| E4: servicios y contacto | Services y Contact | Cotización y empleo claramente separados, contactos y CV funcionales, planes preservados salvo autorización | Cambiar accidentalmente la oferta comercial |

El objetivo técnico es usar tokens globales y patrones compartidos, conservando
componentes standalone y carga diferida. No requiere sustituir la arquitectura,
agregar un framework CSS ni cambiar dependencias.

## Evidencia de revisión

- Propuesta de unos 635 kB, con dos capturas reales incorporadas y sin peticiones
  de datos desde su código. No utiliza código o imágenes de sistemas institucionales.
- Interacciones verificadas con jsdom: dos variantes, navegación de pantallas,
  once fichas, filtros, restablecimiento, menú/Escape y controles de vista móvil.
- Revisión en Chrome sin ventana: ventanas de 320, 390, 768 y 1024 px; sin
  desbordamientos horizontales detectados en la portada. El contenedor de revisión
  añade márgenes: anchos útiles observados de 258–273, 343, 721 y 977 px.
- Apertura/cierre del menú móvil y ausencia de enlaces de demo/código en el
  caso institucional comprobados en navegador. Sin excepciones JavaScript detectadas.
- Capturas inspeccionadas: escritorio, móvil, menú móvil, variante por proyectos
  y caso institucional. Son vistas de una propuesta, no del sitio ya actualizado.
- Los contrastes indicados se calcularon sobre los pares de color propuestos.
- Compilación del proyecto Angular: aprobada, con ocho rutas prerenderizadas.
- Suite del proyecto: trece archivos y diecinueve pruebas aprobados.
- Se mantiene la advertencia previa del CSS de Contacto, sin nuevas advertencias
  de presupuesto. No se modificaron estilos de la aplicación en esta etapa.

La revisión no incluye una auditoría WCAG completa, lector de pantalla ni medidas
de Core Web Vitals del rediseño. El comportamiento final se verifica sobre Angular
en E y sobre una vista previa autorizada de Netlify cuando corresponda.

## Archivos entregados y alcance

- Este documento.
- `docs/propuesta-visual/portafolio-direcciones.html`: propuesta interactiva.
- Cinco imágenes `revision-*.png`: referencias visuales de la revisión local.

En la etapa D se trabaja únicamente en documentación y propuesta. Los cambios
previos de A, B y C permanecen en el árbol de trabajo. No se modifica el CV,
no se instala ninguna dependencia y no se hace push ni despliegue.
