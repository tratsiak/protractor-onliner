const CatalogPage = require('../pages/catalogPage');

beforeAll(() => {
    CatalogPage.open();
})

describe('Onliner catalog basket', () => {
    it('tab title is not "Каталог Onliner"', async () => {
        await CatalogPage.clickOn(CatalogPage.catalogButton);
        expect(CatalogPage.getTitle()).toBe('Каталог Onliner');
    });

    it('page header should be "Игровые приставки"', async () => {
        await CatalogPage.clickOn(CatalogPage.electronicsButton);
        await CatalogPage.moveToElement(CatalogPage.videogamesButton);
        await CatalogPage.clickOn(CatalogPage.gameConsoleButton);
        expect(CatalogPage.getHeader(CatalogPage.title)).toBe("Игровые приставки");
    });
});