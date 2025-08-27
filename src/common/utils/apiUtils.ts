import { request, expect, APIResponse } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../common/config/.env') });

export class ApiUtils {
  private static token: string | null = null;
  private static baseURL: string;

  static initBaseUrl(envKey: string, useHttp: boolean = false) {
    const domain = process.env[envKey];

    if (!domain) {
      throw new Error(`Environment variable '${envKey}' is not set.`);
    }

    const protocol = useHttp ? 'http' : 'https';
    this.baseURL = `${protocol}://${domain.replace(/^https?:\/\//, '')}`;
  }

  static setAuthToken(token: string) {
    this.token = token;
  }

  private static getAuthHeaders(authHeaderType: 'bearer' | 'token' = 'token'): Record<string, string> {
    if (!this.token) return {};
    if (authHeaderType === 'bearer') {
      return { Authorization: `Bearer ${this.token}` };
    }
    return { Token: this.token };
  }

  static async post(endpoint: string, queryParams?: Record<string, any>, body?: Record<string, any>, expectSuccess = true, authHeaderType: 'bearer' | 'token' = 'token'): Promise<APIResponse> {
    const url = this.buildUrl(endpoint, queryParams);
    const context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: this.getAuthHeaders(authHeaderType)
    });
    const response = await context.post(url, { data: body ?? {} });
    if (expectSuccess) {
      expect(response.status(), `POST ${url} failed`).toBeLessThan(300);
    }
    return response;
  }

  static async get(endpoint: string, queryParams?: Record<string, any>, expectSuccess = true, authHeaderType: 'bearer' | 'token' = 'token'): Promise<APIResponse> {
    const url = this.buildUrl(endpoint, queryParams);
    const context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: this.getAuthHeaders(authHeaderType)
    });
    const response = await context.get(url);
    if (expectSuccess) {
      expect(response.status(), `GET ${url} failed`).toBeLessThan(300);
    }
    return response;
  }

  private static buildUrl(endpoint: string, queryParams?: Record<string, any>): string {
    const query = queryParams ? '?' + new URLSearchParams(Object.entries(queryParams).map(([k, v]) => [k, String(v)])).toString() : '';
    return `${this.baseURL}${endpoint}${query}`;
  }
}
