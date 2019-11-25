const Page = require('./mainPage');

class RegisterPage extends Page {

    loginButton = '//div[@class="auth-bar__item auth-bar__item--text"]';
    registerButton = '//a[@class="auth-form__link auth-form__link_primary auth-form__link_small" and contains(.,"Зарегистрироваться на Onliner")]';
    title = '//div[@class="auth-form__title auth-form__title_big auth-form__title_condensed-default"]';
    emailInput = '//input[@class="auth-input auth-input_primary auth-input_base auth-form__input auth-form__input_width_full" and @type="email"]';
    invalidEmailPrompt = '//div[@class="auth-form__description auth-form__description_error auth-form__description_base auth-form__description_extended-other" and contains(., "Некорректный e-mail")]';
    passwordInput = '//input[@class="auth-input auth-input_primary auth-input_base auth-form__input auth-form__input_width_full" and @placeholder="Придумайте пароль"]';
    shortPasswordPrompt = '//div[@class="auth-form__description auth-form__description_primary auth-form__description_tiny auth-form__description_condensed-other"]';
    confirmPasswordInput = '//input[@class="auth-input auth-input_primary auth-input_base auth-form__input auth-form__input_width_full" and @placeholder="Повторите пароль"]';
    confirmPasswordPrompt = '//div[@class="auth-form__description auth-form__description_error auth-form__description_base auth-form__description_extended-other" and contains(., "Пароли не совпадают")]';

    async getPromptInvalidEmail(email) {
        await this.enterKey(email, this.emailInput);
        await this.waitElement(this.invalidEmailPrompt);
        let locator = this.elemIsPresent(this.invalidEmailPrompt);
        if (!locator) {
            return undefined;
        } else {
            let prompt = await this.getElement(this.invalidEmailPrompt);
            return this.getTextOfElement(prompt);
        }
    }

    async getPromptShortPassword(password) {
        await this.enterKey(password, this.passwordInput);
        await this.waitElement(this.shortPasswordPrompt);
        let prompt = await this.getElement(this.shortPasswordPrompt);
        return this.getTextOfElement(prompt);
    }

    async getPromptDifferentPasswords(otherPassword) {
        await this.enterKey(otherPassword, this.confirmPasswordInput);
        await this.waitElement(this.confirmPasswordPrompt);
        let locator = await this.elemIsPresent(this.confirmPasswordPrompt);
        if (!locator) {
            return undefined;
        } else {
            let prompt = await this.getElement(this.confirmPasswordPrompt);
            return this.getTextOfElement(prompt);
        }
    }

    async enterKey(key, xpath) {
        let input = await this.getElement(xpath);
        await input.sendKeys(key);
    }
}

module.exports = new RegisterPage();