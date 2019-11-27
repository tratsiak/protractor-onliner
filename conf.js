exports.config = {
    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome'
    },
    directConnect: true,
    specs: [
        './spec/*[sS]pec.js'
    ],
    baseUrl: 'https://onliner.by',
    onPrepare: async () => {
        browser.waitForAngularEnabled(false);
        browser.driver.manage().window().maximize();
    }
  };