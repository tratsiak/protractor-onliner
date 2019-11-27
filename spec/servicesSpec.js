const ServicesPage = require('../pages/servicesPage');
const data = require('../data');

describe('Onliner services page', () => {
    it('tab title should be "Заказы на услуги"', async () => {
        await ServicesPage.open('');
        await ServicesPage.clickOn(ServicesPage.servicesButton);
        expect(ServicesPage.getTitle()).toBe('Заказы на услуги');
    });

    it(`should be contain "${data.orderStatus}" in every results`, async () => {
        await ServicesPage.isVisibility(ServicesPage.lastResult);
        await ServicesPage.scrollPageDown();
        await ServicesPage.isClickable(ServicesPage.statusCheckbox);
        await ServicesPage.clickAsUser(ServicesPage.statusCheckbox);
        await ServicesPage.isClickable(ServicesPage.pagination);
        let ordersStatus = await ServicesPage.getOrdersStatus(ServicesPage.orderStatus);
        for (status of ordersStatus) {
            expect(status).toContain(data.orderStatus);
        }
    });

    it(`the number of orders should be ${data.countOfOrders} or more`, async () => {
        expect(ServicesPage.getCountOfOrders(ServicesPage.countOfResults)).toBeGreaterThanOrEqual(data.countOfOrders);
    });

    it('images of orders should be present', async () => {
        let images = await ServicesPage.getImagesOfOrders(ServicesPage.images);
        for (image of images) {
            expect(image).not.toBe('none');
        }
    });
});