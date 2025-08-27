## Instructions

- Run "Before Each Test case" section before running each test case.
- Run "After Each Test case" section after running each test case.

## Before Each Test case

- Navigate to https://www.saucedemo.com/v1/inventory.html

## Ater Each Test case

- Close the web browser.

## Test cases

### TC 01 - Add to Cart

### Priority : Low

- Add to Cart "Sauce Labs Backpack"
- Add to Cart "Sauce Labs Bike Light"
- Click on Cart
- Click on Checkout
- In Checkout oage add your information [Checkout Informations](/src/MCP/testData/userInformation.md)
- Validate the total price is $43.18
- Click on Finish Button
- Verify the "THANK YOU FOR YOUR ORDER"