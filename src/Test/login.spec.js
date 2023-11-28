const { Builder } = require("selenium-webdriver");


describe("login", () => {
    it("should login with valid credentials", async () => {
        let driver = new Builder().forBrowser('brave').build();

        await driver.get("http://localhost:3000/login");
        await driver.sleep(5000);
        await driver.quit();
        
    });
});