exports.config = {
    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome',
        specs: [
            '**/*[sS]pec.js'
        ]
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000
      },
    baseUrl: 'https://onliner.by',
    onPrepare: () => {
        browser.waitForAngularEnabled(false);
        browser.get('');
        browser.driver.manage().window().maximize();
    }
  };