import { test as baseTest, expect, Page } from '@playwright/test';
import { Commons } from '../../../src/SwagLabs/pages/commons';
import { getEnvVariable } from '../utils/envUtils';
import testData from '../testData/userInformation.json';

type TestFixtures = {
  pageWithLogin: Page;
  pageWithProdLogin: Page;
};

export const test = baseTest.extend<TestFixtures>({
  pageWithLogin: async ({ page }, use) => {
    const commons = new Commons(page);
    const baseUrl = getEnvVariable('BASE_URL'); // Dev/Test environment URL
    const { username } = testData.users.SwagLabsUser;
    const password = getEnvVariable('TEST_USER_PASSWORD');
    await commons.navigateTo(baseUrl);
    await commons.SwagLabsLogin(username, password);
    await use(page);
  },

  pageWithProdLogin: async ({ page }, use) => {
    const commons = new Commons(page);
    const prodUrl = getEnvVariable('BASE_URL_PROD'); // Prod environment URL
    const { username } = testData.users.SwagLabsUser; // Make sure this user exists in the JSON
    const password = getEnvVariable('TEST_USER_PASSWORD');
    await commons.navigateTo(prodUrl);
    await commons.SwagLabsLogin(username, password, 'home', 'BASE_URL_PROD');
    await use(page);
  }
});

export { expect };
