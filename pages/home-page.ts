import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly getStartedButton: Locator;

    readonly languageButton: Locator;
    readonly javaLanguageLink: Locator;
    readonly installingPlaywrightText: Locator;
    readonly playwrightJavaBlurb: Locator;

    readonly pageTitle: RegExp;

    readonly expectedText = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;

    constructor(page: Page) {
        this.page = page;
        this.getStartedButton = page.getByRole('link', { name: 'Get started' });
        this.pageTitle = /Playwright/;
        this.languageButton = page.getByRole('button', { name: 'Node.js'});
        this.javaLanguageLink = page.getByRole('link', { name: 'Java', exact: true});
        this.installingPlaywrightText = page.getByText('Installing Playwright', {exact: true});
        this.playwrightJavaBlurb = page.getByText(this.expectedText, {exact: true})
    }

    async clickGetStarted() {
        await this.getStartedButton.click();
    }

    async hoverOverLanguageButton() {
        await this.languageButton.hover();
    }

    async clickOnJavaLanguageLink() {
        await this.javaLanguageLink.click();
    }

    async assertJavaInUrl() {
        await expect(this.page).toHaveURL('https://playwright.dev/java/docs/intro');
    }

    async assertInstallingPlaywrightTextNotVisible() {
        await expect(this.installingPlaywrightText).not.toBeVisible();
    }

    async assertPlaywrightJavaBlurbIsVisible() {
        await expect(this.playwrightJavaBlurb).toBeVisible();
    }

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.pageTitle);
    }
}

export default HomePage;

// await homepage.clickGetStarted();
// await page.getByRole('button', { name: 'Node.js'}).hover();
// await page.getByRole('link', { name: 'Java', exact: true}).click();

// await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
// await expect(page.getByText('Installing Playwright', {exact: true})).not.toBeVisible();

// const expectedText = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
// await expect(page.getByText(expectedText, {exact: true})).toBeVisible();