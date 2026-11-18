# Etapa E1: base visual y navegación

## Resultado

Se aplica la base de la dirección «Perfil y experiencia» aprobada para continuar:
paleta azul marino, tipografía Inter, superficies discretas, botones sólidos,
espaciado y foco visible. La cabecera y el pie de página utilizan estos patrones.

Antes de E1 se retiraron del catálogo `control-financiero` e
`incidentes-clean-architecture`, interpretando «el incidentes» como el proyecto
personal añadido en C. Se conserva `incidentes`, correspondiente a la experiencia
institucional. El catálogo queda en **nueve proyectos**. Las dos URLs retiradas
regresan al listado mediante la conducta ya existente para IDs no disponibles.
Se retiró también el filtro Backend y arquitectura, que quedaba vacío.

## Cambios

- Cabecera con Proyectos, Experiencia, Perfil, Servicios, Contacto y descarga del CV.
- Perfil agrupa Sobre mí, Formación y Conocimientos, sin cambiar sus URLs.
- Menú móvil desplegable en el flujo de la página, con etiqueta Abrir/Cerrar,
  `aria-expanded`, `aria-controls`, cierre con Escape y restauración del foco.
- El menú se cierra al navegar; los enlaces anuncian la página activa.
- El submenú Perfil se cierra con Escape o clic fuera.
- El cambio a menú móvil se realiza a 56 rem para acomodar los textos reales
  y el botón de CV, sin saturar la cabecera en anchos intermedios.
- Pie de página con las ocho rutas, correo, WhatsApp, perfiles profesionales,
  disponibilidad, CV y botón para volver arriba.
- El retorno al inicio respeta movimiento reducido y devuelve el foco a la marca.
- Datos de contacto compartidos por cabecera y pie en un archivo de constantes.
- Enlace «Saltar al contenido principal» que conserva la ruta actual.
- Un único `main` por página: los cinco contenedores interiores que usaban `main`
  pasaron a `div`, conservando sus clases, contenido y estilos específicos.

El diseño específico de portada, catálogo y galerías corresponde a E2. Las demás
páginas conservan sus composiciones particulares mientras reciben la nueva base
global. Las propuestas y capturas de D son documentación histórica del diseño;
su catálogo de once proyectos no forma parte de los recursos publicados por Angular.

## Archivos involucrados

- `src/styles.css`.
- `src/app/app.ts`, `app.html`, `app.css` y `app.spec.ts`.
- `src/app/shared/navbar/navbar.ts`, `.html`, `.css` y `.spec.ts`.
- `src/app/shared/footer/footer.ts`, `.html`, `.css` y `.spec.ts`.
- `src/app/data/professional-contact.ts`.
- `src/app/data/projects.ts` y `projects.spec.ts`.
- `src/app/pages/projects/projects.ts` y `projects.spec.ts`.
- Contenedores HTML de Projects, ProjectDetail, Contact, Education y Skills:
  cambio semántico de `main` a `div`.
- `src/app/pages/project-detail/project-detail.spec.ts`: URLs retiradas.
- Este informe y evidencias en `docs/revision-e1/`.

## Verificación

- `npm run build`: correcto, con ocho rutas prerenderizadas.
- `npm test -- --watch=false --reporters=dot`: **29 pruebas aprobadas en 13 archivos**.
- Chrome con perfil temporal aislado y servidor de producción local: diez rutas
  verificadas, incluyendo detalles personal e institucional.
- Ocho páginas generales en 320, 390, 768, 1024 y 1440 px: **40 combinaciones
  sin desbordamiento horizontal detectado**.
- Menú móvil, Perfil, Escape, foco, navegación activa, salto al contenido y
  retorno con movimiento reducido verificados en navegador.
- Nueve tarjetas presentes y ambas fichas retiradas redirigiendo al listado.
- Descarga del CV responde HTTP 200 con tipo PDF.
- Sin excepciones JavaScript ni errores registrados por el navegador durante
  esta revisión. La evidencia está en `docs/revision-e1/verificacion.json`.
- `git diff --check`: sin errores de espacios.
- El CV conserva su SHA256:
  `90afb7f14c0b121bc5caa67333ae468275a909e728f00c0c00ea4f28ded781ad`.

Las capturas de cabecera, menú móvil, catálogo y pie se inspeccionaron localmente.
Estas comprobaciones no sustituyen una auditoría completa con lector de pantalla,
mediciones de Core Web Vitals ni una vista previa autorizada en Netlify.

## Pendientes y alcance

- Persiste la advertencia previa del CSS de Contacto: 15,90 kB frente a 14 kB.
- E2 debe aplicar la composición aprobada a la portada, tarjetas y detalle.
- La respuesta HTTP 404 y el prerender del detalle continúan previstos para F.
- Permanecen pendientes las confirmaciones editoriales anteriores, como CCNA 1
  y publicación de RadioMusicalApp.
- No se añadieron dependencias, no se modificó el CV y no se hizo push ni despliegue.
