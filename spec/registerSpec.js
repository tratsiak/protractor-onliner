const data = require('../data');
const RegisterPage = require('../pages/registerPage');
const MainPage = new (require('../pages/mainPage'))();
const logger = require('../logger').logger;

describe('Onliner register page', () => {
    logger.info('start onliner register page test');
    it('title should be "Регистрация"', async () => {
        logger.info('start it: title should be "Регистрация"');
        await MainPage.open('');
        await MainPage.clickOn(RegisterPage.loginButton);
        await RegisterPage.clickOn(RegisterPage.registerButton);
        expect(RegisterPage.getHeader(RegisterPage.title)).toBe('Регистрация');
    });

    it('does not respond to an invalid e-mail (prompt "Invalid e-mail" is undefined)', async () => {
        logger.info('start it: does not respond to an invalid e-mail (prompt "Invalid e-mail" is undefined)');
        let prompt = await RegisterPage.getPromptInvalidEmail(data.invalidEmail);
        expect(prompt).toBeDefined();
    })

    it('should not accepts password less than 8 characters', async () => {
        logger.info('start it: should not accepts password less than 8 characters');
        let prompt = await RegisterPage.getPromptShortPassword(data.shortPassword);
        expect(prompt).toEqual('Минимум 8 символов');
    })

    it('must respond to different passwords (prompt "Passwords do not match" is undefined)', async () => {
        logger.info('start it: must respond to different passwords (prompt "Passwords do not match" is undefined)');
        let prompt = await RegisterPage.getPromptDifferentPasswords(data.otherPassword);
        expect(prompt).toBeDefined();
    })
})