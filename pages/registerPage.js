const Page = require('./mainPage');

class RegisterPage extends Page {

    async checkInvalidEmail(email) {
        await this.enterKey(email, '//input[@class="auth-input auth-input_primary auth-input_base auth-form__input auth-form__input_width_full" and @type="email"]');
        let locator = this.elemIsPresent('//div[@class="auth-form__description auth-form__description_error auth-form__description_base auth-form__description_extended-other" and contains(., "Некорректный e-mail")]');
        if (!locator) {
            return undefined;
        } else {
            let prompt = await this.getElement('//div[@class="auth-form__description auth-form__description_error auth-form__description_base auth-form__description_extended-other" and contains(., "Некорректный e-mail")]');
            return this.getTextOfElement(prompt);
        }
    }

    async checkShortPassword(password) {
        await this.enterKey(password, '//input[@class="auth-input auth-input_primary auth-input_base auth-form__input auth-form__input_width_full" and @placeholder="Придумайте пароль"]');
        let prompt = await this.getElement('//div[@class="auth-form__description auth-form__description_primary auth-form__description_tiny auth-form__description_condensed-other"]');
        return this.getTextOfElement(prompt);
    }

    async checkDifferentPasswords(otherPassword) {
        await this.enterKey(otherPassword, '//input[@class="auth-input auth-input_primary auth-input_base auth-form__input auth-form__input_width_full" and @placeholder="Повторите пароль"]');
        let locator = await this.elemIsPresent('//div[@class="auth-form__description auth-form__description_error auth-form__description_base auth-form__description_extended-other" and contains(., "Пароли не совпадают")]');
        if (!locator) {
            return undefined;
        } else {
            let prompt = await this.getElement('//div[@class="auth-form__description auth-form__description_error auth-form__description_base auth-form__description_extended-other" and contains(., "Пароли не совпадают")]');
            return this.getTextOfElement(prompt);
        }
    }

    async enterKey(key, xpath) {
        let input = await this.getElement(xpath);
        await input.sendKeys(key);
        await this.waitForSeconds(3);
    }
}

module.exports = new RegisterPage();