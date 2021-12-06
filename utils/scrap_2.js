// LLAMAMOS A PUPPETEER
const puppeteer = require("puppeteer");

const scrapingLinke = async keyword => {
    try {
        // Abre el navegador
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--fast-start", "--disable-extensions", "--no-sandbox"],
            ignoreHTTPSErrors: true,
            defaultViewport: { width: 1366, height: 768 }  
        });

        // Abre nueva página  Linkedin sin registro de usuario
        const page = await browser.newPage();
        await page.setViewport({
            width: 1366,
            height: 768 });
        await page.goto(
            "https://www.linkedin.com/jobs"
        );

            console.log("Entro a la web");
        // Espera a que el input sea visible
        await page.waitForSelector(".search-input");

        //Escribe texto en el input seleccionado
        await page.type(".search-input", keyword);

        //     //click en el botón "Buscar"
            console.log("pulso el botón buscar");
        // await page.waitForSelector('buscar oferta home');
        await page.click('button[data-searchbar-type="JOBS"]');
    
        
        // Espera a que sea visible el input filtro "Sin experiencia"
        console.log("Esperando filtro")
        await page.waitForSelector('li.filter:nth-child(5)>div>div>button');
       //Hacemos click en el input"sin experiencia"
       console.log("cliqueando filtro")
        await page.click('li.filter:nth-child(5)>div>div>button');

        // Espera a que sea visible el boton filtro "Sin experiencia"
        console.log("Esperando SIN EXPERIENCIA")
        await page.waitForSelector('div.filter-values-container__filter-values>div:nth-child(2)>input#f_E-1');
        //Hacemos click en la opción "sin experiencia"
        console.log("cliqueando SIN EXPERIENCIA")
        await page.click('div.filter-values-container__filter-values>div:nth-child(2)>input#f_E-1');

        // Espera a que sea visible el boton HECHO de "Sin experiencia"
        await page.waitForSelector('li.filter:nth-child(5)>div>div>div>button');
        //Hacemos click en el BOTON HECHO "sin experiencia"
        await page.click('li.filter:nth-child(5)>div>div>div>button');

        //··············CONTENEDOR DE ADS GENERAL Y LINKS·················//
            console.log("espero al selector");
        // Espera a que sea visible el contenedor con las tarjetas de resultados
        await page.waitForSelector(".jobs-search__results-list");

            console.log("Nos traemos todas las ofertas");

        //metodo evaluate}
        const links = await page.evaluate(() => {
            console.log("Entramos");
            const elements = document.querySelectorAll("div.base-search-card>a"); //h3 a
            
            //EN ESTE PUNTO NO MUESTRA TODAS LOS LINKS A LAS OFERTAS PORQUE PIDE "solicitar en el sitio web de  la empresa"
            //Creamos un array vacio para iterar las ofertas de trabajo y pushearlas
            const dataJobs = [];
            for (let element of elements) {
            dataJobs.push(element.href);
            }
        return dataJobs;
        });
            console.log(links);

        const cards = [];
        for (let link of links) {
            await page.goto(link);
            await page.waitForSelector("h3");

            const uniqueCardOffer = await page.evaluate(() => {
            const offer = {};
            offer.title = document.querySelector("h1.topcard__title").innerText;
            offer.companyName = document.querySelector("a.topcard__org-name-link").innerText;
            //oferta.salary=
            //offer.url = window.location.href;
            return offer;
            });
            cards.push(uniqueCardOffer);
        console.log("Esta es una de las ofertas", uniqueCardOffer);
        }

        await browser.close();
        return cards;
    } catch (error) {
            console.log(error);
    }
};


scrapingLinke("desarrollador");

