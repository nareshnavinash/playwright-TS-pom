import { expect, Locator, Page } from '@playwright/test';
import { url } from '../helpers/runConfig';

export class LokaliseProjectsPage {
  readonly page: Page;
  readonly addProjectsButton: Locator;
  readonly projectNameText: Locator;
  readonly languageDropDown: Locator;
  readonly languageTextBox: Locator;
  readonly proceedButton: Locator;
  readonly dialogCloseButton: Locator;
  readonly editorTabButton: Locator;
  readonly addFirstKeyButton: Locator;
  readonly projectNameLabel: Locator;
  readonly keyNameText: Locator;
  readonly keyPlatformDropDown: Locator;
  readonly keySaveButton: Locator;
  readonly keyTableList: Locator;
  readonly projectsBreadcrumbLink: Locator;
  readonly keyDeleteButton: Locator;
  readonly translationEditText: Locator;
  readonly translateSaveButton: Locator;
  readonly translateLabels: Locator;
  readonly firstTranslateEditLabel: string;
  readonly secondTranslateEditLabel: string;
  readonly deleteConfirmButton: Locator;
  readonly translatedListTexts: Locator;
  readonly translatedListPluralTexts: Locator;
  readonly keyCreationAdvancedTabLink: Locator;
  readonly keyPluralToggle: Locator;
  readonly keyEditPluralText: Locator;
  readonly keyEditPluralTextString: string;
  readonly pluralKeyEmptyCount: Locator;
  readonly addNthProjectButton: Locator;
  readonly addTranslatePopupHeaderLabel: Locator;

  constructor (page: Page) {
    this.page = page;
    this.addProjectsButton = page.locator('button[data-action="add-project"]');
    this.projectNameText = page.locator('input[name="name"]');
    this.languageDropDown = page.locator(
      '.Select__value-container.Select__value-container--is-multi'
    );
    this.languageTextBox = page.locator('input[id="react-select-6-input"]');
    this.proceedButton = page.locator(
      '#tabs--1--panel--0 button:has-text("Proceed")'
    );
    this.dialogCloseButton = page.locator('[aria-label="Close\\ dialog"]');
    this.editorTabButton = page.locator('[data-testid="edit"] >> text=Editor');
    this.addFirstKeyButton = page.locator('[aria-label="Add\\ first\\ key"]');
    this.projectNameLabel = page.locator(
      'div[data-name="project-sidebar"] > div > a[href*="/project/"]'
    );
    this.keyNameText = page.locator(
      '[placeholder="Give\\ the\\ key\\ a\\ unique\\ ID"]'
    );
    this.keyPlatformDropDown = page.locator('input[id="s2id_autogen6"]');
    this.keySaveButton = page.locator('a[id="btn_addkey"]');
    this.keyTableList = page.locator('[id="endless-table"]');
    this.projectsBreadcrumbLink = page.locator(
      'nav[aria-label="breadcrumb"] a[href="/projects"]'
    );
    this.keyDeleteButton = page.locator('span.delete-key');
    this.translationEditText = page.locator(
      'div[class*="modified-info-wrapper"] textarea'
    );
    this.translateSaveButton = page.locator('button.save');
    this.translateLabels = page.locator('[class="lokalise-editor-wrapper"]');
    this.firstTranslateEditLabel =
      'div[name*="transcell-base"] div[data-rtl="0"]';
    this.secondTranslateEditLabel = 'div[data-rtl="0"] >> nth=1';
    this.deleteConfirmButton = page.locator(
      'button[data-bb-handler="confirm"]'
    );
    this.translatedListTexts = page.locator('div[class="highlight"]');
    this.translatedListPluralTexts = page.locator('span[class="highlight"]');
    this.keyCreationAdvancedTabLink = page.locator('a[id="advanced_tab"]');
    this.keyPluralToggle = page.locator(
      'div.bootstrap-switch-id-theplural_switch'
    );
    this.keyEditPluralText = page.locator(
      'div.lokalise-editor-wrapper textarea'
    );
    this.pluralKeyEmptyCount = page.locator(
      'span[class="lokalise-popup-wrapper"]'
    );
    this.addNthProjectButton = page.locator(
      'button[data-action="add-project"]'
    );
    this.addTranslatePopupHeaderLabel = page.locator(
      'div.lokalise-editor-wrapper div.popup-title'
    );
    this.keyEditPluralTextString = 'div.lokalise-editor-wrapper textarea';
  }

  selectLanguageLabel (language: string = 'Afar (aa)') {
    return this.page.locator(`text=${language}`);
  }

  projectListedLabel (projectName: string) {
    return this.page.locator(
      `div[data-name="project-sidebar"] > div > a[href*="/project/"]:text("${projectName}")`
    );
  }

  keyPlatformListLabel (platformName: string = 'Web') {
    return this.page.locator(`div[role="option"]:has-text("${platformName}")`);
  }

  keyListWithName (keyName: string = 'First Key') {
    return this.page.locator(`[id="endless-table"] a[data-value="${keyName}"]`);
  }

  pluralKeyEmptyLabel (position: string = '0') {
    return `span[class="lokalise-popup-wrapper"] >> nth=${position}`;
  }

  async complexClick (identifier: string) {
    const transalteEmpty = await this.page.$(identifier);
    await transalteEmpty?.waitForElementState('visible');
    await transalteEmpty?.hover();
    await transalteEmpty?.click();
    await transalteEmpty?.dblclick();
    await transalteEmpty?.click({ clickCount: 5 });
    await transalteEmpty?.click({ button: 'left', clickCount: 5 });
  }

  async simpleHoverClick (identifier: string) {
    const transalteEmpty = await this.page.$(identifier);
    await transalteEmpty?.waitForElementState('visible');
    await transalteEmpty?.hover();
    await transalteEmpty?.click();
  }

  async complexKeyHover (identifier: string) {
    const transalteEmpty = await this.page.$(`a[data-value="${identifier}"]`);
    await transalteEmpty?.waitForElementState('visible');
    await transalteEmpty?.hover();
  }

  async go () {
    await this.page.goto(`${url}projects/`);
  }

  async getStartedIsDisplayed () {
    await expect(this.addProjectsButton).toBeVisible();
    return true;
  }

  async createFirstProject (projectName: string = 'First Project') {
    await this.addProjectsButton.click();
    await this.projectNameText.fill(projectName);
    await this.languageDropDown.click();
    await this.selectLanguageLabel().click();
    await this.proceedButton.click();
    await this.dialogCloseButton.waitFor({ state: 'visible' });
    await this.dialogCloseButton.click();
    await this.editorTabButton.click();
    await this.addFirstKeyButton.waitFor({ state: 'visible' });
    return true;
  }

  async createNthProject (projectName: string = 'First Project') {
    await this.addNthProjectButton.click();
    await this.projectNameText.fill(projectName);
    await this.languageDropDown.click();
    await this.selectLanguageLabel().click();
    await this.proceedButton.click();
    await this.addFirstKeyButton.waitFor({ state: 'visible' });
    return true;
  }

  async getProjectName () {
    await this.projectNameLabel.first().waitFor({ state: 'visible' });
    return await this.projectNameLabel.allTextContents();
  }

  async addFirstKey (keyName: string = 'First Key') {
    await this.addFirstKeyButton.click();
    await this.keyNameText.fill(keyName);
    await this.keyPlatformDropDown.click();
    await this.keyPlatformListLabel().click();
    await this.keySaveButton.click();
    await this.keyTableList.waitFor({ state: 'visible' });
    await this.keyListWithName(keyName).waitFor({ state: 'visible' });
    return true;
  }

  async clickProject (projectName: string) {
    await this.projectListedLabel(projectName).click();
    await this.editorTabButton.waitFor({ state: 'visible' });
    return true;
  }

  async editSingularTransalation (
    translationText1: string = 'test1',
    translationText2: string = 'test2'
  ) {
    await this.page.waitForLoadState('load');
    await this.complexClick(this.firstTranslateEditLabel);
    await this.translationEditText.fill(translationText1);
    await this.translateSaveButton.first().click();
    await this.page
      .locator(`text='${translationText1}'`)
      .waitFor({ state: 'visible' });
    await this.complexClick(this.secondTranslateEditLabel);
    await this.translationEditText.fill(translationText2);
    await this.translateSaveButton.first().click();
    await this.page
      .locator(`text='${translationText2}'`)
      .waitFor({ state: 'visible' });
  }

  async getSingularTranslatedTexts () {
    await this.page.reload({ waitUntil: 'load' });
    return await this.translatedListTexts.allTextContents();
  }

  async deleteKey (keyName: string) {
    await this.complexKeyHover(keyName);
    await this.keyDeleteButton.click();
    await this.deleteConfirmButton.click();
    await this.keyListWithName(keyName).waitFor({ state: 'detached' });
  }

  async createFirstPluralKey (keyName: string = 'First Plural Key') {
    await this.addFirstKeyButton.click();
    await this.keyNameText.fill(keyName);
    await this.keyPlatformDropDown.click();
    await this.keyPlatformListLabel().click();
    await this.keyCreationAdvancedTabLink.click();
    await this.keyPluralToggle.click();
    await this.keySaveButton.click();
    await this.keyTableList.waitFor({ state: 'visible' });
    await this.keyListWithName(keyName).waitFor({ state: 'visible' });
    return true;
  }

  async editPluralTranslation (text: string = 'Plural') {
    await this.page.waitForLoadState('load');
    const totalEmptyKeys = await this.pluralKeyEmptyCount.count();
    for (let count = totalEmptyKeys - 1; count >= 0; count--) {
      const translationText = `${text}${count}`;
      await this.simpleHoverClick(this.pluralKeyEmptyLabel(`${count}`));
      await this.addTranslatePopupHeaderLabel.click();
      const textarea = await this.page.$(this.keyEditPluralTextString);
      await textarea?.fill(translationText, { force: true });
      await this.translateSaveButton.first().click();
      await this.page
        .locator(`text='${translationText}'`)
        .waitFor({ state: 'visible' });
    }
    return totalEmptyKeys;
  }

  async getPluralTranslatedTexts () {
    await this.page.reload({ waitUntil: 'load' });
    return await this.translatedListPluralTexts.allTextContents();
  }
}
