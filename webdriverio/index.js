/*
npm install webdriverio

node index.js
*/
import { remote } from 'webdriverio';

(async () => {
  ///*
  const driver = await remote({
    capabilities: {
      browserName: 'chrome'
    }
  });
  //*/
  /*
  // appium
  const driver = await remote({
      hostname: 'localhost',
      port: 4723,  // Appium 서버 포트
      path: '/wd/hub', 
      capabilities: {
          platformName: 'Windows',        // PC 환경
          browserName: 'chrome',           // 크롬 브라우저
          'goog:chromeOptions': {
              args: ['--start-maximized']  // 크롬 시작 옵션
          }
      }
  });
  */

  try {
    await driver.url('https://www.google.com');

    const searchInput = await driver.$('input[name="q"]');
    await searchInput.setValue('Selenium');
    await driver.keys('Enter');

    const firstResult = await driver.$('h3');
    await firstResult.waitForExist({ timeout: 5000 });

    const text = await firstResult.getText();
    console.log('첫 번째 검색 결과 제목:', text);
  } finally {
    await driver.deleteSession();
  }
})();
