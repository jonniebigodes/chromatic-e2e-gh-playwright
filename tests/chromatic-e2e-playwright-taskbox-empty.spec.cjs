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
        tasks: [],
      },
    });
  });
});

test("Chromatic E2E Playwright - Login OK with empty tasks", async ({
  page,
}, testInfo) => {
  // console.log("beforeEach test output dir", testInfo.outputDir);
  const email = "alice.carr@test.com";
  const password = "k12h1k0$5;lpa@Afn";
  await page.goto("/");

  // Take a snapshot of the initial page
  await takeSnapshot(page, "Empty Tasks - Initial Stage", testInfo);
  // Fills the form inputs
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);

  // Take a snapshot of the filled form
  await takeSnapshot(page, "Empty Tasks - Filled Form", testInfo);

  // Clicks the submit button
  await page.getByRole("button", { name: "Sign in" }).click();

  // Waits for the tasks to load and checks that the list is empty
  await expect(page.getByText("You have no tasks")).toBeVisible();

  // Take a snapshot of the empty tasks
  await takeSnapshot(page, "Empty Tasks - No Tasks Screen", testInfo);
});
