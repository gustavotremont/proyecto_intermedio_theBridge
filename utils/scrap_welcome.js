const puppeteer = require('puppeteer')

const scraperWelcome = async (url) => {

    try {
        console.log("Opening the browser......");
        const browser = await puppeteer.launch({
            "headless": true,
            "args": ["--fast-start", "--disable-extensions", "--no-sandbox"],
            "ignoreHTTPSErrors": true

        });
        const page = await browser.newPage();
        page.setViewport({
            width: 1280,
            height: 7000
        });


        console.log(`Navigating to ${url}...`);
        await page.goto(url);
        await page.waitForSelector('ol.sc-1dr65rf-0.rvKcA.ais-Hits-list');

        const jobs = await page.$$eval('ol.sc-1dr65rf-0.rvKcA.ais-Hits-list', () => {
            const jobData = [];
            let jobTitle = "";
            let jobCompany = "";
            let jobLocation = "";
            let jobDate = "";
            let jobImg = "";
            let jobUrl = "";
            const issues = document.querySelectorAll('li.ais-Hits-list-item');
            issues.forEach(issue => {
                //!TITULO OFERTA
                if (issue.querySelector("h3.sc-1kkiv1h-9.sc-7dlxn3-4.ivyJep.iXGQr")) {
                    jobTitle = issue.querySelector("h3.sc-1kkiv1h-9.sc-7dlxn3-4.ivyJep.iXGQr").innerText
                } else {
                    jobTitle = "Sin datos"
                }
                //! COMPAÑÍA
                if (issue.querySelector("span.ais-Highlight-nonHighlighted")) {
                    jobCompany = issue.querySelector("span.ais-Highlight-nonHighlighted").innerText
                } else {
                    jobCompany = "Sin datos"
                }
                //! LOCALIZACIÓN (O TELETRABAJO)
                if (issue.querySelector("span.sc-1qc42fc-2.fHAhLi")) {
                    jobLocation = issue.querySelector("span.sc-1qc42fc-2.fHAhLi").innerText
                } else if (issue.querySelector("ul.sc-1qc42fc-4.dLcIHx > li:nth-child(2) > span.sc-1qc42fc-2.bzTNsD > span")) {
                    jobLocation = issue.querySelector("ul.sc-1qc42fc-4.dLcIHx > li:nth-child(2) > span.sc-1qc42fc-2.bzTNsD > span").innerText
                } else {
                    jobLocation = "Sin datos"
                }
                //! DATE
                if (issue.querySelector("span.sc-1qc42fc-2.bzTNsD > time > span")) {
                    jobDate = issue.querySelector("span.sc-1qc42fc-2.bzTNsD > time > span").innerText
                } else {
                    jobDate = "Sin datos"
                }
                //! IMG
                if (issue.querySelector("img.sc-1kkiv1h-8.iwJoCg")) {
                    jobImg = issue.querySelector("img.sc-1kkiv1h-8.iwJoCg").src
                } else {
                    jobImg = "https://cdn.iconscout.com/icon/premium/png-128-thumb/no-image-2840213-2359555.png"
                }
                //! JOB URL
                if (issue.querySelector("header.sc-7dlxn3-2.eGEqwR > a")) {
                    jobUrl = issue.querySelector("header.sc-7dlxn3-2.eGEqwR > a").href
                }
                // if (issue.querySelector("div.sc-1kkiv1h-0.sc-7dlxn3-0.hKrqEn.gscFBq > a")) {
                //     jobUrl = issue.querySelector("div.sc-1kkiv1h-0.sc-7dlxn3-0.hKrqEn.gscFBq > a").href
                // } 
                else {
                    jobUrl = "Sin datos"
                }
                jobData.push({
                    "jobTitle": jobTitle,
                    "jobCompany": jobCompany,
                    "jobLocation": jobLocation,
                    "jobDate": jobDate,
                    "jobImg": jobImg,
                    "jobUrl": jobUrl
                })
            })
            return jobData
        });
        await browser.close();
        return jobs
    } catch (error) {
        console.log("Error: ", error);
    }

}
scraperWelcome('desarrollador')
// module.exports = {
//     scraperWelcome
// };