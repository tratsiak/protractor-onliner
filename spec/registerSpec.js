const data = require('../data');
const RegisterPage = require('../pages/registerPage');

describe('Onliner register page', () => {
    it('title should be "Регистрация"', async () => {
        await RegisterPage.open('');
        await RegisterPage.clickOn(RegisterPage.loginButton);
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