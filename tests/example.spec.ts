import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page'

const URL = 'https://playwright.dev/';
let homepage:HomePage;

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  homepage = new HomePage(page);
})

test.describe('Playwright website', ()=> {

  test('has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async ({ page }) => {
    // Click the get started link.
    await homepage.clickGetStarted();

    // Expects page to have a heading with the name of Installation.
    await homepage.assertPageTitle();
  });

  test('@exercise - can go to Java installation', async ({page}) => {
    /**
     * 1. Open the page
     * 2. Click at Get started
     * 3. Mouse over the language dropdown
     * 4. Click at Java
     * 5. Check the URL
     * 6. Check the text "Installing Playwright" is not being displayed
     * 7. Check the below text is being displayed
     * 
     * Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.
     */
      await homepage.clickGetStarted();
      await homepage.hoverOverLanguageButton();
      await homepage.clickOnJavaLanguageLink()
      
      await homepage.assertJavaInUrl()
      await homepage.assertInstallingPlaywrightTextNotVisible();
      await homepage.assertPlaywrightJavaBlurbIsVisible();
    });
});