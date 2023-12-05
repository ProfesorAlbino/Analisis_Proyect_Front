const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('EditLoanClassRoom Page', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.id('userId')).sendKeys('702600209');
    await driver.findElement(By.id('userPass')).sendKeys('123456');
    await driver.findElement(By.id('submit')).click();
    await driver.wait(until.urlIs('http://localhost:3000/'), 5000);

    await driver.get('http://localhost:3000/loanClassRooms/editLoanClassRoom/66');

    await driver.sleep(5000);
  });

  after(async function () {
    await driver.quit();
  });

  it('should display user name', async function () {
    const userName = await driver.findElement(By.name('name')).getAttribute('value');
    assert.strictEqual(userName, 'Bayron Villalobos', 'Should display user name');
  });

  it('should select class room', async function () {
    const classRoomSelect = await driver.findElement(By.name('idClassroom'));
    await classRoomSelect.sendKeys('lab05');
    await classRoomSelect.sendKeys(Key.ENTER);

    const selectedClassRoom = await classRoomSelect.getAttribute('value');
    assert.strictEqual(selectedClassRoom, '17', 'Should select class room');
  });

  it('should select day', async function () {
    const daySelect = await driver.findElement(By.name('day'));
    await daySelect.sendKeys('Lunes');
    await daySelect.sendKeys(Key.ENTER);

    const selectedDay = await daySelect.getAttribute('value');
    assert.strictEqual(selectedDay, 'Lunes', 'Should select day');
  });

  it('should enter start and end time', async function () {
    const startTimeInput = await driver.findElement(By.name('startHour'));
    await startTimeInput.clear();
    await startTimeInput.sendKeys('12:00');

    const endTimeInput = await driver.findElement(By.name('endHour'));
    await endTimeInput.clear();
    await endTimeInput.sendKeys('15:00');

    const startTime = await startTimeInput.getAttribute('value');
    const endTime = await endTimeInput.getAttribute('value');

    assert.strictEqual(startTime, '12:00', 'Should enter start time');
    assert.strictEqual(endTime, '15:00', 'Should enter end time');
  });

  it('should enter start and end date', async function () {
    const startDateInput = await driver.findElement(By.name('startDate'));
    await startDateInput.clear();
    await startDateInput.sendKeys('"01/01/2025');

    const endDateInput = await driver.findElement(By.name('endDate'));
    await endDateInput.clear();
    await endDateInput.sendKeys('"02/01/2025');

    const startDate = await startDateInput.getAttribute('value');
    const endDate = await endDateInput.getAttribute('value');

    assert.strictEqual(startDate, '2025-01-01', 'Should enter start date');
    assert.strictEqual(endDate, '2025-01-02', 'Should enter end date');
  });

  it('should submit the form', async function () {
    await driver.findElement(By.css('form')).submit();

    await driver.sleep(2000);

    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, 'http://localhost:3000/LoanClassRoom', 'Should navigate to LoanClassRoom page');
  });
});