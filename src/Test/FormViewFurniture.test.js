const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const { Select } = require('selenium-webdriver');
describe('FormViewFurniture', function() {
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

  it('should display success message and navigate to furnitures page on successful form submission', async function() {
    await driver.get('http://localhost:3000/furnitures/create');

    await driver.findElement(By.name('furniture')).sendKeys('Test Furniture');
    await driver.findElement(By.name('capacity')).sendKeys('5');

    // Select an option from the dropdown
    const selectElement = await driver.findElement(By.name('id_study_room'));
    const select = await new Select(selectElement);
    await select.selectByValue('16');

    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlIs('http://localhost:3000/furnitures'), 5000);

    const successMessage = await driver.findElement(By.css('.swal2-title')).getText();
    assert.strictEqual(successMessage, '¡Guardado!', 'Mueble guardado con éxito');
  });

});
