const CatalogPage = require('../pages/catalogPage');

describe('Onliner catalog basket', () => {
    it('tab title should be "Каталог Onliner"', async () => {
        await CatalogPage.open('');
        await CatalogPage.clickOn(CatalogPage.catalogButton);
        expect(CatalogPage.getTitle()).toBe('Каталог Onliner');
    });

    it('page header should be "Игровые приставки"', async () => {
        await CatalogPage.clickOn(CatalogPage.electronicsButton);
        browser.sleep(1000); //!!!
        await CatalogPage.moveToElement(CatalogPage.videogamesButton);
        browser.sleep(1000); //!!!
        await CatalogPage.clickOn(CatalogPage.gameConsoleButton);
        expect(CatalogPage.getHeader(CatalogPage.title)).toBe("Игровые приставки");
    });

    it('button condition must change from "В корзину" to "В корзине"', async () => {
        let firstResult = await CatalogPage.getFirstResult(CatalogPage.productLink);
        await CatalogPage.clickOn(firstResult);
        let basketButton = await CatalogPage.getFirstResult(CatalogPage.basketButton);
        await CatalogPage.clickOn(basketButton);
        basketButton = await CatalogPage.getFirstResult(CatalogPage.basketButton);
        expect(CatalogPage.getTextOfElement(basketButton)).toEqual('В корзине');
    });

    it('must be present', async () => {
        let basketButton = await CatalogPage.getFirstResult(CatalogPage.basketButton);
        await CatalogPage.clickOn(basketButton);
        expect(CatalogPage.getElement(CatalogPage.cartProduct)).not.toBe(undefined);
    });
});