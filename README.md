# ConectaR 2026 - Sitio Web Oficial

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Active-success)](https://agmelendez.github.io/conectaR2026/)

## 📋 Descripción General

Sitio web oficial del evento **ConectaR 2026**, una conferencia de tres días dedicada a la comunidad R en Costa Rica. Este proyecto es una Aplicación de Página Única (SPA) que sirve como:

- **Panel de Control** para el comité organizador (CIOdD & iXpantia)
- **Landing Page** informativa para el público general
- **Herramienta de venta** para captación de patrocinadores

## 🎯 Información del Evento

- **Fechas:** 21, 22 y 23 de Octubre de 2026
- **Sede:** Auditorio Ciudad de la Investigación (UCR)
- **Asistencia Esperada:** 80-100 personas
- **Presupuesto:** $6,600 USD

## 🛠️ Stack Tecnológico

Este sitio es **completamente estático** y no requiere compilación ni dependencias de Node.js:

- **HTML5** - Estructura semántica
- **Tailwind CSS** (CDN) - Diseño responsivo y sistema de grillas
- **Vanilla JavaScript (ES6+)** - Interactividad y navegación
- **Chart.js** (CDN) - Visualización de presupuesto

### Por qué este stack?

✅ **Cero dependencias**: No requiere `npm install` ni proceso de build
✅ **Mantenimiento simple**: Edita directamente `index.html`
✅ **Deploy instantáneo**: Compatible con GitHub Pages sin configuración
✅ **Rápido**: Todas las librerías se cargan desde CDN

## 📂 Estructura del Proyecto

```
conectaR2026/
├── index.html          # Archivo principal (SPA completa)
└── README.md           # Este archivo
```

## 🎨 Secciones del Sitio

### 1. Inicio (Ficha Técnica)
Resumen ejecutivo con información logística clave del evento.

### 2. Agenda Detallada
Cronograma completo de los 3 días con navegación interactiva:
- **Día 1:** Taller Técnico (40 personas)
- **Día 2:** Ponencias Academia/Gobierno + Pósters
- **Día 3:** Ponencias Industria + Networking

### 3. Estrategia de Contenido
Tracks temáticos y keynote speakers:
- **Track A:** Gobierno y Datos Cívicos
- **Track B:** Industria y Negocio (ROI)
- **Track C:** Innovación (IA, Ética, ML)

### 4. Patrocinios
Herramienta comercial para captación de fondos:
- Matriz de beneficios comparativa
- Niveles: Platinum ($2,500), Gold ($1,500), Silver ($500)
- Target list de empresas objetivo

### 5. Presupuesto
Dashboard financiero con:
- Visualización interactiva (gráfico de donut)
- Distribución: Alimentación (60%) vs Logística (40%)
- KPIs de recaudación

### 6. Cronograma
Timeline de planificación "backwards planning" desde Nov 2025 hasta Oct 2026.

## 🚀 Despliegue en GitHub Pages

### Opción 1: Desde la rama principal (Recomendado)

1. Fusiona los cambios a `main`:
   ```bash
   git checkout main
   git merge claude/build-conectar-website-01UDvm6cj8WYYYt4h4LoNbZc
   git push origin main
   ```

2. Configura GitHub Pages:
   - Ve a **Settings** → **Pages**
   - En "Source", selecciona **Deploy from a branch**
   - Branch: `main`, Folder: `/ (root)`
   - Haz clic en **Save**

3. El sitio estará disponible en:
   ```
   https://agmelendez.github.io/conectaR2026/
   ```

### Opción 2: Desde la rama actual

1. Ve a **Settings** → **Pages**
2. Selecciona la rama `claude/build-conectar-website-01UDvm6cj8WYYYt4h4LoNbZc`
3. Folder: `/ (root)`
4. Guarda los cambios

⏱️ **Tiempo de despliegue:** El sitio estará disponible en menos de 5 minutos.

## ✏️ Cómo Actualizar el Contenido

Como todo está en un solo archivo, las actualizaciones son simples:

1. Edita `index.html` directamente
2. Busca la sección que necesitas modificar (están claramente etiquetadas)
3. Haz commit y push:
   ```bash
   git add index.html
   git commit -m "Actualizar [descripción del cambio]"
   git push
   ```
4. GitHub Pages actualizará automáticamente en ~5 minutos

### Ejemplos de actualizaciones comunes:

**Cambiar una fecha:**
```html
<!-- Busca la sección con la fecha -->
<li><strong>Fechas:</strong> 21, 22 y 23 de Octubre 2026</li>
```

**Actualizar presupuesto:**
```javascript
// Busca la función initBudgetChart()
data: [3960, 2640],  // [Alimentación, Logística]
```

**Agregar un patrocinador:**
```html
<!-- En la sección Target List -->
<li>• Nombre de la Empresa</li>
```

## 🎨 Personalización de Estilos

El sitio usa Tailwind CSS. Para cambiar colores o estilos:

**Colores principales del sitio:**
- Azul primario: `blue-600`, `blue-800`
- Verde: `green-600`
- Púrpura: `purple-600`
- Naranja: `orange-600`

**Ejemplo de cambio de color:**
```html
<!-- Cambiar el header de azul a verde -->
<header class="bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg">
```

## 📱 Características Responsivas

El sitio es completamente responsive y se adapta a:
- 📱 Móviles (< 768px)
- 📱 Tablets (768px - 1024px)
- 🖥️ Escritorio (> 1024px)

La navegación se ajusta automáticamente en pantallas pequeñas.

## 🧪 Pruebas Locales

Para ver el sitio localmente antes de hacer push:

```bash
# Opción 1: Python 3
python3 -m http.server 8000

# Opción 2: Python 2
python -m SimpleHTTPServer 8000

# Opción 3: Node.js (si está instalado)
npx http-server

# Opción 4: PHP
php -S localhost:8000
```

Luego abre tu navegador en `http://localhost:8000`

## 📊 Compatibilidad de Navegadores

✅ Chrome/Edge (versiones modernas)
✅ Firefox (versiones modernas)
✅ Safari (versiones modernas)
⚠️ IE11 no soportado (Tailwind CSS requiere navegadores modernos)

## 🤝 Comité Organizador

- **CIOdD** - Centro de Investigación en Ciencias de Datos
- **iXpantia** - Consultora de Data Science

Contactos principales:
- Agustín (Patrocinios)
- Frans (Logística y Web)
- Diego (Contenido y Producción)

## 📄 Licencia

Este sitio web es propiedad del comité organizador de ConectaR 2026.

---

**Última actualización:** Noviembre 2025
**Versión:** 1.0
**Estado:** ✅ Listo para producción
