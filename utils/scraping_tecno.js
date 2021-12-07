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
            offer.description = await page.$eval('.fs--16', e=>e.innerText)
            offer.location = await page.$eval('ul.list-unstyled :first-child .float-end', e=>e.innerText)
            offer.salary = await page.$eval('ul.list-unstyled :nth-child(6) .float-end', e=>e.innerText) || 'Salario no disponible'
            // offer.url = await page.evaluate(Window.location.href)

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
const scrapingTe = async keyword => {
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
            console.log("Entro a la web");
        // Espera a que el input sea visible
        await page.waitForSelector("#te");
        //Escribe texto en el input seleccionado
        await page.type("#te", keyword);
        //     //click en el botón "Buscar"
            console.log("pulso el botón");
        // await page.waitForSelector('.btn-warning');
        await page.click(".btn-warning");
        // Espera a que sea visible el filtro "Sin experiencia"
        await page.waitForSelector(
            "#sidebar_filters > div:nth-child(8) > a:nth-child(7)"
        );
        // Hacemos click en la opción "sin experiencia"
        await page.click("#sidebar_filters > div:nth-child(8) > a:nth-child(7)");

        // ··············CONTENEDOR DE ADS GENERAL Y LINKS·················//
            console.log("espero al selector");
        // Espera a que sea visible el contenedor con las tarjetas de resultados
        await page.waitForSelector(".p-2");

            console.log("A ver si llega");
        
        const links = await page.evaluate(() => {
            console.log("entramos");
            const elements = document.querySelectorAll("h5 a");
    
            const dataJobs = [];
            for (let element of elements) {
                dataJobs.push(element.href);
            }
            return dataJobs;
        });


            console.log(links);
        // Recorremos los links de las ofertas
        const cardsOffer = [];
        for (let link of links) {
           const resultOffer = await scrapOffer(link, browser)
           cardsOffer.push(resultOffer)
        }
        await browser.close();
        return cardsOffer;
    } catch (error) {
        console.log(error);
    }
};

scrapingTe("js");

exports.scrapingTe = scrapingTe;