const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('AdminListLoan', function() {
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

  it('should display the list of loan computer equipments', async function() {
    await driver.get('http://localhost:3000/adminListLoan');
    await driver.sleep(5000);

    const table = await driver.findElement(By.tagName('table'));
    const rows = await table.findElements(By.tagName('tr'));

    assert.strictEqual(rows.length, 2); // Assuming there are 2 loan computer equipments in the list
  });
});