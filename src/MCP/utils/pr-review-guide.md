# Pull Request Review Guide  

> **Note:** Completing these checks does not automatically qualify a PR for merging. Test coverage, endpoint correctness, and step-by-step validations still require manual review.  

## Review Checklist  

1. **Spec File and Test Context Naming**  
   - Confirm the spec file name and the `test.describe` block name are aligned.  
   - This helps catch copy-paste mistakes.  
   - If they differ, request clearer and consistent naming.  

2. **QMetry ID Reference**  
   - Ensure a QMetry test ID is included at the beginning of the test.  

3. **Import Order and Structure**  
   - Verify that imports are grouped in the following order:  
     - External libraries  
     - Project constants and utilities  
     - Data files  
     - Page objects  

4. **Test Initialization**  
   - Make sure `test.beforeAll()` includes `initializeEnvironmentVariables` and `api.buildAPIHeader()`.  

5. **Avoid Hard-Coded Data**  
   - Confirm test data is parameterized or sourced externally, not hard-coded.  

6. **Response Validations**  
   - Check for assertions ensuring the response body is not null, empty, or an empty string.  

7. **API Payload Documentation**  
   - If changes are made in `apiPayloads.ts`, verify that corresponding payloads are properly documented.  

8. **Consistent Variable Declarations**  
   - Ensure consistent use of `var`, `let`, and `const`, without mixing unnecessarily.  

9. **Formatting and Spacing**  
   - Only one blank line should separate code blocks.  
   - Avoid extra spacing directly after `test.describe` or at the file’s end.  

10. **Unused Code**  
    - Confirm there are no unused variables in the code.  
