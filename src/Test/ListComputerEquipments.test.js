const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('List Computer Equipments', function() {
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

  //eliminar
  it('should display computer equipments in the list', async function() {
    await driver.get('http://localhost:3000/ListComputerEquipments');

    await driver.sleep(5000);

    const table = await driver.findElement(By.css('table'));
    assert.ok(await table.isDisplayed(), 'Table should be displayed');

    const rows = await driver.findElements(By.css('table tbody tr'));
    assert.ok(rows.length > 0, 'There should be computer equipments in the list');
  });

  //modificar
  it('should navigate to ModifyComputerEquipments page', async function() {
    await driver.get('http://localhost:3000/ListComputerEquipments');

    await driver.sleep(5000);

    const modifyButton = await driver.findElement(By.css('table tbody tr:first-child button.btn-warning'));
    await modifyButton.click();

    await driver.wait(until.urlIs('http://localhost:3000/ModifyComputerEquipments'), 5000);

    const pageTitle = await driver.findElement(By.css('h1')).getText();
    assert.strictEqual(pageTitle, 'Modificar Equipo Informatico', 'ModifyComputerEquipments page should be displayed');
  });

  //mas informacion
  it('should navigate to moreInformationComputerEquipment page', async function() {
    await driver.get('http://localhost:3000/ListComputerEquipments');

    await driver.sleep(5000);

    const moreInfoButton = await driver.findElement(By.css('table tbody tr:first-child button.btn-primary'));
    await moreInfoButton.click();

    await driver.wait(until.urlIs('http://localhost:3000/moreInformationComputerEquipment'), 5000);

    const pageTitle = await driver.findElement(By.css('h1')).getText();
    assert.strictEqual(pageTitle, 'Informacion', 'moreInformationComputerEquipment page should be displayed');
  });
});