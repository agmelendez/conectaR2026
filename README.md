# ConectaR 2026 - Sitio Web Oficial

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Active-success)](https://agmelendez.github.io/conectaR2026/)

## 📋 Descripción General

Sitio web oficial del evento **ConectaR 2026**, una conferencia de tres días dedicada a la comunidad R en Costa Rica. Este proyecto es un sitio web público diseñado para:

- **Promover el evento** entre la comunidad R de Costa Rica y Latinoamérica
- **Informar** sobre agenda, talleres, ponencias y logística
- **Facilitar inscripciones** de participantes
- **Atraer patrocinadores** con información clara de beneficios

## 🎯 Información del Evento

- **Fechas:** 21, 22 y 23 de Octubre de 2026
- **Sede:** Auditorio Ciudad de la Investigación (UCR)
- **Asistencia Esperada:** 80-100 personas
- **Formato:** Talleres técnicos, ponencias, networking

## 🛠️ Stack Tecnológico

Este sitio es **completamente estático** y no requiere compilación ni dependencias de Node.js:

- **HTML5** - Estructura semántica y accesible
- **CSS3 personalizado** - Diseño responsive con variables CSS y Grid/Flexbox
- **Vanilla JavaScript** - Funcionalidad básica (si se requiere en el futuro)
- **Font Awesome** (CDN) - Iconos vectoriales

### Por qué este stack?

✅ **Cero dependencias**: No requiere `npm install` ni proceso de build
✅ **Mantenimiento simple**: Archivos HTML y CSS editables directamente
✅ **Deploy instantáneo**: Compatible con GitHub Pages sin configuración
✅ **Rápido**: CSS optimizado y sin frameworks pesados
✅ **SEO-friendly**: Contenido estático indexable por motores de búsqueda

## 📂 Estructura del Proyecto

```
conectaR2026/
├── index.html                      # Página principal
├── css/
│   └── style.css                   # Estilos personalizados (623 líneas)
├── pages/
│   ├── agenda.html                 # Cronograma completo del evento
│   ├── inscripciones.html          # Información de precios y registro
│   ├── patrocinadores.html         # Niveles de patrocinio
│   └── equipo.html                 # Comité organizador
└── README.md                       # Este archivo
```

## 🎨 Páginas del Sitio

### 1. **Inicio** (`index.html`)
- Hero section con información destacada
- Sobre el evento y objetivos
- Temas principales: Enseñanza, Industria, Academia, Ciencia Ciudadana
- Subtemas y áreas de interés
- Vista previa de los 3 días
- Información de contacto

### 2. **Agenda** (`pages/agenda.html`)
Cronograma completo de los 3 días:
- **Día 1 (Miércoles 21):** Taller Técnico - Cupo limitado a 40 personas
- **Día 2 (Jueves 22):** Academia & Gobierno - Ponencias y pósters
- **Día 3 (Viernes 23):** Industria & Networking - Casos de éxito

### 3. **Inscripciones** (`pages/inscripciones.html`)
Información de precios y registro:
- **Estudiantes:** $40 USD
- **Academia/Gobierno:** $60 USD
- **Industria:** $80 USD
- Todos los precios incluyen almuerzos y coffee breaks

### 4. **Patrocinadores** (`pages/patrocinadores.html`)
Niveles de patrocinio:
- **Platinum:** $2,500 USD
- **Gold:** $1,500 USD
- **Silver:** $500 USD
- Matriz de beneficios por nivel

### 5. **Equipo** (`pages/equipo.html`)
Información del comité organizador:
- CIOdD (Centro de Investigación en Ciencias de Datos)
- iXpantia (Consultora de Data Science)
- Miembros del comité

## 🚀 Despliegue en GitHub Pages

### Configuración Rápida

1. Ve a **Settings** → **Pages** en tu repositorio
2. En "Source", selecciona **Deploy from a branch**
3. Branch: `main`, Folder: `/ (root)`
4. Haz clic en **Save**

El sitio estará disponible en:
```
https://agmelendez.github.io/conectaR2026/
```

⏱️ **Tiempo de despliegue:** El sitio estará disponible en menos de 5 minutos.

## ✏️ Cómo Actualizar el Contenido

### Actualizar texto o información

1. Edita el archivo HTML correspondiente
2. Busca la sección que necesitas modificar (están claramente etiquetadas con comentarios)
3. Haz commit y push:
   ```bash
   git add .
   git commit -m "Actualizar [descripción del cambio]"
   git push origin main
   ```
4. GitHub Pages actualizará automáticamente en ~5 minutos

### Ejemplos de actualizaciones comunes

**Cambiar una fecha:**
```html
<!-- En index.html, busca la sección event-dates -->
<p class="dates"><strong>21, 22 y 23 de Octubre 2026</strong></p>
```

**Actualizar precios:**
```html
<!-- En pages/inscripciones.html -->
<div class="price">$40</div>
<div class="price-description">Por persona</div>
```

**Agregar un speaker o tema:**
```html
<!-- En index.html, agrega un nuevo topic-card -->
<div class="topic-card">
    <div class="topic-icon"><i class="fas fa-icon-name"></i></div>
    <h3>Título del Tema</h3>
    <p>Descripción del tema</p>
</div>
```

## 🎨 Personalización de Estilos

El sitio usa CSS personalizado con variables para facilitar cambios de diseño.

### Variables CSS principales

Edita `css/style.css` y modifica las variables en `:root`:

```css
:root {
    --primary-color: #3498db;      /* Azul principal */
    --secondary-color: #2c3e50;    /* Gris oscuro */
    --accent-color: #e74c3c;       /* Rojo de acento */
    --text-color: #333;            /* Color de texto */
    --light-bg: #f8f9fa;           /* Fondo claro */
    --border-color: #dee2e6;       /* Color de bordes */
    --success-color: #27ae60;      /* Verde de éxito */
}
```

### Ejemplo de cambio de color

Para cambiar el color azul a verde en todo el sitio:
```css
--primary-color: #27ae60;  /* Cambiar de #3498db a #27ae60 */
```

## 📱 Características Responsivas

El sitio es completamente responsive y se adapta a:
- 📱 **Móviles** (< 768px) - Navegación y grids ajustados
- 💻 **Tablets** (768px - 1024px) - Layout intermedio
- 🖥️ **Escritorio** (> 1024px) - Vista completa

Características responsive implementadas:
- Navegación flexible que se ajusta en móviles
- Grids con `auto-fit` y `minmax()` para adaptarse automáticamente
- Botones y textos que cambian de tamaño
- Imágenes que escalan proporcionalmente

## 🧪 Pruebas Locales

Para ver el sitio localmente antes de hacer push:

```bash
# Opción 1: Python 3 (recomendado)
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

✅ Chrome/Edge (últimas 2 versiones)
✅ Firefox (últimas 2 versiones)
✅ Safari (últimas 2 versiones)
✅ Opera (últimas 2 versiones)
⚠️ IE11 no soportado (CSS Grid y variables CSS requieren navegadores modernos)

## 🔧 Mejoras Futuras

Posibles mejoras a considerar:

- [ ] Agregar carpeta `/img` con logo del evento
- [ ] Implementar formulario de inscripción funcional
- [ ] Integrar sistema de pago para inscripciones
- [ ] Añadir galería de fotos de ediciones anteriores
- [ ] Implementar blog para anuncios y noticias
- [ ] Agregar mapa interactivo de la ubicación

## 🤝 Comité Organizador

- **CIOdD** - Centro de Investigación en Ciencias de Datos, UCR
- **iXpantia** - Consultora de Data Science

### Contacto

📧 Email: conectar@ucr.ac.cr
🌐 Sitio: https://agmelendez.github.io/conectaR2026/

## 🐛 Reporte de Problemas

Si encuentras algún problema con el sitio:

1. Crea un [Issue en GitHub](https://github.com/agmelendez/conectaR2026/issues)
2. Describe el problema con capturas de pantalla si es posible
3. Incluye información del navegador y sistema operativo

## 📄 Licencia

Este sitio web es propiedad del comité organizador de ConectaR 2026.

---

**Última actualización:** Noviembre 2025
**Versión:** 2.0
**Estado:** ✅ Listo para producción
