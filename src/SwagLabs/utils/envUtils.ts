import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../config/.env') });
console.log('BASE_URL:', process.env.BASE_URL);

export const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || defaultValue!;
};
