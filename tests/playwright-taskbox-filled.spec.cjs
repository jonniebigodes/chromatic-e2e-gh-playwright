// @ts-check
const { test, expect } = require("@playwright/test");

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
test("Playwright - AzureDevops - Workflow - Login OK with filled tasks", async ({
  page,
}) => {
  const email = "alice.carr@test.com";
  const password = "k12h1k0$5;lpa@Afn";
  await page.goto("/");

  // Take a snapshot of the initial page
  await page.screenshot({
    path: "./test-results/Filled Tasks Initial Stage.png",
    fullPage: true,
  });

  // Fills the form inputs
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);

  // Take a snapshot of the filled form
  await page.screenshot({
    path: "./test-results/Filled Tasks Filled Form.png",
    fullPage: true,
  });

  // Clicks the submit button
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.locator('[aria-label="tasks"] div')).toHaveCount(6);
  // Take a snapshot of the tasks loaded
  await page.screenshot({
    path: "./test-results/Filled Tasks Tasks Loaded.png",
    fullPage: true,
  });
});

/* test("Playwright - CircleCI - Workflow - Login OK with delete task", async ({
  page,
}) => {
  const email = "alice.carr@test.com";
  const password = "k12h1k0$5;lpa@Afn";
  await page.goto("/");

  // Take a snapshot of the initial page
  await page.screenshot({
    path: "./test-results/Delete Task Filled Tasks Initial Stage.png",
    fullPage: true,
  });

  // Fills the form inputs
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);

  // Take a snapshot of the filled form
  await page.screenshot({
    path: "./test-results/Delete Task Filled Tasks Filled Form.png",
    fullPage: true,
  });

  // Clicks the submit button
  await page.getByRole("button", { name: "Sign in" }).click();

  await page.getByRole("button", { name: "delete-1" }).click();

  await expect(page.locator('[aria-label="tasks"] div')).toHaveCount(5);
  await page.screenshot({
    path: "./test-results/Delete Task Filled Tasks Tasks Deleted.png",
    fullPage: true,
  });
}); */
