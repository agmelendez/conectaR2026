/**
 * ConectaR 2026 - Custom Interactions
 * Archivo de JavaScript para manejar todas las interacciones dinámicas del sitio
 */

// ==========================================
// 1. INICIALIZACIÓN DE AOS (Animate On Scroll)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS con configuración personalizada
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,      // Duración de las animaciones en milisegundos
            once: true,         // Animar solo una vez (no repetir al hacer scroll hacia arriba)
            offset: 100,        // Offset (en px) desde el punto de activación original
            easing: 'ease-out-cubic', // Función de easing
            delay: 0            // Delay inicial
        });
    }

    // Inicializar todas las funcionalidades
    initCountdown();
    initStickyHeader();
    initAccordion();
});

// ==========================================
// 2. CONTADOR REGRESIVO
// ==========================================
function initCountdown() {
    const countdownElement = document.getElementById('contador-regresivo');

    if (!countdownElement) return;

    // Fecha del evento: 21 de Octubre de 2026 a las 8:00 AM (Costa Rica Time - UTC-6)
    const eventDate = new Date('2026-10-21T08:00:00-06:00');

    // Función para actualizar el contador
    function updateCountdown() {
        const now = new Date();
        const timeRemaining = eventDate - now;

        // Si ya pasó el evento
        if (timeRemaining <= 0) {
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <div class="countdown-number">¡El evento ha comenzado!</div>
                </div>
            `;
            return;
        }

        // Calcular días, horas, minutos y segundos
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Formatear números con ceros a la izquierda
        const formatNumber = (num) => num.toString().padStart(2, '0');

        // Actualizar el HTML
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <div class="countdown-number">${days}</div>
                <div class="countdown-label">Días</div>
            </div>
            <div class="countdown-separator">:</div>
            <div class="countdown-item">
                <div class="countdown-number">${formatNumber(hours)}</div>
                <div class="countdown-label">Horas</div>
            </div>
            <div class="countdown-separator">:</div>
            <div class="countdown-item">
                <div class="countdown-number">${formatNumber(minutes)}</div>
                <div class="countdown-label">Minutos</div>
            </div>
            <div class="countdown-separator">:</div>
            <div class="countdown-item">
                <div class="countdown-number">${formatNumber(seconds)}</div>
                <div class="countdown-label">Segundos</div>
            </div>
        `;
    }

    // Actualizar inmediatamente
    updateCountdown();

    // Actualizar cada segundo
    setInterval(updateCountdown, 1000);
}

// ==========================================
// 3. MENÚ STICKY CON EFECTO DE SCROLL
// ==========================================
function initStickyHeader() {
    const header = document.querySelector('.site-header');

    if (!header) return;

    let lastScrollTop = 0;
    let scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Agregar clase 'scrolled' cuando el usuario hace scroll hacia abajo
        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
}

// ==========================================
// 4. ACORDEÓN PARA SUBTEMAS
// ==========================================
function initAccordion() {
    const toggleButton = document.getElementById('toggle-subtopics');
    const content = document.getElementById('subtopics-content');

    if (!toggleButton || !content) return;

    toggleButton.addEventListener('click', function() {
        // Alternar la clase 'show' en el contenido
        content.classList.toggle('show');

        // Alternar la clase 'active' en el botón (para rotar el ícono)
        toggleButton.classList.toggle('active');

        // Cambiar el texto del botón
        const isOpen = content.classList.contains('show');

        if (isOpen) {
            toggleButton.innerHTML = `
                Ocultar Áreas de Interés
                <i class="fas fa-chevron-up"></i>
            `;
        } else {
            toggleButton.innerHTML = `
                Ver Áreas de Interés Adicionales
                <i class="fas fa-chevron-down"></i>
            `;
        }
    });
}

// ==========================================
// 5. SMOOTH SCROLL PARA ENLACES INTERNOS
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los enlaces que apuntan a IDs en la misma página
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Ignorar el enlace si es solo '#'
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Calcular la posición considerando el header fijo
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ==========================================
// 6. ANIMACIONES DE HOVER ADICIONALES (Opcional)
// ==========================================
// Agregar efectos de partículas o microinteracciones adicionales si lo deseas

// ==========================================
// 7. PRELOADER (Opcional - para carga de página)
// ==========================================
window.addEventListener('load', function() {
    // Ocultar cualquier preloader si existe
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});
