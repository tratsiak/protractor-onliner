const data = require('./data');
const MainPage = new (require('./pages/mainPage'))();
const CatalogPage = require('./pages/catalogPage');
const RegisterPage = require('./pages/registerPage');

beforeAll(async () => {
    await MainPage.waitForAngular(false);
    await MainPage.open();
})

describe('Onliner catalog page', () => {
    it('tab title is not "Каталог Onliner"', async () => {
        await CatalogPage.clickOn('//a[@class="b-main-navigation__link" and ./span[contains(.,"Каталог")]]');
        expect(CatalogPage.getTitle()).toBe('Каталог Onliner');
    });

    it('schema-header__title is not "Мобильные телефоны"', async () => {
        await CatalogPage.clickOn('//a[@class="catalog-bar__link catalog-bar__link_strong" and contains(., "Мобильные телефоны")]');
        let webElement = await CatalogPage.getElement('//h1[@class="schema-header__title" and contains(., "Мобильные телефоны")]');
        expect(CatalogPage.getTextOfElement(webElement)).toBe("Мобильные телефоны");
    });

    it(`does not contain ${data.productName} on two pages of results`, async () => {
        await CatalogPage.scrollTo('//div[@class="schema-filter__fieldset" and contains(., "Производитель")]//div[@class="schema-filter-control schema-filter-control_more"]');
        await CatalogPage.clickAsUser(`//li//label[@class="schema-filter__checkbox-item" and contains(., "${data.productName}")]`);
        let results = await CatalogPage.getElements('//div[@class="schema-product__part schema-product__part_4"]/div[@class="schema-product__title"]');
        for (let result of results) {
            let text = await CatalogPage.getTextOfElement(result);
            expect(text).toContain(data.productName);
        }
        await CatalogPage.clickOn('//div[@class="schema-pagination__dropdown"]');
        await CatalogPage.clickOn('//li[@class="schema-pagination__pages-item" and contains(., "2")]');
        await CatalogPage.waitForSeconds(3);
        results = await CatalogPage.getElements('//div[@class="schema-product__part schema-product__part_4"]/div[@class="schema-product__title"]');
        for (let result of results) {
            let text = await CatalogPage.getTextOfElement(result);
            expect(text).toContain(data.productName);
        }
    });

    it('', async () => {
        await CatalogPage.clickOn('//a[@class="schema-order__link"]');
        await CatalogPage.clickOn('//div[@class="schema-order__item" and contains(., "Дорогие")]');
        await CatalogPage.waitForSeconds(3);
        let results = await CatalogPage.getElements('//a[@class="schema-product__price-value schema-product__price-value_primary"]');
        let firstResultPrice = await CatalogPage.getPrice(results[0]);
        for (let result of results) {
            let price = await CatalogPage.getPrice(result);
            expect(firstResultPrice).toBeGreaterThanOrEqual(price);
        }
    });
});

describe('Onliner register page', () => {
    it('title is not "Регистрация"', async () => {
        await RegisterPage.clickOn('//div[@class="auth-bar__item auth-bar__item--text"]');
        await RegisterPage.clickOn('//a[@class="auth-form__link auth-form__link_primary auth-form__link_small" and contains(.,"Зарегистрироваться на Onliner")]');
        expect(RegisterPage.getTextOfElement('//div[@class="auth-form__title auth-form__title_big auth-form__title_condensed-default"]')).toBe('Регистрация');
    });

    it('does not respond to an invalid e-mail (prompt "Invalid e-mail" is undefined)', async () => {
        let prompt = await RegisterPage.checkInvalidEmail(data.invalidEmail);
        expect(prompt).toBeDefined();
    })

    it('accepts password less than 8 characters', async () => {
        let prompt = await RegisterPage.checkShortPassword(data.shortPassword);
        expect(prompt).toEqual('Минимум 8 символов');
    })

    it('does not respond to different passwords (prompt "Passwords do not match" is undefined)', async () => {
        let prompt = await RegisterPage.checkDifferentPasswords(data.otherPassword);
        expect(prompt).toBeDefined();
    })
})