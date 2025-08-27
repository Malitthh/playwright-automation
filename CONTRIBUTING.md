#### How to Contribute

1. **Fork** this repository.
2. **Clone** your fork locally:
    ```bash
    git clone https://github.com/your_username/playwright-automation.git
    ```
3. **Navigate** to the project directory:
    ```bash
    cd playwright-automation
    ```
4. **Create a new branch** for your changes:
    ```bash
    git checkout -b mybranch
    ```
5. **Open** the project in your preferred editor.
6. **Organize your code**:
    - Place test data in the `fixture` folder.
    - Place test scripts in the `test` folder.
    - Store reusable functions in `commons.ts`.
    - Write UI or API scripts as needed.
7. **Stage, commit, and push** your changes:
    ```bash
    git add .
    git commit -m "your commit message"
    git push origin mybranch
    ```
8. **Submit a pull request** from your branch to the `main` branch of this repository.

---

#### Naming Conventions

| Identifier Type | Naming Rules | Examples |
|-----------------|-------------|----------|
| **Packages**    | Lowercase, descriptive, use hyphens/underscores if needed. Semantic versioning (MAJOR.MINOR.PATCH). | `lodash`, `axios`, `express` |
| **Classes**     | Start with uppercase, use CamelCase. | `class Person`, `class Cars` |
| **Interfaces**  | Start with uppercase, use CamelCase. | `interface Animal`, `interface Humans` |
| **Methods**     | Camel case, start with lowercase. | `startEngine()`, `brake()`, `accelerate(speed)` |
| **Variables**   | Camel case, start with lowercase, descriptive. Avoid reserved keywords. | `const firstName = 'John'`, `let age = 30`, `var isStudent = true` |

---

#### Commit Message Format

Format: `type: Description`

Example:
```bash
git commit -m "refactor: Login TC updated"
```

Types:
- `feat:` Feature addition
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style changes
- `refactor:` Refactoring code
- `test:` Test files
- `revert:` Reverting changes

---

**References:**
- [JavaScript Naming Conventions](https://www.w3schools.com/js/js_conventions.asp)
- [Playwright Documentation](https://playwright.dev/docs/intro)
