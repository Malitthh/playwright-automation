---
description: 'Playwright test writing and execution guidelines'
applyTo: '**'
---

# Playwright Test Guidelines  

## Code Quality Practices  
- **Locators**: Prefer user-centric locators such as `getByRole`, `getByLabel`, or `getByText`. Use `test.step()` to organize actions for readability and clear reporting.  
- **Assertions**: Leverage Playwright’s built-in auto-retrying assertions (e.g., `await expect(locator).toHaveText()`). Avoid plain visibility checks unless specifically required.  
- **Timeouts**: Depend on Playwright’s auto-waiting; avoid manual waits or increasing timeouts unnecessarily.  
- **Clarity**: Write meaningful test and step names. Use comments sparingly, only to explain complex or non-obvious logic.  

## Test Structure  
- **Imports**: Start with `import { test, expect } from '@playwright/test';`.  
- **Grouping**: Organize related tests with `test.describe()`.  
- **Hooks**: Use `beforeEach` for repeated setup tasks such as navigation.  
- **Titles**: Follow a descriptive pattern like `Feature - Action or Scenario`.  

## File Organization  
- **Location**: Store test files inside the `tests/` directory.  
- **Naming**: Use `<feature-or-page>.spec.ts` format (e.g., `login.spec.ts`).  
- **Scope**: Keep each test file focused on one major feature or page.  

## Assertion Guidelines  
- **UI Structure**: Use `toMatchAriaSnapshot` to validate accessibility tree structures.  
- **Element Counts**: Use `toHaveCount` for verifying element numbers.  
- **Text Validation**: Use `toHaveText` for exact matches and `toContainText` for partial matches.  
- **Navigation**: Validate URLs with `toHaveURL`.  

## Example Test  

```typescript
import { test, expect } from '@playwright/test';

test.describe('Movie Search Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate before each test
    await page.goto('https://debs-obrien.github.io/playwright-movies-app');
  });

  test('Search for a movie by title', async ({ page }) => {
    await test.step('Perform search action', async () => {
      await page.getByRole('search').click();
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      await searchInput.fill('Garfield');
      await searchInput.press('Enter');
    });

    await test.step('Validate search results', async () => {
      await expect(page.getByRole('main')).toMatchAriaSnapshot(`
        - main:
          - heading "Garfield" [level=1]
          - heading "search results" [level=2]
          - list "movies":
            - listitem "movie":
              - link "poster of The Garfield Movie The Garfield Movie rating":
                - /url: /playwright-movies-app/movie?id=tt5779228&page=1
                - img "poster of The Garfield Movie"
                - heading "The Garfield Movie" [level=2]
      `);
    });
  });
});
