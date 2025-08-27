import { z } from 'zod';

export const petstoreSchemas = z.object({
    id: z.number(),
    category: z.object({
        id: z.number(),
        name: z.string()
      }),
    name: z.string(),
    photoUrls: z.array(z.string()),
    tags: z.array(z.object({
        id: z.number(),
        name: z.string()
      })),
    status: z.string()
  });
