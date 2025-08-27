import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../src/Petstore/utils/apiUtils';
import petstoreTestData from '../../src/Petstore/testData/petstoreTestData.json';

const validPet = petstoreTestData[0];

test.describe('Petstore Add Pet API @api', () => {
  test.beforeAll(async () => {
    ApiUtils.initBaseUrl('PETSTORE_API_URL');
  });

  test('TC01: Validate POST pet with valid body', async () => {
    const res = await ApiUtils.post('/pet', validPet);
    console.log('Request Body:', validPet);
    expect(res.status()).toBe(200);
    const body = await res.json();
    const getRes = await ApiUtils.get(`/pet/${validPet.id}`);
    const petFromApi = await getRes.json();
    expect(petFromApi.name).toBe(validPet.name);
    expect(petFromApi.status).toBe(validPet.status);
  });

  test('TC02: Validate GET pet {id} immediately after POST', async () => {
    await ApiUtils.post('/pet', validPet);
    const res = await ApiUtils.get(`/pet/${validPet.id}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(validPet.id);
    expect(body.status).toBe(validPet.status);
  });

  test('TC03: Validate POST pet with name > 36 chars', async () => {
    const longNamePet = { ...validPet, name: 'A'.repeat(37) };
    const res = await ApiUtils.post('/pet', { data: longNamePet });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name.length).toBeGreaterThan(36);
  });

  test('TC04: Validate POST pet with null body', async () => {
    const res = await ApiUtils.post('/pet', { data: null });
    expect(res.status()).toBe(415);
  });

  test('TC05: Validate POST pet with missing authentication', async () => {
    const res = await ApiUtils.post('/pet', { data: validPet });
    expect(res.status()).toBe(200);
  });

  test('TC06: Validate POST pet with incorrect URL', async () => {
    const res = await ApiUtils.post('/pet/invalid', { data: validPet });
    expect(res.status()).toBe(404);
  });

  test('TC07: Validate POST pet with incorrect authorization', async () => {
    const res = await ApiUtils.post('/pet', { data: validPet, headers: { Authorization: 'Bearer invalid' } });
    expect(res.status()).toBe(200);
  });

  test('TC08: Validate POST pet with empty JSON body', async () => {
    const res = await ApiUtils.post('/pet', { data: {} });
    expect(res.status()).toBe(405);
  });

  test('TC09: Validate POST pet using HTTP instead of HTTPS', async () => {
    const httpApi = await request.newContext({ baseURL: 'http://petstore.swagger.io/v2' });
    const res = await httpApi.post('/pet', { data: validPet });
    expect([200, 301, 302, 403]).toContain(res.status());
  });
});
