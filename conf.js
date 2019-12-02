const logger = require('./logger').logger;
let setBrowser = process.argv[3];
if (setBrowser !== undefined) 
    setBrowser = setBrowser.replace(/--browser=/, '') === 'firefox' ? 'firefox' : 'chrome';
else 
    setBrowser = 'chrome';

exports.config = {
    framework: 'jasmine',
    capabilities: {
        browserName: setBrowser
    },
    directConnect: true,
    specs: [
        './spec/*[sS]pec.js'
    ],
    baseUrl: 'https://onliner.by',
    onPrepare: () => {
        browser.waitForAngularEnabled(false);
        browser.driver.manage().window().maximize();
    },
    beforeLaunch: () => {
        logger.info('Protractor-onliner test launched');
    },
    onComplete: () => {
        logger.info('Protractor-onliner test completed');
    }
};