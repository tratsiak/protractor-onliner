const CatalogPage = require('../pages/catalogPage');
const MainPage = new (require('../pages/mainPage'))();
const logger = require('../logger').logger;

describe('Onliner catalog basket', () => {
    logger.info('start onliner catalog basket test');
    it('tab title should be "Каталог Onliner"', async () => {
        logger.info('start it: tab title should be "Каталог Onliner"');
        await MainPage.open('');
        await MainPage.mainNavigateTo(MainPage.mainNavigate, 'Каталог');
        expect(CatalogPage.getTitle()).toBe('Каталог Onliner');
    });

    it('page header should be "Игровые приставки"', async () => {
        logger.info('start it: page header should be "Игровые приставки"');
        await CatalogPage.classifierNavigateTo(CatalogPage.classifierNavigate, "Электроника");
        await CatalogPage.listNavigateTo(CatalogPage.listNavigate, "Видеоигры")
        await CatalogPage.isClickable(CatalogPage.gameConsoleButton);
        await CatalogPage.clickOn(CatalogPage.gameConsoleButton);
        expect(CatalogPage.getHeader(CatalogPage.title)).toBe("Игровые приставки");
    });

    it('button condition must change from "В корзину" to "В корзине"', async () => {
        logger.info('start it: button condition must change from "В корзину" to "В корзине"');
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

    it('item must be present', async () => {
        logger.info('start it: item must be present');
        let basketButton = await CatalogPage.getFirstResult(CatalogPage.basketButton);
        await CatalogPage.clickOn(basketButton);
        await CatalogPage.isVisibility(CatalogPage.cartWrapper);
        expect(CatalogPage.elemIsPresent(CatalogPage.cartProduct)).toBe(true);
    });
});