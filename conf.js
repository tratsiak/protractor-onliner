exports.config = {
    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome'
    },
    directConnect: true,
    specs: [
        './spec/catalogSpec.js', 
        './spec/registerSpec.js',
        './spec/basketSpec.js',
        './spec/servicesSpec.js',
        './spec/forumSpec.js'
    ],
    baseUrl: 'https://onliner.by',
    onPrepare: async () => {
        browser.waitForAngularEnabled(false);
        browser.get('');
        browser.driver.manage().window().maximize();
    }
  };