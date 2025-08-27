import { test, expect } from '../../src/SwagLabs/config/testFixtures';
import commons from '../../src/SwagLabs/pages/commons';
import { getEnvVariable } from '../../src/SwagLabs/utils/envUtils';
import testData from '../../src/SwagLabs/testData/userInformation.json';

test.describe("Playwright 101: Beginner's Guide", async () => {
  let baseUrl: string;
  let testUserPassword: string;
  let testUserName: string;

  test.beforeEach(async ({ pageWithLogin }) => {
    const common = new commons(pageWithLogin);
    testUserName = await common.getandVerifyUsername(testData.users?.SwagLabsUser?.username);
    baseUrl = getEnvVariable('BASE_URL');
    testUserPassword = getEnvVariable('TEST_USER_PASSWORD');
  });

  //Qmetry - SwagLabs-TC-001
  test('Add to Cart', async ({ page }) => {
    const common = new commons(page);
    const randomData = commons.generateRandomData();
    await common.navigateTo(baseUrl);
    await common.SwagLabsLogin(testUserName, testUserPassword);
    await common.addtoCart();
    await common.checkoutProcess(randomData);
  });
});
