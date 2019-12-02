const data = require('../data');
const RegisterPage = require('../pages/registerPage');
const MainPage = new (require('../pages/mainPage'))();

describe('Onliner register page', () => {
    it('title should be "Регистрация"', async () => {
        await MainPage.open('');
        await MainPage.clickOn(RegisterPage.loginButton);
        await RegisterPage.clickOn(RegisterPage.registerButton);
        expect(RegisterPage.getHeader(RegisterPage.title)).toBe('Регистрация');
    });

    it('does not respond to an invalid e-mail (prompt "Invalid e-mail" is undefined)', async () => {
        let prompt = await RegisterPage.getPromptInvalidEmail(data.invalidEmail);
        expect(prompt).toBeDefined();
    })

    it('should not accepts password less than 8 characters', async () => {
        let prompt = await RegisterPage.getPromptShortPassword(data.shortPassword);
        expect(prompt).toEqual('Минимум 8 символов');
    })

    it('must respond to different passwords (prompt "Passwords do not match" is undefined)', async () => {
        let prompt = await RegisterPage.getPromptDifferentPasswords(data.otherPassword);
        expect(prompt).toBeDefined();
    })
})