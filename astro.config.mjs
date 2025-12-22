// @ts-check
import { defineConfig, envField } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Output configuration for server-side rendering (required for API routes)
  output: 'server',
  adapter: netlify(),
  integrations: [tailwind()],

  // Site URL for SEO and sitemap generation
  site: 'https://todoconta.com',

  // Redirects configuration to maintain SEO during WordPress to Astro migration
  redirects: {
    // Links page redirect (maintains social media compatibility)
    '/links': '/',

    // Critical priority redirects
    '/cursos/taller-recuperar-devolucion-isr-rechazada/':
      'https://nas.io/todoconta/courses/luaw',

    // High priority redirects
    '/ingresos-esporadicos/':
      'https://todoconta.substack.com/p/ingresos-esporadicos/',
    '/privilegios-efirma-sat/':
      'https://todoconta.substack.com/p/privilegios-efirma-sat/',
    '/declaracion-patrimonial/':
      'https://todoconta.substack.com/p/declaracion-patrimonial/',
    '/imss-modalidad-10-independientes/':
      'https://todoconta.substack.com/p/imss-modalidad-10-independientes/',
    '/fallecimiento-contribuyente/':
      'https://todoconta.substack.com/p/fallecimiento-contribuyente/',
    '/contabilidad-electronica-sat-invitaciones/':
      'https://todoconta.substack.com/p/contabilidad-electronica-sat-invitaciones/',
    '/efirma-sat/': 'https://todoconta.substack.com/p/efirma-sat',
    '/firma-electronica/': 'https://todoconta.substack.com/p/efirma-sat',
    '/blog/': 'https://todoconta.substack.com/',

    // Medium priority redirects
    '/cartas-invitacion-sat/':
      'https://todoconta.substack.com/p/cartas-invitacion-sat/',
    '/ingresos-gravados-exentos-isr/':
      'https://todoconta.substack.com/p/ingresos-gravados-e-ingresos-exentos',
    '/ingresos-gravados-y-exentos-que-se-consideran-para-el-calculo-de-isr-anual-de-los-trabajadores/':
      'https://todoconta.substack.com/p/ingresos-gravados-e-ingresos-exentos',
    '/metodologia-kanban-devoluciones-isr/':
      'https://todoconta.substack.com/p/metodologia-kanban-devoluciones-isr/',
    '/ajuste-anual-inflacion/':
      'https://todoconta.substack.com/p/ajuste-anual-inflacion/',
    '/software-contable-nube/':
      'https://todoconta.substack.com/p/software-contable-nube/',
    '/cuando-pagar-impuestos/':
      'https://todoconta.substack.com/p/cuando-pagar-impuestos/',
    '/avisos-sat-declaracion-anual-asalariados/':
      'https://todoconta.substack.com/p/avisos-sat-declaracion-anual-asalariados/',
    '/curp-biometrica-mexico/':
      'https://todoconta.substack.com/p/curp-biometrica-mexico/',
    '/resolucion-miscelanea-fiscal/':
      'https://todoconta.substack.com/p/resolucion-miscelanea-fiscal/',
    '/generar-facturas-electronicas':
      'https://todoconta.substack.com/p/generar-facturas-electronicas/',
    '/plazo-conservar-contabilidad/':
      'https://todoconta.substack.com/p/plazo-conservar-contabilidad/',
    '/integrar-contabilidad-especial-deducciones':
      'https://todoconta.com/integrar-contabilidad-especial/',

    // Product redirects (short URLs)
    '/xs': 'https://todoconta.com/productos/xmlsat/',
    '/xsp': 'https://todoconta.com/productos/xmlsat-premium/',
    '/xmlsatpremium': 'https://todoconta.com/productos/xmlsat-premium/',
    '/xmlsat': 'https://todoconta.com/productos/xmlsat/',
    '/controlxml': 'https://todoconta.com/productos/control-xml-cfdi/',
    '/controlxmlnom': 'https://todoconta.com/productos/control-xml-nomina/',
    '/conciliarep': 'https://todoconta.com/productos/conciliarep/',
    '/xmlctpqi': 'https://todoconta.com/productos/xml-a-contpaqi/',
    '/xmlcontpaq': 'https://todoconta.com/productos/xml-a-contpaqi/',
    '/diot': 'https://todoconta.com/productos/carga-batch-diot/',

    // Demo redirects
    '/xmlctpqi-demo': 'https://bit.ly/2Ly9ioI',
    '/xmlcontpaq-demo': 'https://bit.ly/2Ly9ioI',
    '/controlxml-demo': 'https://bit.ly/3q6Orb4',
    '/controlxmlnom-demo': 'https://bit.ly/3rFHC0q',
    '/conciliarep-demo': 'https://bit.ly/37eQ2ED',
    '/xmlsatpremium-demo':
      'https://softwarepaq2.com/downloads/software/SetupXMLSAT_PREMIUM.exe',
    '/xmlsat-demo':
      'https://softwarepaq2.com/downloads/software/SetupXMLSAT.exe',

    // Service redirects (short URLs)
    '/csd': 'https://todoconta.com/certificado-sello-digital-csd',
    '/wss': 'https://todoconta.com/web-service-sat/',
    '/dp': 'https://todoconta.com/deducciones-personales/',
    '/fe': 'https://todoconta.substack.com/p/efirma-sat',
    '/ie':
      'https://todoconta.substack.com/p/ingresos-gravados-e-ingresos-exentos',
    '/fed':
      'https://wa.me/5215544753602?&text=%22Hola%2C+me+interesa+el+servicio+para+recuperar+mi+saldo+a+favor%E2%80%A6%22',

    // Affiliate and external service redirects
    '/alegra':
      'https://app.alegra.com/user/register/country/mexico?coupon=CNTODOCONTA',
    '/comunidad': 'https://nas.io/todoconta',
    '/resico': 'https://nas.io/es-mx/todoconta/products/mentoria-resico',
    '/impulsa': 'https://nas.io/es-mx/todoconta/products/mentoria-impulsa',
    '/agendar': 'https://calendly.com/todoconta/asesoria-gratuita',
    '/contalink': 'https://signup.contalink.com/referidos/CAAF29FB',

    // Special redirects
    '/devolucion':
      'https://todoconta.notion.site/22d3c008312e80be834ff3ced8eb6e3a',
    '/quiz-contabilidad': 'https://tally.so/r/dWqWoq',
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

  env: {
    schema: {
      PUBLIC_SENDY_API_KEY: envField.string({
        context: 'client',
        access: 'public',
      }),
      STRIPE_SECRET_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
      STRIPE_PUBLISHABLE_KEY: envField.string({
        context: 'client',
        access: 'public',
      }),
      STRIPE_WEBHOOK_SECRET: envField.string({
        context: 'server',
        access: 'secret',
      }),
      AWS_ACCESS_KEY_ID: envField.string({
        context: 'server',
        access: 'secret',
      }),
      AWS_SECRET_ACCESS_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
      AWS_REGION: envField.string({
        context: 'server',
        access: 'secret',
      }),
      AWS_SES_FROM_EMAIL: envField.string({
        context: 'server',
        access: 'secret',
      }),
      // Custom AWS variables for Netlify compatibility
      CUSTOM_AWS_ACCESS_KEY_ID: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      CUSTOM_AWS_SECRET_ACCESS_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      CUSTOM_AWS_REGION: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
});
