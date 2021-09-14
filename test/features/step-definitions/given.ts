import { Given } from "@cucumber/cucumber";
import chai from "chai";
import reporter from "../../helper/reporter"
import sauseHomePage from "../../page-objects/sause.home.page"

Given(/^As (a|an) (.*) user I login to inventory web app$/, async function (prefixTxt, userType, dataTable) {
    try {
        reporter.addStep(this.testid, "info", "Login to sause demo..")
        let dt = dataTable.hashes()
        // @ts-ignore
        await sauseHomePage.navigateTo(browser.config.sauseDemoURL)
        await sauseHomePage.loginToSauseApp(this.testid, process.env.TEST_STD_USERNAME, process.env.TEST_STD_PASSWORD)
    } catch (err) {
        err.message = `${this.testid}: Failed at login step, ${err.message}`
        throw err
    }

})
Given(/^Get list of (.*) from reqres.in$/, async function (endpointRef) {

})
