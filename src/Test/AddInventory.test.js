const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Add Inventory Page', function() {
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000/login');

    await driver.findElement(By.id('userId')).sendKeys('702810226');
    await driver.findElement(By.id('userPass')).sendKeys('1234567');
    await driver.findElement(By.id('submit')).click();

    await driver.wait(until.urlIs('http://localhost:3000/'), 5000);
  });

  after(async function() {
    await driver.quit();
  });

  it('should create a new inventory successfully', async function() {
    await driver.get('http://localhost:3000/inventory/create');

    await driver.findElement(By.id('units')).sendKeys('10');
    await driver.findElement(By.id('type')).sendKeys('Electronics');
    await driver.findElement(By.id('description')).sendKeys('New inventory item');
    await driver.findElement(By.css('form')).submit();

    //Aceptar alerta del sweetalert
    await driver.findElement(By.css('.swal2-confirm')).click();

    await driver.wait(until.urlIs('http://localhost:3000/inventory'), 5000);

    const url = await driver.getCurrentUrl();
    assert(url === 'http://localhost:3000/inventory', 'New inventory should be added to the list');
  });

  /*it('should update an existing inventory successfully', async function() {
    await driver.get('http://localhost:3000/inventory');

    const inventoryItem = await driver.findElement(By.css('.inventory-item'));
    await inventoryItem.click();

    await driver.wait(until.urlContains('http://localhost:3000/edit-inventory'), 5000);

    await driver.findElement(By.id('units')).clear();
    await driver.findElement(By.id('units')).sendKeys('20');
    await driver.findElement(By.id('type')).clear();
    await driver.findElement(By.id('type')).sendKeys('Furniture');
    await driver.findElement(By.id('description')).clear();
    await driver.findElement(By.id('description')).sendKeys('Updated inventory item');
    await driver.findElement(By.css('form')).submit();

    await driver.wait(until.urlIs('http://localhost:3000/inventory'), 5000);

    const updatedInventoryItem = await driver.findElement(By.css('.inventory-item'));
    const inventoryDetails = await updatedInventoryItem.getText();
    assert(inventoryDetails.includes('20'), 'Inventory units should be updated');
    assert(inventoryDetails.includes('Furniture'), 'Inventory type should be updated');
    assert(inventoryDetails.includes('Updated inventory item'), 'Inventory description should be updated');
  });*/
});