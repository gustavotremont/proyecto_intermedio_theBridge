// LLAMAMOS A PUPPETEER
const puppeteer = require("puppeteer");

// const scrapOffer = async (url, browser) =>{
//     try{
//         const offer = {};
//         const page = await browser.newPage();
//         await page.goto(url);

//         await page.waitForSelector("h1");
//             offer.title = await page.$eval('h1', e=>e.innerText)
//             offer.companyName = await page.$eval('.text-primary', e=>e.innerText)
//             offer.description = await page.$eval('.fs--16', e=>e.innerText.slice(0, 200))
//             offer.location = await page.$eval('ul.list-unstyled :first-child .float-end', e=>e.innerText)
//             offer.salary = await page.$eval('ul.list-unstyled :nth-child(6) .float-end', (e)=>{
//                 const salario = e.innerText
//                 return salario.includes('€') ? salario : 'Salario no disponible'
//             }) 
//             offer.url = url

//         // //Rellenamos un objeto vacio con los atributos que queremos traernos de las ofertas
//         // const uniqueOffer = await page.evaluate(() => {
//             console.log("Esto es una unica tarjeta",offer)
//         return offer;
//         // });
//         // cardsOffer.push(uniqueOffer);
//         // console.log("Esto es una unica tarjeta", uniqueOffer);

//     } catch (error) {
//         console.log(error);
//     }
// }
/******************************funcion madre ************************************** */
const scrapingTe = async (keyword, location) => {
    try {
        // Abre el navegador
        const browser = await puppeteer.launch({
            headless: false,
        });
        // Abre nueva página  con TecnoEmpleo home
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });
        await page.goto(
            "https://www.infojobs.net/"
        );
        
        await page.waitForSelector(".sui-AtomButton:nth-child(2)"); // Espera a que el input sea visible
        await page.click(".sui-AtomButton:nth-child(2)"); //Escribe texto en el input seleccionado

        await page.waitForSelector("#palabra"); // Espera a que el input sea visible
        await page.type("#palabra", keyword); //Escribe texto en el input seleccionado

        await page.waitForSelector(".chosen-single"); // Espera a que el input sea visible
        await page.click(".chosen-single"); //click en el input de localizacion

        await page.waitForSelector(".chosen-search input"); // Espera a que el input sea visible
        await page.type(".chosen-search input", location); //Escribe texto en el input seleccionado

        await page.waitForSelector(".chosen-results li.active-result"); // Espera a que el input sea visible
        await page.click(".chosen-results li.active-result"); //click en el input de localizacion
    
        // await page.waitForSelector('.btn-warning');
        await page.click("#searchOffers"); //click en el botón "Buscar"
        
        await page.waitForSelector(".rc-slider-handle-2"); // Espera a que sea visible el filtro "Sin experiencia"
        const experience = page.$('.rc-slider-handle-2');
        await experience.evaluate((slider) => slider.style.left = '0%');

        // ··············CONTENEDOR DE ADS GENERAL Y LINKS·················//
        // Espera a que sea visible el contenedor con las tarjetas de resultados
        await page.waitForSelector(".ij-ComponentList");
        
        const links = await page.evaluate(() => {
            const elements = document.querySelectorAll(".ij-OfferCardContent-description-title-link");
    
            const dataJobs = [];
            for (let element of elements) {
                dataJobs.push(element.href);
            }
            return dataJobs;
        });

        //URLS filtradas 
        const urls = links.filter(n => n);
        console.log(urls);

        // // Recorremos los links de las ofertas
        // const cardsOffer = [];
        // for (let url of urls) {
        //    const resultOffer = await scrapOffer(url, browser)
        //    cardsOffer.push(resultOffer)
        // }
        // await browser.close();
        // return cardsOffer;
    } catch (error) {
        console.log(error);
    }
};

scrapingTe("node.js", "madrid");

exports.scrapingTe = scrapingTe;