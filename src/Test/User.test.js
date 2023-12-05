const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('User Page', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://localhost:3000/login');

    await driver.findElement(By.id('userId')).sendKeys('702810226');
    await driver.findElement(By.id('userPass')).sendKeys('1234567');
    await driver.findElement(By.id('submit')).click();

    await driver.wait(until.urlIs('http://localhost:3000/'), 5000);

  });

  after(async function () {
    await driver.quit();
  });

  it('should display users table', async function () {
    await driver.get('http://localhost:3000/users');

    const table = await driver.findElement(By.id('users-table'));
    assert(await table.isDisplayed(), 'Users table should be displayed');
  });

  it('should search for users', async function () {
    await driver.get('http://localhost:3000/users');

    const searchInput = await driver.findElement(By.id('search'));
    await searchInput.sendKeys('Elias');

    await driver.sleep(4000);

    await driver.findElement(By.id('search-btn')).click();

    //await driver.wait(until.stalenessOf(searchInput), 5000);

    const users = await driver.findElements(By.css('tr'));
    assert(users.length > 0, 'Users should be displayed after search');
  });

  it('should navigate to create User page', async function() {
    await driver.get('http://localhost:3000/users');

    const createButton = await driver.findElement(By.id("btn-create"));
    await createButton.click();

    const currentUrl = await driver.getCurrentUrl();
    assert(currentUrl.includes('/users/create'), 'Should navigate to create users page');
  });

  /* it('should delete a user', async function () {
    await driver.get('http://localhost:3000/users');

    const deleteButton = await driver.findElement(By.css('btn-danger'));
    await deleteButton.click();

    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    await alert.accept();

    await driver.wait(until.stalenessOf(deleteButton), 5000);

    const users = await driver.findElements(By.css('tr'));
    assert(users.length === 0, 'User should be deleted');
  });

  it('should edit a user', async function () {
    await driver.get('http://localhost:3000/users');

    const editButton = await driver.findElement(By.xpath('//button[contains(@class, "btn-warning")][1]'));
    await editButton.click();

    await driver.wait(until.urlIs('http://localhost:3000/users/create'), 5000);

    const userIdInput = await driver.findElement(By.id('userId'));
    assert(await userIdInput.isDisplayed(), 'Edit user form should be displayed');
  }); */
});