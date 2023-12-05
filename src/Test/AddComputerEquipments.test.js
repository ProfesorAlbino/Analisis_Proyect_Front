const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Add Computer Equipments', function() {
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000/login');

    await driver.findElement(By.id('userId')).sendKeys('702900750');
    await driver.findElement(By.id('userPass')).sendKeys('Jeykel');
    await driver.findElement(By.id('submit')).click();
    await driver.wait(until.urlIs('http://localhost:3000/'), 5000);
  });

  after(async function() {
    await driver.quit();
  });

  it('should add computer equipment successfully', async function() {
    await driver.get('http://localhost:3000/AddComputerEquipments');

    await driver.findElement(By.id('licensePlate')).sendKeys('ABC12345');
    await driver.findElement(By.id('class')).sendKeys('Class A');
    await driver.findElement(By.id('name')).sendKeys('Computer');
    await driver.findElement(By.id('brand')).sendKeys('Brand');
    await driver.findElement(By.id('model')).sendKeys('Model');
    await driver.findElement(By.id('state')).sendKeys('Good');
    await driver.findElement(By.id('observations')).sendKeys('No observations');
    await driver.findElement(By.id('include')).sendKeys('Included');
    await driver.findElement(By.id('serialNumber')).sendKeys('12345678');

    await driver.findElement(By.css('form')).submit();

    await driver.wait(until.urlIs('http://localhost:3000/ListComputerEquipments'), 5000);

    await driver.sleep(5000);

    // Assert that the computer equipment is added successfully
    const computerEquipment = await driver.findElement(By.xpath('//table/tbody/tr[last()]/td[1]')).getText();
    assert.strictEqual(computerEquipment, 'ABC12345', 'Computer equipment should be added successfully');
  });
});