# PR Review Instructions
 
> **Note:** This does not mean that passing this check makes the PR eligible for merge. The test coverage, endpoint details and other test step validations should be reviewed manually.
 
## PR Checks
 
1. **Spec File and Test Context Naming**
   - Verify that Spec File name and `test.describe` context names are the same/mean the same
   - This is to catch oversight errors that might have happened due to copy paste
   - If they are not related, fail check and suggest a better file name and `test.describe` context name
 
2. **QMetry ID Presence**
   - Ensure QMetry Id is present on the top of the test
 
3. **Import Statement Organization**
   - Verify that the import statements are organized based on the below categories:
     - External library imports
     - Project constants and utilities
     - Data imports
     - Page objects
 
4. **Test Setup Methods**
   - Verify that `test.beforeAll()` has `initializeEnvironmentVariables` and `api.buildAPIHeader()` methods
 
5. **Hard-coded Test Data**
   - Verify there are no hard-coded test data in the tests
 
6. **Response Body Assertion**
   - Verify that there is an assertion to check response body is not null or empty or ""
 
7. **API Payloads Documentation**
   - If `apiPayloads.ts` file is part of checks, ensure proper documentation is provided for the associated payload
 
8. **Variable Declaration Consistency**
   - Ensure `var`, `const` and `let` are grouped and not mixed
 
9. **Code Spacing**
   - Ensure there is only 1 line space between each block of code, and no extra space immediately after `test.describe` and the last block
 
10. **Unused Variables**
    - Ensure there are no unused variables