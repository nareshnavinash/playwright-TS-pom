import { Locator, Page } from '@playwright/test';
import { url } from '../helpers/runConfig';
import * as faker from '@faker-js/faker';

export class LokaliseSignupPage {
  readonly page: Page;
  readonly fullNameText: Locator;
  readonly companyMailText: Locator;
  readonly passwordText: Locator;
  readonly signupButton: Locator;
  readonly signupErrorLabel: Locator;
  readonly loginLink: Locator;
  readonly signupFlowCompanyNameText: Locator;
  readonly signupFlowCompanySizeDropDown: Locator;
  readonly signupFlowContinueButton: Locator;
  readonly signupFlowRoleSELabel: Locator;
  readonly signupFlowStartFromScratchButton: Locator;
  readonly signupFlowCodeInRepoButton: Locator;
  readonly signupFlowSignupCompleteButton: Locator;

  constructor (page: Page) {
    this.page = page;
    this.fullNameText = page.locator('[placeholder="Your\\ full\\ name"]');
    this.companyMailText = page.locator('[placeholder="you\\@company\\.com"]');
    this.passwordText = page.locator('[placeholder="password"]');
    this.signupButton = page.locator('button:has-text("Sign up")');
    this.signupErrorLabel = page.locator(
      'text=Something went wrong. Please contact support if the issue repeats.'
    );
    this.loginLink = page.locator('a[href*="/login"]');
    this.signupFlowCompanyNameText = page.locator(
      '[placeholder="Name\\ of\\ your\\ company\\.\\.\\."]'
    );
    this.signupFlowCompanySizeDropDown = page.locator(
      'select[name="companySize"]'
    );
    this.signupFlowContinueButton = page.locator('text=Continue');
    this.signupFlowRoleSELabel = page.locator(
      '[aria-label="Software\\ engineer"]'
    );
    this.signupFlowStartFromScratchButton = page.locator(
      '[aria-label="Start\\ localization\\ from\\ scratch"]'
    );
    this.signupFlowCodeInRepoButton = page.locator(
      '[aria-label="Code\\ repository"]'
    );
    this.signupFlowSignupCompleteButton = page.locator('text=Complete sign up');
  }

  async go () {
    await Promise.all([
      this.page.goto(`${url}signup/`),
      this.signupButton.waitFor({ state: 'visible' })
    ]);
  }

  async isDisplayed () {
    await this.signupButton.waitFor({ state: 'visible' });
    return true;
  }

  async signUp (
    name: string = `${faker.faker.name.firstName()}`,
    email: string = `${Date.now()}@samplelokalise.com`,
    password: string = 'Test@12345'
  ) {
    await this.fullNameText.fill(name);
    await this.companyMailText.fill(email);
    await this.passwordText.fill(password);
    await this.signupButton.click();
    // to handle the 500 error while signing up
    // await this.signupErrorLabel.waitFor({ state: 'visible' });
    return { email: email, password: password };
  }

  async navigateSignupFlow () {
    await this.signupFlowCompanyNameText.fill('sample');
    await this.signupFlowCompanySizeDropDown.selectOption('4');
    await this.signupFlowContinueButton.click();
    await this.signupFlowRoleSELabel.click();
    await this.signupFlowStartFromScratchButton.click();
    await this.signupFlowCodeInRepoButton.click();
    await this.signupFlowSignupCompleteButton.click();
  }
}
