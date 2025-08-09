/*
npm init -y
npm install webdriverio chromedriver

node index-webdriverio.js
*/

const { remote } = require('webdriverio');

(async () => {
  const browser = await remote({
    logLevel: 'error',
    capabilities: {
      browserName: 'chrome',
      //'goog:chromeOptions': {
      //  args: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
      //}
    }
  });

  await browser.url('https://www.google.com');
  const input = await browser.$('input[name="q"]');
  await input.setValue('WebdriverIO');
  await browser.keys('Enter');
  await browser.pause(3000); // 3초 대기
  console.log('검색 완료');
  await browser.deleteSession();
})();
