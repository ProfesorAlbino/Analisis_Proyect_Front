const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const { Select } = require('selenium-webdriver');
describe('FormViewStudyRoomSchedule', function() {
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

  it('should display success message and navigate to studyRoomsSchedule page on successful form submission', async function() {
    await driver.get('http://localhost:3000/studyRoomsSchedule/create');

   
    const selectElement = await driver.findElement(By.name('idStudyRoom'));
    const select = await new Select(selectElement);
    await select.selectByValue('21');
    await driver.findElement(By.name('day')).sendKeys('2022-01-01');
    await driver.findElement(By.name('startHour')).sendKeys('09:00');
    await driver.findElement(By.name('endHour')).sendKeys('10:00');

  
    await driver.findElement(By.css('button[type="submit"]')).click();

  
    await driver.wait(until.elementLocated(By.css('.swal2-title')), 5000);

   
    const successMessage = await driver.findElement(By.css('.swal2-title')).getText();
    assert.strictEqual(successMessage, '¡Guardado!', 'Horario de sala de estudio guardado con éxito');

 
    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, 'http://localhost:3000/studyRoomsSchedule', 'Should navigate to studyRoomsSchedule page');
  });
});