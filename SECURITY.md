# 🔒 ConectaR 2026 - Documentación de Seguridad

Este documento describe las medidas de ciberseguridad implementadas en el sitio web de ConectaR 2026.

## 📋 Tabla de Contenidos

- [Visión General](#visión-general)
- [Capas de Seguridad](#capas-de-seguridad)
- [Protecciones Implementadas](#protecciones-implementadas)
- [Configuración del Servidor](#configuración-del-servidor)
- [Cliente JavaScript](#cliente-javascript)
- [Mejores Prácticas](#mejores-prácticas)
- [Mantenimiento](#mantenimiento)

---

## 🎯 Visión General

La capa de seguridad de ConectaR 2026 ha sido diseñada siguiendo las mejores prácticas de OWASP (Open Web Application Security Project) y proporciona múltiples niveles de protección contra amenazas comunes de seguridad web.

### Amenazas Mitigadas

- ✅ Cross-Site Scripting (XSS)
- ✅ SQL Injection
- ✅ Clickjacking
- ✅ CSRF (Cross-Site Request Forgery)
- ✅ MIME Type Sniffing
- ✅ Información sensible del servidor
- ✅ Directory Listing
- ✅ Bots maliciosos
- ✅ Rate Limiting (básico)

---

## 🛡️ Capas de Seguridad

### 1. Security Headers (Servidor)

Implementado en `.htaccess` para servidores Apache.

#### Content Security Policy (CSP)
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://cdnjs.cloudflare.com; ...
```

**Propósito**: Previene la ejecución de scripts maliciosos y controla qué recursos pueden ser cargados.

#### X-Frame-Options
```
X-Frame-Options: DENY
```

**Propósito**: Previene ataques de clickjacking impidiendo que el sitio sea cargado en iframes.

#### X-Content-Type-Options
```
X-Content-Type-Options: nosniff
```

**Propósito**: Previene que navegadores interpreten archivos de manera diferente al MIME type declarado.

#### X-XSS-Protection
```
X-XSS-Protection: 1; mode=block
```

**Propósito**: Habilita el filtro XSS integrado del navegador.

#### Strict-Transport-Security (HSTS)
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**Propósito**: Fuerza conexiones HTTPS y previene ataques man-in-the-middle.

⚠️ **Importante**: Solo activar cuando el certificado SSL esté configurado.

#### Referrer-Policy
```
Referrer-Policy: strict-origin-when-cross-origin
```

**Propósito**: Controla qué información de referencia se envía con las peticiones.

#### Permissions-Policy
```
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()...
```

**Propósito**: Controla qué características del navegador pueden ser utilizadas.

### 2. Protección contra Inyección SQL

El `.htaccess` incluye patrones avanzados de detección para bloquear:
- Intentos de inyección SQL en query strings
- Patrones de `UNION SELECT`
- Funciones peligrosas como `LOAD_FILE`, `OUTFILE`
- Codificación base64 maliciosa
- Acceso a variables globales

### 3. Bloqueo de Bots Maliciosos

Bloqueamos automáticamente:
- User agents sospechosos (curl, wget, nikto, etc.)
- Bots y scrapers no autorizados
- Peticiones con user agents vacíos o malformados

### 4. Protección de Archivos Sensibles

Archivos bloqueados:
- `.htaccess`
- Archivos de configuración (`.conf`, `.ini`, `.env`)
- Backups (`.bak`, `.orig`)
- Archivos de desarrollo (`.psd`, `.fla`)
- Scripts del sistema (`.sh`, `.sql`)

### 5. HTTPS Enforcement

El servidor puede configurarse para redirigir automáticamente todo el tráfico HTTP a HTTPS:

```apache
# Descomentar en .htaccess cuando SSL esté activo
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 💻 Cliente JavaScript

### Archivo: `js/security.js`

#### 1. XSS Protection

**Sanitización de inputs**:
```javascript
XSSProtection.sanitize(input)
```

Convierte caracteres peligrosos a entidades HTML:
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&#x27;`
- `/` → `&#x2F;`

**Detección de código malicioso**:
```javascript
XSSProtection.isSecure(input)
```

Detecta patrones peligrosos:
- Tags `<script>`
- Tags `<iframe>`
- Eventos inline (`onclick`, `onerror`, etc.)
- Protocolo `javascript:`
- Funciones `eval()` y `expression()`

#### 2. CSRF Protection

**Generación automática de tokens**:
```javascript
CSRFProtection.initialize()
```

- Genera token único por sesión
- Almacena en `sessionStorage`
- Se agrega automáticamente a todos los formularios
- Se incluye en headers de fetch/AJAX

**Uso en formularios**:
```html
<form id="contact-form">
    <!-- Token CSRF se agrega automáticamente -->
</form>
```

**Uso en fetch**:
```javascript
fetch('/api/endpoint', {
    headers: CSRFProtection.getHeaders()
})
```

#### 3. Rate Limiting

Limita el número de solicitudes por periodo de tiempo:

```javascript
// Configuración por defecto
rateLimiting: {
    enabled: true,
    maxRequests: 10,
    windowMs: 60000 // 1 minuto
}
```

**Uso automático** en envío de formularios.

#### 4. Form Security

**Validación automática**:
- Emails: Formato válido
- Texto: Longitud mínima/máxima
- Contenido: Sin scripts maliciosos

**Sanitización automática**:
Todos los inputs son sanitizados antes del envío.

#### 5. Clickjacking Protection

```javascript
ClickjackingProtection.preventFraming()
```

Detecta si el sitio está cargado en un iframe y:
1. Redirige a la ventana principal
2. O muestra advertencia de seguridad

#### 6. Security Logger

Registra eventos de seguridad para análisis:

```javascript
SecurityLogger.log('event-type', { data })
```

Eventos registrados:
- Rate limit excedido
- Contenido malicioso detectado
- Formato de email inválido
- Intentos de clickjacking
- Inicialización del sistema

**Ver logs**:
```javascript
console.log(window.ConectaRSecurity.SecurityLogger.getLogs())
```

---

## 🔧 Configuración del Servidor

### Requisitos

- Apache 2.4+
- mod_headers
- mod_rewrite
- mod_expires
- mod_deflate

### Instalación

1. **Verificar módulos**:
```bash
apache2ctl -M | grep -E 'headers|rewrite|expires|deflate'
```

2. **Habilitar módulos** (si no están activos):
```bash
sudo a2enmod headers
sudo a2enmod rewrite
sudo a2enmod expires
sudo a2enmod deflate
sudo systemctl restart apache2
```

3. **Permitir .htaccess**:

En la configuración de Apache (`/etc/apache2/sites-available/000-default.conf`):

```apache
<Directory /var/www/html/conectaR2026>
    AllowOverride All
    Require all granted
</Directory>
```

4. **Configurar SSL/TLS** (Recomendado):

```bash
# Con Let's Encrypt
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d conectar2026.ucr.ac.cr
```

5. **Activar HSTS** (después de configurar SSL):

Descomentar en `.htaccess`:
```apache
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

6. **Activar redirección HTTPS**:

Descomentar en `.htaccess`:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 📝 HTML Meta Tags

Todas las páginas incluyen:

```html
<!-- Security Meta Tags -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

### CDN con SRI (Subresource Integrity)

```html
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer">
```

---

## ✅ Mejores Prácticas

### Para Desarrolladores

1. **Nunca deshabilitar la seguridad en producción**
2. **Validar siempre en servidor y cliente**
3. **No confiar en datos del cliente**
4. **Usar HTTPS en producción**
5. **Mantener dependencias actualizadas**
6. **Revisar logs de seguridad regularmente**

### Para Formularios

```html
<form id="contact-form">
    <!-- El token CSRF se agrega automáticamente -->
    <input type="email" name="email" required>
    <textarea name="message" required></textarea>
    <button type="submit">Enviar</button>
</form>
```

La validación y sanitización se ejecutan automáticamente.

### Para AJAX/Fetch

```javascript
// Incluir headers CSRF
fetch('/api/endpoint', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        ...window.ConectaRSecurity.CSRFProtection.getHeaders()
    },
    body: JSON.stringify(data)
})
```

---

## 🔍 Testing

### Verificar Headers de Seguridad

**Opción 1: Curl**
```bash
curl -I https://conectar2026.ucr.ac.cr
```

**Opción 2: Online Tools**
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)

### Verificar CSP

```javascript
// En la consola del navegador
console.log(document.querySelector('meta[http-equiv="Content-Security-Policy"]'))
```

### Verificar JavaScript Security

```javascript
// Ver configuración
console.log(window.ConectaRSecurity.config)

// Ver logs de seguridad
console.log(window.ConectaRSecurity.SecurityLogger.getLogs())

// Probar sanitización
window.ConectaRSecurity.XSSProtection.sanitize('<script>alert("XSS")</script>')
// Resultado: "&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;"
```

---

## 📊 Monitoreo

### Eventos a Monitorear

1. **Rate Limiting**: Detectar abuso de formularios
2. **XSS Attempts**: Scripts maliciosos bloqueados
3. **CSRF Tokens**: Validación de tokens
4. **404 Errors**: Intentos de acceso a archivos inexistentes
5. **403 Errors**: Intentos de acceso no autorizado

### Herramientas Recomendadas

- **Server Logs**: `/var/log/apache2/error.log`
- **Access Logs**: `/var/log/apache2/access.log`
- **Browser Console**: Eventos de SecurityLogger

---

## 🔄 Mantenimiento

### Actualizaciones Recomendadas

- [ ] Revisar y actualizar CSP mensualmente
- [ ] Actualizar integridad SRI de CDNs
- [ ] Revisar patrones de inyección SQL
- [ ] Actualizar lista de bots bloqueados
- [ ] Renovar certificados SSL (automático con Let's Encrypt)

### Checklist de Seguridad

- [ ] SSL/TLS configurado y activo
- [ ] HSTS habilitado
- [ ] Redirección HTTPS activa
- [ ] Headers de seguridad verificados
- [ ] Error pages personalizadas funcionando
- [ ] Rate limiting testeado
- [ ] CSRF tokens funcionando
- [ ] XSS protection testeada

---

## 🆘 Soporte

Para reportar vulnerabilidades de seguridad:

📧 **Email**: conectar@ucr.ac.cr
🔒 **Asunto**: [SECURITY] Descripción del problema

Por favor, **NO** divulgues vulnerabilidades públicamente hasta que sean resueltas.

---

## 📚 Referencias

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [HTTPS Everywhere](https://https.cio.gov/)
- [Security Headers](https://securityheaders.com/)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)

---

## 📄 Licencia

Esta implementación de seguridad es parte del proyecto ConectaR 2026.

**Última actualización**: Diciembre 2024
**Versión**: 1.0.0
