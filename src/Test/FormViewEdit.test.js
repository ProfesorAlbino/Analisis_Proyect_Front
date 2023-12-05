const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const { Select } = require('selenium-webdriver');

describe('FormViewEditStudyRoom', function() {
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
    await driver.get('http://localhost:3000/studyRooms/edit/1');

    const nameInput = await driver.findElement(By.name('name'));
    await nameInput.clear();
    await nameInput.sendKeys('Sala Estudio Editada');

    const capacityInput = await driver.findElement(By.name('capacity'));
    await capacityInput.clear();
    await capacityInput.sendKeys('25');
   /* const selectElement = await driver.findElement(By.name('isAvailable'));
    const select = await new Select(selectElement);
    await select.selectByValue(0);*/
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    await driver.wait(until.urlIs('http://localhost:3000/studyRooms'), 5000);

    const successMessage = await driver.findElement(By.css('.swal2-title')).getText();
    assert.strictEqual(successMessage, '¡Guardado!', 'Sala de estudio editada con éxito');
  });

  
});