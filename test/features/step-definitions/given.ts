import { Given } from "@cucumber/cucumber";
import chai from "chai";

Given(/^As (a|an) (.*) user I login to inventory web app$/, async function (prefixTxt, userType, dataTable) {
    // Getting values from data table
    let dt = dataTable.hashes()
    /** 1. Launch browser */
    // @ts-ignore
    await browser.url(browser.config.sauseDemoURL)
    // await browser.maximizeWindow()

    /**2. Login to inventory*/
    try {
        await $(`#user-name`).setValue(dt[0].Username)
        // await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME)
        await $(`#password`).setValue(process.env.TEST_STD_PASSWORD)
        await $(`#login-button`).click()
    } catch (err) {
        await browser.refresh()
        await browser.pause(2000)
        await $(`#user-name`).setValue("standard_user")
        await $(`#password`).setValue("secret_sauce")
        await $(`#login-button`).click()
    }

    /** Login with another */
    // await browser.pause(2000)
    // await browser.reloadSession()
    // await browser.url("https://www.saucedemo.com")
    // await $(`#user-name`).setValue("problem_user")
    // await $(`#password`).setValue("secret_sauce")
    // await $(`#login-button`).click()

    // await browser.back()
    // await browser.pause(2000)
    // await  browser.forward()
    // await browser.debug()
    this.appid =   "ABC123"

})
