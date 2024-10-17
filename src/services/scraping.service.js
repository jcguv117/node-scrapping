const puppeteer  = require("puppeteer");

class ScrappingService {
    _launchConfig = {
        headless: "shell"
    };

    constructor() {
        this.browser = null;
        this.page = null;
    }

    async initialize() {
        this.browser = await puppeteer.launch({...this._launchConfig});
        this.page = await this.browser.newPage();
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
    
    async requestInterception(postData) {
        // Habilitar intercepcion
        await this.page.setRequestInterception(true);

        // configurar la intercepcion con el metodo Post
        this.page.on('request', (request) => {
            if (request.resourceType() === 'document') {
                const data = {
                    method: 'POST',
                    postData: new URLSearchParams(postData).toString(),
                    headers: {
                        ...request.headers(),
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                };
                request.continue(data);
            } else {
                request.continue();
            }
        });
    }

    async loadURL(url, waitUntilOption=null) {
        const waitUntil = waitUntilOption ? waitUntilOption : ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'];
        await this.page.goto(url, { waitUntil });
    }

    async scrapeValue(selector) {
        return await this.page.$eval(selector, element => element.innerHTML);
    }

    async configPDF(format = 'A4') {
        return await this.page.pdf({ 
            printBackground: true,
            format,
        }) 
    }

    async scrapeInformation(url, selector) {
        await this.initialize();
        await this.loadURL(url);
        const value = await this.scrapeValue(selector);
        await this.close();
        return value;
    } 

    async createPDF(url, postData=null) {
        await this.initialize();
        
        if(postData) { //si existe data post, convertir request a metodo Post
            await this.requestInterception(postData)
        }

        await this.loadURL(url);
        const pdfBuffer = await this.configPDF();
        await this.close();

        return pdfBuffer;
    }
}

module.exports = new ScrappingService();
