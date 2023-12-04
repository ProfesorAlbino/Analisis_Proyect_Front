const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Login Page', function() {
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function() {
    await driver.quit();
  });

  it('should login successfully with valid credentials', async function() {
    await driver.get('http://localhost:3000/login');

    await driver.findElement(By.id('userId')).sendKeys('702810226');
    await driver.findElement(By.id('userPass')).sendKeys('1234567');
    await driver.findElement(By.id('submit')).click();

    await driver.wait(until.urlIs('http://localhost:3000/'), 100000);

    //const user = sessionStorage.getItem('user');
    const dr = await driver.executeScript('return sessionStorage.getItem("user")');
    assert(await dr, 'User should be stored in session storage');
  });

  /*it('should display error message with invalid credentials', async function() {
    await driver.get('http://localhost:3000/login');

    await driver.findElement(By.id('userId')).sendKeys('invalid_username');
    await driver.findElement(By.id('userPass')).sendKeys('invalid_password');
    await driver.findElement(By.id('submit')).click();

    await driver.wait(until.elementLocated(By.className('toaster')), 5000);

    const errorMessage = await driver.findElement(By.className('toaster')).getText();
    assert(errorMessage.includes('Credenciales incorrectas'), 'Error message should be displayed');
  });*/
});