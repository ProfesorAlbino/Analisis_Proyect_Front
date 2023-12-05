const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Modify Computer Equipments Page', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.id('userId')).sendKeys('702900750');
    await driver.findElement(By.id('userPass')).sendKeys('Jeykel');
    await driver.findElement(By.id('submit')).click();
    await driver.wait(until.urlIs('http://localhost:3000/'), 5000);

    await driver.get('http://localhost:3000/ListComputerEquipments');

    await driver.sleep(5000);

    const modifyButton = await driver.findElement(By.css('table tbody tr:first-child button.btn-warning'));
    await modifyButton.click();
  });

  after(async function () {
    await driver.quit();
  });

  it('should modify computer equipment successfully', async function () {
    await driver.sleep(5000);

    await driver.findElement(By.id('class')).sendKeys('Class A');
    await driver.findElement(By.id('name')).sendKeys('Computer');
    await driver.findElement(By.id('brand')).sendKeys('Brand');
    await driver.findElement(By.id('model')).sendKeys('Model');
    await driver.findElement(By.id('state')).sendKeys('Active');
    await driver.findElement(By.id('observations')).sendKeys('No observations');
    await driver.findElement(By.id('include')).sendKeys('Included');

    await driver.findElement(By.linkText('Guardar')).click();

    const currentUrl = 'http://localhost:3000/ListComputerEquipments';
    assert.strictEqual(currentUrl, 'http://localhost:3000/ListComputerEquipments', 'Should be redirected to list page');

  });
});