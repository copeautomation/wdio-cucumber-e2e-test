import { BeforeStep } from "@cucumber/cucumber";

BeforeStep(function () {
    // @ts-ignore
    this.testid = browser.config.testid
})