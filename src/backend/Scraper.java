package org.example;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.List;

public class Scraper {
    private WebDriver driver;

    public Scraper() {

    }

    public void openDriver() {
        System.setProperty("webdriver.chrome.driver", "/Users/jayanthsadhasivan/Downloads/chromedriver-mac-arm64/chromedriver");
        driver = new ChromeDriver();
    }

    public void closeDriver() {
        driver.close();
    }

    public void getCourseCatalog() {
        driver.get("https://classes.berkeley.edu/");
    }

    public void navigateFall2024() {
        List<WebElement> anchors = driver.findElements(By.xpath("//div[@class='item-list']//a[contains(text(), 'Fall 2024')]"));
        WebElement term = anchors.get(0);
        term.click();
    }

    public void getDepartmentSubjects(String subject) {
        String li_class = "expanded last subject_area_dropdown-processed";
        String div_class = "item-list";

        String subject_xpath = String.format("//li[@class='%s']//div[@class='%s']//ul/li",
                li_class, div_class);

        List<WebElement> li_items = driver.findElements(By.xpath(subject_xpath));

        for (WebElement li_item: li_items) {
            WebElement anchor = li_item.findElement(By.tagName("a"));
            if (anchor.getAttribute("innerText").contains(subject)) {
                String anchorHref = anchor.getAttribute("href");
                driver.get(anchorHref);
                break;
            }
        }
    }

    public boolean nextPageExists() {
        List<WebElement> li_items = driver.findElements(By.xpath("//h2[text()='Pages']/" +
                "following-sibling::div[1]/ul/li"));

        for (WebElement li_item: li_items) {
            if (li_item.getAttribute("class").equals("pager-next")) {
                return true;
            }
        }
        return false;
    }

    public void clickNext() {
        List<WebElement> li_items = driver.findElements(By.xpath("//h2[text()='Pages']/" +
                "following-sibling::div[1]/ul/li"));

        for (WebElement li_item: li_items) {
            if (li_item.getAttribute("class").equals("pager-next")) {
                WebElement anchor = li_item.findElement(By.tagName("a"));
                String anchorHref = anchor.getAttribute("href");
                driver.get(anchorHref);
                break;
            }
        }
    }

    public void tryAddingInfo(List<String> classInfoList, WebElement classInfo, String xpath) {
        try {
            WebElement anchor = classInfo.findElement(By.xpath(xpath));
            String info = anchor.getAttribute("innerText");
            classInfoList.add(info);
        } catch(Exception e) {
            classInfoList.add("");
        }
    }

    public List<ProcessedClass> runScrape(String subject) {
        openDriver();
        getCourseCatalog();
        navigateFall2024();
        getDepartmentSubjects(subject);
        List<ProcessedClass> thisClassInfoList = new ArrayList<>();
        while (true) {

            String divClassInfo = "left-col";
            String classInfoXpath = String.format(".//div[@class='%s']", divClassInfo);

            List<WebElement> classInfoList = driver.findElements(By.xpath(classInfoXpath));

            for (int i = 0; i < classInfoList.size(); i += 1) {
                WebElement classInfo = classInfoList.get(i);

                // Course Name
                String divCourseName = "ls-section-name-number-code fmpbook";
                String spanCourseName = "ls-section-name";
                String courseNameXpath = String.format(".//div[@class='%s']/a/span[@class='%s']", divCourseName, spanCourseName);
                List<String> courseNameList = new ArrayList<>();

                tryAddingInfo(courseNameList, classInfo, courseNameXpath);

                // Meeting Details
                String divMeetingClass = "ls-meeting-details-flex";
                String meetingXpath = String.format(".//div[contains(@class, '%s')]/div", divMeetingClass);
                WebElement meetingInfo = driver.findElement(By.xpath(meetingXpath));
                List<String> meetingInfoList = new ArrayList<>();

                String divDatesClass = "ls-dates";
                String datesXpath = String.format(".//div[@class='%s']", divDatesClass);
                tryAddingInfo(meetingInfoList, meetingInfo, datesXpath);

                String divDaysClass = "ls-days";
                String daysXpath = String.format(".//div[@class='%s']/span[2]", divDaysClass);
                tryAddingInfo(meetingInfoList, meetingInfo, daysXpath);

                String divTimeClass = "ls-time";
                String timeXpath = String.format(".//div[@class='%s']/span[2]", divTimeClass);
                tryAddingInfo(meetingInfoList, meetingInfo, timeXpath);

                // Instruction Mode
                String divInstructionMode = "ls-instructor-mode-flex fspmedium";
                String instructionModeXpath = String.format(".//div[@class='%s']/p/span[2]", divInstructionMode);
                List<String> instructionModeList = new ArrayList<>();

                tryAddingInfo(instructionModeList, classInfo, instructionModeXpath);

                // Time Conflict Enrollment Allowed
                String divTimeConflictEnrollment = "ls-instructor-mode-flex fspmedium";
                String timeConflictEnrollmentXpath = String.format(".//div[@class='%s']/p[2]", divTimeConflictEnrollment);
                List<String> timeConflictEnrollmentList = new ArrayList<>();
                tryAddingInfo(timeConflictEnrollmentList, classInfo, timeConflictEnrollmentXpath);

                thisClassInfoList.add(new ProcessedClass(courseNameList, meetingInfoList, instructionModeList, timeConflictEnrollmentList));
            }
            if (nextPageExists()) {
                clickNext();
            } else {
                break;
            }
        }
        closeDriver();
        return thisClassInfoList;
    }