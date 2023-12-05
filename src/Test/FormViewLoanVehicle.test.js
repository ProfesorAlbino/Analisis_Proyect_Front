const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const { Select } = require('selenium-webdriver');
describe('FormViewLoanVehicle', function() {
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000/login');

    await driver.findElement(By.id('userId')).sendKeys('402490311');
    await driver.findElement(By.id('userPass')).sendKeys('1234');
    await driver.findElement(By.id('submit')).click();
    await driver.wait(until.urlIs('http://localhost:3000/'), 5000);
  });

  after(async function() {
    await driver.quit();
  });

  it('should display success message and navigate to loanVehicle page on successful form submission', async function() {
    try {
    await driver.get('http://localhost:3000/loanVehicle/create');

    await driver.findElement(By.name('unityOrCarrer')).sendKeys('Sample Unity');
    await driver.findElement(By.name('responsible')).sendKeys('Sample Responsible');
    await driver.findElement(By.name('destination')).sendKeys('Sample Destination');
    await driver.findElement(By.name('startingPlace')).sendKeys('Sample Starting Place');
    await driver.findElement(By.name('personQuantity')).sendKeys('5');
    await driver.findElement(By.name('startDate')).sendKeys('2022-12-01');
    await driver.findElement(By.name('exitHour')).sendKeys('09:00');
    await driver.findElement(By.name('endDate')).sendKeys('2022-12-02');
    await driver.findElement(By.name('returnHour')).sendKeys('18:00');
    const selectElement = await driver.findElement(By.name('activityType'));
    const select = await new Select(selectElement);
    await select.selectByValue('1');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.elementLocated(By.css('.swal2-title')), 5000);
    
    const successMessage = await driver.findElement(By.css('.swal2-title')).getText();
    assert.strictEqual(successMessage, '¡Guardado!', 'Prestámo de Vehículo guardado con éxito');
    const currentUrl = 'http://localhost:3000/loanVehicle';
    assert.strictEqual(currentUrl, 'http://localhost:3000/loanVehicle', 'Should navigate to studyRoomsSchedule page');
    } catch (error) {
        console.log(error);
        throw error;
    }
  });
});