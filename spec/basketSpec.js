const CatalogPage = require('../pages/catalogPage');

describe('Onliner catalog basket', () => {
    it('tab title should be "Каталог Onliner"', async () => {
        await CatalogPage.open('');
        await CatalogPage.clickOn(CatalogPage.catalogButton);
        expect(CatalogPage.getTitle()).toBe('Каталог Onliner');
    });

    it('page header should be "Игровые приставки"', async () => {
        await CatalogPage.clickOn(CatalogPage.electronicsButton);
        await CatalogPage.isClickable(CatalogPage.videogamesButton);
        await CatalogPage.moveToElement(CatalogPage.videogamesButton);
        await CatalogPage.isClickable(CatalogPage.gameConsoleButton);
        await CatalogPage.clickOn(CatalogPage.gameConsoleButton);
        expect(CatalogPage.getHeader(CatalogPage.title)).toBe("Игровые приставки");
    });

    it('button condition must change from "В корзину" to "В корзине"', async () => {
        let firstResult = await CatalogPage.getFirstResult(CatalogPage.productLink);
        await CatalogPage.clickOn(firstResult);
        await CatalogPage.isClickable(CatalogPage.basketButton);
        let basketButton = await CatalogPage.getFirstResult(CatalogPage.basketButton);
        await CatalogPage.clickOn(basketButton);
        await CatalogPage.isVisibility(CatalogPage.intoBusketButton);
        await CatalogPage.isClickable(CatalogPage.intoBusketButton);
        basketButton = await CatalogPage.getFirstResult(CatalogPage.basketButton);
        expect(CatalogPage.getTextOfElement(basketButton)).toEqual('В корзине');
    });

    it('must be present', async () => {
        let basketButton = await CatalogPage.getFirstResult(CatalogPage.basketButton);
        await CatalogPage.clickOn(basketButton);
        await CatalogPage.isVisibility(CatalogPage.cartWrapper);
        expect(CatalogPage.elemIsPresent(CatalogPage.cartProduct)).toBe(true);
    });
});