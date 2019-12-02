const data = require('../data');
const CatalogPage = require('../pages/catalogPage');
const MainPage = new (require('../pages/mainPage'))();

describe('Onliner catalog page', () => {
    it('tab title should be "Каталог Onliner"', async () => {
        await MainPage.open();
        await MainPage.mainNavigateTo(MainPage.mainNavigate, 'Каталог');
        expect(CatalogPage.getTitle()).toBe('Каталог Onliner');
    });

    it('page header should be "Мобильные телефоны"', async () => {
        await CatalogPage.barNavigateTo(CatalogPage.mobilePhonesButton, "Мобильные телефоны");
        expect(CatalogPage.getHeader(CatalogPage.title)).toBe("Мобильные телефоны");
    });

    it(`should be contain ${data.productName} on two pages of results`, async () => {
        await CatalogPage.isVisibility(CatalogPage.lastResult);
        await CatalogPage.scrollPageDown();
        await CatalogPage.isClickable(CatalogPage.getCheckbox(CatalogPage.sectionCheckbox, "Производитель", data.productName));
        await CatalogPage.clickAsUser(CatalogPage.getCheckbox(CatalogPage.sectionCheckbox, "Производитель", data.productName));
        browser.sleep(3000);
        let productsName = await CatalogPage.getProductsName(CatalogPage.productName);
        for (let productName of productsName) {
            expect(productName).toContain(data.productName);
        }
        await CatalogPage.clickOn(CatalogPage.pagination);
        await CatalogPage.goToPage(CatalogPage.numberOfPage, '2');
        browser.sleep(3000);
        productsName = await CatalogPage.getProductsName(CatalogPage.productName);
        for (let productName of productsName) {
            expect(productName).toContain(data.productName);
        }
    });

    it('sorting does not work correctly (the most expensive product is cheaper than others)', async () => {
        await CatalogPage.clickOn(CatalogPage.orderLink);
        await CatalogPage.selectOrderTo(CatalogPage.orderItem, "Дорогие");
        await CatalogPage.isVisibility(CatalogPage.nextProducts);
        await CatalogPage.isClickable(CatalogPage.nextProducts);
        let prices = await CatalogPage.getPrices(CatalogPage.productPrice);
        for (let i = 0; i < prices.length - 2; i++) {
            expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
        }
    });
});