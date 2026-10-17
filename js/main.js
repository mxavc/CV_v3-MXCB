/* =========================================================
   Mejoras progresivas. Si este archivo no carga, todo el
   contenido sigue visible y navegable (ver .no-js en CSS).
   Cada bloque indica la heurística de Nielsen que atiende.
   ========================================================= */
(function () {
    'use strict';

    var root = document.documentElement;

    /* ---------- H3 Control y libertad: tema claro/oscuro reversible ---------- */
    var themeBtn = document.getElementById('theme-toggle');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

    function systemTheme() {
        return systemDark.matches ? 'dark' : 'light';
    }

    function activeTheme() {
        return root.getAttribute('data-theme') || systemTheme();
    }

    function renderTheme() {
        var current = activeTheme();
        var next = current === 'dark' ? 'claro' : 'oscuro';
        root.setAttribute('data-theme-active', current);
        if (themeBtn) {
            themeBtn.querySelector('.theme-label').textContent = 'Modo ' + next;
            themeBtn.setAttribute('aria-label', 'Cambiar a modo ' + next);
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            var next = activeTheme() === 'dark' ? 'light' : 'dark';
            // Si la elección coincide con el sistema, se vuelve a "seguir al sistema".
            try {
                if (next === systemTheme()) {
                    root.removeAttribute('data-theme');
                    localStorage.removeItem('tema');
                } else {
                    root.setAttribute('data-theme', next);
                    localStorage.setItem('tema', next);
                }
            } catch (e) {
                root.setAttribute('data-theme', next);
            }
            renderTheme();
        });
    }

    if (systemDark.addEventListener) {
        systemDark.addEventListener('change', renderTheme);
    }
    renderTheme();

    /* ---------- H6 Reconocer: la cabecera fija nunca tapa el destino de un enlace ---------- */
    // Su alto cambia con el ancho (las secciones pueden ocupar dos filas): se mide en vivo.
    var header = document.querySelector('.site-header');

    if (header && 'ResizeObserver' in window) {
        new ResizeObserver(function () {
            root.style.setProperty('--header-h', header.offsetHeight + 'px');
        }).observe(header);
    }

    /* ---------- H1 Visibilidad del estado: sección activa en la navegación ---------- */
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
    var sections = navLinks
        .map(function (link) { return document.querySelector(link.getAttribute('href')); })
        .filter(Boolean);

    function markActive(id) {
        navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + id) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    if ('IntersectionObserver' in window && sections.length) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) markActive(entry.target.id);
            });
        }, { rootMargin: '-35% 0px -60% 0px' });
        sections.forEach(function (s) { observer.observe(s); });
    }

    /* ---------- H1 + H9: copiar email con feedback y alternativa ante error ---------- */
    var copyBtn = document.getElementById('copy-email');
    var copyStatus = document.getElementById('copy-status');
    var emailLink = document.getElementById('email');
    var statusTimer;

    function showStatus(msg, isError) {
        copyStatus.textContent = msg;
        copyStatus.classList.toggle('is-error', !!isError);
        clearTimeout(statusTimer);
        if (!isError) {
            statusTimer = setTimeout(function () { copyStatus.textContent = ''; }, 3000);
        }
    }

    function copyFailed() {
        // El email queda seleccionado y visible para copiarlo manualmente.
        var range = document.createRange();
        range.selectNodeContents(emailLink);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        showStatus('No se pudo copiar automáticamente. El email está seleccionado: pulsa Ctrl+C (⌘+C en Mac).', true);
    }

    if (copyBtn && copyStatus && emailLink) {
        copyBtn.addEventListener('click', function () {
            var text = copyBtn.getAttribute('data-copy');
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(function () {
                    showStatus('Copiado ✓', false);
                }, copyFailed);
            } else {
                copyFailed();
            }
        });
    }

    /* ---------- H7 Flexibilidad: imprimir / guardar como PDF ---------- */
    var printBtn = document.getElementById('print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function () {
            window.print();
        });
    }

    /* ---------- H3 Control y libertad: "Volver arriba" aparece al bajar ---------- */
    var toTop = document.querySelector('.to-top');
    var progressBar = document.querySelector('.scroll-progress');
    var ticking = false;

    function updateToTop() {
        toTop.classList.toggle('is-visible', window.scrollY > 600);
        // H1: barra de progreso de lectura bajo la cabecera
        if (progressBar) {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.setProperty('--progress', max > 0 ? Math.min(window.scrollY / max, 1) : 0);
        }
        ticking = false;
    }

    if (toTop) {
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateToTop);
                ticking = true;
            }
        }, { passive: true });
        updateToTop();
    }

    /* ---------- H8 Estética: efectos decorativos (nunca ocultan contenido sin JS) ---------- */
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Aparición suave de tarjetas y títulos al entrar en pantalla.
    var revealables = Array.prototype.slice.call(
        document.querySelectorAll('.section-title, .entry, .skill-group, .contact-list, .profile-about .prose, .profile-about .tag-list')
    );

    if (!reduceMotion && 'IntersectionObserver' in window) {
        revealables.forEach(function (el) {
            var siblings = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
            el.style.setProperty('--delay', Math.min(siblings, 4) * 90 + 'ms');
            el.classList.add('reveal');
        });

        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        revealables.forEach(function (el) { revealObserver.observe(el); });

        // Al imprimir, todo debe estar visible aunque no se haya hecho scroll.
        window.addEventListener('beforeprint', function () {
            revealables.forEach(function (el) { el.classList.add('is-in'); });
        });
    }

    // Brillo que sigue al puntero sobre las tarjetas.
    if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.entry, .skill-group').forEach(function (card) {
            card.addEventListener('pointermove', function (e) {
                var r = card.getBoundingClientRect();
                card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
                card.style.setProperty('--my', (e.clientY - r.top) + 'px');
            });
        });
    }
})();
