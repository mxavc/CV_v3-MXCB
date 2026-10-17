# CV · Marlon Xavier Chimarro Bermeo

Currículum personal en una sola página. Es un sitio 100 % estático: HTML5 semántico, CSS y un poco de JavaScript vanilla, sin frameworks, sin dependencias y sin paso de build. Las decisiones de diseño siguen las 10 heurísticas de usabilidad de Jakob Nielsen; el detalle está en [HEURISTICAS.md](HEURISTICAS.md).

## Estructura

```
.
├── index.html          Contenido del CV (todas las secciones)
├── 404.html            Página de error con enlace al inicio (estilos en línea)
├── .nojekyll           Hace que GitHub Pages sirva los archivos tal cual, sin Jekyll
├── css/styles.css      Variables de diseño, layout, tema oscuro e impresión
├── js/main.js          Mejoras opcionales (tema, alto de la cabecera, copiar email, etc.)
├── assets/
│   └── foto-perfil.jpg Fotografía de perfil
├── HEURISTICAS.md      Cómo se aplica cada heurística de Nielsen
└── README.md
```

Todas las rutas son **relativas** (`css/styles.css`, `assets/...`, `#seccion`), así que el sitio funciona igual en la raíz de un dominio, en un subdirectorio (`/<nombre-repo>/`) o abriendo `index.html` directamente desde el disco.

Si JavaScript está desactivado o falla, todo el contenido sigue visible. La clase `no-js` del elemento `<html>` oculta los controles que dependen de JS (copiar, tema e imprimir); la navegación siempre está a la vista.

## Cómo editar el contenido

Todo el texto está en `index.html`, organizado por secciones con comentarios (`<!-- ============ EXPERIENCIA ============ -->`).

- **Añadir una experiencia, estudio o proyecto:** copia un bloque `<article class="entry">…</article>` completo de la misma sección y cambia el texto. Mantén el **orden cronológico inverso** (lo más reciente arriba). Las fechas usan `<time datetime="AAAA-MM">`.
- **Datos pendientes:** se marcan con `<mark class="todo">[COMPLETAR: …]</mark>`, que se ve resaltado en pantalla y en el papel. Para encontrarlos todos, busca `COMPLETAR` en el archivo. Al completar un dato, sustituye todo el `<mark>` por el texto real.
- **Enlaces externos:** usa siempre `target="_blank" rel="noopener noreferrer"`, el ícono `icon-ext` y el texto oculto `<span class="sr-only">(abre en pestaña nueva)</span>`.
- **Nueva sección:** crea `<section class="section" id="x" aria-labelledby="x-titulo">` con su `<h2 class="section-title" id="x-titulo">`, y añade `<li><a class="nav-link" href="#x">…</a></li>` en el `<nav>`. El resaltado de la sección activa la detecta automáticamente.
- **Número de WhatsApp:** aparece en dos enlaces `https://wa.me/593999905758` (el botón flotante `.whatsapp-fab` y la fila de Contacto). Usa el formato internacional sin `+`, espacios ni guiones, y actualiza también el texto visible y el `title`.
- **Ancho y columnas:** el contenido ocupa todo el ancho de la pantalla. `--page-gutter` controla el margen lateral y `--col-min` el ancho mínimo de cada columna; las secciones agregan o quitan columnas solas al redimensionar.
- **Colores, tipografías y espaciado:** se cambian solo en las variables de `:root` al inicio de `css/styles.css`. El tema oscuro redefine esas mismas variables en dos bloques (preferencia del sistema y elección manual) que deben quedar iguales. Comprueba que el contraste del texto siga siendo ≥ 4.5:1.
- **Foto:** reemplaza `assets/foto-perfil.jpg` y actualiza los atributos `width` y `height` del `<img>` con las dimensiones reales de la imagen.

## Imprimir o guardar como PDF

Usa el botón **Imprimir / PDF** de la cabecera (o Ctrl+P / ⌘+P) y elige «Guardar como PDF». La hoja `@media print` genera una versión en blanco y negro sin navegación ni botones, y muestra la URL de los enlaces externos.

## Ver en local

Abre `index.html` con doble clic. Para probar el botón **Copiar email**, que necesita un contexto seguro (https o localhost), sirve la carpeta con cualquier servidor local, por ejemplo:

```
python -m http.server 8000
```

y abre <http://localhost:8000/>.

## Publicar

### GitHub Pages
1. Sube el contenido del repositorio a GitHub (rama `main`).
2. En el repositorio entra a **Settings → Pages**.
3. En **Build and deployment** elige **Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
4. Tras uno o dos minutos el sitio estará en `https://<usuario>.github.io/<nombre-repo>/`.

`404.html` se sirve automáticamente para cualquier ruta inexistente. Su botón «Ir al inicio» calcula la raíz del proyecto a partir del primer segmento de la ruta. Si publicas en un sitio de usuario (repositorio `<usuario>.github.io`, servido en la raíz del dominio), cambia ese script para que use siempre `'/'`.

### Otro servidor estático
Copia todos los archivos tal cual (incluido `assets/`) a la carpeta pública del servidor. Para que se muestre la página de error personalizada, configura el servidor para que use `404.html` (por ejemplo `ErrorDocument 404 /404.html` en Apache o `error_page 404 /404.html;` en Nginx). Fuera de `github.io`, el botón de la página 404 apunta a `./`.

## Accesibilidad

El objetivo es cumplir WCAG 2.2 AA: contraste ≥ 4.5:1 en ambos temas, foco visible, navegación completa por teclado, landmarks, `alt` en las imágenes, `aria-label` en los controles y respeto de `prefers-reduced-motion`.
