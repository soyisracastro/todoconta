# 🏢 Todoconta

**Sitio web profesional para servicios contables y software XMLSAT**

[![Astro](https://img.shields.io/badge/Astro-5.12.6-000000.svg?style=for-the-badge&logo=astro)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

## 📋 Descripción

Todoconta es un sitio web moderno y profesional desarrollado con **Astro** que presenta servicios contables integrales y software XMLSAT para empresarios. El sitio ofrece una experiencia de usuario excepcional con animaciones fluidas, diseño responsivo y optimización SEO.

### 🎯 Características Principales

- **Servicios Contables Integrales** desde $4,200/mes
- **Software XMLSAT** para gestión de facturas electrónicas
- **Asesoría fiscal en línea** con expertos certificados
- **Automatización con IA** para procesos contables
- **Garantía de tranquilidad fiscal** - cubrimos multas si no cumplimos

## 🚀 Tecnologías Utilizadas

- **[Astro](https://astro.build)** - Framework web moderno para sitios estáticos
- **TypeScript** - Tipado estático para mayor robustez
- **CSS Personalizado** - Sistema de diseño propio con variables CSS
- **Animaciones CSS** - Efectos visuales fluidos y responsivos
- **SEO Optimizado** - Meta tags y estructura semántica

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/iscasur/todoconta.git
   cd todoconta
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**

   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4321
   ```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
npm run preview      # Vista previa de la build

# Calidad de Código
npm run type-check   # Verifica tipos con TypeScript
npm run lint         # Ejecuta ESLint en archivos TS y Astro
npm run format       # Formatea código con Prettier

# Herramientas Astro
npm run astro        # Comandos de Astro CLI
```

## 📁 Estructura del Proyecto

```
todoconta/
├── public/                 # Archivos estáticos
│   ├── favicon.svg
│   ├── images/            # Imágenes del sitio
│   │   ├── logo-icon.svg
│   │   ├── photo.png
│   │   └── servicios/     # Imágenes de servicios
│   └── robots.txt
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── sections/       # Secciones principales del sitio
│   │   ├── landing/        # Componentes específicos del landing
│   │   ├── service/        # Componentes de páginas de servicio
│   │   ├── info/          # Componentes informativos
│   │   └── ui/            # Componentes de interfaz base
│   ├── content/           # Colecciones de contenido
│   │   ├── config.ts      # Configuración de colecciones
│   │   ├── products/      # Productos (*.md)
│   │   └── services/      # Servicios (*.md)
│   ├── config/            # Configuraciones
│   │   └── analytics.ts
│   ├── layouts/           # Layouts de página
│   │   ├── Layout.astro
│   │   ├── LandingLayout.astro
│   │   └── ServiceLayout.astro
│   ├── pages/             # Páginas del sitio (enrutamiento)
│   │   ├── index.astro    # Página principal
│   │   ├── productos/     # Páginas dinámicas de productos
│   │   ├── servicios/     # Páginas dinámicas de servicios
│   │   └── talleres/      # Páginas de talleres
│   ├── scripts/           # Utilidades JavaScript
│   │   └── shared-utils.js
│   └── styles/            # Sistema de estilos CSS
│       ├── design-system.css
│       ├── global.css
│       ├── animations.css
│       ├── components.css
│       ├── landing.css
│       └── reset.css
├── astro.config.mjs       # Configuración de Astro
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración de TypeScript
└── CLAUDE.md              # Guía para Claude Code
```

## 📝 Gestión de Contenido

El proyecto utiliza **Astro Content Collections** para la gestión tipada del contenido:

### Colecciones Disponibles

- **Products** (`/productos/`): Software y herramientas como XMLSAT
- **Services** (`/servicios/`): Servicios contables y fiscales

Cada colección incluye:
- ✅ **Validación de tipos** con Zod schemas
- 🔍 **SEO optimizado** con meta datos personalizados
- 💰 **Información de precios** y características
- ❓ **FAQs integradas** por producto/servicio
- 🔄 **Enrutamiento dinámico** automático

### Agregar Nuevo Contenido

```bash
# Nuevo producto
touch src/content/products/nuevo-producto.md

# Nuevo servicio
touch src/content/services/nuevo-servicio.md
```

## 🎨 Sistema de Diseño

El proyecto utiliza un sistema de diseño personalizado con:

- **Variables CSS** para colores, espaciado y tipografía
- **Componentes modulares** para reutilización
- **Animaciones CSS** para mejor UX
- **Diseño responsivo** para todos los dispositivos

### Paleta de Colores

```css
/* Colores principales */
--color-primary: #2563eb
--green-600: #16a34a
--color-secondary: #ea580c
--color-text-primary: #111827
```

## 📱 Páginas y Funcionalidades

### Páginas Principales

- **`/`** - Landing page con servicios contables integrales
- **`/productos/`** - Catálogo de software (XMLSAT, Control XML, etc.)
- **`/servicios/`** - Servicios fiscales (RFC, e.Firma, Declaraciones)
- **`/talleres/`** - Capacitación y talleres especializados

### Características Especiales

- **🔄 Redirects SEO**: 75+ redirecciones desde WordPress a Astro
- **📊 Analytics**: Google Analytics + Meta Pixel integrados
- **⚡ Performance**: Builds estáticos optimizados con esbuild
- **🔒 Seguridad**: Headers de seguridad configurados
- **📱 Responsivo**: Diseño adaptable a todos los dispositivos

### Secciones del Landing

1. **Hero** - Propuesta de valor principal + estadísticas
2. **ValueProps** - Beneficios y garantías del servicio
3. **Services** - Planes contables (Básico, Premium, Empresarial)
4. **OnlineAdvice** - Asesoría fiscal en línea
5. **AIAutomation** - Automatización con inteligencia artificial
6. **Products** - Software especializado (XMLSAT)
7. **Stats** - Métricas de confianza y experiencia
8. **CallToAction** - Formularios de contacto integrados

## 🔧 Desarrollo

### Flujo de Desarrollo

```bash
git checkout -b feature/nueva-funcionalidad
npm run dev                    # Servidor de desarrollo
# ... hacer cambios ...
npm run type-check            # Verificar tipos
npm run lint                   # Verificar código
npm run format                 # Formatear código
npm run build                  # Probar build
git commit -m "feat: nueva funcionalidad"
```

### Agregar Componentes

1. **Secciones**: `src/components/sections/` - Para landing page
2. **UI**: `src/components/ui/` - Componentes reutilizables
3. **Servicios**: `src/components/service/` - Para páginas de servicio
4. **Landing**: `src/components/landing/` - Específicos del landing

### Modificar Estilos

- `design-system.css` - Variables CSS y tokens de diseño
- `global.css` - Estilos globales y utilidades
- `animations.css` - Animaciones y transiciones
- `components.css` - Estilos de componentes compartidos
- `reset.css` - Normalización de estilos del navegador

### Animaciones

El sitio utiliza animaciones CSS con:

- `fade-in-up` - Entrada desde abajo con desvanecimiento
- `fade-in-left` - Entrada desde la izquierda
- `scale-in` - Escalado suave para elementos destacados
- **Intersection Observer** - Animaciones activadas al hacer scroll

### Configuración TypeScript

- **Modo estricto** habilitado con opciones adicionales
- **Path aliases** configurados (`@/*`, `@/components/*`)
- **Astro Check** integrado para validación de tipos

## 📈 Optimización

### Performance

- **Build estático** con Astro
- **CSS optimizado** sin frameworks pesados
- **Imágenes optimizadas** en formato SVG
- **Lazy loading** para animaciones

### SEO

- **Meta tags** optimizados por página
- **Estructura semántica** HTML5
- **Open Graph** tags para redes sociales
- **Redirects** configurados para migración WordPress→Astro
- **Sitemap** generado automáticamente
- **Content Collections** con metadata SEO personalizable

## 🚀 Despliegue

El proyecto está optimizado para despliegue estático:

### Build para Producción

```bash
npm run build        # Genera carpeta dist/
npm run preview      # Vista previa local de la build
```

### Plataformas Soportadas

- **Netlify**: Deploy automático desde repositorio
- **Vercel**: Integración nativa con Astro
- **GitHub Pages**: Con GitHub Actions
- **Cualquier hosting estático**: Subir carpeta `dist/`

### Optimizaciones de Build

- ✅ **Minificación** con esbuild
- ✅ **Compresión HTML** automática
- ✅ **Inlining CSS** inteligente
- ✅ **Imágenes optimizadas** en formato SVG

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

**Todoconta** - [info@todoconta.com](mailto:info@todoconta.com)

Enlace del proyecto: [https://github.com/iscasur/todoconta](https://github.com/iscasur/todoconta)

---

⭐ Si este proyecto te ayuda, ¡déjanos una estrella!
