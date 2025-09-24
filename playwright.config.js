import { devices } from '@playwright/test';

// This is a sample config for what users might be running locally
const config = {
  fullyParallel: true,
  testDir: './tests',
  testMatch: '**/bstack_test*.js',

  /* Maximum time one test can run for. */
  timeout: 90 * 1000,
    expect: {
    timeout: 60000,
    toMatchSnapshot: { 
      threshold: 0.3,
      maxDiffPixelRatio: 0.3
    }
  },
  /* tests in parallel */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['junit', { open: 'never', outputFile: 'results.xml' }],
    ['html', { open: 'never', outputFolder: 'test-html-results/report' }]
  ],
  /* Configure projects for major browsers */
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
    actionTimeout: 60000,
    viewport: {
      width: 1920,
      height: 1080
    },
    geolocation: { longitude: 22.5726, latitude: 88.3639 },
    permissions: ['geolocation'],
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Accept': 'application/json'
      // Add authorization token to all requests.
      // 'Authorization': `token ${process.env.API_TOKEN}`,
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: {
      slowMo: 500,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },

    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 7'],
        viewport: { width: 412, height: 915 }
      },
    },

    // Add BrowserStack-specific projects
    {
      name: '-latest:Windows 11-browserstack',
      use: {
        browserName: 'chromium',
        // BrowserStack SDK injects additional settings
      },
    },
    {
      name: '-latest:OS X Ventura-browserstack',
      use: {
        browserName: 'chromium',
      },
    },
    
    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 14 Pro'],
        viewport: { width: 412, height: 915 }
      },
    },
  ],
};

module.exports = config;
