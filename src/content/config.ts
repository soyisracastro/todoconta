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
    category: z.enum(['excel', 'software', 'service']).default('software'),

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

    // NIVEL 1 - Mejoras para aumentar conversiones
    
    // Highlights: Puntos clave que capturan atención en 3 segundos
    highlights: z.array(z.string()).optional(),

    // Testimonials: Validación social que aumenta conversión hasta +34%
    testimonials: z
      .array(
        z.object({
          quote: z.string(),
          author: z.string(),
          position: z.string().optional(),
          company: z.string().optional(),
          avatar: z.string().optional(),
          rating: z.number().min(1).max(5).optional(),
        })
      )
      .optional(),

    // Demo Info: Reduce fricción de compra (+20-30% conversión)
    demoInfo: z
      .object({
        available: z.boolean(),
        url: z.string().optional(),
        limitations: z.string().optional(),
        duration: z.string().optional(),
      })
      .optional(),

    // System Requirements: Reduce devoluciones y consultas de soporte
    systemRequirements: z
      .array(
        z.object({
          category: z.string(), // "OS", "Software", "Hardware"
          requirement: z.string(),
          required: z.boolean().default(true),
        })
      )
      .optional(),

    // Related Products: Cross-selling (+15-30% ticket promedio)
    relatedProducts: z
      .array(
        z.object({
          slug: z.string(),
          relationshipType: z.enum(['complementary', 'alternative', 'upgrade']),
          description: z.string().optional(),
        })
      )
      .optional(),

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

    // Problem section configuration
    problemSection: z.object({
      badge: z.string(),
      title: z.string(),
      highlightedWord: z.string().optional(),
      descriptions: z.array(z.string()),
      problems: z.array(z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
      })),
    }).optional(),

    // Features section configuration
    featuresSection: z.object({
      introBadge: z.string().optional(),
      introTitle: z.string(),
      introDescription: z.string(),
      gridTitle: z.string(),
      features: z.array(z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
      })),
    }).optional(),

    // CTA section configuration
    ctaSection: z.object({
      title: z.string(),
      description: z.string(),
      primaryCta: z.object({
        text: z.string(),
        url: z.string(),
      }),
      secondaryCta: z.object({
        text: z.string(),
        url: z.string(),
      }).optional(),
      footerNote: z.string().optional(),
    }).optional(),

    // Benefits section configuration
    benefitsSection: z.object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
      benefits: z.array(z.object({
        title: z.string(),
        description: z.string(),
        highlight: z.string().optional(),
      })),
    }).optional(),

    // Final CTA configuration
    finalCta: z.object({
      title: z.string(),
      description: z.string(),
      buttonText: z.string(),
      buttonUrl: z.string(),
    }).optional(),

    // FAQ section configuration
    faqSection: z.object({
      badge: z.string().optional(),
      title: z.string(),
      description: z.string(),
      contactEmail: z.string().optional(),
      faqs: z.array(z.object({
        question: z.string(),
        answer: z.string(),
      })),
    }).optional(),
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
