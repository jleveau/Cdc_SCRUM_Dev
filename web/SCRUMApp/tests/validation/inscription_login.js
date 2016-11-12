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

	test.it("create utilisateur et faire login", function () {
		driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
		driver.get("http://localhost:8080/").then(function () {

            driver.wait(selenium.until.elementLocated(selenium.By.id("button-registration-home"),timeOut)).then(function () {

                driver.findElement(selenium.By.name('username')).sendKeys("ana").then(function (input) {

                    driver.findElement(selenium.By.name('mail')).sendKeys("ana@g.com").then(function (input) {

                        driver.findElement(selenium.By.name('password')).sendKeys("ana").then(function (input) {

                            driver.findElement(selenium.By.id('button-registration-home')).click();

                            driver.wait(selenium.until.elementLocated(selenium.By.name('login'),timeOut)).then(function () {

                                driver.findElement(selenium.By.name('username')).sendKeys("ana").then(function (input) {

                                    driver.findElement(selenium.By.name('password')).sendKeys("ana").then(function (input) {

                                        describe('click login ->',function () {

                                            driver.findElement(selenium.By.name('login')).click();

                                            driver.wait(selenium.until.elementLocated(selenium.By.id('add_project_button'), timeOut)).then(function () {
                                                
                                                return driver.findElement(selenium.By.id('logout'));

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

