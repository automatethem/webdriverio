/*
npm install appium

npm install webdriverio
node index.js
*/
import { remote } from 'webdriverio';

(async () => {
  const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
      platformName: 'Android',
      automationName: 'UiAutomator2',
      deviceName: 'Android Emulator',  // 실제 기기면 adb devices로 확인 가능
      appPackage: 'com.android.calculator2',
      appActivity: '.Calculator',
      noReset: true,   // 앱 초기화 방지 옵션 (필요시 조정)
    }
  };

  const driver = await remote(opts);

  try {
    // 숫자 2 클릭
    const btn2 = await driver.$('id:digit_2');
    await btn2.click();

    // 더하기 버튼 클릭
    const btnAdd = await driver.$('id:op_add');
    await btnAdd.click();

    // 숫자 3 클릭
    const btn3 = await driver.$('id:digit_3');
    await btn3.click();

    // = 버튼 클릭
    const btnEq = await driver.$('id:eq');
    await btnEq.click();

    // 결과 텍스트 가져오기
    const resultEl = await driver.$('id:result');
    const result = await resultEl.getText();

    console.log('계산 결과:', result);

  } finally {
    await driver.deleteSession();
  }
})();
