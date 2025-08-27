## Playwright-Automation Framework

Welcome to the Playwright-Automation repository! This project is designed to help beginners and contributors get started with open-source test automation using Playwright. Here, you’ll find everything you need to set up, run, and contribute to UI and API test scripts, focusing on legitimate free APIs and UIs.

![Playwright Banner](./playwright-banner.png)

---

### Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running Tests](#running-tests)
4. [Tagging & Filtering](#tagging--filtering)
5. [Report Generation](#report-generation)
6. [Contribution Guidelines](#contribution-guidelines)
7. [Contact](#contact)

---

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

Refer to [CONTRIBUTING.md](https://github.com/Malitthh/playwright-automation/blob/main/CONTRIBUTING.md) for contribution rules.

---

### Installation

**For a new Playwright project:**

1. Install Node.js and set up the `NODE_HOME` environment variable.
2. Create a working folder for Playwright.
3. Initialize your project:
   ```bash
   npm init playwright@latest
   ```

**For this repository:**

1. Clone the repository:
   ```bash
   git clone https://github.com/Malitthh/playwright-automation
   cd <repository-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

---

### Running Tests

You can run tests in several ways:

- **UI Mode:**  
  ```bash
  npx playwright test --ui
  ```
- **All Tests:**  
  ```bash
  npx playwright test
  ```
- **Specific Test File:**  
  ```bash
  npx playwright test TC.spec.ts
  ```
- **Headed Mode:**  
  ```bash
  npx playwright test TC.spec.ts --headed
  ```
- **Specific Browser:**  
  ```bash
  npx playwright test TC.spec.ts --project chromium --headed
  ```

**Using VS Code:**  
Install the [Playwright Runner VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ortoni.ortoni) for easy test execution from the editor.

**Command Line Shortcut:**  
```bash
npm run e2e
npm run e2e tests/example.spec.ts --project=chromium
```

---

### Playwright Recorder

Generate code using the Playwright recorder:
```bash
npx playwright codegen --test-id-attribute="data-cy"
```

---

### Tagging & Filtering

Tag your tests for selective execution:

```js
test('Login: Validate successful login @smoke', async ({ page }) => { ... });
test('Dashboard: Check pagination controls @regression', async ({ page }) => { ... });
test('Profile: Confirm user role permissions @smoke @regression', async ({ page }) => { ... });
```

**Run tests by tag:**
```bash
npx playwright test --grep '@smoke'
```

**Exclude tags:**
```bash
npx playwright test --grep-invert @smoke
npx playwright test --grep-invert @regression
```

---

### Report Generation

After running tests, generate and view HTML reports:

```bash
npx playwright show-report
```

Reports are saved in the `reports` directory. Open `index.html` manually or use the command above to view results.

---

### Contribution Guidelines

To contribute:

1. **Fork the repository** and clone your fork.
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make changes** following coding standards.
4. **Test your changes** to ensure all tests pass.
5. **Push your branch** and open a pull request with a clear description.

**Coding Standards:**

- Use [Prettier](https://prettier.io/) for formatting.
- Organize tests using the Page Object Model (POM).
- Write clear branch names and commit messages.
- Use meaningful test descriptions.

**Linting & Formatting:**

Run validation before committing:
```bash
npm run validate
```
This runs Prettier and ESLint for code quality.

---

### Additional Utilities

Generate TypeScript schemas from JSON:
```bash
npm run generateSchema -- --input=src/SwagLabs/testData/responseData.json --output=src/SwagLabs/schemas/generatedSchemas.ts --name=generatedSchemas
```

---

### Contact

For questions or support, open an issue or reach out via the repository’s contact channels.

---

Thank you for contributing and helping us build a robust Playwright automation framework!

