import { expect, type Locator, type Page } from '@playwright/test';
import * as fs from 'fs';
import path from 'path';
import { getEnvVariable } from '../utils/envUtils';

export class Commons {
  readonly page: Page;
  readonly usernameInputField: Locator;
  readonly passowrdInputField: Locator;
  readonly loginButton: Locator;
  readonly pageTitle: Locator;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly paymentInfoLabel: Locator;
  readonly shippingInfoLabel: Locator;
  readonly totalPriceLabel: Locator;
  readonly taxLabel: Locator;
  readonly subtotalLabel: Locator;
  readonly finishButton: Locator;
  readonly orderConfirmationText: Locator;
  readonly addToCartBackpackButton: Locator;
  readonly addToCartTShirtButton: Locator;
  readonly addToCartJacketButton: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInputField = page.getByPlaceholder('Username');
    this.passowrdInputField = page.getByPlaceholder('Password');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.pageTitle = page.getByText('Swag Labs');
    this.checkoutButton = page.locator('button[data-test="checkout"]');
    this.firstNameInput = page.locator('input[id="first-name"]');
    this.lastNameInput = page.locator('input[id="last-name"]');
    this.postalCodeInput = page.locator('input[id="postal-code"]');
    this.continueButton = page.locator("//div[@class='checkout_buttons']/input[@id='continue']");
    this.paymentInfoLabel = page.locator('text=Payment Information');
    this.shippingInfoLabel = page.locator('text=Shipping Information');
    this.totalPriceLabel = page.locator('//div[@class="summary_total_label"]');
    this.taxLabel = page.locator('//div[@class="summary_tax_label"]');
    this.subtotalLabel = page.locator('//div[@class="summary_subtotal_label"]');
    this.finishButton = page.locator('//button[@id="finish"]');
    this.orderConfirmationText = page.locator('//h2[normalize-space()="Thank you for your order!"]');
    this.addToCartBackpackButton = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
    this.addToCartTShirtButton = page.locator('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.addToCartJacketButton = page.locator('button[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    this.shoppingCartLink = page.locator('a.shopping_cart_link[data-test="shopping-cart-link"]');
  }

  /** * Verifies and retrieves the provided username.
   * * Ensures that the username is valid and not empty.
   * * @param username - The username to verify and return.
   * * @returns A Promise that resolves to the provided username as a string.
   * * @throws An error if the username is missing or invalid. */

  async getandVerifyUsername(username: string): Promise<string> {
    if (!username) {
      throw new Error('Username is missing or invalid in the test data.');
    } else {
      return username;
    }
  }

  /**
   * Navigates to the specified URL and waits for the page to load completely.
   * @param path - The URL to navigate to.
   */
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Logs into the application using the provided username and password.
   * @param username - The username for login.
   * @param password - The password for login.
   */
  async SwagLabsLogin(username: string, password: string, endpoint: string = 'inventory.html', baseUrl: string = 'BASE_URL'): Promise<void> {
    await this.usernameInputField.click();
    await this.usernameInputField.fill(username);
    await this.passowrdInputField.click();
    await this.passowrdInputField.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL(`${getEnvVariable(baseUrl)}/${endpoint}`);
  }

  async addtoCart() {
    await this.addToCartBackpackButton.click();
    await this.addToCartTShirtButton.click();
    await this.addToCartJacketButton.click();
    await this.shoppingCartLink.click();
  }

  static generateRandomData() {
    const randomFirstName = `Soap${Math.floor(Math.random() * 100)}`;
    const randomLastName = `Mactavish${Math.floor(Math.random() * 100)}`;
    const randomZip = Math.floor(Math.random() * 10000);
    return {
      namefirst: randomFirstName,
      namelast: randomLastName,
      zip: randomZip.toString()
    };
  }

  async checkoutProcess(random: { namefirst: string; namelast: string; zip: string }): Promise<void> {
    await this.checkoutButton.click();
    await this.firstNameInput.click();
    await this.firstNameInput.fill(random.namefirst);
    await this.lastNameInput.click();
    await this.lastNameInput.fill(random.namelast);
    await this.postalCodeInput.click();
    await this.postalCodeInput.fill(random.zip);
    await this.continueButton.click();

    await expect(this.paymentInfoLabel).toBeVisible();
    await expect(this.page.locator('text=SauceCard #31337')).toBeVisible();

    await expect(this.shippingInfoLabel).toBeVisible();
    await expect(this.page.locator('text=Free Pony Express Delivery!')).toBeVisible();

    const subtotalText = await this.subtotalLabel.innerText();
    const itemTotal = parseFloat(subtotalText.split('$')[1].trim());

    const taxText = await this.taxLabel.innerText();
    const tax = parseFloat(taxText.split('$')[1].trim());

    const totalText = await this.totalPriceLabel.innerText();
    const total = parseFloat(totalText.split('$')[1].trim());

    const expectedTotal = itemTotal + tax;

    expect(total).toBe(expectedTotal);
    console.log('Total:', total);
    console.log('Expected Total:', expectedTotal);
    await this.finishButton.click();
    await expect(this.orderConfirmationText).toBeVisible();
  }

  /**
   * @description create a screenshots Directory
   */
  static createScreenshotsDir(): string {
    const screenshotsDir = path.resolve(process.cwd(), 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    return screenshotsDir;
  }
  /**
   * @description generate current time
   * @example getTimestamp()
   */

  static getTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }
  /**
   * @description capture a screenshot
   * @example commons.captureScreenshot(Locator, GeneratedFilePath)
   */

  static async captureScreenshot(locator: Locator, screenshotPath: string): Promise<Buffer> {
    return await locator.screenshot({ path: screenshotPath });
  }
  /**
   * @description generate a file path
   * @example commons.generateFilePath('FileName', 'State')
   */

  static generateFilePath(type: string, state: string): string {
    const screenshotsDir = this.createScreenshotsDir();
    return path.join(screenshotsDir, `${type}-${state}-${this.getTimestamp()}.png`);
  }
  /**
   * @description Deletes all screenshots from the screenshots directory.
   * @example commons.cleanScreenshots()
   */

  static async cleanScreenshots() {
    const screenshotsDir = path.resolve(process.cwd(), 'screenshots');
    if (fs.existsSync(screenshotsDir)) {
      const files = fs.readdirSync(screenshotsDir);
      files.forEach((file) => {
        fs.unlinkSync(path.join(screenshotsDir, file));
      });
      console.log('Screenshots cleaned after each test.');
    }
  }
}
export default Commons;
