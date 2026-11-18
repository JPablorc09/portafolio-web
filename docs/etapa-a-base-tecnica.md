# Etapa A: base técnica y seguridad

Se conserva Angular 21, la arquitectura standalone, las rutas existentes y el
runtime de Netlify. No se modifica el contenido profesional ni el CV.

## Dependencias

- Framework Angular y compiler-cli: 21.2.25.
- Angular CLI, build y SSR: 21.2.28.
- Express: 5.3.0; Vitest: 4.1.12; TypeScript: 5.9.3.
- `package-lock.json` registra las versiones reproducibles.

El override de `@angular/build > undici` fija 7.30.1 porque build 21.2.28
depende de 7.29.1, afectada por avisos de seguridad. El cambio se limita al
compilador; no añade una dependencia directa de la aplicación. Revisar su
necesidad cuando Angular build incorpore una versión corregida.

No usar `npm audit fix --force`: durante esta revisión npm propuso bajar
`@angular/build` a Angular 20 para resolver el aviso transitivo.

## Validación local

```bash
npm ci
npm audit
npm run build
npm test -- --watch=false
```

Vitest utiliza un máximo de dos workers para limitar el consumo de recursos.
Las pruebas de componentes con RouterLink proporcionan un router de prueba.
La prueba raíz verifica la portada y el detalle `/proyectos/ventas` mediante
las rutas reales con carga diferida. jsdom no implementa `window.scrollTo`;
se sustituye únicamente durante esa prueba.

El presupuesto de CSS de Contacto conserva su advertencia. Optimizarlo pertenece
a la etapa visual y de rendimiento; no se amplía el límite para ocultarla.

La comprobación local no sustituye una vista previa de despliegue en Netlify,
que requiere autorización independiente.

## Resultado de la validación

- `npm audit` y `npm audit --omit=dev`: cero vulnerabilidades reportadas.
- `npm test -- --watch=false`: nueve archivos y once pruebas aprobados.
- `npm run build`: compilación correcta; ocho rutas prerenderizadas. Se
  comprobó que sus archivos HTML contienen H1 y contenido renderizado.
- El servidor Express compilado respondió 200 en las ocho páginas generales,
  `/proyectos/ventas` y el PDF del CV. En las páginas entregó la plantilla
  cliente, no los documentos prerenderizados: esa prueba confirma disponibilidad
  HTTP, pero no valida SSR ni equivalencia con Netlify. Revisar esta diferencia
  en la etapa de renderizado y despliegue.
- Advertencia pendiente: Contacto genera 15,90 kB de CSS frente a 14 kB de
  presupuesto. No se modificaron sus estilos.
- npm avisó de un archivo temporal de Rollup bloqueado en Windows durante la
  limpieza. La instalación terminó y compilación y pruebas posteriores pasaron;
  no se cerraron procesos ajenos ni se forzó la eliminación.
