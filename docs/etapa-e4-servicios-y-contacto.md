# E4: servicios y contacto

Fecha: 26 de octubre de 2026. Etapa implementada con autorización del propietario. Cambios locales; sin push ni despliegue.

## Resultado

Servicios y Contacto utilizan el diseño aprobado: fondo azul marino, superficies planas, tipografía legible, divisores y controles compartidos. Se conservaron los componentes standalone, las rutas con carga diferida y las dependencias existentes.

### Servicios

La oferta se organiza en ocho necesidades: páginas web, aplicaciones web, sistemas administrativos, APIs REST, integraciones, SQL Server, mantenimiento y digitalización/automatización mediante software. Los catálogos digitales permanecen dentro de páginas web y del plan personalizado. Cada servicio explica su alcance en lenguaje dirigido a negocios y profesionales.

Se conserva el proceso de trabajo: conversación inicial, definición de alcance, desarrollo con revisión y publicación tras aprobación. La propuesta exige acordar requerimientos, precio y entregables antes del desarrollo; no se ofrecen agentes autónomos como especialidad comercial.

Los tres planes se extrajeron del HTML anterior a un catálogo estático compartido, sin cambiar nombres, precios, modalidades de pago ni prestaciones:

| Plan | Precio de referencia | Modalidad | Prestaciones conservadas |
| --- | --- | --- | --- |
| Emprendedor | Desde ₡75.000 | Pago único | 6 |
| Profesional | Desde ₡120.000 | Pago único | 7 |
| Personalizado | Desde ₡180.000 | Según proyecto | 6 |

Se mantiene la indicación de que los precios son de referencia y pueden variar según los requerimientos. No se añadieron garantías, plazos comerciales, descuentos ni condiciones de alojamiento o mantenimiento no confirmadas.

### Contacto

- Dos recorridos diferenciados: oportunidad laboral mediante correo y CV; cotización mediante WhatsApp o correo.
- Los enlaces de planes llevan a `/contacto?plan=...#cotizar`, muestran la opción elegida y preparan el asunto/mensaje correspondiente.
- Solo se reconocen los tres identificadores del catálogo. Los parámetros desconocidos se ignoran y no se interpolan en mensajes. El contenido del mensaje se codifica para la URL.
- El plan seleccionado se actualiza al navegar dentro de Contacto y puede retirarse con «Consultar otro proyecto».
- Datos de correo, teléfono, WhatsApp, LinkedIn, GitHub y CV tomados de `PROFESSIONAL_CONTACT`; el teléfono mostrado conserva el número existente con su prefijo de Costa Rica.
- La descarga del CV utiliza un enlace nativo con `download`, conservando el archivo. Sustituye la creación imperativa de un enlace temporal y mantiene la función de descarga.
- Los enlaces que abren otra pestaña lo anuncian a lectores de pantalla y utilizan `noopener noreferrer`.
- Se conservan ubicación, modalidad laboral, perfiles profesionales y los cuatro aportes técnicos, con una presentación más compacta y enlaces a experiencia, proyectos y conocimientos.
- Los enlaces preparan una conversación en la aplicación de correo o WhatsApp; el visitante revisa y envía el mensaje. No existe formulario ni procesamiento nuevo de datos en el servidor.

## Archivos de esta etapa

- `src/app/data/service-offering.ts`: catálogo compartido de planes existentes.
- `src/app/data/professional-contact.ts`: teléfono mostrado y formato del catálogo existente.
- `src/app/pages/services/services.ts`, `services.html`, `services.css`, `services.spec.ts`.
- `src/app/pages/contact/contact.ts`, `contact.html`, `contact.css`, `contact.spec.ts`.
- `docs/etapa-e4-servicios-y-contacto.md` y `docs/revision-e4/`: informe, resultados, capturas y script reproducible de revisión.

Los cambios de otras etapas que ya estaban presentes en el árbol de trabajo no se revirtieron ni se publicaron. No se modificaron `package.json`, el lockfile, Netlify, el router ni los presupuestos de Angular durante E4.

## Validación realizada

1. `npm run build`: correcto, ocho rutas prerenderizadas, sin advertencias. Desaparece el aviso anterior de 15,90 kB del CSS de Contacto sin ampliar su presupuesto de 14 kB.
2. `npm test -- --watch=false --reporters=dot`: 40 pruebas correctas en 14 archivos. Incluyen la conservación de precios/prestaciones, enlaces de los tres planes, separación de motivos de contacto, actualización del plan en navegación, rechazo de identificadores desconocidos, protección de enlaces externos y acceso al CV.
3. Chrome local sobre el build de producción: ocho rutas generales a 320, 375, 390, 768, 1024 y 1440 px. Las 48 combinaciones tienen un único main y h1, sin desbordamiento horizontal.
4. Los tres planes se abrieron desde sus enlaces enfocados mediante Enter. Se verificaron URL, fragmento de cotización, precio mostrado y mensajes preparados de WhatsApp y correo. También se comprobó restablecer la consulta e ignorar un plan desconocido.
5. Servicios y Contacto se comprobaron a 1440 px con tamaño raíz de texto al 200 %, sin desbordamiento. Esta prueba de ampliación de texto no se presenta como zoom nativo del navegador ni como auditoría WCAG completa.
6. HTTP 200 al descargar el PDF. SHA256 del CV conservado: `90afb7f14c0b121bc5caa67333ae468275a909e728f00c0c00ea4f28ded781ad`.
7. Sin excepciones ni errores de consola registrados en el recorrido probado. Se revisaron capturas de escritorio y móvil, incluidos planes, consulta seleccionada y canales de contacto.
8. `git diff --check`: correcto.

Evidencia: `docs/revision-e4/verificacion.json` y diez capturas PNG. Reproducción desde la raíz del repositorio, tras compilar: `node docs/revision-e4/verificar.cjs`. Requiere Node con WebSocket y fetch, Chrome instalado en la ruta indicada por el script y el puerto 4198 disponible. Inicia procesos propios y los cierra al finalizar; no envía correos ni mensajes.

Los chunks de producción de Contacto y Servicios pasan de 32,13/20,16 kB en E3 a 11,28/9,80 kB respectivamente. Son tamaños de código generado, no mediciones de experiencia de usuario ni de Core Web Vitals.

## Pendientes

E4 cumple los criterios de aceptación previstos. La siguiente etapa F requiere autorización y abordará SEO por página, metadatos sociales, canonical/sitemap/robots, renderizado del detalle y respuesta para proyectos inexistentes según el plan. La medición de rendimiento e imágenes corresponde a G. La revisión local no valida por sí sola el comportamiento del adaptador de Netlify, dispositivos reales ni lectores de pantalla.

No se cambió el CV, no se incorporaron dependencias y no se alteró la oferta comercial existente. No se ejecutaron push, despliegues ni envíos de mensajes.
