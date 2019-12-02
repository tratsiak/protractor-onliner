const Page = require('./mainPage');
const logger = require('../logger').logger;

class ServicesPage extends Page {

    sectionCheckbox = '//div[contains(@class, "service-form__row") and contains(., "%sName")]//li/label[contains(.,"%s")]';
    orderStatus = '//div[contains(@class, "service-offers__status")]';
    countOfResults = '//div[contains(@class, "service-interaction__state_disabled_alter")]';
    images = '//span[contains(@class, "service-offers__image_person")]';
    lastResult = '//div[contains(@class, "service-offers__list")]/div[last()]';
    pagination = '//a[contains(@class, "service-pagination__main")]';

    getCheckbox(locator, section, checkbox) {
        let updatedLocator = locator.replace('%sName', section);
        updatedLocator = updatedLocator.replace('%s', checkbox);
        logger.trace('get checkbox locator');
        return updatedLocator;
    }

    async getOrdersStatus(xpath) {
        let orderStatus = await element.all(by.xpath(xpath)).getText();
        logger.trace('get order status');
        return orderStatus;
    }

    async getCountOfOrders(xpath) {
        let count = await this.getTextOfElement(await this.getElement(xpath));
        logger.trace('get count of orders');
        return Number.parseInt(count.match(/\w+.\w+/)[0].replace(' ', ''));
    }

    async getImagesOfOrders(xpath) {
        let images = await element.all(by.xpath(xpath)).getCssValue('background-image');
        logger.trace('get order status');
        return images; 
    }
}

module.exports = new ServicesPage();