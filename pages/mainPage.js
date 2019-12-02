let EC = protractor.ExpectedConditions;
const logger = require('../logger').logger;

class Page {

    mainNavigate = '//a[contains(@class, "navigation__link") and contains(.,"%s")]';

    async open() {
        logger.trace('open browser');
        await browser.get('');
    }

    /**
     * Click depending on the accepted parameter: string or WebElement
     * @param webElement
     */
    async clickOn(webElement) {
        logger.trace('click on element');
        if (typeof webElement === 'string') 
            await element(by.xpath(webElement)).click();
        else 
            await webElement.click();
    }

    async mainNavigateTo(locator, word) {
        logger.trace('navigate to: ' + word);
        await element(by.xpath(locator.replace('%s', word))).click();
    }

    async getTitle() {
        logger.trace('get title of the page');
        return await browser.getTitle();
    }

    async getElement(xpath) {
        logger.trace('get element by xpath');
        return await element(by.xpath(xpath));
    }

    async getElements(xpath) {
        logger.trace('get elements by xpath');
        return await element.all(by.xpath(xpath));
    }

    async elemIsPresent(xpath) {
        logger.trace('check element is present on the page');
        return await element(by.xpath(xpath)).isPresent();
    }

    async getTextOfElement(webElement) {
        logger.trace('get text of element');
        return await webElement.getText();
    }

    async isClickable(xpath) {
        logger.trace('wait until element to be clickable');
        await browser.wait(EC.elementToBeClickable(element(By.xpath(xpath))));
    }

    async getHeader(xpath) {
        logger.trace('get header of the page');
        let webElement = await this.getElement(xpath);
        return await this.getTextOfElement(webElement);
    }

    async scrollPageDown() {
        logger.trace('scroll page down');
        await browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
    }
    
    async clickAsUser(xpath) {
        logger.trace('click on element as user');
        let element = await this.getElement(xpath);
        await browser.actions().click(element).perform();
    }
    
    async isVisibility(xpath) {
        logger.trace('check element is visibility on the page');
        await browser.wait(EC.visibilityOf(element(By.xpath(xpath))));
    }

}
module.exports = Page;