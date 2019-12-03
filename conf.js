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
        let AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
        jasmine.getEnv().afterEach(function(done){
            browser.takeScreenshot().then(function (png) {
              allure.createAttachment('Screenshot', function () {
                return new Buffer(png, 'base64')
              }, 'image/png')();
              done();
            })
        });
    },
    beforeLaunch: () => {
        logger.info('Protractor-onliner test launched');
    },
    onComplete: () => {
        logger.info('Protractor-onliner test completed');
    }
};