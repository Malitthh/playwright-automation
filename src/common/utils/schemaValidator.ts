import { z } from 'zod';

export class SchemaValidator {
  static validate<T>(schema: z.ZodSchema<T>, data: unknown, label = 'API Response'): T {
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error(`Schema validation failed for ${label}:`, result.error.format());
      throw new Error(`${label} schema validation failed`);
    }
    return result.data;
  }
}
