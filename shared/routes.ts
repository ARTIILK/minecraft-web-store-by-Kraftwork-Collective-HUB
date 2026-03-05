import { z } from 'zod';
import { siteConfigSchema, categorySchema, productSchema } from './schema';

export const api = {
  config: {
    site: {
      method: 'GET' as const,
      path: '/api/config/site' as const,
      responses: {
        200: siteConfigSchema,
      },
    },
    categories: {
      method: 'GET' as const,
      path: '/api/config/categories' as const,
      responses: {
        200: z.array(categorySchema),
      },
    },
    products: {
      method: 'GET' as const,
      path: '/api/config/products' as const,
      responses: {
        200: z.array(productSchema),
      },
    },
  },
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
