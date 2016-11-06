require('geckodriver');
var assert = require("chai").assert;
require('chromedriver');
require('mocha');

var selenium = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

const timeOut = 15000;


test.describe('Testing modification members projet', function() {
    this.timeout(timeOut);


    before(function() {

    });

    after(function() {
        driver.quit();
    });

    test.it("ajouter member et changer PO", function() {
        driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
        driver.get("http://localhost:8080/project/581e54710bcffd3721e0c3f9").then(function(){
            
			driver.manage().timeouts().implicitlyWait(50000).then(function(){
                driver.findElement(selenium.By.id('search-input')).sendKeys("lili").then(function(input) {
					driver.findElement(selenium.By.id('search-button')).click();
					
				
                });
            });
        });
    });
