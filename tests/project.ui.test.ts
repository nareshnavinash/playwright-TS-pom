import { expect, test } from '@playwright/test';
import { LokaliseProjectsPage } from '../pageObjects/lokaliseProjects.page';

test.describe.configure({ mode: 'serial' });

const firstProjectName = 'First Project';
const firstKeyName = 'First Key';
const firstTranslationText = 'Test1';
const secondTranslationText = 'Test2';
const firstPluralKeyName = 'First Plural Key';
const pluralTranslationText = 'Plural';
const nthProjectName = 'nth Project';

test('Add first project > @project @regression @sanity', async ({ page }) => {
  const projectsPage = new LokaliseProjectsPage(page);
  await projectsPage.go();
  expect(
    await projectsPage.getStartedIsDisplayed(),
    'Projects page is not dispalyed'
  ).toBe(true);
  expect(
    await projectsPage.createFirstProject(firstProjectName),
    'Created project is not opened !!!'
  ).toBeTruthy();
  await projectsPage.projectsBreadcrumbLink.click();
  expect(
    await projectsPage.getProjectName(),
    'created project name is not equal !!!'
  ).toStrictEqual([`${firstProjectName}`]);
});

test('Add first label to the project > @project @regression', async ({
  page
}) => {
  const projectsPage = new LokaliseProjectsPage(page);
  await projectsPage.go();
  expect(
    await projectsPage.clickProject(firstProjectName),
    'Clicked project is not opened !!!'
  ).toBeTruthy();
  expect(
    await projectsPage.addFirstKey(firstKeyName),
    'Key cannot be added in the project !!!'
  ).toBeTruthy();
});

test('Add translations to the singular key > @project @regression', async ({
  page
}) => {
  const projectsPage = new LokaliseProjectsPage(page);
  await projectsPage.go();
  expect(
    await projectsPage.clickProject(firstProjectName),
    'Clicked project is not opened !!!'
  ).toBeTruthy();
  await projectsPage
    .keyListWithName(firstKeyName)
    .waitFor({ state: 'visible' });
  await projectsPage.editSingularTransalation(
    firstTranslationText,
    secondTranslationText
  );
  expect(await projectsPage.getSingularTranslatedTexts()).toStrictEqual([
    firstTranslationText,
    secondTranslationText
  ]);
  await projectsPage.deleteKey(firstKeyName);
});

test('Add translations to the plural key > @project @regression', async ({
  page
}) => {
  const projectsPage = new LokaliseProjectsPage(page);
  await projectsPage.go();
  expect(
    await projectsPage.clickProject(firstProjectName),
    'Clicked project is not opened !!!'
  ).toBeTruthy();
  await projectsPage.createFirstPluralKey(firstPluralKeyName);
  const totalTranslation = await projectsPage.editPluralTranslation(
    pluralTranslationText
  );
  const pluralKeysSet = await projectsPage.getPluralTranslatedTexts();
  const expectedTranslation: Array<string> = [];
  for (let key = 0; key < totalTranslation; key++) {
    expectedTranslation.push(`${pluralTranslationText}${key}`);
  }
  expect(
    expectedTranslation,
    'The plural values set are not saved properly !!!'
  ).toStrictEqual(pluralKeysSet);
  await projectsPage.deleteKey(firstPluralKeyName);
});

test('Add nth project > @project @regression', async ({ page }) => {
  const projectsPage = new LokaliseProjectsPage(page);
  await projectsPage.go();
  expect(
    await projectsPage.getStartedIsDisplayed(),
    'Projects page is not dispalyed'
  ).toBe(true);
  await projectsPage
    .projectListedLabel(firstProjectName)
    .waitFor({ state: 'visible' });
  expect(
    await projectsPage.createNthProject(nthProjectName),
    'Created project is not opened !!!'
  ).toBeTruthy();
  await projectsPage.projectsBreadcrumbLink.click();
  expect(
    await projectsPage.getProjectName(),
    'created project name is not equal !!!'
  ).toStrictEqual([`${firstProjectName}`, `${nthProjectName}`]);
});
