class Page {

    async waitForAngular(type) {
        await browser.waitForAngularEnabled(type);
    }

    async open() {
        await browser.get('https://onliner.by');
    }

    async clickOn(xpath) {
        await element(by.xpath(xpath)).click();
    }

    async getTitle() {
        let title = await browser.getTitle();
        return title;
    }

    async getElement(xpath) {
        return await browser.findElement(by.xpath(xpath));
    }

    async getElements(xpath) {
        return await browser.findElements(by.xpath(xpath));
    }

    async elemIsPresent(xpath) {
        let elemIsPresent = await element(by.xpath(xpath)).isPresent();
        return elemIsPresent;
    }

    async getTextOfElement(webElement) {
        let text = await webElement.getText();
        return text;
    }

    async waitForSeconds(seconds) {
        await browser.sleep(seconds * 1000);
    }

}
module.exports = Page;