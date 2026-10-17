# Heurísticas de Nielsen aplicadas

Cada fila describe una decisión concreta y verificable y dónde está implementada. Los números de línea corresponden a la versión actual de cada archivo.

| # | Heurística | Implementación | Archivo y selector / línea |
|---|---|---|---|
| 1 | Visibilidad del estado del sistema | Al hacer scroll, el enlace de la sección visible se resalta (color, negrita, fondo y subrayado) y recibe `aria-current="true"`. | `js/main.js` L67–90 (`IntersectionObserver`); `css/styles.css` L279 `.nav-link[aria-current="true"]` |
| 1 | | Estados claros de hover, active y foco en enlaces y botones. | `css/styles.css` L151 `:focus-visible`, L252 `.nav-link:hover`, L257 `.nav-link:active`, L587 `.btn:hover`, L592 `.btn:active` |
| 1 | | Al copiar el email aparece «Copiado ✓» en una región `role="status" aria-live="polite"`, que se borra a los 3 s. | `index.html` L309 `#copy-status`; `js/main.js` L123–159 |
| 1 | | El botón de tema muestra la acción disponible («Modo claro» / «Modo oscuro») y su ícono. | `js/main.js` L23–31 `renderTheme()` |
| 2 | Coincidencia con el mundo real | Secciones convencionales de un CV: Perfil, Experiencia, Educación, Proyectos, Habilidades y Contacto. | `index.html` L66, L115, L172, L195, L254, L291 |
| 2 | | Fechas en formato local («nov. 2019 – dic. 2021») con `<time datetime>`. Lenguaje claro en español (`lang="es"`). Número de WhatsApp en formato nacional legible («+593 99 990 5758»). | `index.html` L2, L157, L327 |
| 2 | | Orden cronológico inverso. Proyectos: del 5 al 1 de la numeración original. Experiencia: se mantiene el orden original hasta completar las fechas (ver `[COMPLETAR]`). | `index.html` L115–251 |
| 3 | Control y libertad del usuario | Botón flotante «Volver arriba», que aparece al bajar 600 px. Sin JS siempre está visible. | `index.html` L364 `.to-top`; `css/styles.css` L673; `js/main.js` L170–187 |
| 3 | | Tema reversible: si la elección coincide con la del sistema, se borra la preferencia y se vuelve a seguir al sistema. | `js/main.js` L33–50 |
| 3 | | Los enlaces externos (LinkedIn y WhatsApp) llevan el ícono ↗ o la etiqueta, el texto oculto «(abre en pestaña nueva)», `target="_blank"` y `rel="noopener noreferrer"`. WhatsApp abre un chat vacío y nada se envía sin la acción del visitante. | `index.html` L82, L327, L340, L368 |
| 4 | Consistencia y estándares | Un único componente `article.entry` (encabezado, organización, meta y lista) para experiencia, educación y proyectos. | `index.html` L120, L177, L200…; `css/styles.css` L431 `.entry` |
| 4 | | El nombre de la cabecera lleva al inicio (`href="#inicio"`). | `index.html` L30 `.brand` |
| 4 | | Convenciones web: enlaces subrayados, `mailto:` para correo, `wa.me` (enlace oficial de WhatsApp), landmarks `header`/`nav`/`main`/`footer`, un único `h1` y jerarquía h1→h2→h3 sin saltos. | `index.html` L28, L38, L63, L358 |
| 4 | | Los dos botones flotantes comparten el mismo componente `.fab` (forma, tamaño y posición). | `index.html` L363–372; `css/styles.css` L625 `.floating-actions` |
| 5 | Prevención de errores | Los `mailto:` y el enlace de LinkedIn se copiaron literalmente de los datos originales. El número de WhatsApp lo dio el autor y está en formato internacional sin `+` ni espacios, como exige `wa.me`. Una validación automática confirmó que todas las anclas `#` tienen destino y que ninguna ruta es absoluta. | `index.html` L76, L304, L318, L327 |
| 5 | | El botón de imprimir explica qué hace y en qué formato termina: «Abre el diálogo de impresión. Elige «Guardar como PDF»…». *El botón de descarga de PDF se omitió por decisión del autor.* | `index.html` L54 `#print-btn` |
| 5 | | Los controles que dependen de JS se ocultan si JS no carga, así que no hay botones que no funcionen. | `css/styles.css` L832 `.no-js .js-only` |
| 6 | Reconocer antes que recordar | Las secciones del CV están siempre a la vista en la cabecera (sin menú oculto). En tablet y escritorio la cabecera es fija (`position: sticky`); `main.js` mide su alto en vivo y `scroll-padding-top` evita que tape el destino o el foco. En móvil no se fija para no quitar espacio. | `css/styles.css` L204 `.site-header`, L237 `.menu-panel`, L117; `js/main.js` L57–65 |
| 6 | | Todos los íconos van acompañados de texto visible (Correo, WhatsApp, LinkedIn, GitHub, Imprimir / PDF, Volver arriba). Los SVG llevan `aria-hidden="true"`. | `index.html` L30–51, L69–83, L293–348, L358–367 |
| 7 | Flexibilidad y eficiencia | Skip link «Saltar al contenido», visible al recibir foco. | `index.html` L26; `css/styles.css` L179 `.skip-link` |
| 7 | | Anclas compartibles por sección: cada `h2` lleva un enlace `#` que pone la URL de la sección en la barra de direcciones. | `index.html` L95 y siguientes `.anchor`; `css/styles.css` L402 |
| 7 | | Atajos de contacto siempre a mano: botón flotante de WhatsApp en la esquina inferior derecha, visible en cualquier punto del scroll. Correo y LinkedIn están junto al nombre. | `index.html` L368 `.whatsapp-fab`, L74–88; `css/styles.css` L625, L652 |
| 7 | | Acceso rápido a imprimir o guardar como PDF desde la cabecera (o Ctrl+P). | `index.html` L54; `js/main.js` L161–168 |
| 8 | Diseño estético y minimalista | Dos familias tipográficas (Georgia para títulos, fuente del sistema para texto). Paleta: púrpura oscuro y lavanda más neutros; el verde de WhatsApp se usa solo en su botón (3 colores en total). Todo está en variables de `:root`. | `css/styles.css` L11–62 (L13, L15, L25, L30–31) |
| 8 | | Toda la escala está en `rem` y la raíz crece con la pantalla (`clamp`, de 16px en móvil hasta 2.5× en pantallas anchas), así el contenido ocupa más espacio sin romper las proporciones. El contenido se centra con un ancho máximo (`--page-max`) y márgenes fluidos (`--page-gutter`); títulos, perfil, habilidades y pie van centrados, y el texto largo de las entradas queda a la izquierda para leerse bien. Las secciones se separan con un espaciado amplio (`--sp-9`) y cada una es una cuadrícula de 1 o 2 columnas (`--col-min`). El texto usa la mitad de esa escala (con un mínimo en px para móvil) y la foto de perfil es grande (hasta 520px). | `css/styles.css` L113, L32–40, L55–58, L303 `.section` |
| 9 | Reconocer, diagnosticar y recuperarse de errores | `404.html` explica el error en lenguaje claro, muestra la ruta solicitada y ofrece un botón «Ir al inicio del CV». Sus estilos van en línea para que funcione en cualquier profundidad de ruta. | `404.html` L88–103 |
| 9 | | Si el portapapeles falla, el email queda seleccionado y se indica «pulsa Ctrl+C (⌘+C en Mac)». Sin JS, el email es texto plano seleccionable con `mailto:`. | `js/main.js` L138–146 `copyFailed()`; `css/styles.css` L564 `.is-error` |
| 10 | Ayuda y documentación | `title` y `aria-label` descriptivos en todos los controles (p. ej. «Cambiar a modo oscuro», «Escribir por WhatsApp al +593 99 990 5758 (abre en pestaña nueva)»). | `index.html` L30, L44, L49, L90, L300, L363 |
| 10 | | Sección Contacto explícita, con instrucciones («La forma más rápida de contactarme es por correo»). | `index.html` L291–355 |
| 10 | | `README.md` explica la estructura, cómo editar el contenido y cómo publicar en GitHub Pages o en otro servidor. | `README.md` |

## Accesibilidad (WCAG 2.2 AA), transversal

- **Contraste:** 134 nodos de texto medidos con los estilos calculados, todos ≥ 4.5:1. El mínimo es 6.66:1 en tema claro y 7.76:1 en tema oscuro; el botón de WhatsApp tiene 7.7:1.
- **Teclado:** el recorrido con Tab completo cubre 25 elementos a 1440 px (termina en «Volver arriba» y «WhatsApp»), todos con `outline` de 3 px visible.
- **Tamaño de los objetivos táctiles:** los botones flotantes miden 44 px de alto.
- **Movimiento:** `prefers-reduced-motion` desactiva el scroll suave y las transiciones (`css/styles.css` L837).
- **Impresión:** blanco y negro, sin navegación ni botones flotantes, la foto en escala de grises y las URL externas visibles (`css/styles.css` L856).
