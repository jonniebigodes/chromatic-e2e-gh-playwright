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
        tasks: [],
      },
    });
  });
});
test("Playwright - AzureDevops - Workflow - Login OK with empty tasks", async ({
  page,
}) => {
  const email = "alice.carr@test.com";
  const password = "k12h1k0$5;lpa@Afn";
  await page.goto("/");
  await page.screenshot({
    path: "./test-results/Empty Tasks Initial Stage.png",
    fullPage: true,
  });
  // Fills the form inputs
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);

  // capture screenshot
  await page.screenshot({
    path: "./test-results/Empty Tasks Filled Form.png",
    fullPage: true,
  });

  // Clicks the submit button
  await page.getByRole("button", { name: "Sign in" }).click();
  // capture screenshot
  await page.screenshot({
    path: "./test-results/Empty Tasks No Tasks Message.png",
    fullPage: true,
  });

  // Waits for the tasks to load and checks that the list is empty
  await expect(page.getByText("You have no tasks")).toBeVisible();
  // capture screenshot
  await page.screenshot({
    path: "./test-results/Empty Tasks No Tasks Message.png",
    fullPage: true,
  });
});
