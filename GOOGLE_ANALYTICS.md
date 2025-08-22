# Google Analytics - Todoconta Landing

## Configuración Implementada

Google Analytics ha sido integrado en todos los layouts del proyecto para asegurar que el tracking funcione en todas las páginas.

### ID de Tracking
- **ID de Google Analytics**: `G-VS5CTEJ19C`
- **Propiedad**: Todoconta Landing

### Archivos Modificados

1. **`src/layouts/Layout.astro`** - Layout principal
2. **`src/layouts/LandingLayout.astro`** - Layout para páginas de landing
3. **`src/layouts/ServiceLayout.astro`** - Layout para páginas de servicios

### Componentes Creados

1. **`src/components/ui/GoogleAnalytics.astro`** - Componente reutilizable
2. **`src/config/analytics.ts`** - Configuración centralizada

## Uso del Componente

### Opción 1: Uso Automático (Ya implementado)
Google Analytics se carga automáticamente en todas las páginas a través de los layouts.

### Opción 2: Uso Manual con Componente
Si necesitas agregar Google Analytics a una página específica:

```astro
---
import GoogleAnalytics from '../components/ui/GoogleAnalytics.astro';
---

<html>
  <head>
    <GoogleAnalytics trackingId="G-VS5CTEJ19C" />
  </head>
  <body>
    <!-- Contenido de la página -->
  </body>
</html>
```

### Opción 3: Uso con Configuración Personalizada
Si necesitas cambiar el ID de tracking:

```astro
---
import GoogleAnalytics from '../components/ui/GoogleAnalytics.astro';
---

<html>
  <head>
    <GoogleAnalytics trackingId="TU_NUEVO_ID" />
  </head>
  <body>
    <!-- Contenido de la página -->
  </body>
</html>
```

## Funciones de Tracking Disponibles

### Tracking de Eventos Personalizados
```typescript
import { trackEvent } from '../config/analytics';

// Ejemplo: Tracking de clic en botón
trackEvent('button_click', {
  button_name: 'cta_principal',
  page: 'home'
});

// Ejemplo: Tracking de formulario enviado
trackEvent('form_submit', {
  form_name: 'contacto',
  page: 'servicios'
});
```

### Tracking de Navegación de Páginas
```typescript
import { trackPageView } from '../config/analytics';

// Ejemplo: Tracking de cambio de página
trackPageView('/servicios/cambio-regimen-fiscal');
```

## Verificación de Implementación

### 1. Verificar en el Navegador
1. Abre cualquier página de tu sitio
2. Abre las herramientas de desarrollador (F12)
3. Ve a la pestaña "Network"
4. Busca la solicitud a `googletagmanager.com`
5. Verifica que se cargue correctamente

### 2. Verificar en Google Analytics
1. Ve a [Google Analytics](https://analytics.google.com/)
2. Selecciona tu propiedad
3. Ve a "Reports" > "Realtime" > "Overview"
4. Visita tu sitio web
5. Deberías ver la actividad en tiempo real

### 3. Verificar en Google Tag Manager
1. Ve a [Google Tag Manager](https://tagmanager.google.com/)
2. Selecciona tu cuenta
3. Ve a "Tags" y verifica que el tag de GA4 esté configurado
4. Verifica que el trigger esté configurado para "All Pages"

## Personalización Avanzada

### Cambiar el ID de Tracking
Para cambiar el ID de tracking en todo el proyecto, modifica:

1. **`src/config/analytics.ts`** - Cambia `GA_TRACKING_ID`
2. **Todos los layouts** - O usa el componente con el nuevo ID

### Agregar Tracking de Eventos Específicos
```typescript
// En cualquier componente o script
import { trackEvent } from '../config/analytics';

// Tracking de scroll
window.addEventListener('scroll', () => {
  const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  if (scrollPercent > 50) {
    trackEvent('scroll', { scroll_percent: scrollPercent });
  }
});

// Tracking de tiempo en página
let startTime = Date.now();
window.addEventListener('beforeunload', () => {
  const timeOnPage = Math.round((Date.now() - startTime) / 1000);
  trackEvent('time_on_page', { seconds: timeOnPage });
});
```

## Solución de Problemas

### Google Analytics no se carga
1. Verifica que el ID de tracking sea correcto
2. Verifica que no haya bloqueadores de anuncios activos
3. Verifica la consola del navegador para errores

### No se registran eventos
1. Verifica que `gtag` esté disponible en `window`
2. Verifica que el evento se esté enviando en la pestaña Network
3. Verifica que no haya errores de JavaScript

### Datos no aparecen en Google Analytics
1. Espera 24-48 horas para que los datos aparezcan
2. Verifica que la propiedad de GA esté configurada correctamente
3. Verifica que no haya filtros que estén excluyendo tu IP

## Recursos Adicionales

- [Documentación oficial de Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Guía de implementación de gtag.js](https://developers.google.com/gtagjs/devguide)
- [Documentación de Astro](https://docs.astro.build/)
