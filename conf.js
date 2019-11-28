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
        './spec/catalog[sS]pec.js'
    ],
    baseUrl: 'https://onliner.by',
    onPrepare: async () => {
        browser.waitForAngularEnabled(false);
        browser.driver.manage().window().maximize();
    }
};