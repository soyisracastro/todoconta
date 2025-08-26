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
