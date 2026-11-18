# Actualización del portafolio: VendeTico

Fecha: 18 de noviembre de 2026.

Sustituido el registro Sistema de Ventas e Inventario por VendeTico, sin duplicar proyectos ni eliminar otros. Nueva ruta /proyectos/vendetico; /proyectos/ventas devuelve 301 a la nueva ficha en el servidor Angular. Se configuró también una redirección explícita 301 en netlify.toml. Esta configuración de Netlify está pendiente de comprobar en un despliegue autorizado.

## Cambios

- Portada real del punto de venta, tarjeta con categoría, estado beta, etiqueta Desarrollo asistido por IA y enlace Explorar sistema. Se aclara que los módulos requieren autenticación.
- Caso de estudio con problema, solución, tecnologías verificadas, funcionalidades y límites de validación.
- Metodología basada en la participación confirmada por el autor: requerimientos, reglas de negocio, prompts, pruebas, validación y despliegue; Gemini para estructurar prompts y Claude como asistencia de generación de código. No se atribuye este desarrollo a Codex.
- Extensiones opcionales del modelo Project para metodología, títulos de imágenes, etiqueta IA, nota de estado y texto del enlace externo. Los demás proyectos siguen siendo compatibles.
- Galería con diez capturas reales, títulos y textos alternativos. Se conserva object-fit: contain, carga diferida, navegación por flechas, Escape, foco e inert del lightbox existente.
- Inicio y habilidades enlazan a VendeTico. Metadatos dinámicos, canonical e imagen Open Graph/Twitter específicos. Sitemap generado con la nueva URL y sin la antigua.
- Sin dependencias nuevas. El generador opcional de imágenes conserva el manifiesto de capturas preparadas de VendeTico.

## Evidencia técnica

Código inspeccionado en D:/ProyectosClaude/EmprendimientoWeb/MicroSaaS/pos-pymes.

| Tecnología/organización | Evidencia |
| --- | --- |
| Angular 19.2.25 publicado | Atributo ng-version del documento de acceso |
| Angular y TypeScript | app-pos/package.json y fuentes .ts |
| Supabase | @supabase/supabase-js en package.json y servicios que consultan tablas y funciones RPC |
| PostgreSQL | sql/001_esquema_tablas.sql y demás scripts SQL |
| Políticas de acceso por negocio | sql/002_seguridad_rls_auditoria.sql; presencia contrastada en código, no auditoría del despliegue |
| Componentes standalone y carga bajo demanda | app-pos/src/app/app.routes.ts y componentes |
| Cloudflare Pages | URL pública vendetico.pages.dev; despliegue confirmado por el autor |

No se heredaron afirmaciones de ASP.NET Core, C#, SQL Server o JWT del proyecto reemplazado. No se leyeron archivos de secretos ni se almacenaron credenciales o tokens. La sesión de autenticación se mantuvo únicamente en el perfil temporal del navegador dedicado, fuera del repositorio.

## Funciones verificadas

Inspección de solo lectura en una sesión iniciada manualmente por el autor, con autorización expresa para capturar datos ficticios.

- Punto de venta: catálogo, buscador, precios, existencias y área de venta actual.
- Resumen: indicadores, gráfico de ventas y alertas de existencias.
- Productos: catálogo y controles de acceso a categorías.
- Inventario: cantidades, alertas y acceso a movimientos.
- Clientes: registro ficticio y consulta de fiados.
- Proveedores: vista y estado vacío; no se inventaron proveedores.
- Caja: estado de turno y controles de consulta/operación visibles.
- Compras por trimestre: filtros, resumen y estado vacío; no se simuló una exportación exitosa.

El código contiene servicios, rutas y controles de cobro, compras, categorías, equipo y configuración. Su presencia no significa que se hayan ejecutado ni probado integralmente.

No se realizaron ventas, cobros, cierres de caja, compras, invitaciones, modificaciones de inventario ni eliminaciones. No se probaron transacciones de suscripción. No se capturaron páginas de equipo, configuración del negocio o administración de plataforma por su relación con datos de cuenta y configuración; tampoco se inventó una pantalla independiente de historial de ventas.

## Capturas incluidas

Recursos públicos en src/assets/images/vendetico/. Las capturas originales de evidencia están en docs/vendetico/.

| Recurso | Vista real |
| --- | --- |
| vendetico-principal.webp | Punto de venta |
| vendetico-dashboard.webp | Resumen del negocio |
| vendetico-productos.webp | Productos y acceso a categorías |
| vendetico-inventario.webp | Existencias y alertas |
| vendetico-clientes.webp | Cliente ficticio y fiados |
| vendetico-caja.webp | Consulta del turno de caja |
| vendetico-reportes.webp | Compras por trimestre |
| vendetico-login.webp | Acceso público |
| vendetico-mobile.webp | Punto de venta móvil |
| vendetico-resumen-mobile.webp | Resumen móvil |

Ocho capturas de escritorio a 1440 × 900 y dos móviles a 390 × 844. WebP sin pérdida generado mediante cwebp ya disponible; dieciséis variantes de 480/960 px y diez respaldos independientes completan 36 archivos. La versión natural conserva legibilidad al ampliar; las miniaturas usan srcset y sizes.

Las capturas son del sistema real publicado, sin generación de imágenes mediante IA. El correo de la cuenta se ocultó temporalmente en el DOM antes de capturar; no se alteraron registros del sistema. Los productos, precios, saldos y el Cliente Ejemplo corresponden a los datos ficticios autorizados. No contienen contraseñas, tokens ni configuraciones privadas. La ilustración comercial del login conserva su rótulo Vista de ejemplo y no se presenta como dashboard operativo.

angular.json ya copia src/assets a assets. Se verificaron los archivos servidos por el build local byte a byte. Su comprobación en Netlify queda pendiente del próximo despliegue autorizado.

## Validación final

- npm run build: correcto; 17 rutas prerenderizadas y sitemap/robots generados, sin advertencias de compilación.
- npm test -- --watch=false: 46 pruebas correctas en 15 archivos.
- node docs/vendetico/verificar.cjs: correcto; 17 páginas HTTP 200, 36 recursos de imagen HTTP 200 y contenido idéntico a los archivos fuente.
- Redirección SSR antigua: HTTP 301, Location /proyectos/vendetico.
- Doce combinaciones responsive: inicio, catálogo, VendeTico y habilidades a 390, 768 y 1440 px, sin desbordamiento horizontal.
- Capturas del caso de estudio revisadas visualmente en escritorio y móvil.
- Galería: apertura, flecha derecha, Escape y restauración de foco comprobados en Chrome. Las pruebas existentes también verifican contención de foco y confidencialidad.
- Canonical, metadatos e imagen para compartir contrastados en HTML generado.
- Proyectos institucionales sin galería ni enlaces internos expuestos; avisos de confidencialidad conservados.
- Sin errores de consola en las rutas revisadas.
- CV intacto: SHA256 90afb7f14c0b121bc5caa67333ae468275a909e728f00c0c00ea4f28ded781ad.
- git diff --check: correcto; Git muestra avisos de normalización LF/CRLF en cambios preexistentes.

Durante la implementación se detectaron y corrigieron dos problemas: un destino relativo incorrecto en la redirección SSR y el registro de los respaldos de imagen. Los resultados anteriores corresponden a la validación final posterior a las correcciones.

No se afirma una auditoría completa de seguridad, compatibilidad universal ni pruebas de escritura de extremo a extremo. No se certifica cumplimiento tributario. El sistema se mantiene identificado como beta.

## Archivos

La lista exacta de archivos modificados en esta implementación y los 36 recursos creados está en archivos-implementacion.json. Evidencias de navegación en modulos-verificados.json (correo omitido), manifiesto en imagenes.json y comprobaciones finales en validacion.json. Los cambios de modernización anteriores siguen presentes y no se han revertido.

## Publicación posterior en GitHub

Rama actual: main. Remoto origin: https://github.com/JPablorc09/portafolio-web.git.

No se ejecutaron git add, commit, push ni despliegues. Dado que también hay cambios locales previos sin confirmar, revisar primero todo lo que se incluirá. Para publicar la actualización completa del portafolio después de revisarla:

```powershell
git status --short
git diff --check
git diff
npm test -- --watch=false
npm run build
git add .gitignore angular.json package.json package-lock.json netlify.toml public scripts src vitest.config.ts docs
git diff --cached --stat
git diff --cached
git commit -m "Actualiza portafolio e incorpora VendeTico con evidencias reales"
git push origin main
```

Este conjunto incluye la modernización pendiente anterior. No ejecutar si se desea publicar únicamente VendeTico sin revisar primero cómo separar ese historial. El push podría activar el despliegue automático del sitio conectado a Netlify.
