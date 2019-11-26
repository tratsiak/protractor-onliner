let EC = protractor.ExpectedConditions;

class Page {

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

    async getTitle() {
        return await browser.getTitle();
    }

    async getElement(xpath) {
        return await browser.findElement(by.xpath(xpath));
    }

    async getElements(xpath) {
        return await browser.findElements(by.xpath(xpath));
    }

    async elemIsPresent(xpath) {
        return await element(by.xpath(xpath)).isPresent();
    }

    async getTextOfElement(webElement) {
        return await webElement.getText();
    }

    async waitElement(xpath) {
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

}
module.exports = Page;