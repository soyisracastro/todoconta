// Ejemplos de implementación de tracking para Google Analytics y Meta Pixel
// Este archivo muestra cómo usar las funciones de tracking en diferentes componentes

import { 
  trackEvent, 
  trackPageView, 
  trackMetaPixelEvent, 
  trackMetaPixelConversion, 
  trackMetaPixelLead,
  trackMetaPixelInitiateCheckout 
} from '../config/analytics';

// ============================================================================
// EJEMPLO 1: Tracking de formularios de contacto
// ============================================================================

export function setupContactFormTracking() {
  const contactForm = document.querySelector('#contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // Google Analytics
      trackEvent('form_submit', {
        form_name: 'contacto',
        page: window.location.pathname,
        form_type: 'contact'
      });

      // Meta Pixel
      trackMetaPixelLead();
      trackMetaPixelEvent('Lead', {
        content_name: 'formulario_contacto',
        content_category: 'contacto'
      });
    });
  }
}

// ============================================================================
// EJEMPLO 2: Tracking de botones CTA
// ============================================================================

export function setupCTATracking() {
  const ctaButtons = document.querySelectorAll('[data-tracking="cta"]');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const buttonName = button.getAttribute('data-button-name') || 'cta_generico';
      const buttonPage = button.getAttribute('data-page') || window.location.pathname;
      
      // Google Analytics
      trackEvent('button_click', {
        button_name: buttonName,
        page: buttonPage,
        event_category: 'engagement'
      });

      // Meta Pixel
      trackMetaPixelEvent('CustomEvent', {
        event_name: 'cta_click',
        button_name: buttonName,
        page: buttonPage
      });
    });
  });
}

// ============================================================================
// EJEMPLO 3: Tracking de navegación de páginas
// ============================================================================

export function setupPageViewTracking() {
  // Tracking inicial de la página
  trackPageView(window.location.pathname);
  
  // Tracking de cambios de página en SPA (si aplica)
  if (typeof window !== 'undefined') {
    let currentPath = window.location.pathname;
    
    // Observar cambios en la URL
    const observer = new MutationObserver(() => {
      if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
        trackPageView(currentPath);
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

// ============================================================================
// EJEMPLO 4: Tracking de scroll y engagement
// ============================================================================

export function setupEngagementTracking() {
  let scrollEvents = new Set();
  let startTime = Date.now();
  
  // Tracking de scroll
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    // Trackear solo en porcentajes específicos para evitar spam
    [25, 50, 75, 90].forEach(threshold => {
      if (scrollPercent >= threshold && !scrollEvents.has(threshold)) {
        scrollEvents.add(threshold);
        
        // Google Analytics
        trackEvent('scroll', {
          scroll_percent: threshold,
          page: window.location.pathname
        });

        // Meta Pixel
        trackMetaPixelEvent('CustomEvent', {
          event_name: 'scroll_threshold',
          scroll_percent: threshold,
          page: window.location.pathname
        });
      }
    });
  });

  // Tracking de tiempo en página
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    
    if (timeOnPage > 10) { // Solo trackear si estuvo más de 10 segundos
      // Google Analytics
      trackEvent('engagement', {
        event_category: 'engagement',
        event_label: 'time_on_page',
        value: timeOnPage
      });

      // Meta Pixel
      trackMetaPixelEvent('CustomEvent', {
        event_name: 'time_on_page',
        time_seconds: timeOnPage
      });
    }
  });
}

// ============================================================================
// EJEMPLO 5: Tracking de servicios específicos
// ============================================================================

export function setupServiceTracking() {
  const serviceCards = document.querySelectorAll('[data-service]');
  
  serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const serviceName = card.getAttribute('data-service');
      const serviceCategory = card.getAttribute('data-category');
      
      // Google Analytics
      trackEvent('service_view', {
        service_name: serviceName,
        service_category: serviceCategory,
        page: window.location.pathname
      });

      // Meta Pixel
      trackMetaPixelEvent('ViewContent', {
        content_name: serviceName,
        content_category: serviceCategory,
        content_type: 'servicio'
      });
    });
  });
}

// ============================================================================
// EJEMPLO 6: Tracking de conversiones (para servicios pagados)
// ============================================================================

export function setupConversionTracking() {
  // Ejemplo: Cuando se completa un servicio
  window.trackServiceCompletion = (serviceName: string, value: number) => {
    // Google Analytics
    trackEvent('purchase', {
      transaction_id: `service_${Date.now()}`,
      value: value,
      currency: 'MXN',
      items: [{
        item_name: serviceName,
        item_category: 'servicio',
        price: value,
        quantity: 1
      }]
    });

    // Meta Pixel
    trackMetaPixelConversion(value, 'MXN');
    trackMetaPixelEvent('Purchase', {
      content_name: serviceName,
      content_category: 'servicio',
      value: value,
      currency: 'MXN'
    });
  };

  // Ejemplo: Cuando se inicia el proceso de contratación
  window.trackServiceInitiation = (serviceName: string, value: number) => {
    // Google Analytics
    trackEvent('begin_checkout', {
      value: value,
      currency: 'MXN',
      items: [{
        item_name: serviceName,
        item_category: 'servicio',
        price: value,
        quantity: 1
      }]
    });

    // Meta Pixel
    trackMetaPixelInitiateCheckout(value, 'MXN');
    trackMetaPixelEvent('InitiateCheckout', {
      content_name: serviceName,
      content_category: 'servicio',
      value: value,
      currency: 'MXN'
    });
  };
}

// ============================================================================
// FUNCIÓN PRINCIPAL PARA INICIALIZAR TODO EL TRACKING
// ============================================================================

export function initializeAllTracking() {
  // Inicializar tracking básico
  setupPageViewTracking();
  setupEngagementTracking();
  
  // Inicializar tracking de formularios y botones
  setupContactFormTracking();
  setupCTATracking();
  setupServiceTracking();
  
  // Inicializar tracking de conversiones
  setupConversionTracking();
  
  console.log('✅ Tracking de Google Analytics y Meta Pixel inicializado correctamente');
}

// ============================================================================
// USO EN COMPONENTES ASTRO
// ============================================================================

/*
Para usar en un componente Astro, agrega esto en el script:

<script>
  import { initializeAllTracking } from '../examples/tracking-examples.js';
  
  // Inicializar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', initializeAllTracking);
</script>

O para tracking específico:

<script>
  import { setupCTATracking, setupServiceTracking } from '../examples/tracking-examples.js';
  
  document.addEventListener('DOMContentLoaded', () => {
    setupCTATracking();
    setupServiceTracking();
  });
</script>
*/
