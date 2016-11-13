require('geckodriver');
var assert = require("chai").assert;
require('chromedriver');
require('mocha');

var selenium = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

const timeOut = 15000;

test.describe('testing tasks', function() {
    this.timeout(timeOut);

    before(function() {

    });

    after(function() {
        driver.quit();
    });

    test.it("open the homepage and log as Tata", function() {
        driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
        driver.get("http://localhost:8080").then(function(){
            driver.wait(selenium.until.elementLocated(selenium.By.id("home-signup"), timeOut)).then(function(){
                driver.findElement(selenium.By.id('home-signup')).click();
                driver.wait(selenium.until.elementLocated(selenium.By.name('username'), timeOut)).then(function(){
                    driver.findElement(selenium.By.name('username')).sendKeys("io").then(function(){
                        driver.findElement(selenium.By.name('password')).sendKeys("tinoudi01").then(function(){
                            driver.findElement(selenium.By.name('login')).click();

                            describe('going on task page', function(){
                                driver.wait(selenium.until.elementLocated(selenium.By.name('mon projet'), timeOut)).then(function(){
                                    driver.findElement(selenium.By.name('mon projet')).click();
                                    driver.wait(selenium.until.elementLocated(selenium.By.name('toobar_tasks'), timeOut)).then(function() {
                                        driver.findElement(selenium.By.name('toobar_tasks')).click();

                                        describe('filling task form', function(){
                                            driver.wait(selenium.until.elementLocated(selenium.By.name('description'), timeOut)).then(function() {
                                                driver.findElement(selenium.By.name('description')).sendKeys("A task very complicated").then(function(){
                                                    driver.findElement(selenium.By.name('in_charge')).sendKeys("Tata").then(function(){
                                                        driver.findElement(selenium.By.name('cost')).sendKeys("4").then(function() {
                                                            driver.findElement(selenium.By.id('submit_create_task')).click();
                                                            driver.wait(selenium.until.elementLocated(selenium.By.xpath("//*[contains(text(), 'A task very complicated')]"), timeOut)).then(function () {
                                                                element = driver.findElement(selenium.By.xpath("//*[contains(text(), 'A task very complicated')]"));
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
        });
    });



});