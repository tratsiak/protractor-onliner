const Page = require('./mainPage');

class RegisterPage extends Page {

    loginButton = '//div[contains(@class, "auth-bar__item--text")]';
    registerButton = '//a[contains(@class, "small") and contains(.,"Зарегистрироваться")]';
    title = '//div[contains(@class, "title_condensed")]';
    emailInput = '//input[contains(@class, "auth") and @type="email"]';
    invalidEmailPrompt = '//div[contains(@class, "extended") and contains(., "e-mail")]';
    passwordInput = '//input[contains(@class, "auth") and contains(@placeholder, "Придумайте")]';
    shortPasswordPrompt = '//div[contains(@class, "description_tiny ")]';
    confirmPasswordInput = '//input[contains(@class, "auth") and contains(@placeholder, "Повторите")]';
    confirmPasswordPrompt = '//div[contains(@class, "extended") and contains(., "не совпадают")]';

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