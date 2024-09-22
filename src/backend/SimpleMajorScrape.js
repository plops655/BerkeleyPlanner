import * as puppeteer from 'puppeteer'
import Scrape from './Scraper.js'


class SimpleMajorScrape extends Scrape {
    
    constructor() {
        super();
    }

    async nextPageExists() {
        const nextPageHandle = await this.page.$("::-p-xpath(//div[@class='item-list']/ul[@class='pager']/li[@class='pager-next'])");
        return nextPageHandle !== null;
    }

    async clickNext() {
        const nextPageHandle = await this.page.$("::-p-xpath(//div[@class='item-list']/ul[@class='pager']/li[@class='pager-next']/a)");
        const href = await this.page.evaluate(el => el.href, nextPageHandle);
        await this.page.goto(href);
    }

    async tryAddingInfo(classInfoList, classHandle, selector) {
        try {
            const info = await classHandle.$eval(selector, el => el.innerText);
            classInfoList.push(info);
        } catch (e) {
            classInfoList.push("");
        }
    }

    async runScrape(subject) {
        await this.openBrowser();
        console.log('Browser opened');
        await this.getCourseCatalog();
        console.log('Got Course Catalog');
        await this.navigateFall2024();
        console.log('Navigated to Fall 2024');
        await this.getDepartmentSubjects(subject);
        console.log('Got Department Subjects');

        let thisClassInfoList = [];
        while (true) {
            const classInfoSelector = '.left-col';

            let classInfoList = await this.page.$$(classInfoSelector);

            for (let classHandle of classInfoList) {

                let courseNameList = [];
                await this.tryAddingInfo(courseNameList, classHandle, '.ls-section-name-number-code.fmpbook .ls-section-name');

                let meetingInfoList = [];
                await this.tryAddingInfo(meetingInfoList, classHandle, '.ls-meeting-details-flex .ls-dates');
                await this.tryAddingInfo(meetingInfoList, classHandle, '.ls-meeting-details-flex .ls-days span:nth-of-type(2)');
                await this.tryAddingInfo(meetingInfoList, classHandle, '.ls-meeting-details-flex .ls-time span:nth-of-type(2)');

                let instructionModeList = [];
                await this.tryAddingInfo(instructionModeList, classHandle, '.ls-instructor-mode-flex.fspmedium p span:nth-of-type(2)');

                let timeConflictEnrollmentList = [];
                await this.tryAddingInfo(timeConflictEnrollmentList, classHandle, '.ls-instructor-mode-flex.fspmedium p:nth-of-type(2)');

                thisClassInfoList.push({
                    courseNameList,
                    meetingInfoList,
                    instructionModeList,
                    timeConflictEnrollmentList
                });
            }

            if (await this.nextPageExists()) {
                await this.clickNext();
            } else {
                break;
            }
        }

        await this.closeBrowser();
        return thisClassInfoList;
    }
}

(async () => {
    const scraper = new SimpleMajorScrape();
    const result = await scraper.runScrape("Computer Science");
    console.log(result);
})();
