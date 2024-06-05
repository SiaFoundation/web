import { defineConfig, devices } from '@playwright/test'
import { nxE2EPreset } from '@nx/playwright/preset'

import { workspaceRoot } from '@nx/devkit'

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:3007'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },
  // Timeout per test.
  timeout: 60_000,
  expect: {
    // Raise the timeout because it is running against next dev mode
    // which requires compilation the first to a page is visited
    timeout: 15_000,
  },
  outputDir: 'output',
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npx nx serve renterd',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
  // Run the tests serially as they may mutate the state of the same application.
  workers: 1,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Disable firefox and webkit to save time since tests are running serially.
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // Uncomment for mobile browsers support
    /* {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, */

    // Uncomment for branded browsers
    /* {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    } */
  ],
})
