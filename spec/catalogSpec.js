const data = require('../data');
const CatalogPage = require('../pages/catalogPage');

describe('Onliner catalog page', () => {
    it('tab title should be "Каталог Onliner"', async () => {
        await CatalogPage.clickOn(CatalogPage.catalogButton);
        expect(CatalogPage.getTitle()).toBe('Каталог Onliner');
    });

    it('page header should be "Мобильные телефоны"', async () => {
        await CatalogPage.clickOn(CatalogPage.mobilePhonesButton);
        expect(CatalogPage.getHeader(CatalogPage.title)).toBe("Мобильные телефоны");
    });

    it(`should be contain ${data.productName} on two pages of results`, async () => {
        await CatalogPage.scrollPageDown();
        browser.sleep(3000); //!!!
        await CatalogPage.clickAsUser(CatalogPage.manufactutrerCheckbox);
        browser.sleep(3000); //!!!
        let productsName = await CatalogPage.getProductsName(CatalogPage.productName);
        for (productName of productsName) {
            expect(productName).toContain(data.productName);
        }
        await CatalogPage.clickOn(CatalogPage.pagination);
        await CatalogPage.clickOn(CatalogPage.numberOfPage);
        browser.sleep(3000); //!!!
        productsName = await CatalogPage.getProductsName(CatalogPage.productName);
        for (productName of productsName) {
            expect(productName).toContain(data.productName);
        }
    });

    it('sorting does not work correctly (the most expensive product is cheaper than others)', async () => {
        browser.sleep(3000); //!!!
        await CatalogPage.clickOn(CatalogPage.orderLink);
        browser.sleep(1000); //!!!
        await CatalogPage.clickOn(CatalogPage.orderItem);
        browser.sleep(3000); //!!!
        let results = await CatalogPage.getElements(CatalogPage.productPrice);
        for (let result of results) {
            expect(await CatalogPage.getPrice((await CatalogPage.getFirstResult(CatalogPage.productPrice)))).toBeGreaterThanOrEqual(await CatalogPage.getPrice(result));
        }
    });
});