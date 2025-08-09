/*
npm install webdriverio

node index.js
*/
import { remote } from 'webdriverio';

(async () => {
  const driver = await remote({
    capabilities: {
      browserName: 'chrome'
    }
  });

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
