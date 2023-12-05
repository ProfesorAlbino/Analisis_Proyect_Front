const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');


describe('AdminLoanClassRoom', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.id('userId')).sendKeys('702600209');
    await driver.findElement(By.id('userPass')).sendKeys('123456');
    await driver.findElement(By.id('submit')).click();
    await driver.wait(until.urlIs('http://localhost:3000/'), 5000);

    await driver.get('http://localhost:3000/adminLoanClassRoom');

    await driver.sleep(5000);
  });

  after(async function () {
    await driver.quit();
  });




  it('should approve a loan class room', async function () {
    await driver.wait(until.elementLocated(By.tagName('table')), 5000);
    const row = await driver.findElement(By.css('table tbody tr:first-child'));
    const approveButton = await row.findElement(By.id('aprobar'));
    await approveButton.click();

    const confirmButton = await driver.findElement(By.css('.swal2-confirm'));
    await confirmButton.click();

    await driver.sleep(2000);
    const successMessage = await driver.findElement(By.css('.swal2-success'));

  });

  it('should deny a loan class room', async function () {
   await driver.wait(until.elementLocated(By.tagName('table')), 5000);
    const row = await driver.findElement(By.css('table tbody tr:first-child'));
    const approveButton = await row.findElement(By.id('denegar'));
    await approveButton.click();

    const confirmButton = await driver.findElement(By.css('.swal2-confirm'));
    await confirmButton.click();

    await driver.sleep(2000);
    const successMessage = await driver.findElement(By.css('.swal2-success'));
  });
});