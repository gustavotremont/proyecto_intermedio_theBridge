// LLAMAMOS A PUPPETEER
const puppeteer = require("puppeteer");

const scrapingTe = async keyword => {
    try {
        // Abre el navegador
        const browser = await puppeteer.launch({
            headless: true,
        });
        // Abre nueva página  con TecnoEmpleo
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
        await page.click(
            "#sidebar_filters > div:nth-child(8) > a:nth-child(7)"
        );

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
            await page.goto(link);
            await page.waitForSelector("h1");
            //Rellenamos un objeto vacio con los atributos que queremos traernos de las ofertas
            const uniqueOffer = await page.evaluate(() => {
                const offer = {};
                offer.title = document.querySelector("h1").innerText;
                offer.companyName =
                    document.querySelector(".text-primary").innerText;
                // offer.description = document.querySelector("").innerText;
                // offer.location = document.querySelector("").innerText;
                // offer.salary = document.querySelector("h1").innerText;
                offer.url = window.location.href;

                return offer;
            });
            cardsOffer.push(uniqueOffer);
            console.log("Esto es una unica tarjeta", uniqueOffer);
        }
        await browser.close();
        return cardsOffer;
    } catch (error) {
        console.log(error);
    }
};

scrapingTe("desarrollador");
