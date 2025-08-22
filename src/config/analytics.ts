// Configuración de Google Analytics
export const GA_TRACKING_ID = 'G-VS5CTEJ19C';

// Configuración del Meta Pixel de Facebook
export const META_PIXEL_ID = '321230706915370';

// Función para generar el script de Google Analytics
export function getGoogleAnalyticsScript() {
  return `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}"></script>
    <script is:inline>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${GA_TRACKING_ID}');
    </script>
  `;
}

// Función para generar el script del Meta Pixel
export function getMetaPixelScript() {
  return `
    <!-- Meta Pixel Code -->
    <script is:inline>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Meta Pixel Code -->
  `;
}

// Función para tracking de eventos personalizados en Google Analytics
export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }
}

// Función para tracking de navegación de páginas en Google Analytics
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url
    });
  }
}

// Función para tracking de eventos en Meta Pixel
export function trackMetaPixelEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, parameters);
  }
}

// Función para tracking de conversiones en Meta Pixel
export function trackMetaPixelConversion(value?: number, currency: string = 'MXN') {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    const params: any = {};
    if (value) {
      params.value = value;
      params.currency = currency;
    }
    (window as any).fbq('track', 'Purchase', params);
  }
}

// Función para tracking de leads en Meta Pixel
export function trackMetaPixelLead() {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead');
  }
}

// Función para tracking de inicio de checkout en Meta Pixel
export function trackMetaPixelInitiateCheckout(value?: number, currency: string = 'MXN') {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    const params: any = {};
    if (value) {
      params.value = value;
      params.currency = currency;
    }
    (window as any).fbq('track', 'InitiateCheckout', params);
  }
}
