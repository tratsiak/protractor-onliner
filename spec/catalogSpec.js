const data = require('../data');
const CatalogPage = require('../pages/catalogPage');

describe('Onliner catalog page', () => {
    it('tab title should be "Каталог Onliner"', async () => {
        await CatalogPage.open();
        await CatalogPage.clickOn(CatalogPage.catalogButton);
        expect(CatalogPage.getTitle()).toBe('Каталог Onliner');
    });

    it('page header should be "Мобильные телефоны"', async () => {
        await CatalogPage.clickOn(CatalogPage.mobilePhonesButton);
        expect(CatalogPage.getHeader(CatalogPage.title)).toBe("Мобильные телефоны");
    });

    it(`should be contain ${data.productName} on two pages of results`, async () => {
        await CatalogPage.isVisibility(CatalogPage.lastResult);
        await CatalogPage.scrollPageDown();
        await CatalogPage.isClickable(CatalogPage.manufactutrerCheckbox);
        await CatalogPage.clickAsUser(CatalogPage.manufactutrerCheckbox);
        setTimeout(async () => {
            let productsName = await CatalogPage.getProductsName(CatalogPage.productName);
            for (productName of productsName) {
                expect(productName).toContain(data.productName);
            }
        }, 3000);
        await CatalogPage.clickOn(CatalogPage.pagination);
        await CatalogPage.clickOn(CatalogPage.numberOfPage);
        setTimeout(async () => {
            let productsName = await CatalogPage.getProductsName(CatalogPage.productName);
            for (productName of productsName) {
                expect(productName).toContain(data.productName);
            }
        }, 3000);
    });

    it('sorting does not work correctly (the most expensive product is cheaper than others)', async () => {
        await CatalogPage.clickOn(CatalogPage.orderLink);
        await CatalogPage.isClickable(CatalogPage.orderItem);
        await CatalogPage.clickOn(CatalogPage.orderItem);
        await CatalogPage.isVisibility(CatalogPage.nextProducts);
        await CatalogPage.isClickable(CatalogPage.nextProducts);
        let results = await CatalogPage.getElements(CatalogPage.productPrice);
        for (let result of results) {
            expect(await CatalogPage.getPrice((await CatalogPage.getFirstResult(CatalogPage.productPrice)))).toBeGreaterThanOrEqual(await CatalogPage.getPrice(result));
        }
    });
});