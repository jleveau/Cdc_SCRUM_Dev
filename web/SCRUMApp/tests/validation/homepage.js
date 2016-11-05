require('geckodriver');
var assert = require("chai").assert;
require('chromedriver');
require('mocha');

var selenium = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

const timeOut = 15000;


test.describe('testing homepage', function() {
    this.timeout(timeOut);

    before(function() {

    });

    after(function() {
        driver.quit();
    });

    test.it("open the homepage", function() {
        driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
        driver.get("http://localhost:8080").then(function(){
            driver.manage().timeouts().implicitlyWait(50000).then(function(){
                driver.getTitle().then(function(title) {
                    assert.equal(title, "SCRUMApp - Home");
                    driver.quit();
                });
            });
        });
    });

    test.it("user the search bar", function() {
        driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
        driver.get("http://localhost:8080").then(function(){
            driver.manage().timeouts().implicitlyWait(50000).then(function(){
                driver.findElement(selenium.By.id('search-input')).sendKeys("toto").then(function(input) {
                    driver.findElement(selenium.By.id('search-button')).click();
                    driver.wait(function() {
                        return driver.getTitle().then(function(title) {
                            return title === 'SCRUMApp - Project';
                        });
                    }, 1000);
                });
            });
        });
    });



});