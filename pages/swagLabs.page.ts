import { expect, Page, Locator, FrameLocator } from '@playwright/test';
import { commons } from './commons.page';

export class swagLabs {
    readonly page: Page;
    readonly common: any;
    readonly loadingSpinner: Locator;
    readonly iframeLocator: FrameLocator;
    private filterMapping: Record<string, Locator>;
    readonly graphArea;
    readonly tableArea;

    constructor(page: Page) {
        this.page = page;
        this.common = new commons(page);
        this.loadingSpinner = page.locator('div.spinner-border');
        this.iframeLocator = page.getByLabel('SwagLabs Checkout').locator('iframe').contentFrame();
        this.graphArea = page.locator('div.graph-area');
        this.tableArea = page.locator('div.table-area');

        // Initialize the filter mapping here
        this.filterMapping = {
            'Item': this.common.allItemFilter,
            'Bag Name': this.common.BagNameNameFilter,
            'Swag Name': this.common.SwagNameFilter,
            'Shoe Name': this.common.ShoeNameFilter,
            'Hoodie': this.common.HoodieFilter
        };
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

    /**
     * @description verify filters in SwagLabs Order Item Page
     * @example swagLabs.OrderItemsFilter()
     */
    async OrderItemsFilter(filterTopic: string) {
        const expectedFilterElement = this.filterMapping[filterTopic];
        await this.common.filterSearchBox.click();
        await this.common.filterSearchBox.type(filterTopic);
        await expect(expectedFilterElement).toBeVisible();
    }
}
