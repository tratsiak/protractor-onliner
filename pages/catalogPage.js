const Page = require('./mainPage');
const data = require('../data');

class CatalogPage extends Page {

    catalogButton = '//a[contains(@class, "navigation__link") and contains(.,"Каталог")]';
    mobilePhonesButton = '//a[contains(@class, "catalog-bar__link") and contains(., "Мобильные телефоны")]';
    title = '//h1[@class="schema-header__title"]';
    manufactutrerCheckbox = `//li//label[contains(@class, "item") and contains(., "${data.productName}")]`;
    productName = '//div[contains(@class, "4")]/div[contains(@class, "title")]';
    pagination = '//div[@class="schema-pagination__dropdown"]';
    numberOfPage = '//li[@class="schema-pagination__pages-item" and ./a[text()=2]]';
    orderLink = '//a[@class="schema-order__link"]';
    orderItem = '//div[@class="schema-order__item" and contains(., "Дорогие")]';
    productPrice = '//a[contains(@class, "price-value_primary")]';
    nextProducts = '//a[@class="schema-pagination__main"]';
    electronicsButton = '//li[contains(., "Электроника")]';
    videogamesButton = '//div[@data-id="1"]//div[contains(@class, "item") and contains(., "Видеоигры")]';
    gameConsoleButton = '//a[contains(@href, "console") and contains(@class, "item")]';
    productLink = '//div[contains(@class, "product__title")]//a';
    basketButton = '//a[contains(@class, "product-aside__item-button")]';
    cartProduct = '//div[contains(@class, "cart-products")]';
    cartWrapper = '//div[@id="cart-main-container"]';
    lastResult = '//div[@id="schema-products"]/div[last()]';
    intoBusketButton = '//a[contains(@class, "product-aside__item-button") and contains(., "В корзине")]';

    async getPrice(element) {
        let text = await this.getTextOfElement(element);
        return Number.parseFloat(text.match(/[\w,]+/)[0].replace(',', '.'));
    }

    async getProductsName(xpath) {
        let productsName = [];
        let results = await this.getElements(xpath);
        for (let result of results) {
            let text = await this.getTextOfElement(result);
            productsName.push(text);
        }
        return productsName;
    }

    async getFirstResult(xpath) {
        let results = await this.getElements(xpath);
        return results[0];
    }

    async moveToElement(xpath) {
        let element = await this.getElement(xpath);
        await browser.actions().mouseDown(element).perform();
    }
}

module.exports = new CatalogPage();