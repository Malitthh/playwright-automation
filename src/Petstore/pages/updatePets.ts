import { SchemaValidator } from '../../common/utils/schemaValidator';
import { expect } from '@playwright/test';
import * as fs from 'fs/promises';
import { petstoreSchemas } from '../schemas/petstoreSchemas';
import testData from '../testData/petstoreTestData.json';
import { ApiUtils } from '../../Petstore/utils/apiUtils';

export class PetstoreService {
    /**
     * Adds pets using provided data, validates the response,
     * and saves relevant output fields to a file.
     *
     * @param outputFilePath - Path to save the output JSON
     * @param schema - Optional zod schema to validate the response
     * @param slice - Optional slice of the test data to use, start (inclusive) & end index (exclusive) (e.g. 0,5)
     */
    static async addPets(outputFilePath: string, schema = petstoreSchemas): Promise<void> {
        await fs.writeFile(outputFilePath, JSON.stringify({ results: [] }, null, 2));

        for (const body of testData) {
            const postRes = await ApiUtils.post('/pet', undefined, body, true);
            expect(postRes.status()).toBe(200);

            const responseJson = await postRes.json();

            try {
                SchemaValidator.validate(schema, responseJson, 'Add Pet Response');
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.warn(`Schema validation failed for pet ID ${body.id}: ${error.message}`);
                } else {
                    console.warn(`Schema validation failed for pet ID ${body.id}:`, error);
                }
                responseJson.schemaValidation = 'failed';
            }

            await this.saveResult(responseJson, body.id, outputFilePath);
        }
    }

    /**
     * Extracts and saves required fields from the Add Pet API response.
     *
     * @param responseJson - JSON object returned by the Add Pet API
     * @param petId - ID of the pet added
     * @param outputFile - File path to save the extracted results
     */
    private static async saveResult(responseJson: any, petId: number, outputFile: string) {
        const responseObj = {
            petId,
            status: responseJson.status || 'SUCCESS',
            name: responseJson.name || null,
            category: responseJson.category?.name || null,
            tags: responseJson.tags?.map((tag: any) => tag.name) || [],
            photoUrls: responseJson.photoUrls || [],
        };

        const existing = JSON.parse(await fs.readFile(outputFile, 'utf-8'));
        existing.results.push(responseObj);
        await fs.writeFile(outputFile, JSON.stringify(existing, null, 2));
    }
}
