/*
npm init -y
npm install webdriverio chromedriver
node blog-post-webdriverio.js
*/
/*
https://github.com/automatethem/ko-freeonlineutility-web-app/blob/main/api/blog-post-fetcher/index.js
*/
const { remote } = require('webdriverio');

async function parseNaverBlog(url) {
  const browser = await remote({
    logLevel: 'error',
    capabilities: {
      browserName: 'chrome',
      //'goog:chromeOptions': {
      //  args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'],
      //}
    }
  });

  try {
    await browser.url(url);

    // iframe#mainFrame 내부로 진입
    const iframe = await browser.$('iframe#mainFrame');
    await iframe.waitForExist({ timeout: 10000 });
    await browser.switchToFrame(iframe);

    // 대기 시간 (선택적)
    await browser.pause(2000);

    // 제목 추출
    let title = '';
    try {
      const titleElem = await browser.$('h3.se_textarea');
      title = await titleElem.getText();
    } catch {
      try {
        const titleElem = await browser.$('.pcol1 span');
        title = await titleElem.getText();
      } catch {}
    }

    // 본문 추출
    let text = '';
    let html = '';
    try {
      const contentElem = await browser.$('div.se-main-container');
      text = await contentElem.getText();
      html = await contentElem.getHTML(false);
    } catch {
      try {
        const contentElem = await browser.$('#postViewArea');
        text = await contentElem.getText();
        html = await contentElem.getHTML(false);
      } catch {}
    }

    // 날짜 추출
    let date = '';
    try {
      const dateElem = await browser.$('span.se_publishDate');
      date = await dateElem.getText();
    } catch {}

    return { title, date, text, html };
  } catch (err) {
    console.error('❌ 에러:', err);
    throw err;
  } finally {
    await browser.deleteSession();
  }
}

// 예시 실행
(async () => {
  const url = 'https://blog.naver.com/skkwon44/223446279727'; // 원하는 블로그 URL
  const data = await parseNaverBlog(url);
  console.log(data);
})();
