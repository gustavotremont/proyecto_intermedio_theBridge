// LLAMAMOS A PUPPETEER
const puppeteer = require("puppeteer");

const scrapOffer = async (url, browser) =>{
    try{
        const offer = {};
        const page = await browser.newPage();
        await page.goto(url);

        await page.waitForSelector("h1");
            offer.title = await page.$eval('h1', e=>e.innerText)
            offer.companyName = await page.$eval('.text-primary', e=>e.innerText)
            offer.description = await page.$eval('.fs--16', e=>e.innerText.slice(0, 200))
            offer.location = await page.$eval('ul.list-unstyled :first-child .float-end', e=>e.innerText)
            offer.salary = await page.$eval('ul.list-unstyled :nth-child(6) .float-end', (e)=>{
                const salario = e.innerText
                return salario.includes('€') ? salario : 'Salario no disponible'
            }) 
            offer.url = url

        // //Rellenamos un objeto vacio con los atributos que queremos traernos de las ofertas
        // const uniqueOffer = await page.evaluate(() => {
            console.log("Esto es una unica tarjeta",offer)
        return offer;
        // });
        // cardsOffer.push(uniqueOffer);
        // console.log("Esto es una unica tarjeta", uniqueOffer);

    } catch (error) {
        console.log(error);
    }
}

/******************************funcion madre ************************************** */
const scrap_welcome = async (keyword, location = 'españa') => {
    try {
        // Abre el navegador
        const browser = await puppeteer.launch({
            headless: false,
        });
        // Abre nueva página  con TecnoEmpleo home
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });
        await page.goto(
            "https://www.welcometothejungle.com/es/jobs?page=1&range%5Bexperience_level_minimum%5D%5Bmin%5D=0&range%5Bexperience_level_minimum%5D%5Bmax%5D=1&aroundQuery="
        );
        
        await page.waitForSelector(".sc-1s0dgt4-9 form input"); // Espera a que el input sea visible
        await page.type(".sc-1s0dgt4-9 form input", keyword); //Escribe texto en el input seleccionado

        await page.waitForSelector(".blo20m-1 div form input"); // Espera a que el input sea visible
        await page.type(".blo20m-1 div form input", location); //Escribe texto en el input seleccionado

        // ··············CONTENEDOR DE ADS GENERAL Y LINKS·················//
        // Espera a que sea visible el contenedor con las tarjetas de resultados 
        await page.waitForSelector(".ais-Hits-list"); //li.ais-Hits-list-item
        
        const links = await page.evaluate(() => {
            const elements = document.querySelectorAll(".sc-7dlxn3-2 a");
    
            const dataJobs = [];
            for (let element of elements) {
                dataJobs.push(element.href);
            }
            return dataJobs;
        });

        const urls = new Set(links)

        console.log(urls);
        // Recorremos los links de las ofertas

        const cardsOffer = [];
        for (let url of urls) {
           const resultOffer = await scrapOffer(url, browser)
           cardsOffer.push(resultOffer)
        }
        await browser.close();
        return cardsOffer;
    } catch (error) {
        console.log(error);
    }
};

scrap_welcome("javascript", "barcelona");

scrap_welcome
exports.scrap_welcome = scrap_welcome;