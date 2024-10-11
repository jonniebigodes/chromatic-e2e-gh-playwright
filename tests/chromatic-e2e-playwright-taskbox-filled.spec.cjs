// @ts-check
const { expect, takeSnapshot, test } = require("@chromatic-com/playwright");

test.beforeEach(async ({ context }) => {
  await context.route("/authenticate", (route) => {
    return route.fulfill({
      status: 200,
      json: {
        user: {
          name: "Alice Carr",
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        },
      },
    });
  });

  await context.route("/tasks", (route) => {
    return route.fulfill({
      status: 200,
      json: {
        tasks: [
          { id: "1", state: "TASK_INBOX", title: "Build a date picker" },
          { id: "2", state: "TASK_INBOX", title: "QA dropdown" },
          {
            id: "3",
            state: "TASK_INBOX",
            title: "Write a schema for account avatar component",
          },
          { id: "4", state: "TASK_INBOX", title: "Export logo" },
          {
            id: "5",
            state: "TASK_INBOX",
            title: "Fix bug in input error state",
          },
          {
            id: "6",
            state: "TASK_INBOX",
            title: "Draft monthly blog to customers",
          },
        ],
      },
    });
  });
});

test("Chromatic E2E Playwright - Successful Login with tasks", async ({
  page,
}, testInfo) => {
  const email = "alice.carr@test.com";
  const password = "k12h1k0$5;lpa@Afn";
  await page.goto("/");

  // Take a snapshot of the initial page
  await takeSnapshot(page, "Filled Tasks - Initial Stage", testInfo);

  // Fills the form inputs
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);

  // Take a snapshot of the form filled
  await takeSnapshot(page, "Filled Tasks - Filled Form", testInfo);

  // Clicks the submit button
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.locator('[aria-label="tasks"] div')).toHaveCount(6);

  // Take a snapshot of the form filled
  await takeSnapshot(page, "Filled Tasks - Tasks Loaded", testInfo);
});

test.describe('Authentication', () => {
  test.use({
    disableAutoSnapshot: true,
  })
  test('Should be able to fill the form and focus the button using CSS focus', async ({
    page,
  }, testInfo) => {
    await page.goto('/login')

    await page.screenshot({
      path: './test-results/InitialLoginPageFocusCSS.png',
      fullPage: true,
    })
    await takeSnapshot(
      page,
      'Playwright - Login with CSS Focus state - Initial state of the login page',
      testInfo
    )

    await page.locator('input[name="email"]').fill('test@email.com')
    await page.locator('input[name="password"]').fill('KC@2N6^?vsV+)w1t')

    /* 
      Documentation to introduce the focus state for Chromatic
        - https://playwright.dev/docs/api/class-locator#locator-focus
        - https://playwright.dev/docs/actionability
      */

    // This example should go into the Docs
    /* 
      await page.getByRole('button', {name: 'Login to your account'}).focus()
      await expect(page.getByRole('button')).toBeFocused() 
    */

    // testing purpose
    await page.locator('button[type="submit"]').focus()
    await page.screenshot({
      path: './test-results/FilledFormFocusedButtonCSS.png',
      fullPage: true,
    })
    await takeSnapshot(page, 'Playwright  - Login with CSS Focus state -  CSS Focus state - Button Focused', testInfo)

    await expect(page.locator('button[type="submit"]')).toBeFocused()
  })
})
/* test("Chromatic E2E Playwright - Successful Login with delete task", async ({
  page,
}, testInfo) => {
  const email = "alice.carr@test.com";
  const password = "k12h1k0$5;lpa@Afn";
  await page.goto("/");

  // Take a snapshot of the initial page
  await takeSnapshot(page, "Filled Tasks - Initial Stage", testInfo);

  // Fills the form inputs
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);

  // Take a snapshot of the form filled
  await takeSnapshot(page, "Filled Tasks - Filled Form", testInfo);

  // Clicks the submit button
  await page.getByRole("button", { name: "Sign in" }).click();

  await page.getByRole("button", { name: "delete-1" }).click();
  await expect(page.locator('[aria-label="tasks"] div')).toHaveCount(5);

  // Take a snapshot of the form filled
  await takeSnapshot(page, "Filled Tasks - Tasks Loaded and deleted", testInfo);
});
 */
