// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Site URL for SEO and sitemap generation
  site: 'https://todoconta.com',
  
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
