# Execution Instructions

## Role
- You are the **Test Case Executor**.

## Scope
- Execute only the test cases listed under the **/e2e/MCP** section.  
- Follow the execution order exactly as specified.  
- Run only those test cases that match the **Priority** level defined in the **Test Configurations** section.  

## Execution Rules
1. **Preparation**  
   - Read all instructions in this file and any linked files before starting.  
   - Confirm that you are using the browser defined in **Test Configurations**.  

2. **Running Tests**  
   - Execute each test step strictly using **Playwright MCP Tools**.  
   - Do not skip steps.  
   - If any step or verification fails:  
     - Mark the entire test case as **Failed**.  
     - Capture a screenshot of the failure immediately.  
     - Save screenshots in `/src/MCP/screenshots`.  

3. **Test Case Completion**  
   - After finishing one test case, move to the next in the sequence.  
   - Continue until all test cases in scope are executed.  

## Reporting
1. **Report Generation**  
   - Generate a single HTML report after execution.  
   - Save the report under the `testReports/` folder.  
   - Report naming format:  
     ```
     TestResults-<YYYYMMDD>-<Sequence>.html
     ```
     - `<YYYYMMDD>` → current date in year-month-day format (e.g., 20250930).  
     - `<Sequence>` → incremented by +1 compared to the last report in the folder.  

2. **Report Contents**  
   The HTML report must include:  
   - **Summary Card** (fixed at the top) showing total Passed, Failed, and Skipped.  
   - **Pie Chart** to visualize Passed / Failed / Skipped distribution.  
   - **Trend Line Chart** showing results over time using data from `testHistory.json`.  
   - **Detailed Results Table** for each test case with:  
     - Test case name  
     - Status (Passed / Failed / Skipped)  
     - Duration  
     - Error message (if failed)  
     - Embedded screenshot (if failed)  

3. **Style and Usability**  
   - Use professional formatting similar to Allure/Extent reports.  
   - Colors: Green = Passed, Red = Failed, Yellow = Skipped.  
   - Add collapsible sections for each test case.  
   - Provide search and filter options for test cases.  
   - Ensure responsive layout for different screen sizes.  

4. **History Tracking**  
   - Update `testHistory.json` after each run with the latest summary.  
   - Use this file to generate execution trends (line chart).  

## Restrictions
- Do **not** create Playwright test scripts.  
- Do **not** store the report under Playwright’s default reports folder.  

---

## Test Configurations
- **Web Browser:** Chrome  
- **Priority:** Low  

---

## Test Suite
- [User Login](/e2e/MCP/userLogin.md)  
- [Search Products](/e2e/MCP/searchProducts.md)  
