exports.config = {
    framework: 'jasmine',
    specs: ['testSpec.js'],
    seleniumAddress: 'http://localhost:4444/wd/hub',
    onPrepare: () => {
        browser.driver.manage().window().maximize();
    }
  };