# Google Analytics y Meta Pixel - Todoconta Landing

## Configuración Implementada

### Google Analytics
- **ID de Google Analytics**: `G-8D6CZ461Y3`
- **Propiedad**: Todoconta Landing

### Meta Pixel de Facebook
- **ID del Meta Pixel**: `321230706915370`
- **Propiedad**: Todoconta Landing

### Archivos Modificados

1. **`src/layouts/Layout.astro`** - Layout principal
2. **`src/layouts/LandingLayout.astro`** - Layout para páginas de landing
3. **`src/layouts/ServiceLayout.astro`** - Layout para páginas de servicios

### Componentes Creados

1. **`src/components/ui/GoogleAnalytics.astro`** - Componente reutilizable de GA
2. **`src/components/ui/MetaPixel.astro`** - Componente reutilizable del Meta Pixel
3. **`src/config/analytics.ts`** - Configuración centralizada de ambos servicios

## Uso de los Componentes

### Google Analytics

#### Opción 1: Uso Automático (Ya implementado)
Google Analytics se carga automáticamente en todas las páginas a través de los layouts.

#### Opción 2: Uso Manual con Componente
```astro
---
import GoogleAnalytics from '../components/ui/GoogleAnalytics.astro';
---

<html>
  <head>
    <GoogleAnalytics trackingId="G-8D6CZ461Y3" />
  </head>
  <body>
    <!-- Contenido de la página -->
  </body>
</html>
```

### Meta Pixel

#### Opción 1: Uso Automático (Ya implementado)
El Meta Pixel se carga automáticamente en todas las páginas a través de los layouts.

#### Opción 2: Uso Manual con Componente
```astro
---
import MetaPixel from '../components/ui/MetaPixel.astro';
---

<html>
  <head>
    <MetaPixel pixelId="321230706915370" />
  </head>
  <body>
    <!-- Contenido de la página -->
  </body>
</html>
```

## Funciones de Tracking Disponibles

### Google Analytics

#### Tracking de Eventos Personalizados
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

#### Tracking de Navegación de Páginas
```typescript
import { trackPageView } from '../config/analytics';

// Ejemplo: Tracking de cambio de página
trackPageView('/servicios/cambio-regimen-fiscal');
```

### Meta Pixel

#### Tracking de Eventos Personalizados
```typescript
import { trackMetaPixelEvent } from '../config/analytics';

// Ejemplo: Tracking de clic en botón
trackMetaPixelEvent('CustomEvent', {
  event_name: 'button_click',
  button_name: 'cta_principal'
});
```

#### Tracking de Conversiones
```typescript
import { trackMetaPixelConversion } from '../config/analytics';

// Ejemplo: Tracking de compra
trackMetaPixelConversion(1200, 'MXN'); // $1,500 MXN
```

#### Tracking de Leads
```typescript
import { trackMetaPixelLead } from '../config/analytics';

// Ejemplo: Tracking de lead generado
trackMetaPixelLead();
```

#### Tracking de Inicio de Checkout
```typescript
import { trackMetaPixelInitiateCheckout } from '../config/analytics';

// Ejemplo: Tracking de inicio de proceso de compra
trackMetaPixelInitiateCheckout(1200, 'MXN');
```

## Eventos Recomendados para E-commerce

### Meta Pixel - Eventos de Conversión
```typescript
// Cuando un usuario se registra
trackMetaPixelEvent('CompleteRegistration');

// Cuando un usuario inicia sesión
trackMetaPixelEvent('Login');

// Cuando un usuario agrega un producto al carrito
trackMetaPixelEvent('AddToCart', { value: 1500, currency: 'MXN' });

// Cuando un usuario inicia el checkout
trackMetaPixelInitiateCheckout(1500, 'MXN');

// Cuando se completa una compra
trackMetaPixelConversion(1500, 'MXN');

// Cuando se genera un lead
trackMetaPixelLead();
```

### Google Analytics - Eventos de Conversión
```typescript
// Tracking de formularios
trackEvent('form_submit', {
  form_name: 'contacto',
  page: 'servicios'
});

// Tracking de clics en CTA
trackEvent('button_click', {
  button_name: 'solicitar_servicio',
  page: 'servicios'
});

// Tracking de tiempo en página
trackEvent('engagement', {
  event_category: 'engagement',
  event_label: 'time_on_page',
  value: 120 // segundos
});
```

## Verificación de Implementación

### 1. Verificar Google Analytics
1. Abre cualquier página de tu sitio
2. Abre las herramientas de desarrollador (F12)
3. Ve a la pestaña "Network"
4. Busca la solicitud a `googletagmanager.com`
5. Verifica que se cargue correctamente

### 2. Verificar Meta Pixel
1. Abre cualquier página de tu sitio
2. Abre las herramientas de desarrollador (F12)
3. Ve a la pestaña "Network"
4. Busca la solicitud a `facebook.com/tr`
5. Verifica que se cargue correctamente

### 3. Verificar en Facebook Events Manager
1. Ve a [Facebook Events Manager](https://business.facebook.com/events_manager2/)
2. Selecciona tu pixel
3. Ve a "Test Events"
4. Visita tu sitio web
5. Deberías ver los eventos en tiempo real

## Personalización Avanzada

### Cambiar IDs de Tracking
Para cambiar los IDs de tracking en todo el proyecto, modifica:

1. **`src/config/analytics.ts`** - Cambia `GA_TRACKING_ID` y `META_PIXEL_ID`
2. **Todos los layouts** - O usa los componentes con los nuevos IDs

### Agregar Tracking de Eventos Específicos
```typescript
// En cualquier componente o script
import { trackEvent, trackMetaPixelEvent } from '../config/analytics';

// Tracking de scroll
window.addEventListener('scroll', () => {
  const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  if (scrollPercent > 50) {
    trackEvent('scroll', { scroll_percent: scrollPercent });
    trackMetaPixelEvent('CustomEvent', { event_name: 'scroll_50_percent' });
  }
});

// Tracking de tiempo en página
let startTime = Date.now();
window.addEventListener('beforeunload', () => {
  const timeOnPage = Math.round((Date.now() - startTime) / 1000);
  trackEvent('time_on_page', { seconds: timeOnPage });
  trackMetaPixelEvent('CustomEvent', { event_name: 'time_on_page', value: timeOnPage });
});
```

## Solución de Problemas

### Google Analytics no se carga
1. Verifica que el ID de tracking sea correcto
2. Verifica que no haya bloqueadores de anuncios activos
3. Verifica la consola del navegador para errores

### Meta Pixel no se carga
1. Verifica que el ID del pixel sea correcto
2. Verifica que no haya bloqueadores de anuncios activos
3. Verifica la consola del navegador para errores

### No se registran eventos
1. Verifica que `gtag` y `fbq` estén disponibles en `window`
2. Verifica que los eventos se estén enviando en la pestaña Network
3. Verifica que no haya errores de JavaScript

### Datos no aparecen en las plataformas
1. **Google Analytics**: Espera 24-48 horas
2. **Meta Pixel**: Espera 1-2 horas para eventos en tiempo real
3. Verifica que las propiedades estén configuradas correctamente
4. Verifica que no haya filtros que estén excluyendo tu IP

## Recursos Adicionales

- [Documentación oficial de Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Guía de implementación de gtag.js](https://developers.google.com/gtagjs/devguide)
- [Documentación del Meta Pixel](https://developers.facebook.com/docs/meta-pixel/)
- [Guía de eventos estándar del Meta Pixel](https://developers.facebook.com/docs/meta-pixel/reference/standard-events)
- [Documentación de Astro](https://docs.astro.build/)
