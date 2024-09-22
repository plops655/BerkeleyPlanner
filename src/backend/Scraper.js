import * as puppeteer from 'puppeteer'

class Scrape {
    
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async openBrowser() {
        this.browser = await puppeteer.launch({ headless: false }); 
        this.page = await this.browser.newPage();
    }

    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    async getCourseCatalog() {
        await this.page.goto('https://classes.berkeley.edu/');
    }

    async navigateFall2024() {
        const elementHandle = await this.page.waitForSelector("::-p-xpath(//div[@class='item-list']/ul/li/a[contains(text(), 'Fall 2024')])");
        const href = await this.page.evaluate(element => element.href, elementHandle);
        await this.page.goto(href);
    }

    async getDepartmentSubjects(subject) {
        const li_class = "expanded last subject_area_dropdown-processed";
        const div_class = "item-list";
        const subject_xpath = `//li[@class='${li_class}']//div[@class='${div_class}']//ul/li`;
        const liHandles = await this.page.$$(`::-p-xpath(${subject_xpath})`);

        for (let liHandle of liHandles) {
            const anchor = await liHandle.$('a');
            if (anchor) {
                const innerText = await this.page.evaluate(a1 => a1.innerText, anchor);
                if (innerText.includes(subject)) {
                    const anchorHref = await this.page.evaluate(a1 => a1.href, anchor);
                    await this.page.goto(anchorHref);
                    break;
                }
            }
        }
    }

}

export default Scrape;