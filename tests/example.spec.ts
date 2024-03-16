import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
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
    await page.goto('https://playwright.dev');
    await page.getByRole('link', { name: 'Get started'}).click();
    await page.getByRole('button', { name: 'Node.js'}).hover();
    await page.getByRole('link', { name: 'Java', exact: true}).click();
    
    await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
    await expect(page.getByText('Installing Playwright', {exact: true})).not.toBeVisible();
  
    const expectedText = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
    await expect(page.getByText(expectedText, {exact: true})).toBeVisible();
  });