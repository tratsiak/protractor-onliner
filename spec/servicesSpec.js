const ServicesPage = require('../pages/servicesPage');
const MainPage = new (require('../pages/mainPage'))();
const data = require('../data');

describe('Onliner services page', () => {
    it('tab title should be "Заказы на услуги"', async () => {
        await MainPage.open('');
        await MainPage.mainNavigateTo(MainPage.mainNavigate, 'Услуги');
        expect(ServicesPage.getTitle()).toBe('Заказы на услуги');
    });

    it(`should be contain "Не выполнен" in every results`, async () => {
        await ServicesPage.isVisibility(ServicesPage.lastResult);
        await ServicesPage.scrollPageDown();
        await ServicesPage.isClickable(ServicesPage.getCheckbox(ServicesPage.sectionCheckbox, "Статус", "Невыполненные"));
        await ServicesPage.clickAsUser(ServicesPage.getCheckbox(ServicesPage.sectionCheckbox, "Статус", "Невыполненные"));
        await ServicesPage.isClickable(ServicesPage.pagination);
        let ordersStatus = await ServicesPage.getOrdersStatus(ServicesPage.orderStatus);
        for (let status of ordersStatus) {
            expect(status).toContain("Не выполнен");
        }
    });

    it(`the number of orders should be ${data.countOfOrders} or more`, async () => {
        expect(ServicesPage.getCountOfOrders(ServicesPage.countOfResults)).toBeGreaterThanOrEqual(data.countOfOrders);
    });

    it('images of orders should be present', async () => {
        let images = await ServicesPage.getImagesOfOrders(ServicesPage.images);
        for (let image of images) {
            expect(image).not.toBe('none');
        }
    });
});