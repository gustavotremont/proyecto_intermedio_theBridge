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
            // console.log("Esto es una unica tarjeta",offer)
        return offer;
        // });
        // cardsOffer.push(uniqueOffer);
        // console.log("Esto es una unica tarjeta", uniqueOffer);

    } catch (error) {
        console.log(error);
    }
}
/******************************funcion madre ************************************** */
const scrapingTe = async (keyword, location) => {
    try {
        // Abre el navegador
        const browser = await puppeteer.launch({
            headless: true,
        });
        // Abre nueva página  con TecnoEmpleo home
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });
        await page.goto(
            "https://www.tecnoempleo.com/busqueda-empleo.php?cp=,29,&ex=,1,#buscador-ofertas-ini"
        );

        await page.waitForSelector("#te"); // Espera a que el input sea visible
        await page.type("#te", keyword); //Escribe texto en el input seleccionado

        await page.waitForSelector(".row div div div.dropdown button"); // Espera a que el input sea visible
        await page.click(".row div div div.dropdown button"); //click en el input de localizacion

        await page.waitForSelector(".bs-searchbox input"); // Espera a que el input sea visible
        await page.type(".bs-searchbox input", location); //Escribe texto en el input seleccionado

        await page.waitForSelector(".show ul li a"); // Espera a que el input sea visible
        await page.click(".show ul li a"); //click en el input de localizacion
    
        // await page.waitForSelector('.btn-warning');
        await page.click(".btn-warning"); //click en el botón "Buscar"
        
        await page.waitForSelector("#sidebar_filters > div:nth-child(8) > a:nth-child(7)"); // Espera a que sea visible el filtro "Sin experiencia"
        await page.click("#sidebar_filters > div:nth-child(8) > a:nth-child(7)"); // Hacemos click en la opción "sin experiencia"

        // ··············CONTENEDOR DE ADS GENERAL Y LINKS·················//
        // Espera a que sea visible el contenedor con las tarjetas de resultados
        await page.waitForSelector(".p-2");
        
        const links = await page.evaluate(() => {
            const elements = document.querySelectorAll("div.p-0 h5.h6-xs a");
    
            const dataJobs = [];
            for (let element of elements) {
                if(element.href !== 'https://www.tecnoempleo.com/demanda-trabajo-informatica.php?fav=1') {
                    dataJobs.push(element.href);
                } else {
                    dataJobs.push('');
                }
            }
            return dataJobs;
        });

        //URLS filtradas 
        const urls = links.filter(n => n);

            // console.log(urls);
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

scrapingTe("programador", "barcelona");

module.exports = scrapingTe;