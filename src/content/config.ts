import { defineCollection, z } from 'astro:content';

const productsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.number().optional(), // Precio base opcional, se puede usar plans en su lugar
    pricePeriod: z.string().optional(),
    badge: z.string().optional(),
    heroImage: z.string().optional(),
    buyUrl: z.string().optional(),

    // Planes de precios opcionales (para productos con múltiples opciones)
    plans: z
      .array(
        z.object({
          title: z.string(),
          price: z.number(),
          pricePeriod: z.string().optional(),
          badge: z.string().optional(),
          description: z.string(),
          features: z.array(z.string()),
          featured: z.boolean().default(false),
          ctaText: z.string().optional(),
          ctaUrl: z.string().optional(),
        })
      )
      .optional(),

    features: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
      })
    ),
    benefits: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    pricing: z.object({
      features: z.array(z.string()),
    }),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
    formId: z.string().optional(),

    // Email delivery configuration for digital products
    emailDelivery: z
      .object({
        subject: z.string(),
        template: z.string(), // HTML template for email
        attachments: z.array(z.string()).optional(), // File paths for attachments
        downloadInstructions: z.string().optional(),
        activationInstructions: z.string().optional(),
      })
      .optional(),
  }),
});

const servicesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string().optional(), // Descripción corta para listados
    icon: z.string(), // Emoji o icono representativo
    slug: z.string().optional(),
    price: z.number().optional(), // Precio base del servicio (si aplica)
    priceNote: z.string().optional(), // Nota sobre el precio (ej: "desde" o "por trámite")
    deliveryTime: z.string().optional(), // Tiempo estimado de entrega
    badge: z.string().optional(), // Badge opcional (ej: "Popular", "Nuevo")
    featured: z.boolean().default(false),
    heroImage: z.string().optional(),
    ctaText: z.string().default('Solicitar Servicio'),
    ctaUrl: z.string().default('#contacto'),
    secondaryCtaText: z.string().optional(),
    secondaryCtaUrl: z.string().optional(),

    // Características del servicio
    benefits: z.array(
      z.object({
        icon: z.string().optional(),
        title: z.string(),
        description: z.string(),
      })
    ),

    // Proceso del servicio
    process: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string().optional(),
        })
      )
      .optional(),

    // Requisitos para el servicio
    requirements: z.array(z.string()).optional(),

    // Entregables
    deliverables: z.array(z.string()).optional(),

    // Servicios relacionados
    relatedServices: z.array(z.string()).optional(),

    // Preguntas frecuentes
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),

    // Testimonios relacionados con este servicio
    testimonials: z
      .array(
        z.object({
          quote: z.string(),
          author: z.string(),
          position: z.string().optional(),
          company: z.string().optional(),
          avatar: z.string().optional(),
        })
      )
      .optional(),

    // SEO
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    seoKeywords: z.array(z.string()).optional(),
  }),
});

export const collections = {
  products: productsCollection,
  services: servicesCollection,
};
