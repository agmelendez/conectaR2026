/**
 * ConectaR 2026 - Security Layer
 * Client-side security protections and validations
 *
 * This file implements:
 * - XSS Protection
 * - Input Sanitization
 * - CSRF Token Management
 * - Rate Limiting
 * - Form Validation
 * - Security Event Logging
 */

// ==========================================
// SECURITY CONFIGURATION
// ==========================================
const SecurityConfig = {
    // Rate limiting configuration
    rateLimiting: {
        enabled: true,
        maxRequests: 10,
        windowMs: 60000 // 1 minute
    },

    // CSRF configuration
    csrf: {
        enabled: true,
        tokenName: 'csrf_token',
        headerName: 'X-CSRF-Token'
    },

    // XSS Protection
    xss: {
        enabled: true,
        sanitizeInputs: true
    },

    // Security logging
    logging: {
        enabled: true,
        logToConsole: false
    }
};

// ==========================================
// XSS PROTECTION & INPUT SANITIZATION
// ==========================================
const XSSProtection = {
    /**
     * Sanitiza una cadena para prevenir XSS
     * @param {string} input - String a sanitizar
     * @returns {string} - String sanitizado
     */
    sanitize: function(input) {
        if (typeof input !== 'string') return input;

        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };

        return input.replace(/[&<>"'`=\/]/g, (char) => map[char]);
    },

    /**
     * Sanitiza todos los inputs de un formulario
     * @param {HTMLFormElement} form - Formulario a sanitizar
     */
    sanitizeForm: function(form) {
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            if (input.type !== 'password' && input.type !== 'file') {
                input.value = this.sanitize(input.value);
            }
        });
    },

    /**
     * Valida que no haya scripts maliciosos en el input
     * @param {string} input - String a validar
     * @returns {boolean} - true si es seguro, false si contiene código malicioso
     */
    isSecure: function(input) {
        const dangerousPatterns = [
            /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
            /<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi, // onclick, onerror, etc.
            /<embed[\s\S]*?>/gi,
            /<object[\s\S]*?>/gi,
            /eval\s*\(/gi,
            /expression\s*\(/gi
        ];

        return !dangerousPatterns.some(pattern => pattern.test(input));
    },

    /**
     * Previene la inserción de HTML dinámico inseguro
     * @param {string} html - HTML a insertar
     * @returns {string} - HTML sanitizado
     */
    sanitizeHTML: function(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }
};

// ==========================================
// CSRF PROTECTION
// ==========================================
const CSRFProtection = {
    /**
     * Genera un token CSRF único
     * @returns {string} - Token CSRF
     */
    generateToken: function() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    },

    /**
     * Almacena el token CSRF en sessionStorage
     * @param {string} token - Token a almacenar
     */
    storeToken: function(token) {
        sessionStorage.setItem(SecurityConfig.csrf.tokenName, token);
    },

    /**
     * Obtiene el token CSRF almacenado
     * @returns {string|null} - Token CSRF o null
     */
    getToken: function() {
        return sessionStorage.getItem(SecurityConfig.csrf.tokenName);
    },

    /**
     * Inicializa el token CSRF si no existe
     */
    initialize: function() {
        if (!this.getToken()) {
            const token = this.generateToken();
            this.storeToken(token);
        }
    },

    /**
     * Agrega el token CSRF a un formulario
     * @param {HTMLFormElement} form - Formulario
     */
    addToForm: function(form) {
        const token = this.getToken();
        if (!token) return;

        let input = form.querySelector(`input[name="${SecurityConfig.csrf.tokenName}"]`);

        if (!input) {
            input = document.createElement('input');
            input.type = 'hidden';
            input.name = SecurityConfig.csrf.tokenName;
            form.appendChild(input);
        }

        input.value = token;
    },

    /**
     * Agrega el token CSRF a los headers de fetch
     * @returns {Object} - Headers con token CSRF
     */
    getHeaders: function() {
        const token = this.getToken();
        const headers = {};

        if (token) {
            headers[SecurityConfig.csrf.headerName] = token;
        }

        return headers;
    }
};

// ==========================================
// RATE LIMITING
// ==========================================
const RateLimiter = {
    requests: [],

    /**
     * Verifica si la solicitud está permitida según el rate limit
     * @param {string} identifier - Identificador único (ej: 'form-submit')
     * @returns {boolean} - true si está permitido, false si excede el límite
     */
    checkLimit: function(identifier) {
        if (!SecurityConfig.rateLimiting.enabled) return true;

        const now = Date.now();
        const windowMs = SecurityConfig.rateLimiting.windowMs;

        // Filtrar solicitudes dentro de la ventana de tiempo
        this.requests = this.requests.filter(req =>
            req.timestamp > now - windowMs && req.identifier === identifier
        );

        // Verificar si se excede el límite
        if (this.requests.length >= SecurityConfig.rateLimiting.maxRequests) {
            SecurityLogger.log('Rate limit exceeded', { identifier });
            return false;
        }

        // Agregar nueva solicitud
        this.requests.push({ identifier, timestamp: now });
        return true;
    },

    /**
     * Resetea el contador para un identificador específico
     * @param {string} identifier - Identificador a resetear
     */
    reset: function(identifier) {
        this.requests = this.requests.filter(req => req.identifier !== identifier);
    }
};

// ==========================================
// SECURITY LOGGER
// ==========================================
const SecurityLogger = {
    logs: [],

    /**
     * Registra un evento de seguridad
     * @param {string} event - Tipo de evento
     * @param {Object} data - Datos adicionales
     */
    log: function(event, data = {}) {
        if (!SecurityConfig.logging.enabled) return;

        const logEntry = {
            timestamp: new Date().toISOString(),
            event: event,
            data: data,
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        this.logs.push(logEntry);

        if (SecurityConfig.logging.logToConsole) {
            console.warn('[Security Event]', logEntry);
        }

        // En producción, podrías enviar esto a un servidor
        // this.sendToServer(logEntry);
    },

    /**
     * Obtiene todos los logs
     * @returns {Array} - Array de logs
     */
    getLogs: function() {
        return this.logs;
    },

    /**
     * Limpia los logs
     */
    clearLogs: function() {
        this.logs = [];
    }
};

// ==========================================
// FORM VALIDATION & SECURITY
// ==========================================
const FormSecurity = {
    /**
     * Valida un email
     * @param {string} email - Email a validar
     * @returns {boolean} - true si es válido
     */
    validateEmail: function(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    },

    /**
     * Valida un campo de texto
     * @param {string} text - Texto a validar
     * @param {number} minLength - Longitud mínima
     * @param {number} maxLength - Longitud máxima
     * @returns {boolean} - true si es válido
     */
    validateText: function(text, minLength = 1, maxLength = 1000) {
        if (typeof text !== 'string') return false;
        const trimmed = text.trim();
        return trimmed.length >= minLength && trimmed.length <= maxLength;
    },

    /**
     * Valida que no haya contenido malicioso
     * @param {string} input - Input a validar
     * @returns {boolean} - true si es seguro
     */
    validateSecurity: function(input) {
        return XSSProtection.isSecure(input);
    },

    /**
     * Protege un formulario completo
     * @param {HTMLFormElement} form - Formulario a proteger
     */
    secureForm: function(form) {
        // Agregar token CSRF
        if (SecurityConfig.csrf.enabled) {
            CSRFProtection.addToForm(form);
        }

        // Agregar validación en submit
        form.addEventListener('submit', (e) => {
            // Verificar rate limiting
            if (!RateLimiter.checkLimit('form-submit')) {
                e.preventDefault();
                alert('Demasiadas solicitudes. Por favor, espera un momento e intenta de nuevo.');
                SecurityLogger.log('Form submission blocked - Rate limit', {
                    formId: form.id
                });
                return false;
            }

            // Validar todos los inputs
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (input.type === 'email' && input.value) {
                    if (!this.validateEmail(input.value)) {
                        isValid = false;
                        input.classList.add('error');
                        SecurityLogger.log('Invalid email format', {
                            inputName: input.name
                        });
                    }
                }

                if (input.value && !this.validateSecurity(input.value)) {
                    e.preventDefault();
                    isValid = false;
                    input.classList.add('error');
                    SecurityLogger.log('Malicious content detected', {
                        inputName: input.name
                    });
                    alert('Se detectó contenido potencialmente peligroso. Por favor, revisa tu entrada.');
                }
            });

            if (!isValid) {
                e.preventDefault();
                return false;
            }

            // Sanitizar inputs si está habilitado
            if (SecurityConfig.xss.sanitizeInputs) {
                XSSProtection.sanitizeForm(form);
            }
        });
    }
};

// ==========================================
// CLICKJACKING PROTECTION
// ==========================================
const ClickjackingProtection = {
    /**
     * Verifica si la página está siendo cargada en un iframe
     * @returns {boolean} - true si está en iframe
     */
    isFramed: function() {
        return window.self !== window.top;
    },

    /**
     * Previene que la página sea cargada en un iframe
     */
    preventFraming: function() {
        if (this.isFramed()) {
            SecurityLogger.log('Clickjacking attempt detected');

            // Opción 1: Romper el iframe (más agresivo)
            window.top.location = window.self.location;

            // Opción 2: Mostrar advertencia (menos disruptivo)
            // document.body.innerHTML = '<h1>Esta página no puede ser mostrada en un iframe por razones de seguridad.</h1>';
        }
    }
};

// ==========================================
// HTTPS ENFORCEMENT
// ==========================================
const HTTPSEnforcement = {
    /**
     * Fuerza la recarga de la página en HTTPS si está en HTTP
     */
    enforce: function() {
        if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
            SecurityLogger.log('Redirecting to HTTPS');
            location.replace(`https:${location.href.substring(location.protocol.length)}`);
        }
    }
};

// ==========================================
// INITIALIZATION
// ==========================================
const SecurityManager = {
    /**
     * Inicializa todas las protecciones de seguridad
     */
    initialize: function() {
        console.log('🔒 Security Layer initialized');

        // Inicializar CSRF
        if (SecurityConfig.csrf.enabled) {
            CSRFProtection.initialize();
        }

        // Prevenir clickjacking
        ClickjackingProtection.preventFraming();

        // Forzar HTTPS (comentar en desarrollo local)
        // HTTPSEnforcement.enforce();

        // Proteger todos los formularios
        document.addEventListener('DOMContentLoaded', () => {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                FormSecurity.secureForm(form);
            });
        });

        // Log de inicialización
        SecurityLogger.log('Security system initialized', {
            csrf: SecurityConfig.csrf.enabled,
            xss: SecurityConfig.xss.enabled,
            rateLimiting: SecurityConfig.rateLimiting.enabled
        });
    }
};

// Auto-inicializar cuando se carga el script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SecurityManager.initialize());
} else {
    SecurityManager.initialize();
}

// Exponer API global
window.ConectaRSecurity = {
    XSSProtection,
    CSRFProtection,
    RateLimiter,
    FormSecurity,
    SecurityLogger,
    config: SecurityConfig
};
