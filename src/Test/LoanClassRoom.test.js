const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('LoanClassRoom Page', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.id('userId')).sendKeys('702600209');
    await driver.findElement(By.id('userPass')).sendKeys('123456');
    await driver.findElement(By.id('submit')).click();
    await driver.wait(until.urlIs('http://localhost:3000/'), 5000);

    await driver.get('http://localhost:3000/loanClassRoom');

    await driver.sleep(5000);
  });

  after(async function () {
    await driver.quit();
  });


  it('should navigate to view loan class room page', async function () {
    const viewButton = await driver.findElement(By.id('view-button'));
    await viewButton.click();

    await driver.sleep(2000);

    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl.includes('/loanClassRooms/ViewLoanClassRoom'), true, 'Should navigate to view loan class room page');

  });
  
  it('should delete loan class room', async function () {
    await driver.get('http://localhost:3000/loanClassRoom');

    const deleteButton = await driver.findElement(By.id('delete-button'));
    await deleteButton.click();

    await driver.sleep(2000);

    const confirmButton = await driver.findElement(By.css('.swal2-confirm'));
    await confirmButton.click();

    await driver.sleep(2000);

    const successMessage = await driver.findElement(By.css('.swal2-success'));
  });

});