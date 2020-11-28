const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false
        });

        const page = await browser.newPage();
        await page.setViewport({
            width: 600,
            height: 800
        });
        const start = 1, end = 938;

        const client = await page.target().createCDPSession();
        await client.send("Page.setDownloadBehavior", {
            behavior: "allow",
            downloadPath: path.resolve(__dirname)
        });

        await page.goto(`https://dhlottery.co.kr/gameResult.do?method=allWinExel&gubun=byWin&nowPage=&drwNoStart=${start}&drwNoEnd=${end}`).catch(err => console.log(err));

        browser.close();
    }
    catch (err) {
        throw err;
    }
})();