let EC = protractor.ExpectedConditions;

class Page {

    mainNavigate = '//a[contains(@class, "navigation__link") and contains(.,"%s")]';

    async open() {
        await browser.get('');
    }

    /**
     * Click depending on the accepted parameter: string or WebElement
     * @param webElement
     */
    async clickOn(webElement) {
        if (typeof webElement === 'string') 
            await element(by.xpath(webElement)).click();
        else 
            await webElement.click();
    }

    async mainNavigateTo(locator, word) {
        await element(by.xpath(locator.replace('%s', word))).click();
    }

    async getTitle() {
        return await browser.getTitle();
    }

    async getElement(xpath) {
        return await element(by.xpath(xpath));
    }

    async getElements(xpath) {
        return await element.all(by.xpath(xpath));
    }

    async elemIsPresent(xpath) {
        return await element(by.xpath(xpath)).isPresent();
    }

    async getTextOfElement(webElement) {
        return await webElement.getText();
    }

    async isClickable(xpath) {
        await browser.wait(EC.elementToBeClickable(element(By.xpath(xpath))));
    }

    async getHeader(xpath) {
        let webElement = await this.getElement(xpath);
        return await this.getTextOfElement(webElement);
    }

    async scrollPageDown() {
        await browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
    }
    
    async clickAsUser(xpath) {
        let element = await this.getElement(xpath);
        await browser.actions().click(element).perform();
    }
    
    async isVisibility(xpath) {
        await browser.wait(EC.visibilityOf(element(By.xpath(xpath))));
    }

}
module.exports = Page;