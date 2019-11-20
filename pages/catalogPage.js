const Page = require('./mainPage');

class CatalogPage extends Page {

    async scrollTo(xpath) {
        let element = await this.getElement(xpath);
        await browser.actions().mouseMove(element).perform();
    }

    async clickAsUser(xpath) {
        let element = await this.getElement(xpath);
        await browser.actions().click(element).perform();
        await this.waitForSeconds(3);
    }

    async getPrice(element) {
        let text = await this.getTextOfElement(element);
        let price = Number.parseFloat(text.match(/[\w,]+/)[0].replace(',', '.'));
        return price;
    }
}

module.exports = new CatalogPage();