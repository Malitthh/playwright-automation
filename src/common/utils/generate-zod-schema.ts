#!/usr/bin/env ts-node

import { writeFileSync, readFileSync } from 'fs';
import path from 'path';
import { z, ZodTypeAny } from 'zod';
import { parseArgs } from 'node:util';
import { zodToTs } from 'zod-to-ts';

/**
 * Recursively builds a Zod schema from a plain JavaScript object.
 * This function infers the Zod type based on the JavaScript type of values in the object.
 * This can be extended for more complex inference (e.g., z.literal, z.optional).
 * @param obj The JavaScript object (or array, or primitive) to infer the Zod schema from.
 * @returns A ZodTypeAny representing the inferred schema.
 */
function buildZodSchemaFromObject(obj: any): ZodTypeAny {
  if (obj === null) {
    return z.any().nullable();
  }
  if (typeof obj === 'string') {
    return z.string();
  }
  if (typeof obj === 'number') {
    return z.number();
  }
  if (typeof obj === 'boolean') {
    return z.boolean();
  }
  if (Array.isArray(obj)) {
    const elementType = obj.length > 0 ? buildZodSchemaFromObject(obj[0]) : z.any();
    return z.array(elementType);
  }
  if (typeof obj === 'object') {
    const shape: { [key: string]: ZodTypeAny } = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        shape[key] = buildZodSchemaFromObject(obj[key]);
      }
    }
    return z.object(shape);
  }
  return z.any();
}

/**
 * Converts a ZodTypeAny object back into its string representation as Zod code.
 * This is a simplified function and needs to be extended for all Zod types you might encounter.
 * @param schema The Zod schema object to stringify.
 * @returns A string representation of the Zod schema.
 */
const stringifyZodSchema = (schema: ZodTypeAny): string => {
  if (schema instanceof z.ZodObject) {
    const entries = Object.entries(schema.shape).map(([key, value]) => {
      const stringifiedValue = stringifyZodSchema(value as ZodTypeAny).replace(/\n/g, '\n    ');
      return `${key}: ${stringifiedValue}`;
    });
    return `z.object({\n    ${entries.join(',\n    ')}\n  })`;
  } else if (schema instanceof z.ZodString) {
    return `z.string()`;
  } else if (schema instanceof z.ZodNumber) {
    return `z.number()`;
  } else if (schema instanceof z.ZodBoolean) {
    return `z.boolean()`;
  } else if (schema instanceof z.ZodArray) {
    const elementType = stringifyZodSchema((schema as any)._def.type);
    return `z.array(${elementType})`;
  } else if (schema instanceof z.ZodNullable) {
    const innerType = stringifyZodSchema((schema as any)._def.innerType);
    return `${innerType}.nullable()`;
  } else if (schema instanceof z.ZodLiteral) {
    return `z.literal(${JSON.stringify((schema as any)._def.value)})`;
  }
  return `z.any()`;
};

const args = parseArgs({
  options: {
    input: { type: 'string' },
    output: { type: 'string' },
    name: { type: 'string', default: 'generatedSchema' },
  },
}).values;

if (!args.input || !args.output) {
  console.error(`Usage:
  npm run generateSchema -- --input=path/to/response.json --output=path/to/schema.ts [--name=SchemaName]
  `);
  process.exit(1);
}

const jsonPath = path.resolve(args.input);
const outputPath = path.resolve(args.output);
const schemaName = args.name;

let rawJson: any;
try {
  rawJson = JSON.parse(readFileSync(jsonPath, 'utf-8'));
} catch (error) {
  console.error(`Error reading or parsing JSON file at ${jsonPath}:`, error);
  process.exit(1);
}

let zodSchemaObject: z.ZodTypeAny;
let zodSchemaCodeString: string;

try {
  zodSchemaObject = buildZodSchemaFromObject(rawJson);
  zodSchemaCodeString = stringifyZodSchema(zodSchemaObject);
} catch (error) {
  console.error(`Error building or stringifying Zod schema object:`, error);
  process.exit(1);
}

const finalOutput = `import { z } from 'zod';

export const ${schemaName} = ${zodSchemaCodeString};
`;

try {
  writeFileSync(outputPath, finalOutput, 'utf-8');
  console.log(`Schema '${schemaName}' saved to ${outputPath}`);
} catch (error) {
  console.error(`Error writing schema to file at ${outputPath}:`, error);
  process.exit(1);
}
