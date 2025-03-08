import { expect, Page, Locator, FrameLocator } from '@playwright/test';
import { commons } from './commons.page';

export class swagLabs {
    readonly page: Page;
    readonly common: any;
    readonly loadingSpinner: Locator;
    readonly iframeLocator: FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.common = new commons(page);
        this.loadingSpinner = page.locator('div.spinner-border');
        this.iframeLocator = page.getByLabel('SwagLabs Checkout').locator('iframe').contentFrame();
    }

    /**
     * @description verify Table & Checkout State in SwagLabs Order Summary Page
     * @example swagLabs.OrderSummaryPageValidation()
     */
    async OrderSummaryPageValidation(validateTable = true) {
        const beforeScreenshotPathGraph = commons.generateFilePath('graph', 'before-filter');
        const afterScreenshotPathGraph = commons.generateFilePath('graph', 'after-filter');
        const beforeScreenshotPathTable = validateTable ? commons.generateFilePath('table', 'before-filter') : '';
        const afterScreenshotPathTable = validateTable ? commons.generateFilePath('table', 'after-filter') : '';

        const graphArea = this.graphArea.first();
        const tableArea = this.tableArea;

        await this.page.waitForLoadState('domcontentloaded');
        const beforeGraphScreenshot = await commons.captureScreenshot(graphArea, beforeScreenshotPathGraph);
        let beforeTableScreenshot;
        if (validateTable && beforeScreenshotPathTable) {
            beforeTableScreenshot = await commons.captureScreenshot(tableArea, beforeScreenshotPathTable);
        }
        await this.loadingSpinner.waitFor({ state: 'hidden' });
        const afterGraphScreenshot = await commons.captureScreenshot(graphArea, afterScreenshotPathGraph);
        expect(beforeGraphScreenshot).not.toEqual(afterGraphScreenshot);
        if (validateTable && beforeScreenshotPathTable && afterScreenshotPathTable) {
            const afterTableScreenshot = await commons.captureScreenshot(tableArea, afterScreenshotPathTable);
            expect(beforeTableScreenshot).not.toEqual(afterTableScreenshot);
        }
    }
}
