import { chromium, FullConfig } from '@playwright/test';
import { LokaliseSignupPage } from '../pageObjects/lokaliseSignup.page';
import { setCredentials } from './runConfig';

async function globalSetup (config: FullConfig) {
  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const signupPage = new LokaliseSignupPage(page);
  await signupPage.go();
  const signInDetails = await signupPage.signUp();
  setCredentials(signInDetails);
  await signupPage.navigateSignupFlow();
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
