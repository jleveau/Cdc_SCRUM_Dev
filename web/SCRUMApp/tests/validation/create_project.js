require('geckodriver');
var assert = require("chai").assert;
require('chromedriver');
require('mocha');

var selenium = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

const timeOut = 15000;


test.describe('Testing inscription et login', function() {
    this.timeout(timeOut);


    before(function () {

    });

    after(function () {
        driver.quit();
    });

    test.it("creation du project", function () {
        driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
        driver.get("http://localhost:8080/").then(function () {

            driver.wait(selenium.until.elementLocated(selenium.By.id("home-signup"),timeOut)).then(function () {

                driver.findElement(selenium.By.id('home-signup')).click();

                driver.wait(selenium.until.elementLocated(selenium.By.name('login'),timeOut)).then(function () {

                    driver.findElement(selenium.By.name('username')).sendKeys("ana").then(function (input) {

                        driver.findElement(selenium.By.name('password')).sendKeys("ana").then(function (input) {

                            driver.findElement(selenium.By.name('login')).click();

                            driver.wait(selenium.until.elementLocated(selenium.By.id('add_project_button'), timeOut)).then(function () {

                                driver.findElement(selenium.By.id("add_project_button")).click();

                                driver.wait(selenium.until.elementLocated(selenium.By.id('project_submit'), timeOut)).then(function () {

                                    driver.findElement(selenium.By.id('name')).sendKeys("project_cdp").then(function (input) {

                                        driver.findElement(selenium.By.css('input.md-datepicker-input')).sendKeys("12/12/2016").then(function (input) {

                                            driver.findElement(selenium.By.id('sprint_duration')).sendKeys("5").then(function (input) {

                                                driver.findElement(selenium.By.id('description')).sendKeys("description project, description project ").then(function (input) {

                                                    driver.wait(function() {
                                                        //return (driver.findElement(selenium.By.name('create_submit')));
                                                        driver.findElement(selenium.By.name('create_submit')).doubleClick();

                                                        driver.wait(selenium.until.elementLocated(selenium.By.id('add_project_button'), timeOut)).then(function () {
                                                            return driver.findElement(selenium.By.name('project_cdp'));
                                                        });
                                                    },3000);
                                                });
                                            });
                                        });

                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

