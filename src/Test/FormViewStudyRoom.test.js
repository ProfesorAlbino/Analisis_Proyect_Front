const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('FormViewStudyRoom', function() {
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

  it('should display success message and navigate to studyRooms page on successful form submission', async function() {
   
    await driver.get('http://localhost:3000/studyRooms/create');

    await driver.findElement(By.name('name')).sendKeys('Test Study Room');
    await driver.findElement(By.name('capacity')).sendKeys('5');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlIs('http://localhost:3000/studyRooms'), 5000);

    const successMessage = await driver.findElement(By.css('.swal2-title')).getText();
    assert.strictEqual(successMessage, '¡Guardado!', 'Success message should be displayed');

    
  });

/* it('should display error message when form fields are empty', async function() {
    await driver.get('http://localhost:3000/studyRooms/create');

    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.elementLocated(By.css('.swal2-title')), 5000);

    const errorMessage = await driver.findElement(By.css('.swal2-title')).getText();
    assert.strictEqual(errorMessage, 'ERROR!', 'Error message should be displayed');
  });

it('should reset form fields when "Limpiar" button is clicked', async function() {
    await driver.get('http://localhost:3000/studyRooms/create');

    await driver.findElement(By.name('name')).sendKeys('Test Study Room');
    await driver.findElement(By.name('capacity')).sendKeys('5');
    await driver.findElement(By.css('button[type="button"]')).click();

    const nameField = await driver.findElement(By.name('name')).getAttribute('value');
    const capacityField = await driver.findElement(By.name('capacity')).getAttribute('value');

    assert.strictEqual(nameField, '', 'Name field should be empty');
    assert.strictEqual(capacityField, '1', 'Capacity field should be reset to default value');
  });

  it('should navigate to studyRooms page when "Regresar" button is clicked', async function() {
    await driver.get('http://localhost:3000/studyRooms/create');

    await driver.findElement(By.css('button[type="button"]')).click();

    await driver.wait(until.urlIs('http://localhost:3000/studyRooms'), 5000);
  });*/
});