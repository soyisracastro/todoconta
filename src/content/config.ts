import { defineCollection, z } from "astro:content";

const productsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        pricePeriod: z.string().optional(),
        badge: z.string().optional(),
        heroImage: z.string().optional(),
        demoUrl: z.string().optional(),
        buyUrl: z.string().optional(),
        features: z.array(z.object({
          icon: z.string(),
          title: z.string(),
          description: z.string()
        })),
        benefits: z.array(z.object({
          title: z.string(),
          description: z.string()
        })),
        pricing: z.object({
          features: z.array(z.string())
        }),
        faqs: z.array(z.object({
          question: z.string(),
          answer: z.string()
        })),
        formId: z.string().optional()
      })    
})

const servicesCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        monthlyPrice: z.number(),
        yearlyPrice: z.number().optional(),
        savings: z.string().optional(),
        currency: z.string().default('MXN'),
        priceNote: z.string().optional(),
        badge: z.string().optional(),
        featured: z.boolean().default(false),
        recommendedFor: z.string(),
        heroImage: z.string().optional(),
        ctaText: z.string().default('Contratar Ahora'),
        ctaUrl: z.string(),
        secondaryCtaText: z.string().optional(),
        secondaryCtaUrl: z.string().optional(),
        includedFeatures: z.array(z.object({
          icon: z.string(),
          text: z.string(),
          included: z.boolean().default(true)
        })),
        categories: z.array(z.object({
          title: z.string(),
          features: z.array(z.object({
            text: z.string(),
            included: z.boolean(),
            tooltip: z.string().optional()
          }))
        })),
        testimonials: z.array(z.object({
          quote: z.string(),
          author: z.string(),
          position: z.string().optional(),
          company: z.string().optional(),
          avatar: z.string().optional()
        })).optional(),
        faqs: z.array(z.object({
          question: z.string(),
          answer: z.string()
        })).optional(),
        process: z.array(z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string()
        })).optional(),
        stats: z.array(z.object({
          value: z.string(),
          label: z.string(),
          description: z.string().optional()
        })).optional()
      })    
})

const infoCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        lastUpdated: z.date(),
        heroImage: z.string().optional(),
        badge: z.string().optional(),
        seoKeywords: z.array(z.string()).optional(),
        mainCta: z.object({
          text: z.string(),
          url: z.string()
        }).optional(),
        secondaryCta: z.object({
          text: z.string(),
          url: z.string()
        }).optional(),
        toc: z.boolean().default(true), // Tabla de contenidos
        sections: z.array(z.object({
          title: z.string(),
          content: z.string(), // Contenido en Markdown
          image: z.string().optional(),
          callout: z.object({
            type: z.enum(['info', 'warning', 'success', 'error']),
            title: z.string().optional(),
            content: z.string()
          }).optional(),
        })),
        requirements: z.array(z.string()).optional(),
        timeline: z.array(z.object({
          title: z.string(),
          description: z.string(),
          duration: z.string().optional()
        })).optional(),
        faqs: z.array(z.object({
          question: z.string(),
          answer: z.string()
        })).optional(),
        relatedServices: z.array(z.string()).optional(), // Referencias a otros servicios
        relatedInfo: z.array(z.string()).optional(), // Referencias a otras páginas informativas
        downloadables: z.array(z.object({
          title: z.string(),
          description: z.string().optional(),
          fileUrl: z.string(),
          fileType: z.string().optional() // PDF, XLSX, etc.
        })).optional(),
        authorInfo: z.object({
          name: z.string(),
          title: z.string().optional(),
          bio: z.string().optional(),
          avatar: z.string().optional()
        }).optional()
      })    
})

export const collections = {
    'products': productsCollection,
    'services': servicesCollection,
    'info': infoCollection,
}