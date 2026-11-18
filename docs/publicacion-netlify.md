# Publicación en Netlify

Publicación autorizada por el propietario y completada el 27 de octubre de 2026.

- Sitio: https://portafolioprofesionaljuanpablorojasc.netlify.app/
- Proyecto existente: `6f9153a2-3a6d-408f-a8ef-b3530078c7fc`.
- Despliegue publicado: `6ae0f13b344667e673eaa940`.
- Publicado a las `2026-10-27T18:51:40.801Z` (12:51 de Costa Rica).
- [Registro del despliegue en Netlify](https://app.netlify.com/projects/portafolioprofesionaljuanpablorojasc/deploys/6ae0f13b344667e673eaa940).

Se utilizó Netlify CLI 27.15.0 desde la caché de npm, sin añadirla a las dependencias del proyecto. El propietario autorizó el acceso mediante el navegador; no se guardaron credenciales en el repositorio ni en este informe.

## Procedimiento

1. Se identificó el proyecto por su nombre y dirección, y se registró el despliegue anterior.
2. Se compiló y subió una vista previa con contexto de producción y el adaptador de Angular.
3. Se comprobó la vista previa en HTTP y Chrome.
4. Se publicó exactamente ese despliegue mediante `restoreSiteDeploy`, sin reconstruir otro artefacto.
5. Se confirmó por API que el proyecto apunta al despliegue correcto y se repitió la revisión sobre el dominio principal.

## Comprobaciones de producción

- 17 páginas con HTTP 200, contenido renderizado, títulos y metadatos coherentes.
- Cuatro rutas inexistentes/retiradas con HTTP 404 y `noindex`, sin redirección al inicio.
- Sitemap con las 17 URL canónicas y robots accesibles.
- 68 combinaciones de ruta y ancho comprobadas en Chrome, sin desbordamiento.
- Trece variantes de imágenes descargadas y comparadas por hash con los archivos locales; caché `immutable` confirmada.
- Imagen social y favicons accesibles, cabecera `nosniff` presente.
- CV con HTTP 200 y SHA256 `90afb7f14c0b121bc5caa67333ae468275a909e728f00c0c00ea4f28ded781ad`.
- Navegación entre proyectos, cotización con parámetro, recuperación desde 404 y metadatos al navegar comprobados.
- Sin errores inesperados de consola. El aviso de red de la ruta 404 intencional se registra por separado.

Los resultados están en `docs/publicacion/preview/verificacion.json` y `docs/publicacion/produccion/verificacion.json`. La revisión es reproducible con `node docs/publicacion/verificar.cjs URL etiqueta`, usando Chrome local. El registro de identificadores y fechas está en `docs/publicacion/netlify.json`.

## Recuperación y repositorio

El despliegue anterior conservado es `6aca79a77b99140008644f73`, publicado el 10 de octubre de 2026. Puede seleccionarse desde el historial de Netlify si se autoriza volver a esa versión. No se ejecutó una reversión.

Esta publicación fue directa en Netlify. No se hizo commit ni push a GitHub: los cambios de código continúan en el árbol de trabajo local. El sitio mantiene su conexión con GitHub, de modo que los futuros despliegues desde ese repositorio utilizarán el código que se haya subido allí.

Se añadió `/.netlify/` a `.gitignore` para excluir los artefactos de compilación y estado local generados por la CLI. El CV, los contactos y las restricciones de información institucional se mantuvieron.
