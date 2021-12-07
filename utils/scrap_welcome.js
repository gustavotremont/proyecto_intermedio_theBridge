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
const scrap_welcome = async keyword => {
    try {
        // Abre el navegador
        const browser = await puppeteer.launch({
            headless: false,
        });
        // Abre nueva página  con TecnoEmpleo home
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });
        await page.goto(
            "https://www.welcometothejungle.com/es/jobs"
        );
            console.log("Entro a la web");
        // Espera a que el input sea visible
        await page.waitForSelector(".ais-SearchBox-input");
        //Escribe texto en el input seleccionado
        await page.type(".ais-SearchBox-input", keyword);
        //     //click en el botón "Buscar"
            console.log("pulso el botón");

        await page.click(".sc-jKTccl");
        // // Espera a que sea visible el filtro "Sin experiencia"
        // await page.waitForSelector(
        //     ".blo20m-2"
        // );
        // // Hacemos click en la opción "sin experiencia"
        // await page.click(".blo20m-2");

        // ··············CONTENEDOR DE ADS GENERAL Y LINKS·················//
            console.log("espero al contenedor de ofertas");
        // Espera a que sea visible el contenedor con las tarjetas de resultados 
        await page.waitForSelector(".sc-1dr65rf-0"); //li.ais-Hits-list-item

            console.log("A ver si llega");
        
        const links = await page.evaluate(() => {
            console.log("entramos")

            const elements = document.querySelectorAll("h3");
            console.log(elements)
    
            const dataJobs = [];
            for (let element of elements) {
                if(element.href !== 'https://www.welcometothejungle.com/es/jobs?query=desarrolador&page=1') {
                    dataJobs.push(element.href);
                } else {
                    dataJobs.push('');
                }
            }
            return dataJobs;
        });

        //URLS filtradas 
        const urls = links.filter(n => n);

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

scrap_welcome("js");

scrap_welcome
exports.scrap_welcome = scrap_welcome;