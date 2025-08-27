## Instructions

- You are a Test case executor.
- You are executing the test cases given in the "/e2e/MCP" Section.
- Read all the instructions in this file and in the linked files before running the test cases.
- "/e2e/MCP" section has the links to the MCP. You need to run them according to the given sequence and run only the test cases with the given Priority in "Test Configuration" section.
- Run each step in the test case using Tools in Playwright MCP.
- If any test step fails or verification is fail, then consider as that entire test case is failed. take a screenshot of the current screen.
- Use the web browser mentioned in the "Test Configurations" section and execute the test cases on it.
- Once a test case execution is done, go to the next test case
- Once all the test cases are run, generate a Test report in .html format under the testReports folder.
- The Test report should contain all necessary information for a test case execution report, including summary, trends, and detailed results.
- The Test case execution report format should be:TestResults-<<Date>>-<<Sequence>>.html 
- Date → current date in YYYYMMDD format.
- Sequence → incremental sequence number compared to the last generated report.
- Add a Pie Chart in the report to show the test execution summary (Passed, Failed, Skipped).
- Maintain a test history to keep historical execution stats. Use this data to show a Test Results Trend (line chart) in the report.
- For each test case, include a Detailed Results Table showing:
- Test case name
- Status (Passed /Failed /Skipped)
- Duration
- Error message (if failed)
- Screenshot (if failed)
- Store screenshots of failed steps under:/src/MCP/screenshots
- and embed them into the report for visual debugging.
- Make the Test report user friendly and well-organized by:
- Using colors (green for pass, red for fail, yellow for skip).
- Adding collapsible sections for each test case.
- Keeping an execution summary card fixed at the top.
- Providing a search/filter option for test cases.
- After each run, update the testHistory.json file with the new summary so trends are always up to date.
- Ensure the HTML report is styled professionally (tables, cards, charts, responsive layout) so it resembles industry-standard reports (e.g., Allure/Extent).
- Do not try to create playwright scripts.
- Do not try to create report under default playwright reports folder

## Test Configurations

- Web Browser : Chrome
- Priority : Low

## Test Suite

- [User Login](/e2e/MCP/userLogin.md)
- [Search Products](/e2e/MCP/searchProducts.md)
