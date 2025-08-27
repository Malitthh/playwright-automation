import dotenv from 'dotenv';
dotenv.config();
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 420_000,
  expect: {
    timeout: 15000
  },
  retries: 1,
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['junit', { outputFile: process.env.PLAYWRIGHT_JUNIT_OUTPUT_NAME || 'reports/junit-results.xml' }],
    ['line']
  ],
  use: {
    headless: true,
    testIdAttribute:'data-cy',
    viewport: null,
    baseURL: process.env.BASE_URL || 'https://example.com',
    actionTimeout: 60_000,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: {
      args: [
        '--start-maximized',
        '--window-size=1920,1080'
      ],
      ignoreDefaultArgs: ['--enable-automation']
    }
  },
  workers: 5,
  outputDir: 'reports/test-results',
  projects: [
    {
      name: 'Chromium (Maximized)',
      use: {
        browserName: 'chromium',
      }
    }
  ]
});
