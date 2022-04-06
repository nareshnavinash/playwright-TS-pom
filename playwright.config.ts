import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./helpers/global-setup'),
  globalTimeout: 15 * 60 * 1000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: 1,
  timeout: 5 * 60 * 1000,
  testDir: 'tests',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 10 * 1000,
    navigationTimeout: 20 * 1000,
    storageState: 'state.json'
  },
  expect: {
    timeout: 10 * 1000
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--test-type',
            '--window-size=1920,1080',
            '--no-sandbox',
            '--disable-accelerated-video',
            '--disable-accelerated-plugins',
            '--disable-accelerated-layers',
            '--disable-accelerated-compositing',
            '--disable-accelerated-2d-canvas',
            '--disable-web-security',
            '--allow-file-access-from-files',
            'acceptInsecureCerts=true',
            'acceptSslCert=true',
            '--allow-running-insecure-content',
            '--dev', '--allow-insecure-localhost',
            '--disable-gesture-requirement-for-media-playback',
            '--ignore-certificate-errors',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--autoplay-policy=no-user-gesture-required',
            '--disable-infobars',
            '--use-fake-ui-for-media-stream',
            '--use-fake-device-for-media-stream',
            '--use-file-for-fake-video-capture=$PWD/helpers/sample.mjpeg',
            '--use-file-for-fake-audio-capture=$PWD/helpers/sample.wav']
        }
      }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  reporter: [
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['html', { outputFolder: 'test-results/html-report', open: 'never' }],
    ['list']
  ]
};
export default config;
