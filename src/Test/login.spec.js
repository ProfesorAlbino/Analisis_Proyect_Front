const { Builder, By } = require("selenium-webdriver");


describe("login", () => {
    it("should login with valid credentials", async () => {
        let driver = new Builder().forBrowser('chrome').build();
        await driver.get("http://localhost:3000/login");
        //await driver.sleep(5000);
        await driver.findElement(By.id('userId')).sendKeys('702810226');
        await driver.findElement(By.id('userPass')).sendKeys('1234567');
        await driver.findElement(By.id('submit')).click();
        //await driver.sleep(5000);
        await driver.quit();
    });
});