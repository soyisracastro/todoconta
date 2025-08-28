// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Site URL for SEO and sitemap generation
  site: 'https://todoconta.com',
  
  // Redirects configuration to maintain SEO during WordPress to Astro migration
  redirects: {
    // Critical priority redirects
    "/cursos/taller-recuperar-devolucion-isr-rechazada/": "https://nas.io/todoconta/courses/luaw",
    
    // High priority redirects
    "/ingresos-esporadicos/": "https://todoconta.substack.com/p/ingresos-esporadicos/",
    "/privilegios-efirma-sat/": "https://todoconta.substack.com/p/privilegios-efirma-sat/",
    "/declaracion-patrimonial/": "https://todoconta.substack.com/p/declaracion-patrimonial/",
    "/imss-modalidad-10-independientes/": "https://todoconta.substack.com/p/imss-modalidad-10-independientes/",
    "/fallecimiento-contribuyente/": "https://todoconta.substack.com/p/fallecimiento-contribuyente/",
    "/contabilidad-electronica-sat-invitaciones/": "https://todoconta.substack.com/p/contabilidad-electronica-sat-invitaciones/",
    "/blog/": "https://todoconta.substack.com/",
    
    // Medium priority redirects
    "/cartas-invitacion-sat/": "https://todoconta.substack.com/p/cartas-invitacion-sat/",
    "/ingresos-gravados-exentos-isr/": "https://todoconta.substack.com/p/ingresos-gravados-exentos-isr/",
    "/metodologia-kanban-devoluciones-isr/": "https://todoconta.substack.com/p/metodologia-kanban-devoluciones-isr/",
    "/ajuste-anual-inflacion/": "https://todoconta.substack.com/p/ajuste-anual-inflacion/",
    "/software-contable-nube/": "https://todoconta.substack.com/p/software-contable-nube/",
    "/cuando-pagar-impuestos/": "https://todoconta.substack.com/p/cuando-pagar-impuestos/",
    "/avisos-sat-declaracion-anual-asalariados/": "https://todoconta.substack.com/p/avisos-sat-declaracion-anual-asalariados/",
    "/curp-biometrica-mexico/": "https://todoconta.substack.com/p/curp-biometrica-mexico/",
    "/resolucion-miscelanea-fiscal/": "https://todoconta.substack.com/p/resolucion-miscelanea-fiscal/",
    
    // Product redirects (short URLs)
    "/xs": "https://todoconta.com/producto/xmlsat/",
    "/xsp": "https://todoconta.com/producto/xmlsat-premium/",
    "/xmlsatpremium": "https://todoconta.com/producto/xmlsat-premium/",
    "/xmlsat": "https://todoconta.com/producto/xmlsat/",
    "/controlxml": "https://todoconta.com/producto/control-xml-cfdi/",
    "/controlxmlnom": "https://todoconta.com/producto/control-xml-nomina/",
    "/conciliarep": "https://todoconta.com/producto/conciliarep/",
    "/xmlctpqi": "https://todoconta.com/producto/xml-a-contpaqi/",
    "/xmlcontpaq": "https://todoconta.com/producto/xml-a-contpaqi/",
    "/diot": "https://todoconta.com/producto/carga-batch-diot/",
    
    // Demo redirects
    "/xmlctpqi-demo": "https://bit.ly/2Ly9ioI",
    "/xmlcontpaq-demo": "https://bit.ly/2Ly9ioI",
    "/controlxml-demo": "https://bit.ly/3q6Orb4",
    "/controlxmlnom-demo": "https://bit.ly/3rFHC0q",
    "/conciliarep-demo": "https://bit.ly/37eQ2ED",
    "/xmlsatpremium-demo": "http://softwarepaq2.com/downloads/software/SetupXMLSAT_PREMIUM.exe",
    "/xmlsat-demo": "http://softwarepaq2.com/downloads/software/SetupXMLSAT.exe",
    
    // Service redirects (short URLs)
    "/csd": "https://todoconta.com/certificado-sello-digital-csd",
    "/wss": "https://todoconta.com/web-service-sat/",
    "/dp": "https://todoconta.com/deducciones-personales/",
    "/fe": "https://todoconta.com/firma-electronica/",
    "/ie": "https://todoconta.com/ingresos-gravados-exentos-isr/",
    "/fed": "https://wa.me/5215544753602?&text=%22Hola%2C+me+interesa+el+servicio+para+recuperar+mi+saldo+a+favor%E2%80%A6%22",
    
    // Affiliate and external service redirects
    "/alegra": "https://app.alegra.com/user/register/country/mexico?coupon=CNTODOCONTA",
    "/comunidad": "https://nas.io/todoconta",
    "/resico": "https://nas.io/es-mx/todoconta/products/mentoria-resico",
    "/impulsa": "https://nas.io/es-mx/todoconta/products/mentoria-impulsa",
    "/agendar": "https://calendly.com/todoconta/asesoria-gratuita",
    "/contalink": "https://signup.contalink.com/referidos/CAAF29FB",
    
    // Special redirects
    "/integrar-contabilidad-especial-deducciones": "https://todoconta.com/integrar-contabilidad-especial/",
    "/firma-electronica/": "https://todoconta.com/efirma-sat/",
    "/devolucion": "https://todoconta.notion.site/22d3c008312e80be834ff3ced8eb6e3a",
  },
  
  // Build configuration for better performance
  build: {
    // Inline stylesheets automatically for better performance
    inlineStylesheets: 'auto',
  },
  
  // Vite configuration for optimization
  vite: {
    build: {
      // Use esbuild for faster minification
      minify: 'esbuild',
    },
  },
  
  // Compress HTML output
  compressHTML: true,
  
  // Security headers
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
});
