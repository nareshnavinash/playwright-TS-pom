import { Locator, Page } from '@playwright/test';
import { url } from '../helpers/runConfig';

export class LokaliseSigninPage {
  readonly page: Page;
  readonly loginEmailText: Locator;
  readonly loginPasswordText: Locator;
  readonly loginButton: Locator;

  constructor (page: Page) {
    this.page = page;
    this.loginEmailText = page.locator('[placeholder="user\\@company\\.com"]');
    this.loginPasswordText = page.locator('[placeholder="password"]');
    this.loginButton = page.locator('button:has-text("Log in")');
  }

  async go () {
    await Promise.all([
      this.page.goto(`${url}login/`),
      this.loginButton.waitFor({ state: 'visible' })
    ]);
  }

  async isDisplayed () {
    await this.loginButton.waitFor({ state: 'visible' });
    return true;
  }

  async login (email: string, password: string) {
    await this.loginEmailText.fill(email);
    await this.loginPasswordText.fill(password);
    await this.loginButton.click();
  }
}
