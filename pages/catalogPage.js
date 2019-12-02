const Page = require('./mainPage');
const logger = require('../logger').logger;

class CatalogPage extends Page {

    mobilePhonesButton = '//a[contains(@class, "catalog-bar__link") and contains(., "%s")]';
    title = '//h1[@class="schema-header__title"]';
    sectionCheckbox = '//div[@class="schema-filter__fieldset" and contains(., "%sName")]//li/label[contains(.,"%pName")]';
    productName = '//div[contains(@class, "4")]/div[contains(@class, "title")]';
    pagination = '//div[@class="schema-pagination__dropdown"]';
    numberOfPage = '//li[@class="schema-pagination__pages-item" and ./a[text()=%n]]';
    orderLink = '//a[@class="schema-order__link"]';
    orderItem = '//div[@class="schema-order__item" and contains(., "%c")]';
    productPrice = '//a[contains(@class, "price-value_primary")]';
    nextProducts = '//a[@class="schema-pagination__main"]';
    classifierNavigate = '//li[contains(., "%c")]';
    listNavigate = '//div[@data-id="1"]//div[contains(@class, "item") and contains(., "%i")]';
    gameConsoleButton = '//a[contains(@href, "console") and contains(@class, "item")]';
    productLink = '//div[contains(@class, "product__title")]//a';
    basketButton = '//a[contains(@class, "product-aside__item-button")]';
    cartProduct = '//div[contains(@class, "cart-products")]';
    cartWrapper = '//div[@id="cart-main-container"]';
    lastResult = '//div[@id="schema-products"]/div[last()]';
    intoBusketButton = '//a[contains(@class, "product-aside__item-button") and contains(., "В корзине")]';

    getCheckbox(locator, section, checkbox) {
        logger.trace('get checkbox locator');
        let updatedLocator = locator.replace('%sName', section);
        updatedLocator = updatedLocator.replace('%pName', checkbox);
        return updatedLocator;
    }

    async listNavigateTo(locator, item) {
        logger.trace('mouse move on: ' + item);
        let element = await this.getElement(locator.replace('%i', item));
        await browser.actions().mouseDown(element).perform();
    }

    async classifierNavigateTo(locator, category) {
        logger.trace('navigate to: ' + category);
        await element(by.xpath(locator.replace('%c', category))).click();
    }

    async selectOrderTo(locator, category) {
        logger.trace('select: ' + category);
        await this.isClickable(locator.replace('%c', category));
        await element(by.xpath(locator.replace('%c', category))).click();
    }

    async goToPage(locator, number) {
        logger.trace('go to page: ' + number);
        await element(by.xpath(locator.replace('%n', number))).click();
    }

    async barNavigateTo(locator, section) {
        logger.trace('navigate to: ' + section);
        await element(by.xpath(locator.replace('%s', section))).click();
    }

    async getPrices(product) {
        logger.trace('get prices of products');
        let prices = await element.all(by.xpath(product)).getText();
        prices = prices.map(item => Number.parseFloat(item.match(/[\w,]+/)[0].replace(',', '.')));
        return prices;
    }

    async getProductsName(xpath) {
        logger.trace('get names of products');
        let productsName = await element.all(by.xpath(xpath)).getText();
        return productsName;
    }

    async getFirstResult(xpath) {
        logger.trace('get first result');
        let results = await this.getElements(xpath);
        return results[0];
    }

    async moveToElement(xpath) {
        logger.trace('mouse move to element');
        let element = await this.getElement(xpath);
        await browser.actions().mouseDown(element).perform();
    }
}

module.exports = new CatalogPage();