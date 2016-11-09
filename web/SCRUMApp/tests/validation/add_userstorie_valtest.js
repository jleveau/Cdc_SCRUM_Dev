require('geckodriver');
var assert = require("chai").assert;
require('chromedriver');
require('mocha');


var selenium = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

const timeOut = 15000;


test.describe('test User Story', function() {
    this.timeout(timeOut);

    before(function() {

    });


    after(function() {
        driver.quit();
    });

    test.it("open home page, log in and test create project" , function () {
       driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
       driver.get("http://localhost:8080").then(function () {
           driver.wait(selenium.until.elementLocated(selenium.By.id("home-signup"),timeOut)).then(function () {
               driver.findElement(selenium.By.id("home-signup")).click();
               driver.wait(selenium.until.elementLocated(selenium.By.name('username'),timeOut)).then(function () {
                   driver.findElement(selenium.By.name("username")).sendKeys("io").then(function () {
                       driver.findElement(selenium.By.name("password")).sendKeys("tinoudi01").then(function () {
                           driver.findElement(selenium.By.name("login")).click();

                           describe('search for a project',function () {
                               driver.wait(selenium.until.elementLocated(selenium.By.id('search-input'),timeOut)).then(function () {
                                   driver.findElement(selenium.By.id('search-input')).sendKeys("java").then(function () {
                                       driver.findElement(selenium.By.id('search-button')).click();

                                       //TODO must find how to select an item from search bar
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