import { test, expect } from "@playwright/test";
import commons from "../../pages/commons.page";

test.describe("Playwright 101: Beginner's Guide", async () => {
  //Qmetry - SwagLabs-TC-001
  test("Add to Cart", async ({ page }) => {
    const common = new commons(page);
    const randomData = commons.generateRandomData();

    // await common.navigateToBaseUrl();
    await common.login('standard_user', 'secret_sauce');

    await common.addtoCart();
    await common.checkoutProcess(randomData);
  });
});

