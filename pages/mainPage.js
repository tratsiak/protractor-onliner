let EC = protractor.ExpectedConditions;

class Page {

    async open() {
        await browser.get('');
    }

    async clickOn(xpath) {
        await element(by.xpath(xpath)).click();
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

}
module.exports = Page;