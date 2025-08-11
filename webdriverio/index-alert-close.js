const { remote } = require('webdriverio');

(async () => {
  const browser = await remote({
    logLevel: 'error',
    capabilities: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--disable-gpu', '--no-sandbox']
      }
    }
  });

  try {
    // 테스트용 alert 생성 페이지로 이동
    await browser.url('https://the-internet.herokuapp.com/javascript_alerts');

    // alert 띄우는 버튼 클릭
    const alertBtn = await browser.$('button[onclick="jsAlert()"]');
    await alertBtn.click();

    // alert 핸들링
    await browser.pause(1000); // 약간의 대기 필요할 수도 있음

    // alert text 확인
    const alertText = await browser.getAlertText();
    console.log('Alert Text:', alertText);

    // alert 닫기 (확인 클릭)
    await browser.acceptAlert();

    // 또는 거절 클릭 (취소가 있는 경우)
    // await browser.dismissAlert();

  } catch (err) {
    console.error('❌ 에러:', err);
  } finally {
    await browser.deleteSession();
  }
})();
