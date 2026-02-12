import { z } from 'zod';
import { insertDonationSchema, insertContactSchema, donations, contactMessages, testimonials } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  donations: {
    create: {
      method: 'POST' as const,
      path: '/api/donations',
      input: insertDonationSchema,
      responses: {
        201: z.custom<typeof donations.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/donations',
      responses: {
        200: z.array(z.custom<typeof donations.$inferSelect>()),
      },
    }
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertContactSchema,
      responses: {
        201: z.custom<typeof contactMessages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    }
  },
  testimonials: {
    list: {
      method: 'GET' as const,
      path: '/api/testimonials',
      responses: {
        200: z.array(z.custom<typeof testimonials.$inferSelect>()),
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
