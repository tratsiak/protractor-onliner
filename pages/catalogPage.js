const Page = require('./mainPage');
const data = require('../data');

class CatalogPage extends Page {

    catalogButton = '//a[@class="b-main-navigation__link" and ./span[contains(.,"Каталог")]]';
    mobilePhonesButton = '//a[contains(@class, "catalog-bar__link") and contains(., "Мобильные телефоны")]';
    title = '//h1[@class="schema-header__title"]';
    manufactutrerBlock = '//div[@class="schema-filter__fieldset" and contains(., "Производитель")]//div[@class="schema-filter-control schema-filter-control_more"]';
    manufactutrerCheckbox = `//li//label[@class="schema-filter__checkbox-item" and contains(., "${data.productName}")]`;
    productName = '//div[@class="schema-product__part schema-product__part_4"]/div[@class="schema-product__title"]';
    pagination = '//div[@class="schema-pagination__dropdown"]';
    numberOfPage = '//li[@class="schema-pagination__pages-item" and contains(., "2")]';
    orderLink = '//a[@class="schema-order__link"]';
    orderItem = '//div[@class="schema-order__item" and contains(., "Дорогие")]';
    productPrice = '//a[@class="schema-product__price-value schema-product__price-value_primary"]';
    nextProducts = '//a[@class="schema-pagination__main"]';
    electronicsButton = '//li[contains(., "Электроника")]';
    videogamesButton = '//div[@data-id="1"]//div[contains(@class, "item") and contains(., "Видеоигры")]';
    gameConsoleButton = '//a[contains(@href, "console") and contains(@class, "item")]';
    

    async scrollTo(xpath) {
        let element = await this.getElement(xpath);
        await browser.actions().mouseMove(element).perform();
    }

    async clickAsUser(xpath) {
        let element = await this.getElement(xpath);
        await browser.actions().click(element).perform();
    }

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

    async getFirstResultPrice(xpath) {
        let results = await this.getElements(xpath);
        return await this.getPrice(results[0]);
    }

    async moveToElement(xpath) {
        let element = await this.getElement(xpath);
        await browser.actions().moveToElement(element).perform();
    }
}

module.exports = new CatalogPage();