import * as puppeteer from 'puppeteer'
import Scrape from './Scraper.js'

class DeepScrape extends Scrape {

    constructor(courseList) {
        super();
        this.courseList = courseList;
    }

    async pageExists(page) {
        const pageHandle = await this.page.$(`::-p-xpath(//div[@class='item-list']/ul[@class='pager']/li/a[text()='${page}'])`);
        return pageHandle !== null
    }

    async goToPage(page) {
        const pageHandle = await this.page.$(`::-p-xpath(//div[@class='item-list']/ul[@class='pager']/li/a[text()='${page}'])`);
        const href = await this.page.evaluate(e => e.href, pageHandle);
        await this.page.goto(href);
    }

    async getClassInfo() {
        const enrollmentHandle = await this.page.$("::-p-xpath(//div[@class='section-details'])");
        
        const totalOpenSeatsHandle = await enrollmentHandle.$("::-p-xpath(//span[text()='Total Open Seats']/following-sibling::span)");
        const total_open_seats = this.page.evaluate(e => e.textContent, totalOpenSeatsHandle);

        const classEnrollmentHandle = await enrollmentHandle.$("::-p-xpath(//div[@class='detail-class-enrollment-flex'])");
        const enrolled = await classEnrollmentHandle.$eval("::-p-xpath(//[div/span[text()='Enrolled']])", e => e.innerText);
        const waitlisted = await classEnrollmentHandle.$eval("::-p-xpath(//[div/span[text()='Waitlisted']])", e => e.innerText);
        const capacity = await classEnrollmentHandle.$eval("::-p-xpath(//[div/span[text()='Capacity']])", e => e.innerText);
        const waitlist_max = await classEnrollmentHandle.$eval("::-p-xpath(//[div/span[text()='Waitlist Max']])", e => e.innerText);

        return {
            enrolled: enrolled,
            waitlisted: waitlisted,
            capacity: capacity,
            waitlist_max: waitlist_max
        };
    }

    async goToClassPage(desiredName, classItem) {
        const name_xpath = "::-p-xpath(//div[@class='ls-term-year-section-wrapper']/div[@class='ls-section-name-number-code fmpbook']/a)"
        const classHandle = await classItem.$(name_xpath);
        const name = await classHandle.$eval("::-p-xpath(//span[@class='ls-section-name'])", e => e.textContent);
        if (name !== desiredName) {
            return;
        }
        const href = await this.page.evaluate(e => e.href, classHandle);
        await this.page.goto(href);
        console.log('Booyah');
    }

    async runScrape() {
        let currentPage = 1;
        for (let courseInfo of this.courseList) {
            const { courseName, coursePage } = courseInfo;
            if (coursePage !== currentPage) {
                const pageExists = await this.pageExists(coursePage);
                if (pageExists) {
                    await this.goToPage(coursePage);
                    const classItems = await this.page.$$("::-p-xpath(//div[@class='left-col'])");
                    for (let classItem of classItems) {
                        await this.goToClassPage(courseName, classItem);
                        const classInfo = await this.getClassInfo();
                        console.log(classInfo);
                        await this.page.goBack();
                    }
                }
            }
        }
        
    }
}

(async() => {
    const deepScraper = new DeepScrape([{courseName: "COMPSCI 189", coursePage: 2}]);
    await deepScraper.openBrowser();
    await deepScraper.getCourseCatalog();
    await deepScraper.navigateFall2024();
    await deepScraper.getDepartmentSubjects("Computer Science");
    try {
        await deepScraper.runScrape();
    } catch(error) {
        console.log(error);
    }
    await deepScraper.closeBrowser();
})();