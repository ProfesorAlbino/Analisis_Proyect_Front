const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Inventory Page', function() {
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

  it('should display inventory list', async function() {
    await driver.get('http://localhost:3000/inventory');

    const inventoryList = await driver.findElements(By.css('tr'));
    assert(inventoryList.length > 0, 'Inventory list should be displayed');
  });

  it('should search inventory by description', async function() {
    await driver.get('http://localhost:3000/inventory');

    const searchInput = await driver.findElement(By.id('search'));
    await searchInput.sendKeys('zzz');

    await driver.sleep(1000);

    const searchButton = await driver.findElement(By.id("search-btn"));
    await searchButton.click();

    const inventoryList = await driver.findElements(By.css('tr'));
    assert(inventoryList.length > 0, 'Inventory list should be displayed');
  });

  it('should navigate to create inventory page', async function() {
    await driver.get('http://localhost:3000/inventory');

    const createButton = await driver.findElement(By.id("btn-create"));
    await createButton.click();

    const currentUrl = await driver.getCurrentUrl();
    assert(currentUrl.includes('/inventory/create'), 'Should navigate to create inventory page');
  });

  /*it('should delete inventory', async function() {
    await driver.get('http://localhost:3000/inventory');

    const deleteButton = await driver.findElement(By.xpath("//button[contains(@class, 'danger')]"));
    await deleteButton.click();

    const confirmButton = await driver.findElement(By.xpath("//button[contains(text(), 'Si, ¡eliminar!')]"));
    await confirmButton.click();

    await driver.wait(until.urlIs('http://localhost:3000/inventory'), 5000);

    const inventoryList = await driver.findElements(By.tagName('tr'));
    assert(inventoryList.length > 0, 'Inventory list should be displayed');
  });*/
});