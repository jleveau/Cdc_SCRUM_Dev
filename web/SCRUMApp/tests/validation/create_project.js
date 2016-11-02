require('geckodriver');
var assert = require("chai").assert;
require('chromedriver');
require('mocha');

var selenium = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

const timeOut = 15000;


test.describe('Testing form project', function() {
    this.timeout(timeOut);


    before(function() {

    });

    after(function() {
        driver.quit();
    });

    test.it("create a new project", function() {
        driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
        driver.get("http://localhost:8080/project/new").then(function(){
            driver.manage().timeouts().implicitlyWait(50000).then(function(){
                driver.findElement(selenium.By.name('name')).sendKeys("toto").then(function(input) {
                    driver.findElement(selenium.By.name('github-link')).sendKeys("https://github.com/jleveau/Cdc_SCRUM_Dev").then(function(input) {
                        driver.findElement(selenium.By.name('sprint_duration')).sendKeys("7").then(function(input) {
                            driver.findElement(selenium.By.name('date_start')).sendKeys(new Date("10/10/2016")).then(function(input) {
                                driver.findElement(selenium.By.id('project_submit')).sendKeys(new Date("10/10/2016")).click();

                            });
                        });
                    });
                });
            });
        });
    });
});