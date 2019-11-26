const Page = require('./mainPage');
const data = require('../data');

class ServicesPage extends Page {

    servicesButton = '//a[contains(@class, "navigation__link") and contains(.,"Услуги")]';
    statusCheckbox = `//label[contains(@class, "checkbox") and contains(., "${data.statusSort}")]`;
    orderStatus = `//span[contains(@class, "ng-scope") and contains(., "${data.orderStatus}")]`;
    countOfResults = '//div[contains(@class, "state_control")]';
    images = '//span[contains(@class, "service-offers__image_person")]';

    async getOrdersStatus(xpath) {
        let orderStatus = [];
        let results = await this.getElements(xpath);
        for (let result of results) {
            let text = await this.getTextOfElement(result);
            orderStatus.push(text);
        }
        return orderStatus;
    }

    async getCountOfOrders(xpath) {
        let count = await this.getTextOfElement(await this.getElement(xpath));
        return Number.parseInt(count.match(/\w+.\w+/)[0].replace(' ', ''));
    }

    async getImagesOfOrders(xpath) {
        let images = [];
        let results = await this.getElements(xpath);
        for (let result of results) {
            let style = await result.getCssValue('background-image');
            images.push(style);
        }
        return images; 
    }
}

module.exports = new ServicesPage();