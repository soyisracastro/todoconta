# Análisis Arquitectónico del Proyecto Todoconta

## 1. Propósito

Este documento sirve como una base de conocimiento central sobre la arquitectura, las convenciones y el stack tecnológico del sitio web de Todoconta. Su objetivo es agilizar el desarrollo futuro al proporcionar un punto de referencia rápido, evitando la necesidad de re-analizar el proyecto en cada iteración.

## 2. Stack Tecnológico

- **Framework**: [Astro](https://astro.build/)
- **Lenguaje**: TypeScript
- **Gestor de Paquetes**: npm
- **Calidad de Código**: ESLint (Linting) y Prettier (Formateo)

## 3. Arquitectura del Proyecto

El proyecto sigue una estructura estándar de Astro, optimizada para un sitio estático de alto rendimiento centrado en el contenido.

### 3.1. Enrutamiento (Routing)

- El enrutamiento se basa en archivos y se gestiona dentro del directorio `src/pages`.
- Cada archivo `.astro` en este directorio corresponde a una ruta en el sitio.
- Se utilizan rutas dinámicas para las colecciones de contenido, como `src/pages/servicios/[slug].astro`, que renderiza una página para cada archivo Markdown en la colección `services`.

### 3.2. Componentes (Components)

- Los componentes reutilizables se encuentran en `src/components`.
- La estructura está organizada en subdirectorios según su función:
  - `forms`: Componentes relacionados con formularios.
  - `info`: Componentes para mostrar información (ej. `InfoCard.astro`).
  - `layout`: Componentes estructurales principales (ej. `Navbar.astro`, `Footer.astro`).
  - `pages`: Componentes específicos de una página o sección grande.
  - `sections`: Componentes que representan secciones completas de una página (ej. `AboutMe.astro`, `Services.astro`).
  - `ui`: Componentes de UI genéricos y reutilizables (ej. `Button.astro`, `ServiceCard.astro`).

### 3.3. Gestión de Contenido (Content Management)

- El proyecto utiliza **Astro Content Collections** para gestionar el contenido de manera estructurada y segura.
- El contenido principal (servicios, productos) se almacena como archivos Markdown (`.md`) en el directorio `src/content`.
- Las "colecciones" están definidas en `src/content/config.ts`, que especifica el schema (la estructura de datos) para cada tipo de contenido.
- **Para agregar un nuevo servicio o producto**: Simplemente se debe crear un nuevo archivo `.md` en la carpeta correspondiente (`src/content/services` o `src/content/products`) siguiendo el schema definido.

### 3.4. Estilos (Styling)

- Los estilos globales y de diseño se encuentran en `src/styles`.
- La nomenclatura de los archivos sugiere una separación de responsabilidades:
  - `reset.css`: Reseteo de estilos del navegador.
  - `global.css`: Estilos aplicados a todo el sitio.
  - `design-system.css`: Variables de diseño (colores, tipografía, espaciado).
  - `components.css`: Estilos específicos para componentes.
  - `animations.css`: Clases de animación.

### 3.5. Scripts del Cliente (Client-Side Scripts)

- La interactividad del lado del cliente se gestiona con archivos JavaScript en `src/scripts`.
- Para agregar una nueva funcionalidad interactiva, se debe crear o modificar un script en este directorio y luego importarlo en el componente `.astro` correspondiente usando una etiqueta `<script>`.

## 4. Flujo de Trabajo y Herramientas

Los siguientes scripts de `npm` están disponibles para gestionar el ciclo de vida del desarrollo:

- `npm run dev`: Inicia el servidor de desarrollo local con hot-reloading.
- `npm run build`: Compila el proyecto para producción en el directorio `dist/`.
- `npm run preview`: Sirve el contenido de `dist/` para una vista previa local antes del despliegue.
- `npm run format`: Formatea todo el código con Prettier.
- `npm run lint`: Analiza el código con ESLint para detectar errores y problemas de estilo.
- `npm run type-check`: Ejecuta el verificador de tipos de TypeScript de Astro.

## 5. Convenciones

- **Nomenclatura de Archivos**:
  - **Componentes**: `PascalCase.astro` (ej. `ServiceCard.astro`).
  - **Páginas**: `kebab-case.astro` (ej. `aviso-legal.astro`) o `index.astro`.
  - **Otros (CSS, JS)**: `kebab-case.css` (ej. `design-system.css`).
- **Estilo de Código**: Se debe ejecutar `npm run format` y `npm run lint` antes de confirmar cambios para mantener la consistencia del código.
