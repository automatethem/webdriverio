
/*
npm install appium
appium -p 4723

npm install webdriverio @wdio/cli @wdio/local-runner @wdio/mocha-framework
node index.js
*/
// npm install @wdio/cli @wdio/local-runner @wdio/mocha-framework webdriverio appium appium-adb

import { remote } from 'webdriverio';

(async () => {
  const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
      platformName: 'Android',          // 또는 'iOS'
      automationName: 'UiAutomator2',   // Android용
      browserName: 'Chrome',            // 모바일 크롬
      deviceName: 'Android Emulator',  // 연결된 기기 이름
    }
  };

  const driver = await remote(opts);

  try {
    await driver.url('https://www.google.com');

    const searchInput = await driver.$('input[name="q"]');
    await searchInput.setValue('Selenium');
    await driver.keys('Enter');

    // h3이 나타날 때까지 최대 5초 기다림
    const firstResult = await driver.$('h3');
    await firstResult.waitForExist({ timeout: 5000 });

    const text = await firstResult.getText();
    console.log('첫 번째 검색 결과 제목:', text);
  } finally {
    await driver.deleteSession();
  }
})();
