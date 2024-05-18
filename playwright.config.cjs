// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    baseURL: "http://localhost:5173/",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  // Comment below after testing custom directory
  // manually injected to the test results
  //outputDir: "./manual-test-results",
  //
  /* Configure projects for major browsers */
  projects: [
    {
      name: "Desktop_Chrome",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "Desktop_Firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "Desktop_webkit_Safari",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Desktop_Edge",
      use: { ...devices["Desktop Edge"] },
    },

    // Mobile
    {
      name: "Mobile_Iphone_8",
      use: { ...devices["iPhone 8"] },
    },
    {
      name: "Mobile_Iphone_8_Plus",
      use: { ...devices["iPhone 8 Plus"] },
    },
    {
      name: "Mobile_Iphone_12",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "Mobile_Iphone_14",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "Mobile_iPad_gen_5",
      use: { ...devices["iPad (gen 5)"] },
    },
    {
      name: "Mobile_iPad_gen_7",
      use: { ...devices["iPad (gen 7)"] },
    },
    {
      name: "Mobile_ipad_Pro_11",
      use: { ...devices["iPad Pro 11"] },
    },
    //

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  webServer: {
    command: "yarn dev",
    url: "http://localhost:5173/",
    reuseExistingServer: !process.env.CI,
  },
});
